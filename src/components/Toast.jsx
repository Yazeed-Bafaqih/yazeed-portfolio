import { useAppTools } from "../context/AppToolsContext.jsx";

export default function Toast() {
  const { toast } = useAppTools();
  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast__icon" aria-hidden>✓</span>
      {toast}
    </div>
  );
}
