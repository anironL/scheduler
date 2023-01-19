import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook handles state change logic from Axios get/put requests
export default function useApplicationData() {
  // State object moved from Application.js; structure unchanged.
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Axios get requests to retrieve setState information used: days, appointments, interviewers.
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Set the current day state.
  const setDay = (day) => setState({ ...state, day });

  // Put request to the API server and update the state to reflect the booked appointment.
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(id, appointments);
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  // Delete request to the API server and update state to reflect the removed appointment.
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(id, appointments);
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  // Find the amount of null interview values for all appointments[e of state.days].interview keys. This sum is returned within an object and later used to setState (see: bookInterview & cancelInterview)
  function updateSpots(apptID, appointments) {
    let newDays = [...state.days];
    let dayID = newDays.findIndex((id) => id.appointments.includes(apptID));
    let nullCounter = 0;

    for (let x of newDays[dayID].appointments) {
      if (appointments[x].interview === null) {
        nullCounter++;
      }
    }

    const dayObject = {
      ...newDays[dayID],
      spots: nullCounter,
    };

    newDays[dayID] = dayObject;
    return newDays;
  }

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}
