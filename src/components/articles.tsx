import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SECTION_IDS } from "@/lib/sections";
import {
  container,
  containerPx,
  overline,
  sectionPy,
  sectionScroll,
  sectionTitle,
} from "@/lib/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fetchFeaturedPublishedArticles } from "@/lib/articles-api";
import type { Article } from "@/data/articles";

function ArticleLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={`/articles/${slug}`}
      onClick={(e) => e.stopPropagation()}
      className="article-card__link text-[13px] font-semibold text-brand transition-colors hover:text-brand-light"
    >
      {children}
      <span className="arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}

export function ArticlesSection() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchFeaturedPublishedArticles().then(setArticles);
  }, []);

  const featured = articles[0];
  const secondary = articles.slice(1);

  const navigateToArticle = (slug: string) => {
    navigate(`/articles/${slug}`);
  };

  if (!featured) {
    return null;
  }

  return (
    <section
      id={SECTION_IDS.articles}
      className={cn(
        "noise-overlay bg-bg-secondary",
        sectionScroll,
        containerPx,
        sectionPy,
      )}
    >
      <div className={container}>
        <div className="flex items-end justify-between gap-6">
          <div data-animate>
            <span className={overline}>Conhecimento técnico</span>
            <h2 className={sectionTitle}>Conteúdo Técnico</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/articles">Ver todos →</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Card
            className="article-card article-card--featured group cursor-pointer gap-0 overflow-hidden rounded-lg border border-border bg-bg-primary py-0 shadow-none ring-0 transition duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            data-animate
            onClick={() => navigateToArticle(featured.slug)}
          >
            <div className="relative aspect-video overflow-hidden">
              {featured.image && (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              )}
              <span className="absolute top-3 left-3 rounded-sm bg-bg-dark px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/85">
                {featured.categoryLabel}
              </span>
            </div>
            <CardContent className="p-6">
              <span className="article-featured-badge">Em destaque</span>
              <h3 className="font-display text-2xl font-semibold leading-tight text-text-primary">
                {featured.title}
              </h3>
              {featured.excerpt && (
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {featured.excerpt}
                </p>
              )}
              <div className="mt-4">
                <ArticleLink slug={featured.slug}>Ler artigo</ArticleLink>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            {secondary.map((article) => (
              <Card
                key={article.id}
                className="article-card group cursor-pointer gap-0 overflow-hidden rounded-lg border border-border bg-bg-primary py-0 shadow-none ring-0 transition duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                data-animate
                onClick={() => navigateToArticle(article.slug)}
              >
                <div className="relative aspect-[16/7] overflow-hidden">
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  )}
                </div>
                <CardContent className="p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">
                    {article.categoryLabel}
                  </span>
                  <h3 className="mt-2 text-[15px] font-semibold leading-snug text-text-primary">
                    {article.title}
                  </h3>
                  <div className="mt-3">
                    <ArticleLink slug={article.slug}>Ler artigo</ArticleLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
