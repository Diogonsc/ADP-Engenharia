import { motion } from "motion/react";
import { SECTION_IDS } from "@/lib/sections";
import {
  container,
  containerPx,
  overline,
  sectionDark,
  sectionScroll,
  sectionSubtitleLight,
  sectionTitleLight,
} from "@/lib/layout";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Cpu, FileStack, Hammer, Zap } from "lucide-react";

const MotionCard = motion.create(Card);

const titleLines = [["Capacidades", "de"], ["Engenharia"]] as const;

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  hover: {
    y: -4,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 3,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

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
      className={cn(sectionDark, sectionScroll, containerPx, "py-20 md:py-24")}
    >
      <div className={container}>
        <div className="mb-14 max-w-[560px]">
          <span className={cn(overline, "text-brand-vivid")}>O que fazemos</span>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={titleContainerVariants}
          >
            <h2 className={sectionTitleLight}>
              {titleLines.map((line) => (
                <span key={line.join("-")} className="block">
                  {line.map((word) => (
                    <motion.span
                      key={word}
                      variants={wordVariants}
                      className="mr-[0.28em] inline-block last:mr-0"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h2>
          </motion.div>

          <p className={sectionSubtitleLight}>
            Atuamos com equipes técnicas especializadas em cada disciplina,
            garantindo qualidade, rastreabilidade e coordenação em todo o
            projeto.
          </p>
        </div>

        <motion.div
          className="grid gap-px overflow-hidden rounded-lg bg-white/8 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {capabilities.map((cap) => (
            <MotionCard
              key={cap.title}
              variants={cardVariants}
              whileHover="hover"
              className="cap-card gap-0 rounded-none border border-transparent bg-bg-dark-surface py-0 shadow-none ring-0 transition-colors duration-300 hover:border-green-500/30 hover:bg-white/[0.04]"
              data-order={cap.order}
            >
              <CardContent className="p-9">
                <motion.div className="cap-card__icon" variants={iconVariants}>
                  <cap.icon aria-hidden />
                </motion.div>
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
            </MotionCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
