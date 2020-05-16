import React, { useState, useEffect, useContext, useCallback } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import NewTask from "../components/NewTask";
import TasksList from "../components/TasksList";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorModal from "../../shared/UI/ErrorModal";

const Tasks = (props) => {
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(0);
  const [tasks, setTasks] = useState("");
  const [error, setError] = useState("");

  const changeStatus = useCallback(
    async (tid, currentStatus) => {
      setIsLoading(true);
      let newStatus;
      if (currentStatus === "active") {
        newStatus = "delayed";
      } else if (currentStatus === "delayed") {
        newStatus = "cancelled";
      } else {
        newStatus = "active";
      }
      let params = JSON.stringify({
        status: newStatus,
        userId: auth.userId,
      });
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${tid}`, {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: params,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.message);
            }
            return response.json();
          })
          .catch((err) => {
            console.log(err);
          });
        setIsFetch((count) => count - 1);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again");
      }
    },
    [auth.token, auth.userId]
  );

  useEffect(() => {
    const fetchTasks = async () => {
      if (auth.token && auth.userId) {
        setIsLoading(true);
        try {
          const responseData = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/tasks/user/${auth.userId}`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + auth.token,
              },
            }
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.message);
              }
              return response.json();
            })
            .catch((err) => {
              setIsLoading(false);
            });

          if (responseData) {
            setTasks(responseData.tasks);
          } else {
            setTasks(null);
          }
        } catch (err) {
          setIsLoading(false);
          setError(err.message || "Something went wrong, please try again");
        }
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [auth.userId, auth.token, isFetch]);

  let tasksList;
  if (tasks) {
    tasksList = (
      <TasksList
        tasks={tasks}
        changeStatus={changeStatus}
        updateTasks={setIsFetch}
        setIsLoading={setIsLoading}
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

  const errorhandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorhandler} />
      <NewTask updateTasks={setIsFetch} setIsLoading={setIsLoading} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && tasksList}
    </React.Fragment>
  );
};

export default Tasks;
