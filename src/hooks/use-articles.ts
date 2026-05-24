import { useContext } from "react";
import { ArticlesContext } from "@/contexts/articles-context";

export function useArticles() {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within ArticlesProvider.");
  }
  return context;
}
