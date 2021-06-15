import React from "react";

import { Nav, NavItem, NavList } from "./common/nav";

function NavBar(props) {
  return (
    <Nav>
      <NavList>
        <NavItem label="Home" />
      </NavList>

      <NavList extraClasses="ms-auto">
        <NavItem label="Login" />
        <NavItem label="Sign Up" />
      </NavList>
    </Nav>
  );
}

export default NavBar;
