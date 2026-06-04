import { useState, useEffect } from "react";
import useActiveSection from "../hooks/useActiveSection.js";
import useMediaQuery from "../hooks/useMediaQuery.js";

const RAIL = [
  { id: "about",      label: "About"      },
  { id: "journey",    label: "Journey"    },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects"   },
  { id: "contact",    label: "Contact"    },
];

export default function SectionRail({ sections }) {
  const active = useActiveSection(sections);
  const show = useMediaQuery("(min-width: 900px)");
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <nav className="section-rail" aria-label="Section navigation">
     
      {RAIL.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`section-rail__dot${active === id ? " is-active" : ""}`}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          aria-label={label}
          aria-current={active === id ? "true" : undefined}
        >
          <span className="section-rail__tip">{label}</span>
        </button>
      ))}
    </nav>
  );
}
