import { Mail } from "lucide-react";
import {
  container,
  containerPx,
  overline,
  sectionPy,
  sectionScroll,
  sectionSubtitle,
  sectionTitle,
} from "@/lib/layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons/social-icons";
import { teamMembers, type TeamMemberSocial } from "@/data/team";
import { SECTION_IDS } from "@/lib/sections";
import { cn } from "@/lib/utils";

function TeamSocialLink({ social }: { social: TeamMemberSocial }) {
  const className =
    "inline-flex size-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-brand hover:bg-brand-subtle hover:text-brand";

  if (social.type === "linkedin") {
    return (
      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        className={className}
      >
        <LinkedInIcon className="size-4" />
      </a>
    );
  }

  if (social.type === "instagram") {
    return (
      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        className={className}
      >
        <InstagramIcon className="size-4" />
      </a>
    );
  }

  return (
    <a href={social.href} aria-label={social.label} className={className}>
      <Mail className="size-4" aria-hidden />
    </a>
  );
}

export function Team() {
  return (
    <section
      id={SECTION_IDS.team}
      className={cn("bg-bg-primary", sectionScroll, containerPx, sectionPy)}
    >
      <div className={container}>
        <div className="mb-10 max-w-2xl" data-animate>
          <span className={overline}>Nossa equipe</span>
          <h2 className={sectionTitle}>Engenheiros especialistas</h2>
          <p className={sectionSubtitle}>
            Profissionais com experiência em transmissão, subestações e projetos
            industriais, atuando com rigor técnico em cada entrega.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="project-card group gap-0 overflow-hidden rounded-md border border-border bg-bg-primary py-0 shadow-none ring-0 transition duration-250 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              data-animate
            >
              <div className="project-card__image relative aspect-4/3 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <CardContent className="flex flex-col p-5 sm:p-6">
                <h3 className="text-base font-semibold leading-snug text-text-primary">
                  {member.name}
                </h3>
                <span className="mb-3 mt-1.5 inline-block text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">
                  {member.role}
                </span>
                <p className="mb-5 flex-1 text-[13px] leading-relaxed text-text-secondary">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                  {member.socials.map((social) => (
                    <TeamSocialLink key={social.label} social={social} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
