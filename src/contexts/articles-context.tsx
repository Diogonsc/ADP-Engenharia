import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Article, ArticleFormData } from "@/data/articles";
import {
  fetchAllArticles,
  createArticle as apiCreate,
  updateArticle as apiUpdate,
  deleteArticle as apiDelete,
} from "@/lib/articles-api";
import { getErrorMessage } from "@/lib/errors";

type ArticlesContextValue = {
  articles: Article[];
  loading: boolean;
  error: string | null;
  getArticleById: (id: number) => Article | undefined;
  createArticle: (data: ArticleFormData) => Promise<Article>;
  updateArticle: (id: number, data: ArticleFormData) => Promise<Article>;
  deleteArticle: (id: number) => Promise<void>;
  refetch: () => Promise<void>;
};

const ArticlesContext = createContext<ArticlesContextValue | null>(null);

export { ArticlesContext };

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllArticles();
      setArticles(data);
    } catch (err) {
      setError(getErrorMessage(err, "Erro ao carregar artigos"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getArticleById = useCallback(
    (id: number) => articles.find((a) => a.id === id),
    [articles],
  );

  const createArticle = useCallback(async (data: ArticleFormData) => {
    const article = await apiCreate(data);
    setArticles((prev) => [article, ...prev]);
    return article;
  }, []);

  const updateArticle = useCallback(
    async (id: number, data: ArticleFormData) => {
      const updated = await apiUpdate(id, data);
      setArticles((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    },
    [],
  );

  const deleteArticle = useCallback(async (id: number) => {
    await apiDelete(id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      articles,
      loading,
      error,
      getArticleById,
      createArticle,
      updateArticle,
      deleteArticle,
      refetch: load,
    }),
    [
      articles,
      loading,
      error,
      getArticleById,
      createArticle,
      updateArticle,
      deleteArticle,
      load,
    ],
  );

  return (
    <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>
  );
}
