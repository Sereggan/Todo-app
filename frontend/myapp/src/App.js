import React, { useState, useCallback } from "react";

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  let routes;
  if (!isLoggedIn) {
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
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Layout>{routes}</Layout>
    </AuthContext.Provider>
  );
}

export default App;
