import React from "react";

import "./TasksList.css";
import TasksItem from "./TasksItem";

const TasksList = (props) => {
  const { tasks } = props;

  return (
    <div className="tasksList">
      {tasks.map((task) => {
        return (
          <TasksItem
            task={task}
            key={task.id}
            removeTask={props.removeTask}
            changeStatus={props.changeStatus}
          />
        );
      })}
    </div>
  );
};

export default TasksList;
