import { useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/use-count-up";
import { useHeroParallax } from "@/hooks/use-hero-parallax";
import { SECTION_IDS } from "@/lib/sections";
import { container, containerPx, overline, sectionScroll } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { ResponsiveImage } from "@/components/responsive-image";
import { heroImage } from "@/lib/optimized-images";

const titleLines = [
  ["Projetos", "de", "LT", "e", "SE"],
  ["com", "integração"],
  ["multidisciplinar."],
] as const;

const proofItems = [
  { end: 15, suffix: "+", label: "anos de experiência" },
  { end: 80, suffix: "+", label: "projetos entregues" },
  { end: 500, unit: "kV", label: "maior tensão atendida" },
] as const;

const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

type ProofNumberProps = {
  end: number;
  suffix?: string;
  unit?: string;
};

function ProofNumber({ end, suffix, unit }: ProofNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(end, isInView, 1800);

  return (
    <span ref={ref} className="hero__proof-number block font-display">
      {count}
      {suffix}
      {unit}
    </span>
  );
}

export function Home() {
  const mediaRef = useRef<HTMLDivElement>(null);
  useHeroParallax(mediaRef);

  return (
    <section
      id={SECTION_IDS.home}
      className={cn(
        "hero relative flex min-h-svh max-h-svh shrink-0 flex-col",
        sectionScroll,
      )}
    >
      <div ref={mediaRef} className="hero__media" aria-hidden>
        <ResponsiveImage
          alt=""
          width={heroImage.width}
          height={heroImage.height}
          sizes={heroImage.sizes}
          sources={[
            { type: "image/avif", ...heroImage.avif },
            { type: "image/webp", ...heroImage.webp },
          ]}
          fallback={heroImage.webp}
          loading="eager"
          fetchPriority="high"
          className="hero__image h-full w-full object-cover object-[center_28%] grayscale"
        />
      </div>

      <div className="hero__overlay" aria-hidden />
      <div className="hero__vignette" aria-hidden />
      <div className="hero__accent-light" aria-hidden />
      <div className="hero__grid-pattern" aria-hidden />

      <div
        className={cn(
          "hero__content relative z-2 flex min-h-0 flex-1 items-center",
          containerPx,
          "pt-[120px] pb-28 md:pt-[140px] md:pb-32",
        )}
      >
        <div className={cn(container, "max-w-[800px]")}>
          <span
            className={cn(overline, "hero__reveal text-brand-vivid")}
            style={{ "--hero-i": 0 } as CSSProperties}
          >
            Engenharia Especializada
          </span>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleContainerVariants}
          >
            <h1 className="font-display text-[clamp(38px,6.2vw,76px)] font-bold leading-[1.02] tracking-[-0.025em] text-white">
              {titleLines.map((line) => (
                <span key={line.join("-")} className="block">
                  {line.map((word, wordIndex) => (
                    <motion.span
                      key={`${word}-${wordIndex}`}
                      variants={wordVariants}
                      className="mr-[0.28em] inline-block last:mr-0"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.div
              className="mt-6 h-0.5 bg-brand-vivid"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
              aria-hidden
            />
          </motion.div>

          <p
            className="hero__reveal mt-7 max-w-[600px] text-base font-light leading-[1.7] text-white/75 sm:text-lg sm:leading-[1.75]"
            style={{ "--hero-i": 2 } as CSSProperties}
          >
            A ADP Engenharia desenvolve soluções de engenharia para linhas de
            transmissão e subestações, com integração entre as disciplinas de
            Eletrotécnica, Civil e Automação — da concepção à entrega técnica.
          </p>

          <div
            className="hero__proof hero__reveal mt-12 grid w-full gap-6 sm:mt-14 sm:w-fit sm:grid-flow-col sm:gap-0"
            style={{ "--hero-i": 3 } as CSSProperties}
          >
            {proofItems.map((item, index) => (
              <div
                key={item.label}
                className="hero__proof-cell flex items-center gap-6 sm:gap-8 sm:px-8 sm:first:pl-0 sm:last:pr-0"
              >
                {index > 0 && (
                  <div
                    className="hidden h-12 w-px shrink-0 bg-linear-to-b from-white/5 via-white/20 to-white/5 sm:block"
                    aria-hidden
                  />
                )}
                <div className="hero__proof-item min-w-0">
                  <ProofNumber
                    end={item.end}
                    suffix={"suffix" in item ? item.suffix : undefined}
                    unit={"unit" in item ? item.unit : undefined}
                  />
                  <span className="hero__proof-label mt-2 block">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="hero__reveal mt-12 flex flex-col gap-3 sm:mt-14 sm:flex-row sm:flex-wrap"
            style={{ "--hero-i": 4 } as CSSProperties}
          >
            <Button asChild className="w-full sm:w-auto">
              <Link to={{ pathname: "/", hash: SECTION_IDS.services }}>
                Conhecer nossos serviços
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outlined" className="w-full sm:w-auto">
              <Link to={{ pathname: "/", hash: SECTION_IDS.contact }}>
                Falar com um engenheiro
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
