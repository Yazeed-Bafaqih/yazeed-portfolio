import { useState, useEffect, useRef, useMemo } from "react";
import { useAppTools } from "../context/AppToolsContext.jsx";

const EMAIL = "yazied1425@gmail.com";

export default function CommandPalette() {
  const { paletteOpen, closePalette, copyText, toggleTheme, theme } = useAppTools();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  const COMMANDS = useMemo(() => [
    { id: "home", label: "Go to top", hint: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { id: "about", label: "Go to About", hint: "#about", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "journey", label: "Go to Journey", hint: "#journey", action: () => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "experience", label: "Go to Experience", hint: "#experience", action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "projects", label: "Go to Projects", hint: "#projects", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "contact", label: "Go to Contact", hint: "#contact", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "theme", label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`, hint: "theme", action: toggleTheme },
    { id: "cv", label: "View CV", hint: "cv.pdf", action: () => window.open("/cv.pdf", "_blank", "noopener") },
    { id: "email", label: "Copy email address", hint: EMAIL, copy: EMAIL },
    { id: "mailto", label: "Send email", hint: "mailto", action: () => { window.location.href = `mailto:${EMAIL}`; } },
    { id: "github", label: "Open GitHub", hint: "github.com", action: () => window.open("https://github.com/", "_blank", "noopener") },
    { id: "linkedin", label: "Open LinkedIn", hint: "linkedin.com", action: () => window.open("https://linkedin.com/", "_blank", "noopener") },
  ], [theme, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
  }, [query, COMMANDS]);

  useEffect(() => { setIndex(0); }, [query]);
  useEffect(() => {
    if (paletteOpen) {
      setQuery(""); setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [paletteOpen]);

  const run = async (cmd) => {
    closePalette();
    if (cmd.copy) await copyText(cmd.copy, "Email copied");
    else cmd.action?.();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => (i + 1) % Math.max(filtered.length, 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1)); }
    else if (e.key === "Enter" && filtered[index]) { e.preventDefault(); run(filtered[index]); }
    else if (e.key === "Escape") { closePalette(); }
  };

  if (!paletteOpen) return null;

  return (
    <div className="palette-backdrop" onClick={closePalette} role="presentation">
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
        <div className="palette__head">
          <span className="palette__title">Command palette</span>
          <kbd className="palette__kbd">esc</kbd>
        </div>
        <input
          ref={inputRef}
          className="palette__input"
          placeholder="Search commands…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          aria-autocomplete="list"
          aria-controls="palette-list"
        />
        <ul id="palette-list" className="palette__list" role="listbox">
          {filtered.length === 0 ? (
            <li className="palette__empty">No commands found</li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={cmd.id} role="option" aria-selected={i === index}>
                <button
                  type="button"
                  className={`palette__item${i === index ? " is-active" : ""}`}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => run(cmd)}
                >
                  <span>{cmd.label}</span>
                  <span className="palette__hint">{cmd.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="palette__footer">
          <kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>↵</kbd> run · <kbd>⌘</kbd><kbd>K</kbd> toggle
        </p>
      </div>
    </div>
  );
}
