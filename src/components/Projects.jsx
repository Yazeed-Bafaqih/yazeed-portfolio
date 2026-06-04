import { useState, useMemo } from "react";
import useReveal from "../hooks/useReveal.js";

const projects = [
  {
    num:  "01",
    name: "TechPath",
    desc: "Full-stack React app that generates personalized learning roadmaps using the Claude API. Built the complete frontend — dynamic routing, state management, and responsive dashboards. Project lead from April to May 2026.",
    tags: ["React.js", "JavaScript", "Tailwind CSS"],
    hl:   "Claude API",
    link: "https://github.com/Yazeed-Bafaqih/TechPath",
  },
  {
    num:  "02",
    name: "Sanadk",
    desc: "UX research project on accessibility for visually impaired and wheelchair users. Surveyed 77 participants — 85% don't use assistive apps, proving it's a design problem, not a tech problem. Delivered high-fidelity Figma prototypes for a voice-first interface.",
    tags: ["Figma", "User Research", "Prototyping"],
    hl:   null,
    link: "https://www.figma.com/design/QuJW0BvsIibaJiMQsTrjBI/HCI-Sanadk-Project?node-id=0-1&t=inCfBrpIviVcQKJQ-1",
  },
  {
    num:  "03",
    name: "VidToCode",
    desc: "AI/code generation research project with a team of 4. Curated 36 YouTube tutorials across Python, Java, C++, and JavaScript. Built a preprocessing pipeline for cleaning, segmentation, and annotation, and designed an evaluation framework using CodeSim and CodeBLEU metrics.",
    tags: ["Python", "Java", "C++", "JavaScript"],
    hl:   "Research",
    link: "https://github.com/ahmedbahaj/VidToCode",
  },
];

const FILTERS = ["All", "React.js", "Figma", "JavaScript"];

export default function Projects() {
  const [refLabel, styleLabel] = useReveal(0);
  const [filter, setFilter] = useState("All");

  const visible = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter(
      (p) =>
        p.tags.includes(filter) ||
        p.hl === filter ||
        (filter === "UX" && p.tags.includes("User Research"))
    );
  }, [filter]);

  return (
    <section id="projects" className="section-pad">
      <p ref={refLabel} className="section-label" style={styleLabel}>Projects</p>

      <div className="filter-bar" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className={`filter-chip${filter === f ? " is-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="list-panel">
        {visible.length === 0 ? (
          <p className="list-empty">No projects match this filter.</p>
        ) : (
          visible.map((p, i) => (
            <ProjectItem key={p.num} project={p} delay={i * 0.08} />
          ))
        )}
      </div>
    </section>
  );
}

function ProjectItem({ project, delay }) {
  const [r, s] = useReveal(delay);
  const [hov, setHov] = useState(false);

  return (
    <a
      ref={r}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-row"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...s,
        ...(hov ? { "--row-lit": 1 } : {}),
      }}
    >
      <div>
        <span className="project-row__num">{project.num}</span>
        <h3 className="heading-md project-row__title">{project.name}</h3>
        <p className="project-row__desc">{project.desc}</p>
        <div className="project-row__tags">
          {project.tags.map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
          {project.hl && (
            <span className="tag-pill tag-pill--accent">{project.hl}</span>
          )}
        </div>
      </div>
      <span className="project-row__arrow" aria-hidden>↗</span>
    </a>
  );
}
