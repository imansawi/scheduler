import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    } else {
      setMode(newMode);
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const newMode = history[history.length - 2];

      setMode(newMode);
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  }

  return { mode, transition, back };
}