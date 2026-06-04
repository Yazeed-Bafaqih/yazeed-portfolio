import { useState, useEffect, useRef } from "react";

export default function useReveal(delay = 0) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) setOn(true);
      setReduced(mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  const style = reduced
    ? {}
    : {
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
        transition: `opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: on ? "auto" : "opacity, transform",
      };

  return [ref, style, on];
}
