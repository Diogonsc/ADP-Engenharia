import { Link, useNavigate } from "react-router";
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { DeleteArticleDialog } from "@/components/admin/delete-article-dialog";
import { FeaturedToggleButton } from "@/components/admin/featured-toggle-button";
import { MAX_FEATURED_ARTICLES } from "@/lib/featured";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useArticles } from "@/hooks/use-articles";
import type { Article } from "@/data/articles";
import { useState } from "react";

export function AdminArticlesPage() {
  const navigate = useNavigate();
  const { articles, loading, error, setArticleFeatured } = useArticles();
  const featuredCount = articles.filter((article) => article.featured).length;
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  if (loading) {
    return (
      <div className="py-12 text-center text-text-muted">Carregando artigos…</div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-destructive">{error}</div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary">
            Artigos
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Gerencie os artigos e publicações do blog. Até {MAX_FEATURED_ARTICLES}{" "}
            publicados podem ficar em destaque na página inicial.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/articles/new">
            <PlusIcon />
            Novo artigo
          </Link>
        </Button>
      </div>

      <Card className="gap-0 rounded-lg py-0 shadow-sm">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="font-display text-xl font-semibold normal-case tracking-normal">
            Todos os artigos
          </CardTitle>
          <CardDescription>
            {articles.length} artigo{articles.length === 1 ? "" : "s"} cadastrado
            {articles.length === 1 ? "" : "s"} · {featuredCount} em destaque na
            home.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destaque</TableHead>
                <TableHead className="pr-6 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-text-muted"
                  >
                    Nenhum artigo cadastrado ainda.
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="max-w-[280px] pl-6">
                      <div className="flex flex-col gap-1">
                        <span className="truncate font-medium text-text-primary">
                          {article.title}
                        </span>
                        <span className="truncate text-xs text-text-muted">
                          {article.excerpt}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{article.categoryLabel}</TableCell>
                    <TableCell>{article.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          article.status === "published"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          article.status === "published"
                            ? "rounded-full bg-brand-subtle px-2.5 py-1 text-[11px] normal-case tracking-normal text-brand"
                            : "rounded-full bg-secondary px-2.5 py-1 text-[11px] normal-case tracking-normal"
                        }
                      >
                        {article.status === "published"
                          ? "Publicado"
                          : "Rascunho"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {article.featured ? (
                        <Badge className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold normal-case tracking-normal text-amber-700">
                          Destaque
                        </Badge>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </TableCell>
                    <TableCell className="pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <FeaturedToggleButton
                          featured={article.featured}
                          label={article.title}
                          onToggle={(featured) =>
                            setArticleFeatured(article.id, featured)
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Visualizar ${article.title}`}
                          onClick={() =>
                            navigate(`/admin/articles/${article.id}`)
                          }
                        >
                          <EyeIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Editar ${article.title}`}
                          onClick={() =>
                            navigate(`/admin/articles/${article.id}/edit`)
                          }
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Excluir ${article.title}`}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setArticleToDelete(article)}
                        >
                          <Trash2Icon />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteArticleDialog
        article={articleToDelete}
        open={!!articleToDelete}
        onOpenChange={(open) => {
          if (!open) setArticleToDelete(null);
        }}
      />
    </div>
  );
}
