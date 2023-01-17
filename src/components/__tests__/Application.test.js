import React from "react";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  prettyDOM 
} 
from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

describe("Application", () => {
  // it("renders without crashing", () => {
  //   render(<Application />);
  // });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application.
    const { container } = render(<Application />);
    console.log(container);
    
    // Wait until the text "Archie Cohen" is displayed.
    // await waitForElement(() => getByText("Archie Cohen"));
    // expect(getByText("Archie Cohen")).toBeInTheDocument
    
    // Click the "Add" button on the first empty appointment.
    // fireEvent.click(getByText(""))

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    // Click the first interviewer in the list.
    // Click the "Save" button on that same appointment.
    // Check that the element with the text "Saving" is displayed.
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".

  })


});
