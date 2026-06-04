import useReveal from "../hooks/useReveal.js";

const milestones = [
  {
    date: "2023",
    title: "Started BSc Software Engineering",
    org: "University of Jeddah",
    note: "Began my degree focused on building real software and solving real problems.",
  },
  {
    date: "Feb 2025",
    title: "Joined Electronic Games & VR Club + Drone Club",
    org: "PM Member · PR Member",
    note: "First steps into project management and team coordination across two active clubs.",
  },
 {
    date: "Sep 2025",
    title: "Stepped up to Lead across Two Clubs",
    org: "Electronic Games & VR Club · Drone Club",
    note: "Promoted to PM Lead and Co-Lead simultaneously. Responsible workshops coordinator, managed 20+ members, and maintained 100% team accountability.",
  },
  {
    date: "Nov 2025",
    title: "Joined Google Developer Groups on Campus UJ",
    org: "GDGoC · University of Jeddah",
    note: "Coordinating logistics and QA documentation for 2 workshops.",
  },
  {
    date: "Jan – May 2026",
    title: "Built TechPath, Sanadk & VidToCode",
    org: "Project Lead · UX Researcher · Research Team",
    note: "Shipped three projects in one semester — a full-stack AI app, a 77-person accessibility study, and an AI code-generation research pipeline.",
  },
  {
    date: "2027",
    title: "Graduating",
    org: "University of Jeddah",
    note: "Completing my BSc Software Engineering — ready for what's next.",
  },
];

export default function Timeline() {
  const [refLabel, styleLabel] = useReveal(0);

  return (
    <section id="journey" className="section-pad">
      <p ref={refLabel} className="section-label" style={styleLabel}>Journey</p>
      <div className="timeline">
        {milestones.map((m, i) => (
          <TimelineItem key={m.title} item={m} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ item, delay }) {
  const [r, s] = useReveal(delay);
  return (
    <div ref={r} className="tl-item" style={s}>
      <div className="tl-dot" />
      <p className="tl-date">{item.date}</p>
      <p className="tl-title">{item.title}</p>
      <p className="tl-org">{item.org}</p>
      <p className="tl-note">{item.note}</p>
    </div>
  );
}
