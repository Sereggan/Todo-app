import React from "react";

import "./TasksItem.css";

const TasksItem = (props) => {
  const { task, removeTask, changeStatus } = props;
  const deleteTask = () => {
    removeTask(task.id);
  };
  const newStatus = () => {
    changeStatus(task.id);
  };
  return (
    <React.Fragment>
      <div className="tasksList__item">
        <div className="tasksList__item-id">{task.id}</div>
        <div
          className={`tasksList__item-text  ${task.status}`}
          onClick={newStatus}
        >
          {task.text}
        </div>
        <i className="fa fa-times-circle fa-2x" onClick={deleteTask}></i>
      </div>
    </React.Fragment>
  );
};

export default TasksItem;
