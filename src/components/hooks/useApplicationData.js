import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "components/helpers/selectors.js";

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };   
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response) => {
      console.log("Appointment booked:", response)
      setState({
        ...state,
        appointments
      });   
    })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };   
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      setState({
        ...state,
        appointments
      });   
    })
  }
};

