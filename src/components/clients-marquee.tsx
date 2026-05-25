import { clientLogos } from "@/lib/optimized-images";
import { SECTION_IDS } from "@/lib/sections";
import { container, containerPx } from "@/lib/layout";
import { cn } from "@/lib/utils";

interface LogoItem {
  src: string;
  alt: string;
}

const row1: LogoItem[] = [
  { src: clientLogos[0], alt: "DEEPZOE" },
  { src: clientLogos[1], alt: "MULTICOMUNICAR" },
  { src: clientLogos[2], alt: "LUANA NASCIMENTO DOULA" },
  { src: clientLogos[3], alt: "LETICIA MARINS" },
  { src: clientLogos[4], alt: "CAMPING NASCER DO SOL" },
  { src: clientLogos[5], alt: "AGIR INVEST" },
  { src: clientLogos[6], alt: "WELLINGTON SALES ADVOGADOS" },
  { src: clientLogos[7], alt: "TREVO CONTABILIDADE" },
  { src: clientLogos[8], alt: "COELO & SILVA ADVOGADOS" },
];

const row2: LogoItem[] = [
  { src: clientLogos[8], alt: "COELO & SILVA ADVOGADOS" },
  { src: clientLogos[7], alt: "TREVO CONTABILIDADE" },
  { src: clientLogos[6], alt: "WELLINGTON SALES ADVOGADOS" },
  { src: clientLogos[5], alt: "AGIR INVEST" },
  { src: clientLogos[4], alt: "CAMPING NASCER DO SOL" },
  { src: clientLogos[3], alt: "LETICIA MARINS" },
  { src: clientLogos[2], alt: "LUANA NASCIMENTO DOULA" },
  { src: clientLogos[1], alt: "MULTICOMUNICAR" },
  { src: clientLogos[0], alt: "DEEPZOE" },
];

interface MarqueeRowProps {
  items: LogoItem[];
  reverse?: boolean;
}

function Track({ items }: { items: LogoItem[] }) {
  return (
    <div className="flex">
      {items.map((item, index) => (
        <img
          key={`${item.alt}-${index}`}
          src={item.src}
          alt={item.alt}
          width={128}
          height={92}
          className="mx-7 h-[92px] w-[128px] shrink-0 object-contain"
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: MarqueeRowProps) {
  return (
    <div className="relative h-[92px] w-full overflow-hidden">
      <div
        className={cn(
          "flex w-max items-center",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        <Track items={items} />
        <Track items={items} />
        <Track items={items} />
        <Track items={items} />
      </div>
    </div>
  );
}

export function ClientsMarquee() {
  return (
    <section
      id={SECTION_IDS.partners}
      className={cn(
        "border-y border-border bg-bg-primary py-10",
        containerPx,
      )}
      aria-label="Empresas que confiam na ADP Engenharia"
    >
      <div className={container}>
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
          Empresas que confiam na ADP Engenharia
        </p>

        <div className="clients__logos space-y-5">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>
      </div>
    </section>
  );
}
