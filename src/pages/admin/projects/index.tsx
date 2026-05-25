import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { DeleteProjectDialog } from "@/components/admin/delete-project-dialog";
import { FeaturedToggleButton } from "@/components/admin/featured-toggle-button";
import { Badge } from "@/components/ui/badge";
import { MAX_FEATURED_PROJECTS } from "@/lib/featured";
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
import { useProjects } from "@/hooks/use-projects";
import type { Project } from "@/data/projects";

export function AdminProjectsPage() {
  const navigate = useNavigate();
  const { projects, loading, error, setProjectFeatured } = useProjects();
  const featuredCount = projects.filter((project) => project.featured).length;
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  if (loading) {
    return (
      <div className="py-12 text-center text-text-muted">
        Carregando projetos…
      </div>
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
            Projetos
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Gerencie os projetos do portfólio. Até {MAX_FEATURED_PROJECTS} podem
            ficar em destaque na página inicial.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/projects/new">
            <PlusIcon />
            Novo projeto
          </Link>
        </Button>
      </div>

      <Card className="gap-0 rounded-lg py-0 shadow-sm">
        <CardHeader className="border-b border-border px-6 py-5">
          <CardTitle className="font-display text-xl font-semibold normal-case tracking-normal">
            Todos os projetos
          </CardTitle>
          <CardDescription>
            {projects.length} projeto{projects.length === 1 ? "" : "s"}{" "}
            cadastrado{projects.length === 1 ? "" : "s"} · {featuredCount} em
            destaque na home.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Destaque</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead className="pr-6 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-text-muted"
                  >
                    Nenhum projeto cadastrado ainda.
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="max-w-[280px] pl-6">
                      <div className="flex flex-col gap-1">
                        <span className="truncate font-medium text-text-primary">
                          {project.title}
                        </span>
                        <span className="truncate text-xs text-text-muted">
                          {project.meta}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{project.type}</TableCell>
                    <TableCell>
                      <span className="inline-block rounded-sm bg-brand-subtle px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-brand">
                        {project.tag}
                      </span>
                    </TableCell>
                    <TableCell>
                      {project.featured ? (
                        <Badge className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold normal-case tracking-normal text-amber-700">
                          Destaque
                        </Badge>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-text-muted">
                      {project.order}
                    </TableCell>
                    <TableCell className="pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <FeaturedToggleButton
                          featured={project.featured}
                          label={project.title}
                          onToggle={(featured) =>
                            setProjectFeatured(project.id, featured)
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Visualizar ${project.title}`}
                          onClick={() =>
                            navigate(`/admin/projects/${project.id}`)
                          }
                        >
                          <EyeIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Editar ${project.title}`}
                          onClick={() =>
                            navigate(`/admin/projects/${project.id}/edit`)
                          }
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Excluir ${project.title}`}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setProjectToDelete(project)}
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

      <DeleteProjectDialog
        project={projectToDelete}
        open={!!projectToDelete}
        onOpenChange={(open) => {
          if (!open) setProjectToDelete(null);
        }}
      />
    </div>
  );
}
