import { useState } from "react";

export default function Btn({ href, dark, children, ...rest }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...rest}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        fontFamily: "var(--mono)",
        fontSize: 12, fontWeight: 500,
        letterSpacing: "0.02em",
        padding: "10px 18px", borderRadius: 6,
        cursor: "pointer", textDecoration: "none",
        transition: "background .2s, border-color .2s, color .2s, transform .2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow .2s",
        display: "inline-flex", alignItems: "center", gap: 7,

        border: `1px solid ${dark ? "var(--accent)" : "var(--border)"}`,
        background: dark
          ? (hov ? "var(--accent-hover, var(--accent))" : "var(--accent)")
          : (hov ? "var(--bg2)" : "transparent"),
        color: dark
          ? "var(--on-accent)"
          : (hov ? "var(--ink)" : "var(--ink2)"),
        borderColor: dark
          ? "var(--accent)"
          : (hov ? "var(--accent-border)" : "var(--border)"),
        transform: pressed ? "scale(0.97)" : hov ? "translateY(-2px)" : "none",
        boxShadow: hov && !pressed && dark
          ? "0 6px 22px var(--accent-dim)"
          : hov && !pressed ? "var(--shadow-sm)" : "none",
        opacity: dark && hov ? 0.92 : 1,
      }}
    >
      {children}
    </a>
  );
}
