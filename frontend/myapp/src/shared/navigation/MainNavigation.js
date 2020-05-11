import React from "react";

import NavLinks from "./NavLinks";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <nav className="main-navigation__header-nav">
      <NavLinks />
    </nav>
  );
};

export default MainNavigation;
