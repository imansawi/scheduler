//Function shows the details of the booked/available appointment for the selected day
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((ele) => ele.name === day);
  return selectedDay
    ? selectedDay.appointments.map((appointId) => state.appointments[appointId])
    : [];
}

//Function shows the interview details: student name, interviewer name, interviewer id, and interviewer avatar
// for a specific appointment
export function getInterview(state, schedule) {
  return !schedule
    ? null
    : { ...schedule, interviewer: state.interviewers[schedule.interviewer] };
}

//Function shows the interviewers details: name & avatar for the selected day
// during editing/creating appointment
export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((ele) => ele.name === day);
  return selectedDay
    ? selectedDay.interviewers.map((intervId) => state.interviewers[intervId])
    : [];
};