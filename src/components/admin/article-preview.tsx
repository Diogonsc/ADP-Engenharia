import { ArticleContent } from "@/components/admin/article-content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Article } from "@/data/articles";

type ArticlePreviewProps = {
  article: Article;
};

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const title = article.title.trim() || "Sem título";
  const excerpt = article.excerpt.trim() || "Sem resumo definido.";

  return (
    <div className="flex flex-col gap-6">
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
          <span className="text-sm text-text-muted">{article.categoryLabel}</span>
          <span className="text-sm text-text-muted">• {article.date}</span>
          <span className="text-sm text-text-muted">• {article.readTime}</span>
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary">
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-text-secondary">{excerpt}</p>
      </div>

      <Card className="overflow-hidden rounded-lg py-0 shadow-sm">
        {article.image && (
          <div className="aspect-[21/9] w-full overflow-hidden border-b border-border">
            <img
              src={article.image}
              alt={title}
              className="size-full object-cover"
            />
          </div>
        )}
        <CardContent className="space-y-4 p-6 md:p-8">
          {article.slug && (
            <p className="text-xs uppercase tracking-[0.05em] text-text-muted">
              Slug: {article.slug}
            </p>
          )}
          {article.content ? (
            <ArticleContent
              content={article.content}
              className="text-sm leading-relaxed text-text-secondary"
            />
          ) : (
            <p className="text-sm italic text-text-muted">
              O conteúdo do artigo ainda não foi preenchido.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
