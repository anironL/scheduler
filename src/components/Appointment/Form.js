import React, { useState } from 'react';
import InterviewerList from "../InterviewerList";
import Button from "../Button";

import "./styles.scss";



export default function Form (props) {
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

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="student"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={updateStudent}
          />
        </form>
        {/* <p>setStudent onChange: {student}</p> */}
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer} 
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}