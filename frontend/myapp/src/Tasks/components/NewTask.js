import React, { useState } from "react";

import "./NewTask.css";

import Button from "../../shared/UI/Button";
import Input from "../../shared/UI/Input";

const NewTask = (props) => {
  const [inputText, setInputText] = useState("");
  const { addTask } = props;

  const buttonHandler = () => {
    if (inputText !== "") {
      addTask(inputText);
      setInputText("");
    }
  };

  const inputHandler = (event) => {
    setInputText(event.target.value);
  };
  return (
    <React.Fragment>
      <div className="tasksForm ">
        <Input
          label="Enter task"
          type="text"
          className="tasksForm__input"
          value={inputText}
          onChange={inputHandler}
          placeholder="enter new task"
        />
        <Button
          className="primary tasksForm__button"
          onClick={buttonHandler}
          disabled={!inputText}
        >
          Add new task
        </Button>
      </div>
    </React.Fragment>
  );
};

export default NewTask;
