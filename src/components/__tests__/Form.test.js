import React from "react";
import PropTypes from 'prop-types';

import { render, cleanup } from "@testing-library/react";
// import onSave from "../Appointment/Form.js";
import '@testing-library/jest-dom'

import Form from "../Appointment/Form.js";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    )    

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  // it("validates that the student name is not blank", () => {
//   const { getByText } = render ( <Form />)
//   /* 1. validation is shown */
//   expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

//   /* 2. onSave is not called */
//   expect(onSave).not.toHaveBeenCalled();
// });

// it("validates that the interviewer cannot be null", () => {
//   const { getByText } = render ( <Form />)
//   /* 3. validation is shown */
//   expect(getByText(/please select an interviewer/i)).toBeInTheDocument();

//   /* 4. onSave is not called */
//   expect(onSave).not.toHaveBeenCalled();
// });

  it("calls onSave function when the name is defined", () => {
    const { queryByText } = render (<Form 
      interviewers={interviewers} 
      student="Lydia Miller-Jones"
    />)
    
    const onSave = jest.fn()

    /* 5. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();

    /* 6. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 7. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});