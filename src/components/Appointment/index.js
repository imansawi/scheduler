import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  const { interviewer, student } = { ...props.interview };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {props.interview ? (
        <Show
          {...interviewer}
          student={student}
          onDelete={props.onConfirm}
          onEdit={props.onConfirm}
        />
      ) : (
        <Empty onAdd={props.onConfirm} />
      )}
    </article>
  );
}
