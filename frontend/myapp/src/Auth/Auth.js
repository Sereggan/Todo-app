import React, { useState, useContext, useCallback } from "react";

import "./Auth.css";

import ErrorModal from "../shared/UI/ErrorModal";
import LoadingSpinner from "../shared/UI/LoadingSpinner";
import { AuthContext } from "../shared/context/auth-context";
import Input from "../shared/UI/Input";
import Button from "../shared/UI/Button";

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = useContext(AuthContext);

  const inputNameHandler = useCallback((event) => {
    setInputName(event.target.value);
  }, []);
  const inputMailHandler = useCallback((event) => {
    setInputMail(event.target.value);
  }, []);
  const inputPasswordHandler = useCallback((event) => {
    setInputPassword(event.target.value);
  }, []);

  const switchHandler = useCallback(() => {
    setIsLoginMode((prevMode) => !prevMode);
  }, []);

  const formHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const sendForm = async () => {
      if (isLoginMode) {
        try {
          const params = JSON.stringify({
            email: inputMail,
            password: inputPassword,
          });
          const responseData = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/users/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: params,
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
              throw new Error(err.message);
            });
          switchHandler();

          auth.login(responseData.userId, responseData.token);
        } catch (err) {
          setIsLoading(false);
          setError(err.message || "Something went wrong, please try again");
        }
      } else {
        try {
          const params = JSON.stringify({
            name: inputName,
            email: inputMail,
            password: inputPassword,
          });
          await fetch(process.env.REACT_APP_BACKEND_URL + "/users/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: params,
          })
            .then((response) => {
              return response.json();
            })
            .catch((err) => {
              setIsLoading(false);
              throw new Error(err.message);
            });
          switchHandler();
        } catch (err) {
          setIsLoading(false);
          setError(err.message || "Something went wrong, please try again");
        }
      }
    };
    setIsLoading(false);
    return sendForm();
  };

  const errorhandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorhandler} />

      {isLoading && <LoadingSpinner asOverlay />}
      <div className="auth-page">
        <Button onClick={switchHandler} className="primary auth-form__button">
          Switch to {!isLoginMode ? "Login" : "Signup"}
        </Button>
        <form className="auth-form center" onSubmit={formHandler}>
          <h2 className="auth-form__title">
            {isLoginMode ? "Login" : "Signup"} Required
          </h2>
          {!isLoginMode && <label htmlFor="name">Your name</label>}

          {!isLoginMode && (
            <Input
              type="text"
              id="name"
              placeholder="enter your name"
              className="auth-form__input"
              value={inputName}
              onChange={inputNameHandler}
            />
          )}

          <Input
            type="email"
            id="email"
            placeholder="enter email"
            className="auth-form__input"
            label="Your email"
            value={inputMail}
            onChange={inputMailHandler}
          />
          <Input
            type="password"
            id="password"
            placeholder="enter password"
            className="auth-form__input"
            value={inputPassword}
            label={"Password\n (at least 6 charachters)"}
            onChange={inputPasswordHandler}
            autoComplete="new-password"
          />
          <Input
            type="submit"
            value="Login"
            className="auth-form__submit"
            disabled={
              !inputMail.length ||
              (!inputName.length && !isLoginMode) ||
              inputPassword.length < 6
            }
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;
