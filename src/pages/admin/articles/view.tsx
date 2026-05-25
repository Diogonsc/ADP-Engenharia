import { Link, useParams } from "react-router";
import { ArrowLeftIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { DeleteArticleDialog } from "@/components/admin/delete-article-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArticleContent } from "@/components/admin/article-content";
import { useArticles } from "@/hooks/use-articles";
import { useState } from "react";

export function AdminArticleViewPage() {
  const { id } = useParams();
  const { getArticleById, loading } = useArticles();
  const [deleteOpen, setDeleteOpen] = useState(false);

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
        <CardContent>
          <Button asChild variant="ghost">
            <Link to="/admin/articles">
              <ArrowLeftIcon />
              Voltar para a lista
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge
              className={
                article.status === "published"
                  ? "rounded-full bg-brand-subtle px-2.5 py-1 text-[11px] normal-case tracking-normal text-brand"
                  : "rounded-full bg-secondary px-2.5 py-1 text-[11px] normal-case tracking-normal"
              }
            >
              {article.status === "published" ? "Publicado" : "Rascunho"}
            </Badge>
            {article.featured && (
              <Badge className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold normal-case tracking-normal text-amber-700">
                Destaque na home
              </Badge>
            )}
            <span className="text-sm text-text-muted">{article.categoryLabel}</span>
            <span className="text-sm text-text-muted">• {article.date}</span>
            <span className="text-sm text-text-muted">• {article.readTime}</span>
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary">
            {article.title}
          </h1>
          <p className="mt-2 max-w-3xl text-text-secondary">{article.excerpt}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="ghost">
            <Link to="/admin/articles">
              <ArrowLeftIcon />
              Voltar
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={`/admin/articles/${article.id}/edit`}>
              <PencilIcon />
              Editar
            </Link>
          </Button>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2Icon />
            Excluir
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden rounded-lg py-0 shadow-sm">
        {article.image && (
          <div className="aspect-[21/9] w-full overflow-hidden border-b border-border">
            <img
              src={article.image}
              alt={article.title}
              className="size-full object-cover"
            />
          </div>
        )}
        <CardContent className="space-y-4 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.05em] text-text-muted">
            Slug: {article.slug}
          </p>
          <ArticleContent
            content={article.content}
            className="text-sm leading-relaxed text-text-secondary"
          />
        </CardContent>
      </Card>

      <DeleteArticleDialog
        article={article}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
