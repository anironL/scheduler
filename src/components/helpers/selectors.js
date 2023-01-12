export function getAppointmentsForDay(state, day) {
  // const daysArray = Object.values(state.days).map(days => days)
  if (state.days.length === 0) {
    return [];
  }

  const filteredDays = state.days.find(days => days.name === day)
  if (!filteredDays) {
    return [];
  }

  const appointmentArray = Object.values(state.appointments).map(aptNum => aptNum)
  // const filteredAppointments = []
  
  return filteredDays.appointments.map(appointmentId => state.appointments[appointmentId])

  // for (const aptNum of filteredDays.appointments) {
  //   if (appointmentArray[aptNum - 1]) {
  //     filteredAppointments.push(appointmentArray[aptNum - 1])
  //   }
  // }
  
  return (filteredAppointments);
}
