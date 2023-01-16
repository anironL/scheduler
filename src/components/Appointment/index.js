import React from "react";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../hooks/useVisualMode";

import "./styles.scss";

export default function Appointment (props) {
  // console.log(props)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW"; 
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const CANCELLING = "CANCELLING";
  const REMOVING = "REMOVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log("save interview object", interview)
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then ((res) => transition(SHOW))
 }  

 function remove() {
  const interview = null;

  transition(REMOVING);
  props.cancelInterview(props.id, interview)
  .then ((res) => transition(EMPTY))
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
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CANCELLING)}
        />)}
      {mode === CREATE && (
        <Form 
          student={props.interview ? props.interview.student.name : "Me"}
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
          bookInterview={props.bookInterview}
        />)}
      {mode === EDIT && (
        <Form 
          student={props.interview ? props.interview.student.name : "Me"}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
          bookInterview={props.bookInterview}
        />)}
      {mode === SAVING && (<Status message="Saving" />)}
      {mode === CANCELLING && (
        <Confirm 
          message={"Are you sure you would like to delete?"}
          onCancel={() => transition(SHOW)}
          onConfirm={remove}
        />
      )}
      {mode === REMOVING && (<Status message="Deleting" />)}
  
      <hr className="appointment__separator" />
    </article>
  )
}

