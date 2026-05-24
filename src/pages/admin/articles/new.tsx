import { useNavigate } from "react-router";
import { ArticleForm } from "@/components/admin/article-form";
import { useArticles } from "@/hooks/use-articles";

export function AdminArticleCreatePage() {
  const navigate = useNavigate();
  const { createArticle } = useArticles();

  return (
    <ArticleForm
      submitLabel="Criar artigo"
      onSubmit={async (data) => {
        const article = await createArticle(data);
        navigate(`/admin/articles/${article.id}`);
      }}
    />
  );
}
