import React from "react";
// import ReactDOM from 'react-dom'
import classNames from "classnames";

import "./Button.scss";

export default function Button(props) {
   let buttonClass = classNames ("button", {
      " button--confirm": props.confirm,
      " button--danger": props.danger,
   })

   return (
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
 };
