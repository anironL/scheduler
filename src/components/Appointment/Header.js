import React from "react";
import Show from "./Show";
import Empty from "./Empty";

export default function Header (props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
    </header>
  )
}