import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import {
  container,
  containerPx,
  overline,
  sectionPy,
} from "@/lib/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fetchPublishedArticles } from "@/lib/articles-api";
import type { Article, ArticleCategory } from "@/data/articles";

type FilterCategory = ArticleCategory | "all";

const filters: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "lt", label: "Linhas de Transmissão" },
  { id: "se", label: "Subestações" },
  { id: "automacao", label: "Automação" },
  { id: "gestao", label: "Gestão de Projetos" },
];

export function ArticlesPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  useEffect(() => {
    fetchPublishedArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  const navigateToArticle = (slug: string) => {
    navigate(`/articles/${slug}`);
  };

  const visibleArticles = articles.filter(
    (article) => activeFilter === "all" || article.category === activeFilter,
  );

  return (
    <section className={cn("bg-bg-primary", containerPx, sectionPy)}>
      <div className={container}>
        <Link
          to="/#articles"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          Voltar para a página inicial
        </Link>

        <header className="mb-10 max-w-[560px]">
          <span className={overline}>Publicações</span>
          <h1 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-text-primary sm:text-[52px]">
            Artigos Técnicos
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Conteúdo técnico desenvolvido pelos engenheiros da ADP sobre
            transmissão, subestações, automação e boas práticas de projeto.
          </p>
        </header>

        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              type="button"
              variant={
                activeFilter === filter.id ? "filter-active" : "filter"
              }
              size="filter"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <p className="py-12 text-center text-text-muted">
            Carregando artigos…
          </p>
        ) : visibleArticles.length === 0 ? (
          <p className="py-12 text-center text-text-muted">
            Nenhum artigo publicado no momento.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleArticles.map((article) => (
              <Card
                key={article.id}
                className="cursor-pointer group gap-0 overflow-hidden rounded-lg border border-border py-0 shadow-none ring-0 transition duration-250 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                onClick={() => navigateToArticle(article.slug)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Link to={`/articles/${article.slug}`} className="block h-full">
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    )}
                  </Link>
                  <span className="absolute bottom-3 left-3 rounded-sm bg-brand px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
                    {article.categoryLabel}
                  </span>
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <h2 className="mb-2.5 text-base font-semibold leading-snug text-text-primary">
                    <Link
                      to={`/articles/${article.slug}`}
                      className="transition-colors hover:text-brand"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mb-4 flex-1 text-[13px] leading-relaxed text-text-secondary">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-3.5 text-xs text-text-muted">
                    <div className="flex items-center gap-1">
                      <span>{article.date}</span>
                      <span className="text-primary">•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/articles/${article.slug}`}>Ler artigo</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
