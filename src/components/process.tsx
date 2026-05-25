import { SECTION_IDS } from "@/lib/sections";
import {
  container,
  containerPx,
  overline,
  sectionPy,
  sectionScroll,
  sectionSubtitle,
  sectionTitle,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type ProcessGroup = {
  id: string;
  label: string;
  steps: ProcessStep[];
};

const processGroups: ProcessGroup[] = [
  {
    id: "subestacao",
    label: "Subestações",
    steps: [
      {
        number: "01",
        title: "Receber informações",
        description: "Coleta de requisitos, normas e documentação inicial do cliente",
      },
      {
        number: "02",
        title: "Identificar alternativas",
        description: "Análise técnica de soluções e arranjos possíveis",
      },
      {
        number: "03",
        title: "Modelar em software",
        description: "Modelagem elétrica, civil e de automação integradas",
      },
      {
        number: "04",
        title: "Realizar análises",
        description: "Estudos elétricos, estruturais e de proteção",
      },
      {
        number: "05",
        title: "Entregar documentação",
        description: "Relatórios, desenhos e memoriais técnicos finais",
      },
    ],
  },
  {
    id: "linha",
    label: "Linhas de Transmissão",
    steps: [
      {
        number: "01",
        title: "Receber informação",
        description: "Levantamento de dados topográficos e ambientais",
      },
      {
        number: "02",
        title: "Identificar alternativas",
        description: "Traçado, tipologia de estruturas e soluções técnicas",
      },
      {
        number: "03",
        title: "Modelar linha",
        description: "Modelagem elétrica e mecânica da linha de transmissão",
      },
      {
        number: "04",
        title: "Distribuir estruturas",
        description: "Definição de vãos, flechas e esforços nos condutores",
      },
      {
        number: "05",
        title: "Entregar relatório",
        description: "Documentação técnica completa para implantação",
      },
    ],
  },
  {
    id: "detalhamento",
    label: "Detalhamento de Fabricação",
    steps: [
      {
        number: "01",
        title: "Recepção de informação",
        description: "Validação dos dados de projeto recebidos",
      },
      {
        number: "02",
        title: "Revisão de informação",
        description: "Conferência técnica e compatibilização",
      },
      {
        number: "03",
        title: "Modelo 3D",
        description: "Modelagem detalhada em software especializado",
      },
      {
        number: "04",
        title: "Planos de montagem",
        description: "Desenhos de montagem e despiece",
      },
      {
        number: "05",
        title: "Entregar documentos",
        description: "Lista de materiais e pacote para fabricação",
      },
    ],
  },
];

function ProcessTimeline({
  steps,
  labelledBy,
}: {
  steps: ProcessStep[];
  labelledBy?: string;
}) {
  return (
    <ol className="flex flex-col" aria-labelledby={labelledBy}>
      {steps.map((step, index) => (
        <li key={step.number} className="flex gap-4 md:gap-5">
          <div className="flex flex-col items-center">
            <div className="process__step-number relative z-1 flex size-10 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-bold md:size-11 md:text-base">
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div
                className="process__step-connector process__step-connector--vertical my-1 w-px min-h-6 flex-1 md:min-h-8"
                aria-hidden
              />
            )}
          </div>
          <div
            className={cn(
              "min-w-0 flex-1 pt-1.5",
              index < steps.length - 1 && "pb-6 md:pb-8",
            )}
          >
            <h4 className="mb-1 text-sm font-semibold leading-snug text-text-primary md:text-[15px]">
              {step.title}
            </h4>
            <p className="text-xs leading-relaxed text-text-muted md:text-[13px]">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Process() {
  return (
    <section
      id={SECTION_IDS.process}
      className={cn("processes bg-bg-primary", sectionScroll, containerPx, sectionPy)}
    >
      <div className={container}>
        <div className="max-w-2xl" data-animate>
          <span className={overline}>Metodologia</span>
          <h2 className={sectionTitle}>Da concepção à entrega técnica</h2>
          <p className={sectionSubtitle}>
            Nosso processo garante rastreabilidade, integração entre disciplinas
            e entrega dentro dos requisitos técnicos do cliente.
          </p>
        </div>

        <div
          className="mt-12 flex flex-col gap-14 lg:mt-16 lg:grid lg:grid-cols-3 lg:items-start lg:gap-10 xl:gap-12"
          data-animate
        >
          {processGroups.map((group, index) => {
            const headingId = `process-${group.id}-heading`;

            return (
              <article
                key={group.id}
                className={cn(
                  "process__group min-w-0",
                  index > 0 && "border-t border-border pt-14",
                  index > 0 && "lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 xl:pl-12",
                )}
                data-active={group.id}
                aria-labelledby={headingId}
              >
                <h3
                  id={headingId}
                  className="mb-6 font-display text-xl font-semibold leading-snug text-text-primary lg:mb-8 lg:text-lg xl:text-xl"
                >
                  {group.label}
                </h3>
                <ProcessTimeline steps={group.steps} labelledBy={headingId} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
