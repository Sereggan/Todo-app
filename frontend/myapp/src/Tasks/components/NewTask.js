import React, { useState, useCallback, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import "./NewTask.css";

import Button from "../../shared/UI/Button";
import Input from "../../shared/UI/Input";

const NewTask = (props) => {
  const [inputText, setInputText] = useState("");
  const { updateTasks, setIsLoading } = props;
  const auth = useContext(AuthContext);

  const addTask = useCallback(
    async (text) => {
      setIsLoading(true);
      const params = JSON.stringify({
        creator: auth.userId,
        status: "active",
        content: text,
      });
      try {
        const responseData = await fetch(`http://localhost:5000/api/tasks`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: params,
        })
          .then((respone) => {
            return respone.json();
          })
          .catch((err) => {
            console.log(err);
          });
        updateTasks((counter) => counter + 1);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    },
    [auth.token, auth.userId]
  );

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
