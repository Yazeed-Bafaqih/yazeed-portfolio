import { useState, useEffect, useRef } from "react";

export default function useCountUp(value, active, duration = 900) {
  const [display, setDisplay] = useState(value);
  const ran = useRef(false);

  useEffect(() => {
    if (!active) {
      ran.current = false;
      setDisplay(value);
      return;
    }
    if (ran.current) return;

    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      ran.current = true;
      return;
    }

    const end = parseInt(match[1], 10);
    const suffix = match[2] || "";
    const start = end > 100 ? end - 7 : Math.max(0, end - Math.min(end, 12));
    const t0 = performance.now();

    const tick = (now) => {
      const t = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(`${Math.round(start + (end - start) * eased)}${suffix}`);
      if (t < 1) requestAnimationFrame(tick);
      else ran.current = true;
    };

    requestAnimationFrame(tick);
  }, [active, value, duration]);

  return display;
}
