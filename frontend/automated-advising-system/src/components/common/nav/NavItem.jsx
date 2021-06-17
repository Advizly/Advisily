import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ label, extraClasses = "", to = "" }) {
  return (
    <li className="navbar-item mx-2">
      <NavLink to={to} className={"nav-link " + extraClasses}>
        {label}
      </NavLink>
    </li>
  );
}

export default NavItem;
