import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

//Component to show the list of the days in the nav bar
export default function DayList(props) {
  const { days } = props;
  const dayList = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{dayList}</ul>;
};
