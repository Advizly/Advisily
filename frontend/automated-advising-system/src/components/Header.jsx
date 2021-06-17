import React from "react";
import { NavLink } from "react-router-dom";

import { Nav, NavItem, NavList } from "./common/nav";
import Logo from "./common/Logo";
import Brand from "./common/Brand";

function Header(props) {
  return (
    <Nav>
      <div className="d-flex col-4">
        <NavLink className="navbar-brand " to="/">
          <Logo />
        </NavLink>

        <NavList>
          <NavItem label="Home" to="/" />
          <NavItem label="Discover" to="/discover" />
        </NavList>
      </div>
      <div className="col-4">
        <Brand />
      </div>
      <div className="col-auto">
        <NavList extraClasses="nav-right">
          <NavItem to="/login" label="Login" />
          <NavItem to="/sign-up" label="Sign Up" extraClasses="btn btn-lg" />
        </NavList>
      </div>
    </Nav>
  );
}

export default Header;
