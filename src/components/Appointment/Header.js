import React from "react";

//Component shows the time of each appointment with a horizantal separator
export default function Appointment(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
};
