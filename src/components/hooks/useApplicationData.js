import { useState, useEffect } from "react";
import axios from "axios";

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
      // console.log("promise appointments:", all[1].data);
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

  return { state, setDay, bookInterview, cancelInterview }
};

