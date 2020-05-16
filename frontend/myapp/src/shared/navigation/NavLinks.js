import React, { useContext } from "react";

import "./NavLinks.css";
import { AuthContext } from "../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.token && <li>{<button onClick={auth.logout}>Logout</button>}</li>}
    </ul>
  );
};

export default NavLinks;
