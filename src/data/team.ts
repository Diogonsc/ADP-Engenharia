export type TeamSocialType = "linkedin" | "instagram" | "email";

export type TeamMemberSocial = {
  type: TeamSocialType;
  href: string;
  label: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: TeamMemberSocial[];
};

export const teamMembers: TeamMember[] = [
  {
    id: "eng-1",
    name: "Tarcísio da Silva Lessa",
    role: "Gerente | Coordenador | Engenheiro de Linhas de Transmissão",
    bio: "Sou profissional com 21 anos de experiência em Linhas de Transmissão e Distribuição, com forte expertise na elaboração e execução de projetos utilizando PLS-CADD, TOWER e PLS-POLE (Power Line Systems). Atuei em projetos estratégicos no Brasil e no exterior (Angola, Canadá, EUA, Chile, Peru, Uruguai e Venezuela), sempre buscando soluções inovadoras e eficientes para desafios complexos, incluindo estudos com inteligência artificial (IA) aplicada à engenharia.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQFRCUHRWacXuw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1686825497778?e=1781136000&v=beta&t=IdwaJYzjtgAg1kjDZVEY6EXYEO6dgptfzZRSctC_fXA",
    socials: [
      {
        type: "linkedin",
        href: "https://www.linkedin.com/in/tarc%C3%ADsio-da-silva-lessa-phd-msc-mba-6a227a46/",
        label: "LinkedIn de Tarcísio da Silva Lessa",
      },
      {
        type: "email",
        href: "mailto:tarcisio.lessa@adpengenharia.com.br",
        label: "E-mail de Tarcísio da Silva Lessa",
      },
    ],
  },
  {
    id: "eng-2",
    name: "Paulo Cezar Soares Junior",
    role: "CEO & Fundador da Solastra Engenharia | CFO & Fundador do Além do Projeto | Mestrando em Engenharia Elétrica ",
    bio: "Sou um profissional movido pela curiosidade, pelo propósito e pela capacidade de transformar desafios complexos em soluções claras e estratégicas. Tenho mais de 15 anos de experiência liderando projetos de infraestrutura elétrica, incluindo Linhas de Transmissão, Redes de Média Tensão e Subestações entre 13,8 kV e 750 kV, totalizando mais de 10.000 km entregues no Brasil e em países como Austrália, Angola, Peru e Costa Rica.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQEcySG2wx2jMA/profile-displayphoto-scale_400_400/B4DZw5YFbvKoAg-/0/1770489141546?e=1781136000&v=beta&t=iiQ6da2oCyl3_iSv8g8CCHsByg2ld4q7F7wbIOjond0",
    socials: [
      {
        type: "linkedin",
        href: "https://www.linkedin.com/in/paulo-cezar-soares-junior-730a3231/",
        label: "LinkedIn de Paulo Cezar Soares Junior",
      },
      {
        type: "instagram",
        href: "https://www.instagram.com",
        label: "Instagram de Paulo Cezar Soares Junior",
      },
    ],
  },
  {
    id: "eng-3",
    name: "Douglas Braga",
    role: "Especialista em engenharia na coordenação de projetos e obras do setor elétrico ",
    bio: "Mais de dezoito anos de experiência profissional atuando em todo o Brasil, com carreira desenvolvida em grandes empresas. Engenheiro comprometido e disciplinado, prático, com sólida formação acadêmica, orientado a resultados e com senso de urgência. Experiência em cargos de liderança em grandes projetos de construção de redes elétricas, linhas de transmissão, subestações e obras de infraestrutura.",
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQESPkS90wT9hw/profile-displayphoto-scale_400_400/B4EZskFVAwHUAg-/0/1765836937206?e=1781136000&v=beta&t=lHu1fXY6Cq8mJcQonYQ_NITWhH_5NunrLxNZwV0tb14",
    socials: [
      {
        type: "linkedin",
        href: "https://www.linkedin.com/in/douglas-braga/",
        label: "LinkedIn de Douglas Braga",
      },
      {
        type: "email",
        href: "mailto:douglas.braga@adpengenharia.com.br",
        label: "E-mail de Douglas Braga",
      },
    ],
  },
];
