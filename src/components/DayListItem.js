import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const formatSpots = function (spotsNumber) {
    if (spotsNumber === 0) return "No Spots ";
    if (spotsNumber === 1) return "1 Spot ";
    if (spotsNumber > 1) return `${spotsNumber} Spots `;
  };

  const DayList = classNames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": !props.spots }
  );

  return (
    <li data-testid="day"
      className={DayList}
      onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)} Remaining!</h3>
    </li>
  );
}
