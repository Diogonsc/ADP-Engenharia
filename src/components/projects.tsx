import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  container,
  containerPx,
  overline,
  sectionPy,
  sectionScroll,
  sectionSubtitle,
  sectionTitle,
} from "@/lib/layout";
import { ProjectDialog } from "@/components/project-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchFeaturedProjects } from "@/lib/projects-api";
import { type Project, projectFilters } from "@/data/projects";
import { SECTION_IDS } from "@/lib/sections";
import { cn } from "@/lib/utils";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchFeaturedProjects().then(setProjects);
  }, []);

  const visibleProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );

  const dialogOpen = selectedProject !== null;

  return (
    <section
      id={SECTION_IDS.projects}
      className={cn(
        "noise-overlay bg-bg-secondary",
        sectionScroll,
        containerPx,
        sectionPy,
      )}
    >
      <div className={container}>
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div data-animate>
            <span className={overline}>Portfólio</span>
            <h2 className={sectionTitle}>Projetos realizados</h2>
            <p className={sectionSubtitle}>
              Engenharia de alta tensão para empreendimentos em todo o Brasil.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link to="/projects">Ver todos →</Link>
          </Button>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" data-animate>
          {projectFilters.map((filter) => (
            <Button
              key={filter.id}
              type="button"
              variant={activeFilter === filter.id ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <Card
              key={project.id}
              className="project-card group gap-0 overflow-hidden rounded-md bg-bg-primary py-0 shadow-none ring-0 cursor-pointer"
              data-animate
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card__image relative aspect-4/3 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[rgba(17,18,16,0.8)] via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <span className="text-xs text-white/80">{project.type}</span>
                  <button
                    type="button"
                    className="mt-1 w-fit text-left text-[13px] font-semibold text-white transition-colors hover:text-brand-vivid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-vivid/50"
                    onClick={() => setSelectedProject(project)}
                  >
                    Ver projeto →
                  </button>
                </div>
              </div>
              <CardContent className="p-4">
                <span className="mb-1.5 inline-block text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">
                  {project.tag}
                </span>
                <h3 className="mb-1.5 text-sm font-semibold leading-snug text-text-primary">
                  {project.title}
                </h3>
                <p className="text-xs text-text-muted">{project.meta}</p>
                <button
                  type="button"
                  className="mt-3 text-[13px] font-semibold text-brand transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 sm:hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  Ver projeto →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Button asChild variant="ghost" className="w-full">
            <Link to="/projects">Ver todos os projetos</Link>
          </Button>
        </div>
      </div>

      <ProjectDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </section>
  );
}
