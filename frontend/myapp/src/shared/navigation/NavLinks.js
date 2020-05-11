import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/" exact>
            My Tasks
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" exact>
            Authentication
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>{<button onClick={auth.logout}>Logout</button>}</li>
      )}
    </ul>
  );
};

export default NavLinks;
