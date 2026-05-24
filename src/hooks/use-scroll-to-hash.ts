import { useEffect } from "react";
import { useLocation } from "react-router";
import { scrollToSection } from "@/lib/scroll-to-section";

export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = hash.replace("#", "");
    requestAnimationFrame(() => scrollToSection(id));
  }, [hash]);
}
