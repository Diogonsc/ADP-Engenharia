import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import type { SectionId } from "@/lib/sections";

/** Altura aproximada do header fixo + margem */
const SCROLL_SPY_OFFSET = 100;

export function useActiveSection() {
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const updateActiveSection = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      if (sections.length === 0) return;

      let current: SectionId | null = null;

      for (const section of sections) {
        const { top } = section.getBoundingClientRect();
        if (top <= SCROLL_SPY_OFFSET) {
          current = section.id as SectionId;
        }
      }

      setActiveSection(current ?? (sections[0].id as SectionId));
    };

    const rafId = requestAnimationFrame(updateActiveSection);

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  return activeSection;
}
