import React from "react";

import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";

import useVisualMode from "../hooks/useVisualMode";

import "./styles.scss";

export default function Appointment(props) {
  // Display modes for appointment booking
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE";
  const CANCELLING = "CANCELLING";
  const REMOVING = "REMOVING";
  const ERROR_DELETE = "ERROR_DELETE";

  // Import useVisualMode custom hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Create interview object and submit axios put request. Displays SAVING mode until the axios request resolves then calls transition to SHOW on res or ERROR_SAVE on err. 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then((res) => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

// Submit axios delete request. Displays REMOVING mode until the axios request resolves then calls transition to EMPTY on res or ERROR_DELETE on err. 
  function remove() {
    const interview = null;

    transition(REMOVING);

    props
      .cancelInterview(props.id, interview)
      .then((res) => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} interview={props.interview} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CANCELLING)}
        />
      )}
      {mode === CREATE && (
        <Form
          student={props.interview ? props.interview.student : ""}
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
          bookInterview={props.bookInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview ? props.interview.student : ""}
          interviewers={props.interviewers}
          interviewer={props.interview ? props.interview.interviewer.id : ""}
          onCancel={() => transition(SHOW)}
          onSave={save}
          bookInterview={props.bookInterview}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === ERROR_SAVE && (
        <Error message="Error saving" onClick={back} />
      )}
      {mode === CANCELLING && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => transition(SHOW)}
          onConfirm={remove}
        />
      )}
      {mode === REMOVING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && (
        <Error message="Error deleting" onClick={back} />
      )}

      <hr className="appointment__separator" />
    </article>
  );
}
