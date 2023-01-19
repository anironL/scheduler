import { useState } from "react";

// Custom hook handles mode change logic and tracking for Appointment booking
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Change mode and add to history state array by default. Replaces final element in History array if replace is set to = true.
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace === true) {
      setHistory((prev) => [...prev]);
    }
    if (replace === false) {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  // Move back 2 elements in the history state array and remove the Error mode state from the array. Used when cancelling from Error.js to Form (from ERROR_SAVE) or Confirm (from ERROR_DELETE)
  const back = () => {
    if (history.length < 3) {
      setMode(history[0]);
    } else {
      const newHistory = [...history].slice(0, history.length - 1);
      setMode(history[history.length - 2]);
      setHistory(newHistory);
    }
  };

  return { mode, transition, back };
}
