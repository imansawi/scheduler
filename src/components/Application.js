import React from "react";

import DayList from "components/DayList";

import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

import "components/Application.scss";

// Main app Component. Show the nav bar with the days and spots remaining, and the appointment booked and available for the selected day
export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day);
  
  const schedule = appointments.map((oneAppointment) => {
    const interviewFound = getInterview(state, oneAppointment.interview);

    return (
      <Appointment
        key={oneAppointment.id}
        {...oneAppointment}
        interview={interviewFound}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
          
          <hr className="sidebar__separator2 sidebar--centered" />

          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" id="last" time="5pm" />
      </section>
    </main>
  );
}