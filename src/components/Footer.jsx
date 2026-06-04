import { useState } from "react";
import { useAppTools } from "../context/AppToolsContext.jsx";

export default function Footer() {
  const [hov, setHov] = useState(false);
  const { openPalette } = useAppTools();

  return (
    <footer className="site-footer">
      <span className="site-footer__copy">Yazeed Bafaqih © 2026</span>

      <div className="site-footer__actions">
        <button type="button" className="site-footer__hint" onClick={openPalette}>
          Press <kbd>⌘</kbd><kbd>K</kbd> for commands
        </button>
        <span className="site-footer__meta">Built with React</span>
        <a
          href="#top"
          className={`site-footer__top${hov ? " is-hov" : ""}`}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
