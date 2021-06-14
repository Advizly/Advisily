import React from "react";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";

//This comopnent is no reusable--> used for better readability
function NavBrand() {
  return (
    <NavLink className="navbar-brand" to="#">
      <img
        src={logo}
        width={150}
        height={70}
        alt="The American University in Cairo logo"
      />
      AAS
    </NavLink>
  );
}

export default NavBrand;
