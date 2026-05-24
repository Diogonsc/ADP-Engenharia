import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/lib/sections";
import { container, containerPx } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function CtaFinal() {
  return (
    <section className={cn("cta-section bg-brand py-24 md:py-28", containerPx)}>
      <div
        className={cn(
          container,
          "flex flex-col items-center justify-between gap-12 text-center md:flex-row md:text-left",
        )}
      >
        <div>
          <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[40px]">
            Tem um projeto de transmissão
            <br />
            ou subestação em vista?
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-base leading-relaxed text-white/75 md:mx-0">
            Fale com nossa equipe técnica e receba uma avaliação preliminar sem
            compromisso.
          </p>
        </div>
        <div className="flex w-full flex-col items-center md:w-auto">
          <Button asChild variant="cta" size="cta" className="w-full md:w-auto">
            <Link to={{ pathname: "/", hash: SECTION_IDS.contact }}>
              Solicitar avaliação técnica
            </Link>
          </Button>
          <span className="mt-2.5 block text-center text-xs text-white/60">
            Retorno em até 1 dia útil
          </span>
        </div>
      </div>
    </section>
  );
}
