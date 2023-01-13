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
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
 
  return {
    student:interview.student,
    interviewer:state.interviewers[interview.interviewer],
  }
}

export function getInterviewersForDay(state, day) {
  if (day === null) {
    return [];
  }
  const findDay = state.days.find(days => days.name === day)
  if (!findDay) {
    return [];
  }
 
  return findDay.interviewers.map(interviewerId => state.interviewers[interviewerId])
}