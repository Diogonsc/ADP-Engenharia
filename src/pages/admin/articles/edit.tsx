import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { ArticleForm } from "@/components/admin/article-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useArticles } from "@/hooks/use-articles";

export function AdminArticleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArticleById, updateArticle, loading } = useArticles();
  const article = getArticleById(Number(id));

  if (loading) {
    return (
      <div className="py-12 text-center text-text-muted">Carregando artigo…</div>
    );
  }

  if (!article) {
    return (
      <Card className="rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="font-display text-2xl font-semibold normal-case">
            Artigo não encontrado
          </CardTitle>
          <CardDescription>
            O artigo solicitado não existe ou foi removido.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Button asChild variant="ghost" className="w-fit">
        <Link to={`/admin/articles/${article.id}`}>
          <ArrowLeftIcon />
          Voltar para visualização
        </Link>
      </Button>

      <ArticleForm
        key={article.id}
        initialData={article}
        submitLabel="Salvar alterações"
        onSubmit={async (data) => {
          await updateArticle(article.id, data);
          navigate(`/admin/articles/${article.id}`);
        }}
      />
    </div>
  );
}
