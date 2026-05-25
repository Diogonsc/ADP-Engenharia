import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}`);
  };

  return (
    <Button
      type="button"
      variant="default"
      size="icon"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      onClick={scrollToTop}
      className={cn(
        "fixed right-6 bottom-24 z-999 shadow-lg transition-all duration-300 sm:bottom-[6.5rem]",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp aria-hidden />
    </Button>
  );
}
