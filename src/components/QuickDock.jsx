import { useAppTools } from "../context/AppToolsContext.jsx";

const EMAIL = "yazied1425@gmail.com";

export default function QuickDock() {
  const { openPalette, copyText } = useAppTools();

  return (
    <div className="quick-dock" role="toolbar" aria-label="Quick actions">
      <button
        type="button"
        className="quick-dock__btn"
        onClick={openPalette}
        aria-label="Open command palette"
      >
        <span aria-hidden>⌘</span>K
      </button>
      <button
        type="button"
        className="quick-dock__btn"
        onClick={() => copyText(EMAIL, "Email copied")}
        aria-label="Copy email"
      >
        @
      </button>
      <button
        type="button"
        className="quick-dock__btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}
