import React from "react";

import Header from "./Header";
// import Empty from "./Empty";
// import Show from "./Show";

import "./styles.scss";

export default function Application (props) {
  return (
    <article className="appointment">
      <Header time={props.time} interview={props.interview} />
      <p> Is this functioning? </p>
    </article>
  )
}
