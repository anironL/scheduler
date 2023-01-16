import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace === true) {
      history[history.length-1] = newMode
      setHistory(history)
    } 
    if (replace === false) {
      setHistory(prev => [...prev, newMode])
    }
    setMode(newMode)
    console.log("state", history)
  };

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
    console.log("state", history)
  }

  return { mode, transition, back };
};
