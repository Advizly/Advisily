import React from "react";
import { NavLink } from "react-router-dom";

import { Nav, NavItem, NavList } from "./common/nav";
import Logo from "./common/Logo";
import Brand from "./common/Brand";
import { ColMedium } from "./common/grid";

function Header(props) {
  return (
    <Nav>
      <ColMedium numOfCols="4" className="d-flex">
        <NavLink className="navbar-brand " to="/">
          <Logo />
        </NavLink>

        <NavList>
          <NavItem label="Home" to="/" />
          <NavItem label="Discover" to="/courses-form" />
        </NavList>
      </ColMedium>
      <ColMedium numOfCols="4">
        <Brand />
      </ColMedium>
      <ColMedium numOfCols="auto">
        <NavList extraClasses="nav-right">
          <NavItem to="/login" label="Login" />
          <NavItem to="/sign-up" label="Sign Up" extraClasses="nav-btn" />
        </NavList>
      </ColMedium>
    </Nav>
  );
}

export default Header;
