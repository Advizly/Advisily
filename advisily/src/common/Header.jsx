import React from "react";
import { NavLink } from "react-router-dom";

import { Nav, NavItem, NavList } from "../components/nav";
import Logo from "../components/Logo";
import Brand from "../components/Brand";
import { ColMedium } from "../components/grid";

import { LOGIN_ROUTE, LOGOUT_ROUTE, SIGN_UP_ROUTE } from "../account/routes";

function Header({ user }) {
  return (
    <Nav>
      <ColMedium numOfCols="4" className="d-flex">
        <NavLink className="navbar-brand " to="/">
          <Logo />
        </NavLink>

        <NavList>
          <NavItem label="Home" to="/" />
          {user && <NavItem label="Advise" to="/advising" />}
        </NavList>
      </ColMedium>
      <ColMedium numOfCols="4">
        <Brand />
      </ColMedium>
      <ColMedium numOfCols="auto">
        <NavList extraClasses="nav-right">
          {!user && (
            <>
              <NavItem to={LOGIN_ROUTE} label="Login" />
              <NavItem
                to={SIGN_UP_ROUTE}
                label="Sign Up"
                extraClasses="btn"
                id="nav-signup-btn"
              />
            </>
          )}
          {user && (
            <>
              <NavItem to="/me" label={user.firstName} />
              <NavItem to={"LOGOUT_ROUTE"} label="Logout" extraClasses="btn" />
            </>
          )}
        </NavList>
      </ColMedium>
    </Nav>
  );
}

export default Header;
