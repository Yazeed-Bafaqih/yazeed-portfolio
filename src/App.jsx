import { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Timeline from "./components/Timeline.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import SectionRail from "./components/SectionRail.jsx";
import QuickDock from "./components/QuickDock.jsx";
import Toast from "./components/Toast.jsx";
import { AppToolsProvider, useAppTools } from "./context/AppToolsContext.jsx";
import useScrollProgress from "./hooks/useScrollProgress.js";
import useReveal from "./hooks/useReveal.js";

const SECTIONS = ["top", "about", "journey", "experience", "projects", "contact"];

function Portfolio() {
  const progress = useScrollProgress();
  const { paletteOpen, openPalette, closePalette } = useAppTools();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (paletteOpen) closePalette();
        else openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, openPalette, closePalette]);

  return (
    <div className="app-shell">
      <div
        className="scroll-progress"
        style={{ width: `${progress * 100}%`, opacity: progress > 0.01 ? 1 : 0 }}
        aria-hidden
      />
      <Nav sections={SECTIONS} />
      <SectionRail sections={SECTIONS} />
      <div className="app-main">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Timeline />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Contact />
        <Footer />
      </div>
      <QuickDock />
      <CommandPalette />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppToolsProvider>
      <Portfolio />
    </AppToolsProvider>
  );
}

function Divider() {
  const [ref, style, visible] = useReveal(0);
  return (
    <hr
      ref={ref}
      className={`section-divider${visible ? " is-visible" : ""}`}
      style={visible ? {} : style}
    />
  );
}
