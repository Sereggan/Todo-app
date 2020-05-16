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
            removeTask={props.removeTask}
            changeStatus={props.changeStatus}
            key={task._id}
            updateTasks={props.updateTasks}
            setIsLoading={props.setIsLoading}
          />
        );
      })}
    </div>
  );
};

export default TasksList;
