export type ProjectCategory = "lt" | "se" | "industrial";

export type Project = {
  id: number;
  title: string;
  tag: string;
  type: string;
  meta: string;
  category: ProjectCategory;
  image: string;
  videoUrl: string;
  description: string;
  highlights: string[];
  order: number;
  featured: boolean;
};

export type ProjectFormData = {
  title: string;
  tag: string;
  type: string;
  meta: string;
  category: ProjectCategory;
  image: string;
  videoUrl: string;
  description: string;
  highlights: string[];
  order: number;
  featured: boolean;
};

export const projectCategories: { value: ProjectCategory; label: string }[] = [
  { value: "lt", label: "Linhas de Transmissão" },
  { value: "se", label: "Subestações" },
  { value: "industrial", label: "Industrial" },
];

export const projectFilters = [
  { id: "all", label: "Todos" },
  { id: "lt", label: "Linhas de Transmissão" },
  { id: "se", label: "Subestações" },
  { id: "industrial", label: "Industrial" },
] as const;

export function mapRowToProject(row: {
  id: number;
  title: string;
  tag: string;
  type: string;
  meta: string;
  category: string;
  image_url: string | null;
  video_url?: string | null;
  description: string;
  highlights: string[];
  order: number;
  featured?: boolean;
}): Project {
  return {
    id: row.id,
    title: row.title,
    tag: row.tag,
    type: row.type,
    meta: row.meta,
    category: row.category as ProjectCategory,
    image: row.image_url ?? "",
    videoUrl: row.video_url ?? "",
    description: row.description,
    highlights: row.highlights,
    order: row.order,
    featured: row.featured ?? false,
  };
}
