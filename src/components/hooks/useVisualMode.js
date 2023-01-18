import { useState } from "react";

// Custom hook handles mode change logic and tracking for Appointment booking
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

// Change mode and add to history log
  const transition = (newMode, replace = false) => {
    if (replace === true) {
      history[history.length-1] = newMode
      setHistory(history)
    } 
    if (replace === false) {
      setHistory(prev => [...prev, newMode])
    }
    setMode(newMode)
  };

// Move back 2 spaces in history state; used when cancelling from Error.js  
  const back = () => {
    if (history.length < 3) {
      setMode(history[0])
    } else {
      setMode(history[history.length - 2])
      setHistory(prevHistory => { 
        prevHistory.pop()
        return prevHistory    
      })
    } 
  }

  return { mode, transition, back };
};
