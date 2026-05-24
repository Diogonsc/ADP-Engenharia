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
import { useArticles } from "@/hooks/use-articles";
import type { Article } from "@/data/articles";

type DeleteArticleDialogProps = {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteArticleDialog({
  article,
  open,
  onOpenChange,
}: DeleteArticleDialogProps) {
  const navigate = useNavigate();
  const { deleteArticle } = useArticles();
  const [deleting, setDeleting] = useState(false);

  if (!article) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteArticle(article.id);
      onOpenChange(false);
      navigate("/admin/articles");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir artigo?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O artigo{" "}
            <strong>{article.title}</strong> será removido permanentemente.
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
