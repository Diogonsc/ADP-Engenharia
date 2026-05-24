import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { ArticleContent } from "@/components/admin/article-content";
import {
  container,
  containerPx,
  overline,
  sectionPy,
} from "@/lib/layout";
import { cn } from "@/lib/utils";
import { fetchPublishedArticleBySlug } from "@/lib/articles-api";
import { getErrorMessage } from "@/lib/errors";
import type { Article } from "@/data/articles";

export function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchPublishedArticleBySlug(slug)
      .then(setArticle)
      .catch((err) => {
        setArticle(null);
        setError(getErrorMessage(err, "Erro ao carregar o artigo"));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <article className={cn("bg-bg-primary", containerPx, sectionPy)}>
      <div className={cn(container, "max-w-3xl")}>
        <Link
          to="/articles"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          Voltar para os artigos
        </Link>

        {loading ? (
          <p className="py-12 text-center text-text-muted">Carregando artigo…</p>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-destructive">{error}</p>
            <Link
              to="/articles"
              className="mt-4 inline-block text-sm text-brand hover:underline"
            >
              Ver todos os artigos
            </Link>
          </div>
        ) : !article ? (
          <div className="py-12 text-center">
            <h1 className="font-display text-2xl font-semibold text-text-primary">
              Artigo não encontrado
            </h1>
            <p className="mt-2 text-text-secondary">
              Este artigo não existe ou não está mais publicado.
            </p>
            <Link
              to="/articles"
              className="mt-6 inline-block text-sm text-brand hover:underline"
            >
              Ver todos os artigos
            </Link>
          </div>
        ) : (
          <>
            <header className="mb-8">
              <span className={overline}>{article.categoryLabel}</span>
              <h1 className="font-display text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary sm:text-[44px]">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  {article.excerpt}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-text-muted">
                <span>{article.date}</span>
                <span aria-hidden>•</span>
                <span>{article.readTime}</span>
              </div>
            </header>

            {article.image && (
              <div className="mb-10 overflow-hidden rounded-lg border border-border">
                <img
                  src={article.image}
                  alt={article.title}
                  className="aspect-[21/9] w-full object-cover"
                />
              </div>
            )}

            <ArticleContent
              content={article.content}
              className="text-base leading-relaxed text-text-secondary"
            />
          </>
        )}
      </div>
    </article>
  );
}
