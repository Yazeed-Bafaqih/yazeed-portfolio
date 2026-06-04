import { useState } from "react";
import useReveal from "../hooks/useReveal.js";

const experiences = [
  {
    date: "Sep 2025 – Present",
    org:  "Electronic Games & VR Club",
    role: "Project Management Lead",
    body: "Delivered 2 workshops (VR & Figma) to 16+ members with 90%+ task completion. Focused on clear ownership, structured planning, and keeping the team accountable.",
  },
  {
    date: "Sep 2025 – Present",
    org:  "Drone Club",
    role: "Project Management Co-Lead",
    body: "Managed 20+ members across 20–50 person workshops and 3-day events with 100% accountability. Coordinated logistics, timelines, and delivery.",
  },
  {
    date: "Nov 2025 – Present",
    org:  "Google Developer Groups on Campus UJ",
    role: "Project Management Member",
    body: "Coordinated logistics and QA documentation for 2 workshops. Ensured smooth on-site execution and accurate post-event reporting.",
  },
];

export default function Experience() {
  const [refLabel, styleLabel] = useReveal(0);

  return (
    <section id="experience" className="section-pad">
      <p ref={refLabel} className="section-label" style={styleLabel}>Experience</p>

      <div className="list-panel">
        {experiences.map((e, i) => (
          <ExpItem key={e.org} exp={e} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

function ExpItem({ exp, delay }) {
  const [r, s] = useReveal(delay);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={r}
      className="grid-exp"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid", gridTemplateColumns: "120px 1fr",
        gap: "0 24px", padding: "24px 12px 24px 0",
        marginLeft: hov ? 4 : 0,
        borderBottom: "1px solid var(--border)",
        borderRadius: hov ? 8 : 0,
        background: hov ? "var(--surface)" : "transparent",
        boxShadow: hov ? "var(--shadow-sm)" : "none",
        transition: "margin .25s ease, background .25s ease, box-shadow .25s ease, border-radius .25s ease",
        ...s,
      }}
    >
      <span style={{
        fontFamily: "var(--mono)", fontSize: 10,
        color: hov ? "var(--accent)" : "var(--ink3)",
        letterSpacing: "0.04em",
        paddingTop: 3,
        transition: "color .2s",
      }}>{exp.date}</span>

      <div style={{ paddingLeft: hov ? 4 : 0, transition: "padding .25s ease" }}>
        <p className="heading-md" style={{ marginBottom: 2, fontSize: 17 }}>
          {exp.org}
        </p>

        <span style={{
          fontFamily: "var(--mono)", fontSize: 10,
          color: "var(--accent)", letterSpacing: "0.03em",
          display: "inline-block", marginBottom: 8,
        }}>{exp.role}</span>

        <p style={{
          fontSize: 13, color: "var(--ink2)", lineHeight: 1.65,
        }}>{exp.body}</p>
      </div>
    </div>
  );
}
