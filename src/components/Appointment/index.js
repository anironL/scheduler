import React from "react";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

import "./styles.scss";

export default function Appointment (props) {
  // console.log(props)
  return (
    <article className="appointment">
      <Header time={props.time} interview={props.interview} />
      {props.interview ? 
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
        : 
        <Empty onAdd={props.onAdd}/>}
      <hr className="appointment__separator" />
    </article>
  )
}
