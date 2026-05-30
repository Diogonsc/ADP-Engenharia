import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
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

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!activeProject) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPortal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                key="project-dialog-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[1100] bg-black/90 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                key="project-dialog-content"
                role="dialog"
                aria-modal="true"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className={cn(
                  "fixed top-1/2 left-1/2 z-[1101] grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-0 overflow-y-auto rounded-md p-0 outline-none sm:max-w-2xl",
                  "max-h-[min(92dvh,900px)]",
                  "border-border bg-bg-primary shadow-[0_24px_64px_rgba(0,0,0,0.18)] ring-1 ring-border",
                )}
              >
                <DialogPrimitive.Close asChild>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-5 right-5 z-10 inline-flex size-8 items-center justify-center rounded-md bg-secondary text-text-primary transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                    aria-label="Fechar"
                  >
                    <X className="size-4" aria-hidden />
                  </motion.button>
                </DialogPrimitive.Close>

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
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
