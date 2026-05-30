import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import type { SectionId } from "@/lib/sections";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

type SectionLinkProps = {
  sectionId: SectionId;
  label: string;
  className?: string;
  onNavigate?: () => void;
  variant?: "default" | "navbar" | "mobile" | "footer";
  isActive?: boolean;
};

export function SectionLink({
  sectionId,
  label,
  className,
  onNavigate,
  variant = "default",
  isActive: isActiveProp,
}: SectionLinkProps) {
  const { pathname, hash } = useLocation();
  const isOnLanding = pathname === "/";
  const currentSection = hash.replace("#", "") || "home";
  const isActive =
    isActiveProp ?? (isOnLanding && currentSection === sectionId);

  const variantClasses = {
    default: cn(
      "text-sm transition-colors",
      isActive
        ? "text-brand-vivid"
        : "text-text-secondary hover:text-text-primary",
    ),
    navbar: cn(
      "relative inline-block pb-1 text-[13px] font-medium tracking-[0.01em] normal-case transition-colors",
      isActive
        ? "text-brand-vivid"
        : "text-white/75 hover:text-white",
    ),
    mobile: cn(
      "text-lg font-medium normal-case transition-colors",
      isActive ? "text-brand-vivid" : "text-white/85 hover:text-white",
    ),
    footer: cn(
      "text-[13px] normal-case transition-colors",
      "text-white/55 hover:text-white/90",
    ),
  };

  return (
    <Link
      to={{ pathname: "/", hash: sectionId }}
      className={cn(variantClasses[variant], className)}
      onClick={(event) => {
        if (!isOnLanding) return;

        event.preventDefault();
        scrollToSection(sectionId);
        onNavigate?.();
      }}
    >
      {label}
      {variant === "navbar" && isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 h-0.5 w-full rounded-sm bg-brand-vivid"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}
