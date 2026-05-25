import { supabase } from "./supabase";
import {
  mapRowToArticle,
  type ArticleFormData,
  type Article,
} from "@/data/articles";
import {
  FeaturedLimitError,
  MAX_FEATURED_ARTICLES,
} from "@/lib/featured";
import { optimizeImage, validateImageBeforeOptimize } from "@/lib/image";

async function countFeaturedArticles(excludeId?: number): Promise<number> {
  let query = supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("featured", true);

  if (excludeId !== undefined) {
    query = query.neq("id", excludeId);
  }

  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

async function assertCanSetArticleFeatured(
  featured: boolean,
  articleId?: number,
): Promise<void> {
  if (!featured) return;

  const count = await countFeaturedArticles(articleId);
  if (count >= MAX_FEATURED_ARTICLES) {
    throw new FeaturedLimitError(
      `No máximo ${MAX_FEATURED_ARTICLES} artigos podem estar em destaque na página inicial.`,
    );
  }
}

export type UploadPhase = "validating" | "optimizing" | "uploading" | "done";

export type UploadProgressCallback = (phase: UploadPhase) => void;

export type UploadImageResult = {
  url: string;
  originalSize: number;
  optimizedSize: number;
  reductionPercent: number;
};

export async function fetchPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRowToArticle);
}

export async function fetchFeaturedPublishedArticles(
  limit = MAX_FEATURED_ARTICLES,
): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map(mapRowToArticle);
}

export async function fetchAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRowToArticle);
}

export async function fetchPublishedArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return mapRowToArticle(data);
}

export async function fetchArticleById(id: number): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return mapRowToArticle(data);
}

export async function createArticle(formData: ArticleFormData): Promise<Article> {
  await assertCanSetArticleFeatured(formData.featured);

  const { data, error } = await supabase
    .from("articles")
    .insert([
      {
        slug: formData.slug,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        image_url: formData.image || null,
        status: formData.status,
        featured: formData.featured,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return mapRowToArticle(data);
}

export async function updateArticle(
  id: number,
  formData: ArticleFormData,
): Promise<Article> {
  await assertCanSetArticleFeatured(formData.featured, id);

  const { data, error } = await supabase
    .from("articles")
    .update({
      slug: formData.slug,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      image_url: formData.image || null,
      status: formData.status,
      featured: formData.featured,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapRowToArticle(data);
}

export async function setArticleFeatured(
  id: number,
  featured: boolean,
): Promise<Article> {
  await assertCanSetArticleFeatured(featured, id);

  const { data, error } = await supabase
    .from("articles")
    .update({ featured })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapRowToArticle(data);
}

export function isStorageUrl(url: string): boolean {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    return hostname.endsWith(".supabase.co") && url.includes("/article-images/");
  } catch {
    return false;
  }
}

export function extractStorageUrlsFromHtml(html: string): string[] {
  if (!html) return [];

  const urls = new Set<string>();
  const pattern = /src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html)) !== null) {
    const url = match[1].replace(/&amp;/g, "&");
    if (isStorageUrl(url)) urls.add(url);
  }

  return [...urls];
}

function collectArticleStorageUrls(
  imageUrl: string | null | undefined,
  content: string | null | undefined,
): string[] {
  const urls = new Set<string>();

  if (imageUrl && isStorageUrl(imageUrl)) urls.add(imageUrl);

  for (const url of extractStorageUrlsFromHtml(content ?? "")) {
    urls.add(url);
  }

  return [...urls];
}

export async function deleteArticleImage(imageUrl: string): Promise<void> {
  const url = new URL(imageUrl);
  const pathParts = url.pathname.split("/article-images/");
  if (pathParts.length < 2) return;

  const fileName = pathParts[1];
  const { error } = await supabase.storage
    .from("article-images")
    .remove([fileName]);

  if (error) throw error;
}

function deleteStorageUrlsQuietly(urls: string[], context: string): void {
  for (const url of urls) {
    deleteArticleImage(url).catch((err) => {
      console.warn(`[${context}] Falha ao remover imagem do bucket:`, url, err);
    });
  }
}

export async function deleteArticle(id: number): Promise<void> {
  const { data, error: fetchError } = await supabase
    .from("articles")
    .select("image_url, content")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  const storageUrls = collectArticleStorageUrls(
    data?.image_url,
    data?.content,
  );

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw error;

  deleteStorageUrlsQuietly(storageUrls, "deleteArticle");
}

export async function uploadArticleImage(
  file: File,
  options?: {
    signal?: AbortSignal;
    onPhase?: UploadProgressCallback;
  },
): Promise<UploadImageResult> {
  const { signal, onPhase } = options ?? {};

  onPhase?.("validating");
  await validateImageBeforeOptimize(file, signal);

  onPhase?.("optimizing");
  const optimized = await optimizeImage(file, signal);

  onPhase?.("uploading");
  const fileName = `${Date.now()}-${crypto.randomUUID()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from("article-images")
    .upload(fileName, optimized, {
      contentType: "image/webp",
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("article-images")
    .getPublicUrl(fileName);

  onPhase?.("done");

  const reductionPercent =
    Math.round((1 - optimized.size / file.size) * 1000) / 10;

  return {
    url: data.publicUrl,
    originalSize: file.size,
    optimizedSize: optimized.size,
    reductionPercent,
  };
}
