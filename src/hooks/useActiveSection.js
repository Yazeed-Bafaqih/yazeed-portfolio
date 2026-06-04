import { useState, useEffect } from "react";

export default function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;

      if (scrollY + winH >= docH - 20) {
        setActive(sectionIds[sectionIds.length - 1]);
        return;
      }

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [sectionIds]);

  return active;
}