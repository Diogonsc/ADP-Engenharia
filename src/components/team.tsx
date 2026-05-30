import { Mail } from "lucide-react";
import { motion } from "motion/react";
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
import { teamMembers, type TeamMember, type TeamMemberSocial } from "@/data/team";
import { SECTION_IDS } from "@/lib/sections";
import { cn } from "@/lib/utils";

const MotionCard = motion.create(Card);

const DEFAULT_BIO =
  "Especialista em engenharia de transmissão e subestações.";

const teamGridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const teamCardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    rotateX: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

function getMemberBio(member: TeamMember) {
  return member.bio?.trim() || DEFAULT_BIO;
}

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

function TeamMemberCard({ member }: { member: TeamMember }) {
  const bio = getMemberBio(member);

  return (
    <MotionCard
      variants={teamCardVariants}
      className="project-card group gap-0 overflow-hidden rounded-md border border-border bg-bg-primary py-0 shadow-none ring-0 focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      <div className="project-card__image relative aspect-4/3 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          width={400}
          height={300}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105"
          loading="lazy"
          decoding="async"
        />

        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/50 to-transparent p-5",
            "opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-within:opacity-100",
          )}
        >
          <p
            className={cn(
              "max-h-40 overflow-y-auto text-sm leading-relaxed text-white/90",
              "translate-y-4 transition-transform duration-400 delay-75",
              "group-hover:translate-y-0 group-focus-within:translate-y-0",
            )}
          >
            {bio}
          </p>
        </div>
      </div>

      <CardContent className="flex flex-col p-5 sm:p-6">
        <h3 className="text-base font-semibold leading-snug text-text-primary">
          {member.name}
        </h3>
        <span className="mb-5 mt-1.5 inline-block text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">
          {member.role}
        </span>
        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          {member.socials.map((social) => (
            <TeamSocialLink key={social.label} social={social} />
          ))}
        </div>
      </CardContent>
    </MotionCard>
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

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 800 }}
          variants={teamGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
