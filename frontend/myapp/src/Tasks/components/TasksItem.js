import React, { useCallback, useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";

import "./TasksItem.css";

const TasksItem = (props) => {
  const { task, changeStatus, updateTasks, setIsLoading } = props;
  const auth = useContext(AuthContext);

  const deleteTask = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${task.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ userId: auth.userId }),
        })
          .then((response) => {
            return response.json();
          })
          .then((message) => {
            //console.log(message);
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
    [auth.token, auth.userId, setIsLoading, updateTasks, task.id]
  );

  const newStatus = () => {
    changeStatus(task.id, task.status);
  };

  return (
    <React.Fragment>
      <div className="tasksList__item">
        <div
          className={`tasksList__item-text  ${task.status}`}
          onClick={newStatus}
        >
          {task.content}
        </div>
        <i className="fa fa-times-circle fa-2x" onClick={deleteTask}></i>
      </div>
    </React.Fragment>
  );
};

export default TasksItem;
