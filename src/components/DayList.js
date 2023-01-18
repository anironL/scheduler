import React from "react";
// import classNames from "classnames";
import DayListItem from "./DayListItem"

export default function DayList(props){
  // console.log(props);
  const days = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.onChange}  
      />
    )
  });

  return(
    <ul>
      {days}
    </ul>
  )
}
