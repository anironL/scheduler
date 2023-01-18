import React from "react";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  queryByText,
  getByAltText,
  getByPlaceholderText,
  prettyDOM,
  getAllByTestId 
} 
from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";


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
    const { container, debug } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"));
    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();    
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      // queryByText(day, "Monday")
      getByText(day, "Monday")
    );
    // console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // Render the Application.
    const { container, debug } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Locate the first appointment (Archie Cohen)
    const appointment = getAllByTestId(container,"appointment")[1];
    // Click the "Delete button" for this appointment
    fireEvent.click(getByAltText(appointment, "Delete"))
    // Check for confirmation state
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // Click confirm from confirmation
    fireEvent.click(getByText((container),"Confirm"))
    // Check to see if state has changed to Deleting (element text: "Deleting")
    expect(getByText(container, "Deleting")).toBeInTheDocument();
    // Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // Check that DayListItem has incremented spots from 1 to to 2
    const day = getAllByTestId(container, "day").find(day =>
      getByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // debug();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
// Render the Application.
    const { container, debug } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"));
    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();    
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      // queryByText(day, "Monday")
      getByText(day, "Monday")
    );
    // console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // Render the Application.
    const { container, debug } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"));
    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();    
    // Wait until the error state is displayed
    await waitForElement(() => getByAltText(container, "Close"));
  })

  it("shows the delete error when failing to delete an existing appointment", async () => {
        axios.delete.mockRejectedValueOnce();

        // Render the Application.
        const { container, debug } = render(<Application />);
        // Wait until the text "Archie Cohen" is displayed.
        await waitForElement(() => getByText(container, "Archie Cohen"));
    
        // Locate the first appointment (Archie Cohen)
        const appointment = getAllByTestId(container,"appointment")[1];
        // Click the "Delete button" for this appointment
        fireEvent.click(getByAltText(appointment, "Delete"))
        // Check for confirmation state
        expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
        // Click confirm from confirmation
        fireEvent.click(getByText((container),"Confirm"))
        // Check to see if state has changed to Deleting (element text: "Deleting")
        expect(getByText(container, "Deleting")).toBeInTheDocument();
        // Wait until the error state is displayed
        await waitForElement(() => getByAltText(container, "Close"));
  })
});
