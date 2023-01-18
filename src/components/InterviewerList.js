import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

import "./InterviewerList.scss";

export default function InterviewerList(props){
  const {value, onChange} = props;

// Render interviewers in Form
  const Interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name} 
        avatar={interviewer.avatar} 
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    )
  });

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {Interviewers}
      </ul>
      
    </section>
  )
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
