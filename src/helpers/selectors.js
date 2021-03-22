export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((ele) => ele.name === day);
  return selectedDay
    ? selectedDay.appointments.map((appointId) => state.appointments[appointId]) : [];
}

export function getInterview(state, schedule) {
  return !schedule ? null : { ...schedule, interviewer: state.interviewers[schedule.interviewer] };
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((ele) => ele.name === day);
  return selectedDay ? selectedDay.interviewers.map((intervId) => state.interviewers[intervId]) : [];
}