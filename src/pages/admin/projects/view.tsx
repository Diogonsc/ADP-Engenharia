import { Link, useParams } from "react-router";
import { ArrowLeftIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { DeleteProjectDialog } from "@/components/admin/delete-project-dialog";
import { ProjectMedia } from "@/components/project-media";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects } from "@/hooks/use-projects";

export function AdminProjectViewPage() {
  const { id } = useParams();
  const { getProjectById } = useProjects();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const project = getProjectById(Number(id));

  if (!project) {
    return (
      <Card className="rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="font-display text-2xl font-semibold normal-case">
            Projeto não encontrado
          </CardTitle>
          <CardDescription>
            O projeto solicitado não existe ou foi removido.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="ghost">
            <Link to="/admin/projects">
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
          <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">
            {project.tag}
          </span>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary">
            {project.title}
          </h1>
          <p className="mt-1 text-sm text-text-muted">{project.meta}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="ghost">
            <Link to="/admin/projects">
              <ArrowLeftIcon />
              Voltar
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={`/admin/projects/${project.id}/edit`}>
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
        {(project.image || project.videoUrl) && (
          <div className="border-b border-border">
            <ProjectMedia
              title={project.title}
              type={project.type}
              image={project.image}
              videoUrl={project.videoUrl}
            />
          </div>
        )}
        <CardContent className="space-y-6 p-6 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.05em] text-text-muted">
              Destaque na home
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {project.featured ? "Sim" : "Não"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.05em] text-text-muted">
              Tipo
            </p>
            <p className="mt-1 text-sm text-text-secondary">{project.type}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.05em] text-text-muted">
              Descrição
            </p>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">
              {project.description}
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.05em] text-text-muted">
              Escopo técnico
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.highlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary before:mt-2 before:size-1 before:shrink-0 before:rounded-full before:bg-brand-vivid before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {project.videoUrl && (
            <div>
              <p className="text-xs uppercase tracking-[0.05em] text-text-muted">
                Vídeo (YouTube)
              </p>
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block truncate text-sm text-brand hover:underline"
              >
                {project.videoUrl}
              </a>
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-[0.05em] text-text-muted">
              Ordem de exibição
            </p>
            <p className="mt-1 text-sm text-text-secondary">{project.order}</p>
          </div>
        </CardContent>
      </Card>

      <DeleteProjectDialog
        project={project}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
