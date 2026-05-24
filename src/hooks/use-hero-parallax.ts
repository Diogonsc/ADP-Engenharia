import { useEffect, type RefObject } from "react";

export function useHeroParallax(
  mediaRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    let frame = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / window.innerHeight, 1);
      const translateY = scrollY * 0.28;
      const scale = 1 + progress * 0.04;
      const opacity = 1 - progress * 0.12;

      media.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      media.style.opacity = String(opacity);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      media.style.transform = "";
      media.style.opacity = "";
    };
  }, [mediaRef]);
}
