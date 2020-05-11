import React, { useState } from "react";

import NewTask from "../components/NewTask";
import TasksList from "../components/TasksList";

const Tasks = (props) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Task 1",
      status: "Active",
    },
    {
      id: 2,
      text: "Task 2",
      status: "delayed",
    },
    {
      id: 3,
      text: "Task 3",
      status: "cancelled",
    },
  ]);

  const addTask = (text) => {
    let tid;
    if (tasks.length === 0) {
      tid = 1;
    } else {
      tid = tasks[tasks.length - 1].id + 1;
    }
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: tid, text: text, status: "Active" },
    ]);
  };

  const deleteTask = (tid) => {
    const filteredTasks = tasks.filter((task) => {
      return tid !== task.id;
    });
    setTasks(filteredTasks);
  };

  const changeStatus = (tid) => {
    const targetTask = tasks.filter((task) => {
      return task.id === tid;
    })[0];

    if (targetTask.status === "Active") {
      targetTask.status = "delayed";
    } else if (targetTask.status === "delayed") {
      targetTask.status = "cancelled";
    } else {
      targetTask.status = "Active";
    }
    let newTasks = [];

    for (let task in tasks) {
      if (tasks[task].id === targetTask.id) {
        newTasks.push(targetTask);
      } else {
        newTasks.push(tasks[task]);
      }
    }
    setTasks(newTasks);
  };
  let tasksList;
  if (tasks.length !== 0) {
    tasksList = (
      <TasksList
        tasks={tasks}
        removeTask={deleteTask}
        changeStatus={changeStatus}
      />
    );
  } else {
    tasksList = (
      <p>
        Enter your first task and press button
        <br />
        You can change tasks status clicking on it, or click cross to delete it
      </p>
    );
  }
  return (
    <React.Fragment>
      <NewTask addTask={addTask} />
      {tasksList}
    </React.Fragment>
  );
};

export default Tasks;
