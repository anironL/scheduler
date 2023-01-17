import React, { useState } from 'react';
import InterviewerList from "../InterviewerList";
import Button from "../Button";

import "./styles.scss";

export default function Form (props) {
  const [error, setError] = useState("");
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const updateStudent = (event) => {
    setStudent(event.target.value);
  }

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancel = () => {
    props.onCancel();
    reset();
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    props.onSave(student, interviewer);
  }
  
  console.log("Form", props)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          {/* <input
            className="appointment__create-input text--semi-bold"
            name="student"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={updateStudent}
          /> */}
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
        {/* <p>setStudent onChange: {student}</p> */}
        <InterviewerList 
          // key={props.interviewers.id}
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