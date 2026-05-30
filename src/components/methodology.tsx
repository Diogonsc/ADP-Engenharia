import { SECTION_IDS } from "@/lib/sections";
import {
  container,
  containerPx,
  overline,
  sectionDark,
  sectionPy,
  sectionScroll,
  sectionSubtitleLight,
  sectionTitleLight,
} from "@/lib/layout";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const differentials = [
  {
    number: "01",
    title: "Metodologia integrada",
    text: "Engenharia civil, elétrica e automação coordenadas por um único ponto técnico, eliminando conflitos de interface.",
  },
  {
    number: "02",
    title: "Rastreabilidade total",
    text: "Toda a documentação do projeto — desde o anteprojeto até o as-built — controlada e auditável a qualquer momento.",
  },
  {
    number: "03",
    title: "Normas técnicas atualizadas",
    text: "Projetos sempre alinhados às normas ABNT, ANEEL, IEC 61850 e requisitos dos agentes de transmissão.",
  },
  {
    number: "04",
    title: "Equipe técnica sênior",
    text: "Engenheiros com experiência comprovada em projetos de alta tensão, com registro no CREA e histórico de entrega.",
  },
] as const;

export function Methodology() {
  return (
    <section
      id={SECTION_IDS.methodology}
      className={cn(
        "noise-overlay",
        sectionDark,
        sectionScroll,
        containerPx,
        sectionPy,
      )}
    >
      <div className={container}>
        <div className="max-w-[560px]" data-animate>
          <span className={cn(overline, "text-brand-vivid")}>
            Por que escolher a ADP
          </span>
          <h2 className={sectionTitleLight}>
            Recursos técnicos e metodologia
          </h2>
          <p className={sectionSubtitleLight}>
            Nossa metodologia integra as melhores práticas de engenharia com
            processos documentados e equipes multidisciplinares especializadas.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-white/6 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item) => (
            <Card
              key={item.number}
              className="diff-card gap-0 rounded-none bg-bg-dark-surface py-0 shadow-none ring-0 hover:bg-[#1f2320]"
              data-number={item.number}
              data-animate-left
            >
              <CardContent className="p-7 sm:p-9">
                <span className="diff-card__number mb-4 block font-display text-[13px] font-semibold tracking-[0.05em] text-brand-vivid">
                  {item.number}
                </span>
                <h3 className="mb-3 text-[15px] font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-white/50">
                  {item.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
