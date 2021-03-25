import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";


export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  const currentlyInterviewers = interviewers.map((anInterviewer) => (
    <InterviewerListItem
      key={anInterviewer.id}
      {...anInterviewer}
      selected={anInterviewer.id === value}
      setInterviewer={(event) => onChange(anInterviewer.id)}
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header">Interviewer</h4>
      <ul className="interviewers__list">{currentlyInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};


