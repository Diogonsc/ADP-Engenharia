import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  container,
  containerPx,
  sectionPy,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

export function NotFoundPage() {
  return (
    <div className={cn("bg-bg-primary", containerPx, sectionPy)}>
      <div className={cn(container, "mx-auto max-w-lg text-center")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          O endereço que você acessou não existe ou foi movido.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to="/">Ir para a página inicial</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/articles">Ver artigos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
