import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { ProjectForm } from "@/components/admin/project-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects } from "@/hooks/use-projects";

export function AdminProjectEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectById, updateProject } = useProjects();
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
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Button asChild variant="ghost" className="w-fit">
        <Link to={`/admin/projects/${project.id}`}>
          <ArrowLeftIcon />
          Voltar para visualização
        </Link>
      </Button>

      <ProjectForm
        key={project.id}
        initialData={project}
        submitLabel="Salvar alterações"
        onSubmit={async (data) => {
          await updateProject(project.id, data);
          navigate(`/admin/projects/${project.id}`);
        }}
      />
    </div>
  );
}
