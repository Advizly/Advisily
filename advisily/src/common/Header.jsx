import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";

import { Nav, NavItem, NavList } from "../components/nav";
import Logo from "../components/Logo";
import Brand from "../components/Brand";
import { ColMedium } from "../components/grid";
import { ADMIN_HOME_ROUTE}from "../admin/routes" 
import { LOGIN_ROUTE, SIGN_UP_ROUTE } from "../account/routes";
import { LOGOUT_ROUTE, PROFILE_ROUTE } from "../profile";
import { ADVISED_USERS_ROUTE, ADVISING_HOME_ROUTE } from "../advising/routes";
// import { ADMIN_HOME_ROUTE } from "/Users/layla/Desktop/Advisily/advisily/src/admin/routes.js";

function Header({ user }) {
  return (
    <Nav>
      <ColMedium numOfCols="4" className="d-flex">
        <NavLink className="navbar-brand " to="/">
          {/* <Logo /> */}
        </NavLink>

        <NavList>
          <NavItem label="Home" to="/" />
          {user && <NavItem label="Advising" to={ADVISING_HOME_ROUTE} />}
          {!!(user && user.isAdmin) && (
            <NavItem label="Advised Students" to={ADVISED_USERS_ROUTE} />,
            <NavItem label="Admin View" to={ADMIN_HOME_ROUTE} />
          )}
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
              <NavItem to={PROFILE_ROUTE} label={user.firstName} />
              <NavItem to={LOGOUT_ROUTE} label="Logout" extraClasses="btn" />
            </>
          )}
        </NavList>
      </ColMedium>
    </Nav>
  );
}

export default Header;
