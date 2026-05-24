import { useEffect, useRef, useState } from "react";
import { SECTION_IDS } from "@/lib/sections";
import {
  bodyText,
  container,
  containerPx,
  overline,
  sectionPy,
  sectionScroll,
  sectionTitle,
} from "@/lib/layout";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/use-count-up";

const disciplines = [
  {
    title: "Linhas de Transmissão",
    items: [
      "Engenharia de projeto",
      "Consultorias técnicas",
      "Projetos 69kV a 500kV",
      "IEC 61850 e teleproteção",
    ],
  },
  {
    title: "Subestações",
    items: [
      "Projeto básico e executivo",
      "Automação e proteção",
      "Gerenciamento técnico",
      "Inspeção pós-construção",
    ],
  },
] as const;

type MetricProps = {
  value: number;
  suffix?: string;
  unit?: string;
  label: string;
  enabled: boolean;
};

function MetricCard({
  value,
  suffix,
  unit,
  label,
  enabled,
  dataValue,
}: MetricProps & { dataValue: string }) {
  const count = useCountUp(value, enabled);

  return (
    <Card
      className="metric-card gap-2 rounded-none bg-bg-primary py-0 shadow-none ring-0"
      data-value={dataValue}
      data-animate
    >
      <CardContent className="flex flex-col gap-2 p-7 sm:p-8">
        <span className="metric-value font-display text-primary">
          {count}
          {suffix && (
            <span className="metric-value-suffix text-brand">{suffix}</span>
          )}
          {unit && (
            <span className="metric-value-suffix text-brand">{unit}</span>
          )}
        </span>
        <span className="metric-label max-w-[140px] text-text-secondary">
          {label}
        </span>
      </CardContent>
    </Card>
  );
}

export function About() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const node = metricsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMetricsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={SECTION_IDS.about}
      className={cn(
        "noise-overlay bg-bg-secondary",
        sectionScroll,
        containerPx,
        sectionPy,
      )}
    >
      <div className={cn(container, "grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-16")}>
        <div data-animate>
          <span className={overline}>Sobre a empresa</span>
          <h2 className={sectionTitle}>
            Engenharia para
            <br />
            transmissão e subestações
          </h2>
          <p className={cn(bodyText, "mt-6 max-w-xl")}>
            A ADP Engenharia atua no desenvolvimento de soluções de engenharia
            nas áreas de linhas de transmissão e subestações, com integração
            técnica entre as disciplinas de Eletrotécnica, Civil e Automação.
            Nossa abordagem garante que projetos, qualquer envio técnico e
            contatos sejam coordenados e transparentes.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {disciplines.map((discipline) => (
              <div key={discipline.title}>
                <h3 className="text-[15px] font-semibold text-text-primary">
                  {discipline.title}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {discipline.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-text-secondary before:mr-2 before:text-brand before:content-['•']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={metricsRef}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border"
        >
          <MetricCard
            value={15}
            suffix="+"
            dataValue="15"
            label="Anos de experiência no setor elétrico"
            enabled={metricsVisible}
          />
          <MetricCard
            value={80}
            suffix="+"
            dataValue="80"
            label="Projetos técnicos entregues"
            enabled={metricsVisible}
          />
          <MetricCard
            value={500}
            unit="kV"
            dataValue="500"
            label="Maior nível de tensão atendido"
            enabled={metricsVisible}
          />
          <MetricCard
            value={100}
            unit="%"
            dataValue="100"
            label="Projetos concluídos no prazo acordado"
            enabled={metricsVisible}
          />
        </div>
      </div>
    </section>
  );
}
