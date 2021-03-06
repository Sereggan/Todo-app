import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <button
      className={`button ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
