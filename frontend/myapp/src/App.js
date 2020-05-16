import React, { useState, useCallback, useEffect } from "react";

import Tasks from "./Tasks/pages/Tasks";
import Layout from "./shared/Layout/Layout";
import Auth from "./Auth/Auth";
import MainNavigation from "./shared/navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    delete localStorage.userData;
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token && new Date(data.expiration) > new Date()) {
      login(data.userId, data.token, new Date(data.expiration));
    }
  }, [login]);

  let routes;
  if (!token) {
    routes = (
      <Router>
        <MainNavigation />
        <Switch>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </Router>
    );
  } else {
    routes = (
      <Router>
        <MainNavigation />
        <Switch>
          <Route path="/" exact>
            <Tasks />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,
        token: token,
        userId: userId,
      }}
    >
      <Layout>{routes}</Layout>
    </AuthContext.Provider>
  );
}

export default App;
