import { useEffect, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function useCountUp(
  target: number,
  enabled: boolean,
  duration = 1500,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, duration]);

  return value;
}
