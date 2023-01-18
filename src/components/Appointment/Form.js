import React, { useState } from 'react';
import InterviewerList from "../InterviewerList";
import Button from "../Button";

import "./styles.scss";

export default function Form (props) {
  const [error, setError] = useState("");
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

// Set student state to input field value
  const updateStudent = (event) => {
    setStudent(event.target.value);
  }

// Set all fields to null
  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

// Reset to Show from Form 
  const cancel = () => {
    props.onCancel();
    reset();
  }

// Stop put request from firing if any field is blank.
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => {
              updateStudent(event);
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer} 
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button> 
        </section>
      </section>
    </main>
  )
}