import { useState, useEffect } from "react";
import Btn from "./Btn.jsx";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const anim = (d) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${d}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${d}s`,
  });

  return (
    <section id="top" style={{ padding: "clamp(48px, 10vw, 80px) 0 clamp(48px, 8vw, 64px)" }}>
      <div className="hero-grid">
        <div>
          <div style={anim(0.04)}>
            <span className="hero-badge">Software Engineering · Jeddah, SA</span>
          </div>

          <h1 className="heading-hero" style={anim(0.10)}>
            <span style={{ color: "var(--ink)" }}>Yazeed </span>
            <span className="heading-hero__accent">Bafaqih.</span>
          </h1>

          <p className="hero-body" style={anim(0.22)}>
            I'm a Software Engineering student at University of Jeddah
            who codes, leads, and researches. I build things that work
            and study problems worth solving. Graduating 2027.
          </p>

          <div className="hero-actions" style={anim(0.28)}>
            <Btn href="mailto:yazied1425@gmail.com" dark>Get in touch</Btn>
            <Btn href={`${import.meta.env.BASE_URL}cv.pdf`}>View CV ↗</Btn>
            <Btn href="https://github.com/Yazeed-Bafaqih">GitHub ↗</Btn>
            <Btn href="https://linkedin.com/in/yazeed-bafaqih-b1a449349">LinkedIn ↗</Btn>
          </div>
        </div>

        <img
          src={`${import.meta.env.BASE_URL}profile.jpg`}
          alt="Yazeed Bafaqih"
          className="hero-photo"
          style={anim(0.14)}
        />
      </div>

      <a href="#about" className="hero-scroll" style={anim(0.36)}>
        <span className="hero-scroll__line" />
        <span className="hero-scroll__text">scroll ↓</span>
      </a>
    </section>
  );
}
