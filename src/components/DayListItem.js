import React from "react";
// import React, { useState } from "react";
import classNames from "classnames";

export default function DayListItem(props) {
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}

// "{props.spots} spots remaining"

// name:String the name of the day
// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
