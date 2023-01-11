import React, { useState } from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";
import { findByLabelText } from "@testing-library/react";

const FormatInterviewer = (props) => {
  return (
    <li className="interviewers__item" onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default function InterviewerListItem(props) {
  let interviewerClass = classNames ({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected,
  })

  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <FormatInterviewer id={props.id} avatar={props.avatar} name={props.name} selected={props.selected} />
    </li>
  );
};