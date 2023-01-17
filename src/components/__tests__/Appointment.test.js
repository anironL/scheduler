/*We are rendering `<Application />` down below, so we need React.createElement*/
import React from "react";
/*We import our helper functions from the react-testing-library
  The render function allows us to render Components*/
import { render, cleanup } from "@testing-library/react";
/*We import the components that we are testing*/
import Appointment from "../Appointment/index.js"
import Form from "components/Appointment/Form";
import Application from "components/Application";

afterEach(cleanup);

/*A test that renders a React Component*/
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
});







// Additional Notes

// the same code (both are interchangable)
// it("does something it is supposed to do", () => {
//   // test code here...
// });
// test("does something it is supposed to do", () => {
//   // test code here...
// });

// skip test (for above notation)
// xit("does something it is supposed to do", () => {
//   // ...
// });
// // or if using test
// test.skip("does something it is supposed to do", () => {
//   // ...
// });

