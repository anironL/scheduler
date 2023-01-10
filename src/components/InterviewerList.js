import React, { useState } from "react";
import classNames from "classnames";

import "./InterviewerList.scss";

const interviewers = props.interviewers.map(interviewer => {
  return (
    <DayListItem 
      key={interviewer.id}
      name={interviewer.name} 
      avatar={interviewer.avatar} 
      selected={interviewer.name === props.day}
      setinterviewer={props.setinterviewer}  
    />
  )
});