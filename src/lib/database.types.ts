export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type ArticleCategory = "lt" | "se" | "automacao" | "gestao";
export type ArticleStatus = "draft" | "published";
export type ProjectCategory = "lt" | "se" | "industrial";

type ArticleRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: ArticleCategory;
  image_url: string | null;
  status: ArticleStatus;
  created_at: string;
  updated_at: string;
};

type ProjectRow = {
  id: number;
  title: string;
  tag: string;
  type: string;
  meta: string;
  category: ProjectCategory;
  image_url: string | null;
  description: string;
  highlights: string[];
  order: number;
  created_at: string;
  updated_at: string;
};

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: ArticleRow;
        Insert: {
          slug: string;
          title: string;
          excerpt?: string | null;
          content?: string | null;
          category: ArticleCategory;
          image_url?: string | null;
          status?: ArticleStatus;
        };
        Update: {
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string | null;
          category?: ArticleCategory;
          image_url?: string | null;
          status?: ArticleStatus;
        };
        Relationships: [];
      };
      projects: {
        Row: ProjectRow;
        Insert: {
          title: string;
          tag: string;
          type: string;
          meta?: string;
          category: ProjectCategory;
          image_url?: string | null;
          description?: string;
          highlights?: string[];
          order?: number;
        };
        Update: {
          title?: string;
          tag?: string;
          type?: string;
          meta?: string;
          category?: ProjectCategory;
          image_url?: string | null;
          description?: string;
          highlights?: string[];
          order?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
