import React from "react";
// import React, { useState } from "react";
import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {
  //  day-list__item all the time
  //  day-list__item--selected class name if props.selected is true
  //  day-list__item--full class name if props.spots is 0.
  let dayClass = classNames ({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  })
  
    return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
    </li>
  );
}
