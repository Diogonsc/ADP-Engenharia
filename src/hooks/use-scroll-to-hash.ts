import { useEffect } from "react";
import { useLocation } from "react-router";
import { scrollToSection, smoothScrollTo } from "@/lib/scroll-to-section";

export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      smoothScrollTo(0);
      return;
    }

    const id = hash.replace("#", "");
    requestAnimationFrame(() => scrollToSection(id));
  }, [hash]);
}
