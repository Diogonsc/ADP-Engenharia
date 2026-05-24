export type ArticleCategory = "lt" | "se" | "automacao" | "gestao";
export type ArticleStatus = "draft" | "published";

export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  categoryLabel: string;
  date: string;
  readTime: string;
  image: string;
  status: ArticleStatus;
};

export const articleCategories: {
  value: ArticleCategory;
  label: string;
}[] = [
  { value: "lt", label: "Linhas de Transmissão" },
  { value: "se", label: "Subestações" },
  { value: "automacao", label: "Automação" },
  { value: "gestao", label: "Gestão de Projetos" },
];

export type ArticleFormData = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  image: string;
  status: ArticleStatus;
};

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function estimateReadTime(content: string): string {
  const plainText = content.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min de leitura`;
}

export function formatArticleDate(isoString: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(new Date(isoString));
}

export function mapRowToArticle(row: {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  status: string;
  created_at: string;
}): Article {
  const category = row.category as ArticleCategory;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    category,
    categoryLabel:
      articleCategories.find((c) => c.value === category)?.label ?? category,
    date: formatArticleDate(row.created_at),
    readTime: estimateReadTime(row.content ?? ""),
    image: row.image_url ?? "",
    status: row.status as ArticleStatus,
  };
}

export function articleFormToPreview(
  form: ArticleFormData,
  options?: { id?: number; date?: string },
): Article {
  const category = form.category;
  return {
    id: options?.id ?? 0,
    slug: form.slug,
    title: form.title,
    excerpt: form.excerpt,
    content: form.content,
    category,
    categoryLabel:
      articleCategories.find((c) => c.value === category)?.label ?? category,
    date: options?.date ?? formatArticleDate(new Date().toISOString()),
    readTime: estimateReadTime(form.content),
    image: form.image,
    status: form.status,
  };
}
