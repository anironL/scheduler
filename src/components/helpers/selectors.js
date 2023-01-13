export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const findDay = state.days.find(days => days.name === day)
  if (!findDay) {
    return [];
  }

  return findDay.appointments.map(appointmentId => state.appointments[appointmentId])
}

// pass in state and appointment.interview[#]
export function getInterview(state, appointment) {
  if (appointment === null) {
    return null;
  }

  // state = array from setState [ day, days {} , appointments {}, and interviewers {}]
  // console.log("State object:", state.interviewers)
  
  // appointment = object {id: #key, interviewer: #interviewerID, student: "name"}
  // console.log("Appointment object:", appointment)

  // locate interviewer number from appointment
  // console.log("Interviewer number from appointment:", appointment.interview.interviewer)
  // const interviewerNum = appointment.interviewer;

  // map interviewers from state
  // const interviewersArray = Object.values(state.interviewers)
  
  // Object.values(state.interviewers).map(interviewerNum => state.interviewers[interviewerNum]);
  // console.log("Array:", interviewersArray)

  const interviewerInfo = Object.values(state.interviewers).find(element => element.id === appointment.interviewer)
  // console.log(interviewerInfo)

  return {
    student:appointment.student,
    interviewer:interviewerInfo,
  }
  // setState = (prev => ({...prev, appointments:interviewerInfo}));
  // return state;
}