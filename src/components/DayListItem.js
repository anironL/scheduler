import React from "react";
import classNames from "classnames";

import "./DayListItem.scss";

const FormatSpots = (props) => {
  return (
    <>
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
    </>
  )
}

export default function DayListItem(props) {
  let dayClass = classNames ({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  })

  return (
    <li 
      onClick={() => props.setDay(props.name)} 
      className={dayClass}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <FormatSpots spots={props.spots} />
    </li>
  );
}