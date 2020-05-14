import React from "react";

import "./Input.css";

const Input = (props) => {
  const element = (
    <input
      className={`${props.className}`}
      id={props.id}
      type={props.type}
      onChange={props.onChange}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
  return (
    <div className="input-group">
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
