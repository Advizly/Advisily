import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ label, extraClasses = "", to = "", ...props }) {
  return (
    <li className={"navbar-item mx-2 " + extraClasses} {...props}>
      <NavLink to={to} className={"nav-link "}>
        {label}
      </NavLink>
    </li>
  );
}

export default NavItem;
