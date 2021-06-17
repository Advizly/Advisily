import React from "react";
import { NavLink } from "react-router-dom";

function Brand(props) {
  return (
    <div className="navbar-item brand-title">
      <NavLink id="brand" className="nav-link" to="/">
        Autify
      </NavLink>
    </div>
  );
}

export default Brand;
