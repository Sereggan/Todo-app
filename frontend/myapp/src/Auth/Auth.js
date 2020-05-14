import React, { useState, useContext, useCallback } from "react";

import "./Auth.css";

import { AuthContext } from "../shared/context/auth-context";
import Input from "../shared/UI/Input";
import Button from "../shared/UI/Button";

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const auth = useContext(AuthContext);
  const formHandler = (event) => {
    event.preventDefault();
    auth.login();
  };

  const inputNameHandler = (event) => {
    setInputName(event.target.value);
  };
  const inputMailHandler = (event) => {
    setInputMail(event.target.value);
  };
  const inputPasswordHandler = (event) => {
    setInputPassword(event.target.value);
  };

  const switchHandler = useCallback(() => {
    console.log(isLoginMode);
    setIsLoginMode((prevMode) => !prevMode);
    console.log(isLoginMode);
  }, [isLoginMode]);
  return (
    <React.Fragment>
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
          <br />
          <label htmlFor="email">Your email</label>
          <br />
          <Input
            type="email"
            id="email"
            placeholder="enter email"
            className="auth-form__input"
            value={inputMail}
            onChange={inputMailHandler}
          />
          <br />
          <label htmlFor="password">Your password</label>
          <br />
          <Input
            type="password"
            id="password"
            placeholder="enter password"
            className="auth-form__input"
            value={inputPassword}
            onChange={inputPasswordHandler}
          />
          <Input type="submit" value="Login" className="auth-form__submit" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default Auth;
