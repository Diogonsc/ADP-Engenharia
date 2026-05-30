import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useLocation } from "react-router";
import { useIsMobile } from "@/hooks/use-mobile";

type CursorMode = "default" | "pointer" | "view";

function resolveCursorMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return "default";

  const interactive = target.closest("a, button, [data-cursor]");
  if (interactive) {
    if (interactive.getAttribute("data-cursor") === "view") return "view";
    return "pointer";
  }

  if (target.closest("img, video")) return "view";

  return "default";
}

type CursorElementProps = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  mode: CursorMode;
  variant: "dot" | "ring";
};

function CursorElement({ x, y, mode, variant }: CursorElementProps) {
  const isDot = variant === "dot";
  const isPointer = mode === "pointer";
  const isView = mode === "view";

  return (
    <motion.div
      className={
        isDot
          ? "pointer-events-none fixed left-0 top-0 z-[9999] size-1.5 rounded-full bg-brand-vivid"
          : "pointer-events-none fixed left-0 top-0 z-[9999] size-7 rounded-full border-solid border-brand-vivid"
      }
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={
        isDot
          ? {
              scale: isPointer || isView ? 0 : 1,
              opacity: isPointer || isView ? 0 : 1,
            }
          : {
              scale: isView ? 2.5 : isPointer ? 1.8 : 1,
              opacity: isPointer || isView ? 1 : 0.5,
              borderWidth: isPointer ? 2 : 1.5,
            }
      }
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      aria-hidden
    />
  );
}

export function CustomCursor() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isAdmin = location.pathname.startsWith("/admin");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 28 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 28 });
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  const [mode, setMode] = useState<CursorMode>("default");

  const disabled = isMobile || isAdmin;

  useEffect(() => {
    if (disabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [disabled]);

  useEffect(() => {
    if (disabled) return;

    const onMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const onMouseOver = (event: MouseEvent) => {
      setMode(resolveCursorMode(event.target));
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [disabled, mouseX, mouseY]);

  if (disabled) return null;

  return (
    <>
      <CursorElement x={dotX} y={dotY} mode={mode} variant="dot" />
      <CursorElement x={ringX} y={ringY} mode={mode} variant="ring" />
    </>
  );
}
