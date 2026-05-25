import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectDialogMedia } from "@/components/project-dialog-media";
import type { Project } from "@/data/projects";
import { SECTION_IDS } from "@/lib/sections";
import { cn } from "@/lib/utils";

type ProjectDialogProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: ProjectDialogProps) {
  const lastProject = useRef<Project | null>(null);
  if (project) lastProject.current = project;

  const activeProject = project ?? lastProject.current;
  if (!activeProject) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[min(92dvh,900px)] gap-0 overflow-y-auto rounded-md p-0 sm:max-w-2xl",
          "border-border bg-bg-primary shadow-[0_24px_64px_rgba(0,0,0,0.18)] ring-1 ring-border",
        )}
        showCloseButton
      >
        <ProjectDialogMedia
          title={activeProject.title}
          type={activeProject.type}
          image={activeProject.image}
          videoUrl={activeProject.videoUrl}
        />

        <div className="space-y-6 p-6 sm:p-8">
          <DialogHeader className="gap-3 text-left">
            <span className="inline-block w-fit text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">
              {activeProject.tag}
            </span>
            <DialogTitle className="font-display text-2xl leading-tight tracking-[-0.02em] text-text-primary normal-case">
              {activeProject.title}
            </DialogTitle>
            <p className="text-sm text-text-muted">{activeProject.meta}</p>
            <DialogDescription className="text-[15px] leading-relaxed text-text-secondary">
              {activeProject.description}
            </DialogDescription>
          </DialogHeader>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
              Escopo técnico
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {activeProject.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary before:mt-2 before:size-1 before:shrink-0 before:rounded-full before:bg-brand-vivid before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <DialogFooter className="flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link
                to={{ pathname: "/", hash: SECTION_IDS.contact }}
                onClick={() => onOpenChange(false)}
              >
                Solicitar projeto similar
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
