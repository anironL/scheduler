import { useState, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay } from "../helpers/selectors.js"

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

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
      // console.log("promise days:", all[0].data);
      console.log("promise appointments:", all[1].data);
      // console.log("promise interviewers:", all[2].data);
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  }, [])

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
    const days = updateSpots(id, appointments);
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((response) => {
      setState({
        ...state,
        appointments,
        days
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
    const days = updateSpots(id, appointments);
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      setState({
        ...state,
        appointments,
        days
      })   
    })
  }

  function updateSpots(apptID, appointments) {  
    let newDays = [...state.days];
    let dayID = newDays.findIndex(id => id.appointments.includes(apptID))   
    let nullCounter = 0;

    for (let x of newDays[dayID].appointments) {
      if (appointments[x].interview === null) {
        nullCounter++
      }
    }

    const dayObject = {
      ...newDays[dayID],
      spots:nullCounter
    }; 
    
    newDays[dayID] = dayObject;
    return newDays
  }

  return { state, setDay, bookInterview, cancelInterview, updateSpots }
};

