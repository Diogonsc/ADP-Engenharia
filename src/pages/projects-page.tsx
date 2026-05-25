import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import {
  container,
  containerPx,
  overline,
  sectionPy,
} from "@/lib/layout";
import { ProjectDialog } from "@/components/project-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProjects } from "@/lib/projects-api";
import {
  projectCategories,
  projectFilters,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";

type FilterCategory = ProjectCategory | "all";

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const visibleProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );

  const dialogOpen = selectedProject !== null;

  const getCategoryLabel = (category: ProjectCategory) =>
    projectCategories.find((item) => item.value === category)?.label ?? category;

  return (
    <>
      <section className={cn("bg-bg-primary", containerPx, sectionPy)}>
        <div className={container}>
          <Link
            to="/#projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            Voltar para a página inicial
          </Link>

          <header className="mb-10 max-w-[560px]">
            <span className={overline}>Portfólio</span>
            <h1 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-text-primary sm:text-[52px]">
              Projetos realizados
            </h1>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Engenharia de alta tensão para empreendimentos em todo o Brasil —
              linhas de transmissão, subestações e projetos industriais.
            </p>
          </header>

          <div className="mb-10 flex flex-wrap gap-2">
            {projectFilters.map((filter) => (
              <Button
                key={filter.id}
                type="button"
                variant={
                  activeFilter === filter.id ? "filter-active" : "filter"
                }
                size="filter"
                onClick={() => setActiveFilter(filter.id as FilterCategory)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {loading ? (
            <p className="py-12 text-center text-text-muted">
              Carregando projetos…
            </p>
          ) : visibleProjects.length === 0 ? (
            <p className="py-12 text-center text-text-muted">
              Nenhum projeto cadastrado no momento.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <Card
                  key={project.id}
                  className="project-card group cursor-pointer gap-0 overflow-hidden rounded-lg border border-border bg-bg-primary py-0 shadow-none ring-0 transition duration-250 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-card__image relative aspect-video overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-bg-secondary text-sm text-text-muted">
                        Sem imagem
                      </div>
                    )}
                    <span className="absolute bottom-3 left-3 rounded-sm bg-brand px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                  <CardContent className="flex flex-1 flex-col p-6">
                    <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">
                      {project.tag}
                    </span>
                    <h2 className="mb-2 text-base font-semibold leading-snug text-text-primary">
                      {project.title}
                    </h2>
                    <p className="mb-4 flex-1 text-[13px] leading-relaxed text-text-secondary">
                      {project.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-3.5 text-xs text-text-muted">
                      <span>{project.meta}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                      >
                        Ver projeto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProjectDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </>
  );
}
