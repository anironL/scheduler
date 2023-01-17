/*We are rendering `<Application />` down below, so we need React.createElement*/
import React from "react";
import Appointment from "../Appointment/index.js"

/*We import our helper functions from the react-testing-library
  The render function allows us to render Components*/
import { render } from "@testing-library/react";

/*We import the component that we are testing*/
import Application from "components/Application";

/*A test that renders a React Component*/
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});

// the same code (both are interchangable)
// it("does something it is supposed to do", () => {
//   // test code here...
// });
// test("does something it is supposed to do", () => {
//   // test code here...
// });

// // skip test (for above notation)
// xit("does something it is supposed to do", () => {
//   // ...
// });
// // or if using test
// test.skip("does something it is supposed to do", () => {
//   // ...
// });

