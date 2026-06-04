import { useState, useEffect } from "react";

export default function useTypewriter(text, speed = 42, delay = 500) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let interval;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  return [out, done];
}
