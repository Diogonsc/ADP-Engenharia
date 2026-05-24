import image01 from "@/assets/1.png";
import image02 from "@/assets/2.png";
import image03 from "@/assets/3.png";
import image04 from "@/assets/4.png";
import image05 from "@/assets/5.png";
import image06 from "@/assets/6.png";
import image07 from "@/assets/7.png";
import image08 from "@/assets/8.png";
import image09 from "@/assets/9.png";
import { SECTION_IDS } from "@/lib/sections";
import { container, containerPx } from "@/lib/layout";
import { cn } from "@/lib/utils";

interface LogoItem {
  src: string;
  alt: string;
}

const row1: LogoItem[] = [
  { src: image01, alt: "DEEPZOE" },
  { src: image02, alt: "MULTICOMUNICAR" },
  { src: image03, alt: "LUANA NASCIMENTO DOULA" },
  { src: image04, alt: "LETICIA MARINS" },
  { src: image05, alt: "CAMPING NASCER DO SOL" },
  { src: image06, alt: "AGIR INVEST" },
  { src: image07, alt: "WELLINGTON SALES ADVOGADOS" },
  { src: image08, alt: "TREVO CONTABILIDADE" },
  { src: image09, alt: "COELO & SILVA ADVOGADOS" },
];

const row2: LogoItem[] = [
  { src: image09, alt: "COELO & SILVA ADVOGADOS" },
  { src: image08, alt: "TREVO CONTABILIDADE" },
  { src: image07, alt: "WELLINGTON SALES ADVOGADOS" },
  { src: image06, alt: "AGIR INVEST" },
  { src: image05, alt: "CAMPING NASCER DO SOL" },
  { src: image04, alt: "LETICIA MARINS" },
  { src: image03, alt: "LUANA NASCIMENTO DOULA" },
  { src: image02, alt: "MULTICOMUNICAR" },
  { src: image01, alt: "DEEPZOE" },
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
          className="mx-7 h-[92px] w-[128px] shrink-0 object-contain"
          loading="lazy"
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
