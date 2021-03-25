const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

//Use reducer to handle different actions to set the day, the application data,
// and to update an interview for an appointment time
export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return { ...state, day: action.day };
    }
    case SET_APPLICATION_DATA: {
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview,
      };
      const appointments = { ...state.appointments, [action.id]: appointment };

      const days = state.days.map((item) => {
        if (item.appointments.includes(action.id)) {
          const spots = item.appointments
            .map((appointId) => appointments[appointId])
            .filter((app) => !app.interview).length;
          return { ...item, spots };
        }
        return item;
      });

      return { ...state, appointments, days };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { SET_INTERVIEW, SET_DAY, SET_APPLICATION_DATA };
