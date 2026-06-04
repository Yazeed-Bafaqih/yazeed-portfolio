import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import Btn from "./Btn.jsx";

const EMAIL = "yazied1425@gmail.com";

export default function Contact() {
  const [rLeft, sLeft] = useReveal(0);
  const [rRight, sRight] = useReveal(0.1);

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [hov, setHov] = useState(false);

  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name || "someone"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${from ? ` (${from})` : ""}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-pad section-pad--last">
      <div>
        <div ref={rLeft} style={sLeft}>
          <p className="section-label">Contact</p>
          <h2 className="heading-lg" style={{ marginBottom: 12 }}>
              Open to opportunities. Ready to contribute.
          </h2>

          <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.7, marginBottom: 28, maxWidth: 360 }}>
            I'm seeking a Software Engineering internship where I can
            bring real skills and grow fast. If you're building something
            meaningful, I'd like to be part of it.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Btn href={`mailto:${EMAIL}`} dark>Send an email</Btn>
            <Btn href="https://linkedin.com/in/yazeed-bafaqih-b1a449349">LinkedIn</Btn>
            <Btn href="https://github.com/Yazeed-Bafaqih">GitHub</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
