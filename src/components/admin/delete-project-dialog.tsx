import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useProjects } from "@/hooks/use-projects";
import type { Project } from "@/data/projects";

type DeleteProjectDialogProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteProjectDialog({
  project,
  open,
  onOpenChange,
}: DeleteProjectDialogProps) {
  const navigate = useNavigate();
  const { deleteProject } = useProjects();
  const [deleting, setDeleting] = useState(false);

  if (!project) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProject(project.id, project.image);
      onOpenChange(false);
      navigate("/admin/projects");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O projeto{" "}
            <strong>{project.title}</strong> será removido permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white hover:bg-destructive/90"
            disabled={deleting}
            onClick={(e) => {
              e.preventDefault();
              void handleDelete();
            }}
          >
            {deleting ? "Excluindo…" : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
