import React from "react";
// Axios get/put requests are handled in hooks/useApplicationData.js

import DayList from "./DayList";
import Appointment from "components/Appointment/index.js";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "components/helpers/selectors.js";
import useApplicationData from "components/hooks/useApplicationData.js";

import "components/Application.scss";

export default function Application(props) {
  // Import useApplicationData custom hook
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();
  
  // Retrieve interviewers array of objects (keys: id, name, avatar) to pass down to <Appointment />.
  const interviewers = getInterviewersForDay(state, state.day);
  // Retrieve appointments array for the specified day and render.
  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
      <div />
    </main>
  );
}
