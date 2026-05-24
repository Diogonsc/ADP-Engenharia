import { supabase } from "./supabase";
import {
  mapRowToProject,
  type Project,
  type ProjectFormData,
} from "@/data/projects";
import { isStorageUrl } from "./articles-api";

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapRowToProject);
}

export async function fetchProjectById(id: number): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return mapRowToProject(data);
}

export async function createProject(
  formData: ProjectFormData,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title: formData.title,
        tag: formData.tag,
        type: formData.type,
        meta: formData.meta,
        category: formData.category,
        image_url: formData.image || null,
        description: formData.description,
        highlights: formData.highlights,
        order: formData.order,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return mapRowToProject(data);
}

export async function updateProject(
  id: number,
  formData: ProjectFormData,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .update({
      title: formData.title,
      tag: formData.tag,
      type: formData.type,
      meta: formData.meta,
      category: formData.category,
      image_url: formData.image || null,
      description: formData.description,
      highlights: formData.highlights,
      order: formData.order,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapRowToProject(data);
}

export async function deleteProject(
  id: number,
  imageUrl?: string,
): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw error;

  if (imageUrl && isStorageUrl(imageUrl)) {
    deleteProjectImage(imageUrl).catch((err) => {
      console.warn("[projects-api] Falha ao remover imagem do bucket:", err);
    });
  }
}

export async function uploadProjectImage(
  file: File,
  options?: {
    signal?: AbortSignal;
    onPhase?: (
      phase: "validating" | "optimizing" | "uploading" | "done",
    ) => void;
  },
): Promise<{
  url: string;
  originalSize: number;
  optimizedSize: number;
  reductionPercent: number;
}> {
  const { uploadArticleImage } = await import("./articles-api");
  return uploadArticleImage(file, options);
}

export async function deleteProjectImage(imageUrl: string): Promise<void> {
  const url = new URL(imageUrl);
  const pathParts = url.pathname.split("/article-images/");
  if (pathParts.length < 2) return;

  const fileName = pathParts[1];
  const { error } = await supabase.storage
    .from("article-images")
    .remove([fileName]);

  if (error) throw error;
}
