export const SECTION_IDS = {
  home: "home",
  about: "about",
  services: "services",
  process: "process",
  projects: "projects",
  team: "team",
  partners: "partners",
  methodology: "methodology",
  articles: "articles",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
