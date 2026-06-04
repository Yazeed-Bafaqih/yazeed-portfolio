import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import useCountUp from "../hooks/useCountUp.js";

const ICON = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}`;

const skillGroups = [
  {
    label: "Frontend",
    items: [
      { name: "React.js", icon: ICON("react/react-original.svg") },
      { name: "Next.js", icon: ICON("nextjs/nextjs-original.svg") },
      { name: "Tailwind CSS", icon: ICON("tailwindcss/tailwindcss-original.svg") },
      { name: "HTML5", icon: ICON("html5/html5-original.svg") },
      { name: "CSS3", icon: ICON("css3/css3-original.svg") },
      { name: "JavaScript", icon: ICON("javascript/javascript-original.svg") },
    ],
  },
  {
    label: "Languages",
    items: [
      { name: "Python", icon: ICON("python/python-original.svg") },
      { name: "Java", icon: ICON("java/java-original.svg") },
      { name: "C++", icon: ICON("cplusplus/cplusplus-original.svg") },
      { name: "SQL", icon: ICON("mysql/mysql-original.svg") },
    ],
  },
  {
    label: "Tools & Methods",
    items: [
      { name: "Git", icon: ICON("git/git-original.svg") },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github/1A2E4A" },
      { name: "Figma", icon: ICON("figma/figma-original.svg") },
      { name: "VS Code", icon: ICON("vscode/vscode-original.svg") },
    ],
  },
];

const ALL_SKILLS = skillGroups.flatMap((g) => g.items.map((i) => i.name));

const stats = [
  { n: "2", l: "Clubs Led" },
  { n: "20+", l: "Members" },
  { n: "77", l: "Users Researched" },
  { n: "2027", l: "Graduating" },
];

export default function About() {
  const [rLeft, sLeft, visLeft] = useReveal(0);
  const [rRight, sRight] = useReveal(0.08);
  const [activeSkill, setActiveSkill] = useState(null);

  const toggleSkill = (skill) => setActiveSkill((s) => (s === skill ? null : skill));

  return (
    <section id="about" className="section-pad">
      <SectionLabel>About</SectionLabel>

      <div className="grid-about grid-two">
        <div ref={rLeft} style={sLeft}>
          <p className="heading-pull" style={{ marginBottom: 16 }}>
            I ship real products, lead real teams, and research real problems.
          </p>

          {[
            "I build things that work and research problems worth solving. I led TechPath — a full-stack React app with Claude AI integration — and ran a 77-person accessibility study for Sanadk that proved the gap is a design problem, not a tech problem.",
            "I also contributed to VidToCode, an AI code-generation research project where I helped curate 36 tutorials across 4 languages and designed evaluation frameworks using CodeSim and CodeBLEU metrics.",
            "Arabic native, English proficient. Strong in leadership, execution, and systems thinking. Open to SWE internships.",
          ].map((p, i) => (
            <p key={i} className="body-text">{p}</p>
          ))}

          <div className="stats-row stats-panel">
            {stats.map((stat, i) => (
              <StatCell key={stat.l} stat={stat} isLast={i === stats.length - 1} animate={visLeft} />
            ))}
          </div>
        </div>

        <div ref={rRight} style={sRight}>
          <p className="skill-explorer-label">Skill explorer — tap to highlight</p>
          <div className="skill-chips">
            <button
              type="button"
              className={`filter-chip${activeSkill === null ? " is-active" : ""}`}
              onClick={() => setActiveSkill(null)}
            >
              All
            </button>
            {ALL_SKILLS.map((s) => (
              <button
                key={s}
                type="button"
                className={`filter-chip${activeSkill === s ? " is-active" : ""}`}
                onClick={() => toggleSkill(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {skillGroups.map((g) => (
            <div key={g.label} className="skill-group">
              <p className="skill-group__label">{g.label}</p>
              <div className="skill-group__tags">
                {g.items.map((it) => (
                  <button
                    key={it.name}
                    type="button"
                    onClick={() => toggleSkill(it.name)}
                    className={`skill-icon${activeSkill === it.name ? " is-lit" : ""}${activeSkill !== null && activeSkill !== it.name ? " is-dimmed" : ""
                      }`}
                  >
                    <img src={it.icon} alt="" loading="lazy" />
                    {it.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({ stat, isLast, animate }) {
  const [hov, setHov] = useState(false);
  const count = useCountUp(stat.n, animate);
  return (
    <div
      className="stat-cell"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ borderRight: isLast ? "none" : undefined }}
    >
      <div
        className="heading-stat"
        style={{
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition: "transform .25s var(--ease-spring)",
          transformOrigin: "left center",
        }}
      >
        {count}
      </div>
      <div className="stat-cell__label">{stat.l}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  const [ref, style] = useReveal(0);
  return <p ref={ref} className="section-label" style={style}>{children}</p>;
}
