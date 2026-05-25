import { Link } from "react-router";
import { MailIcon, PhoneIcon } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/icons/social-icons";
import { SectionLink } from "@/components/section-link";
import { SECTION_IDS } from "@/lib/sections";
import { container, containerPx } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { SiteLogo } from "@/components/site-logo";

const navLinks = [
  { sectionId: SECTION_IDS.about, label: "Sobre" },
  { sectionId: SECTION_IDS.services, label: "Serviços" },
  { sectionId: SECTION_IDS.process, label: "Processos" },
  { sectionId: SECTION_IDS.projects, label: "Projetos" },
  { sectionId: SECTION_IDS.team, label: "Equipe" },
  { sectionId: SECTION_IDS.partners, label: "Parceiros" },
  { sectionId: SECTION_IDS.articles, label: "Artigos" },
  { sectionId: SECTION_IDS.contact, label: "Contato" },
] as const;

const contactLinks = [
  {
    label: "Email",
    href: "mailto:contato@adpengenharia.com.br",
    value: "contato@adpengenharia.com.br",
    icon: MailIcon,
  },
  {
    label: "Telefone",
    href: "tel:+5521999999999",
    value: "(21) 99999-9999",
    icon: PhoneIcon,
  },
] as const;

const socialLinks = [
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/alemdoprojeto.oficial?igsh=MTV4b3RmOTdjczlrbw%3D%3D",
  },
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
  {
    icon: YouTubeIcon,
    label: "YouTube",
    href: "https://www.youtube.com/@alemdoprojetooficial",
  },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/al%C3%A9m-do-projeto" },
] as const;

export function Footer() {
  return (
    <footer className="site-footer border-t border-white/6 bg-[#0a0b09]">
      <div className={cn(containerPx, "py-[72px] pb-8")}>
        <div
          className={cn(
            container,
            "mb-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12",
          )}
        >
          <div>
            <Link
              to="/"
              className="flex items-center gap-3"
              aria-label="ADP Engenharia — início"
            >
              <SiteLogo className="size-9 shrink-0 object-contain" />
              <span className="font-display text-lg font-semibold text-white">
                ADP Engenharia
              </span>
            </Link>
            <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-white/40">
              Soluções em engenharia com excelência técnica e compromisso com
              cada projeto.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-[34px] items-center justify-center rounded-full border border-white/12 text-xs text-white/50 transition-colors hover:border-white/40 hover:text-white/90"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/35">
              Navegação
            </h2>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(({ sectionId, label }) => (
                <li key={sectionId}>
                  <SectionLink
                    sectionId={sectionId}
                    label={label}
                    variant="footer"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/35">
              Contatos
            </h2>
            <ul className="flex flex-col gap-2.5">
              {contactLinks.map(({ label, href, value, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-2 text-[13px] text-white/55 transition-colors hover:text-white/90"
                  >
                    <Icon className="size-3.5 shrink-0" aria-hidden />
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/35">
              Redes sociais
            </h2>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-white/55 transition-colors hover:text-white/90"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6">
        <div className={cn(containerPx, "py-6")}>
          <div
            className={cn(
              container,
              "flex flex-col items-center justify-between gap-2 text-xs text-white/30 sm:flex-row",
            )}
          >
            <p>
              &copy; {new Date().getFullYear()} ADP Engenharia. Todos os
              direitos reservados.
            </p>
            <p>Rio de Janeiro, RJ — Brasil</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
