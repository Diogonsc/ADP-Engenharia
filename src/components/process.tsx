import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type ProcessTab = {
  id: string;
  label: string;
  steps: ProcessStep[];
};

const processTabs: ProcessTab[] = [
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

function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="flex items-start overflow-x-auto pb-2">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-start">
          <div className="flex min-w-[140px] flex-1 flex-col items-center px-2 text-center">
            <div className="process__step-number relative z-1 mb-3.5 flex size-10 items-center justify-center rounded-full font-display text-[15px] font-bold">
              {step.number}
            </div>
            <h4 className="mb-1.5 text-[13px] font-semibold leading-snug text-text-primary">
              {step.title}
            </h4>
            <p className="text-xs leading-relaxed text-text-muted">
              {step.description}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className="process__step-connector relative mt-5 h-px w-10 shrink-0"
              aria-hidden
            >
              <span className="absolute -top-[3px] right-0 size-1.5 rotate-45 border-t border-r border-border" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Process() {
  const [activeTab, setActiveTab] = useState(processTabs[0].id);
  const activeProcess =
    processTabs.find((tab) => tab.id === activeTab) ?? processTabs[0];

  return (
    <section
      id={SECTION_IDS.process}
      className={cn("processes bg-bg-primary", sectionScroll, containerPx, sectionPy)}
      data-active={activeTab}
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
          className="mt-12 mb-10 flex w-fit gap-1 rounded-md bg-bg-secondary p-1"
          role="tablist"
          aria-label="Tipos de processo"
        >
          {processTabs.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              role="tab"
              variant={activeTab === tab.id ? "tab-active" : "tab"}
              size="tab"
              aria-selected={activeTab === tab.id}
              className={cn(
                "process__tab",
                activeTab === tab.id && "active",
              )}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div role="tabpanel" data-animate>
          <ProcessTimeline steps={activeProcess.steps} />
        </div>
      </div>
    </section>
  );
}
