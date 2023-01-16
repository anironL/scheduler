import React from "react";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import useVisualMode from "../hooks/useVisualMode";

import "./styles.scss";

export default function Appointment (props) {
  // console.log(props)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW"; 
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("save interview object", interview)
  }  

  console.log("Index", props)

  return (
    <article className="appointment">
      <Header time={props.time} interview={props.interview} />
      {mode === EMPTY && 
        <Empty 
          onAdd={ () => transition(CREATE)} 
        />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />)}
      {mode === CREATE && (
        <Form 
          student={props.interview ? props.interview.student.name : "Me"}
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
          bookInterview={props.bookInterview}
        />
      )}
      <hr className="appointment__separator" />
    </article>
  )
}

