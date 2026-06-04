import { useState, useEffect } from "react";
import useActiveSection from "../hooks/useActiveSection.js";
import { useAppTools } from "../context/AppToolsContext.jsx";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Journey", id: "journey" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Nav({ sections }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sections);
  const { openPalette, theme, toggleTheme } = useAppTools();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(20px, 5vw, 40px)", height: 58,
        background: scrolled ? "rgba(var(--bg-rgb), .94)" : "rgba(var(--bg-rgb), .82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        transition: "background .3s, border-color .3s, box-shadow .3s",
      }}>
        <a
          href="#"
          onClick={closeMenu}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 }}
        >
          <span style={{
            width: 28, height: 28, background: "var(--logo-bg)", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700,
            color: "var(--logo-fg)", flexShrink: 0,
            transition: "transform .25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>YB</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink)" }}>
            yazeed.dev
          </span>
        </a>

        <div className="nav-links-desktop" style={{ display: "flex", gap: 2 }}>
          {LINKS.map((l) => (
            <NavLink key={l.id} label={l.label} href={`#${l.id}`} active={active === l.id} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle light/dark"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          <button
            type="button"
            className="nav-cmd-btn"
            onClick={openPalette}
            aria-label="Open command palette"
          >
            <span>⌘K</span>
          </button>

          <button
            type="button"
            className="nav-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: "none",
              width: 36, height: 36,
              alignItems: "center", justifyContent: "center",
              border: "1px solid var(--border)",
              borderRadius: 8,
              background: menuOpen ? "var(--bg2)" : "var(--surface)",
              cursor: "pointer",
              color: "var(--ink)",
              transition: "background .2s, border-color .2s",
            }}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed", inset: 0, top: 58, zIndex: 99,
          background: "rgba(var(--bg-rgb), .97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "24px clamp(20px, 5vw, 40px)",
          display: "flex", flexDirection: "column", gap: 4,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity .25s ease, transform .25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={closeMenu}
            style={{
              fontSize: 18, fontWeight: 500,
              color: active === l.id ? "var(--accent)" : "var(--ink)",
              textDecoration: "none",
              padding: "14px 0",
              borderBottom: "1px solid var(--border)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
              transition: `opacity .3s ease ${i * 0.05}s, transform .3s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s, color .15s`,
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      {open ? (
        <>
          <path d="M3 3 L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M13 3 L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M2 4.5 H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 8 H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 11.5 H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function NavLink({ label, href, active }) {
  const [hov, setHov] = useState(false);
  const lit = hov || active;
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        fontSize: 13,
        color: lit ? "var(--ink)" : "var(--ink2)",
        textDecoration: "none",
        padding: "6px 12px",
        borderRadius: 6,
        background: lit ? "var(--bg2)" : "transparent",
        transition: "color .2s, background .2s",
      }}
    >
      {label}
      <span style={{
        position: "absolute", left: 12, right: 12, bottom: 4,
        height: 2, borderRadius: 1,
        background: "var(--accent)",
        transform: active ? "scaleX(1)" : "scaleX(0)",
        transition: "transform .25s cubic-bezier(0.22, 1, 0.36, 1)",
        transformOrigin: "left",
      }} />
    </a>
  );
}
