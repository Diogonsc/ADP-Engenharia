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
import {
  Cpu,
  FileStack,
  Hammer,
  Zap,
} from "lucide-react";

const capabilities = [
  {
    order: "01",
    icon: Zap,
    title: "Engenharia Elétrica",
    items: [
      "Projetos de linhas de transmissão",
      "Projetos de subestações",
      "Cálculo de aterramento",
      "Estudos elétricos",
      "IEC 61850 e automação",
    ],
  },
  {
    order: "02",
    icon: Hammer,
    title: "Engenharia Civil e Estrutural",
    items: [
      "Fundações e estruturas",
      "Projeto de torres e estruturas",
      "Estudos geotécnicos",
      "Instalações prediais técnicas",
      "Inspeção estrutural",
    ],
  },
  {
    order: "03",
    icon: Cpu,
    title: "Automação e Proteção",
    items: [
      "Sistemas de proteção de redes",
      "Teleproteção e SCADA",
      "Configuração de IEDs",
      "Comissionamento AS 61850",
      "Testes de proteção",
    ],
  },
  {
    order: "04",
    icon: FileStack,
    title: "Coordenação e Gestão Técnica",
    items: [
      "Design review multidisciplinar",
      "Gerenciamento de interfaces",
      "Controle documental",
      "Rastreabilidade de projetos",
      "Acompanhamento de obras",
    ],
  },
] as const;

export function Services() {
  return (
    <section
      id={SECTION_IDS.services}
      className={cn(sectionDark, sectionScroll, containerPx, sectionPy)}
    >
      <div className={container}>
        <div className="mb-14 max-w-[560px]" data-animate>
          <span className={cn(overline, "text-brand-vivid")}>O que fazemos</span>
          <h2 className={sectionTitleLight}>
            Capacidades de
            <br />
            Engenharia
          </h2>
          <p className={sectionSubtitleLight}>
            Atuamos com equipes técnicas especializadas em cada disciplina,
            garantindo qualidade, rastreabilidade e coordenação em todo o
            projeto.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg bg-white/8 sm:grid-cols-2">
          {capabilities.map((cap) => (
            <Card
              key={cap.title}
              className="cap-card gap-0 rounded-none bg-bg-dark-surface py-0 shadow-none ring-0 hover:bg-[#1f2320]"
              data-order={cap.order}
              data-animate
            >
              <CardContent className="p-9">
                <div className="cap-card__icon">
                  <cap.icon aria-hidden />
                </div>
                <h3 className="mb-4 text-base font-semibold leading-snug text-white">
                  {cap.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="relative pl-4 text-sm leading-relaxed text-white/55 before:absolute before:top-2 before:left-0 before:size-1 before:rounded-full before:bg-brand-vivid"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
