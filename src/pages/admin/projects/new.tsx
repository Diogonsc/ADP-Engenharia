import { useNavigate } from "react-router";
import { ProjectForm } from "@/components/admin/project-form";
import { useProjects } from "@/hooks/use-projects";

export function AdminProjectCreatePage() {
  const navigate = useNavigate();
  const { createProject } = useProjects();

  return (
    <ProjectForm
      submitLabel="Criar projeto"
      onSubmit={async (data) => {
        const project = await createProject(data);
        navigate(`/admin/projects/${project.id}`);
      }}
    />
  );
}
