import React from "react";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";

//This comopnent is no reusable--> used for better readability
function NavBrand() {
  return (
    <NavLink className="navbar-brand" to="#">
      <div
        className="container bg-light rounded"
        style={{
          display: "inline-block",
          width: "fit-content",
          marginRight: 10,
        }}
      >
        <img
          src={logo}
          width={100}
          height={50}
          alt="The American University in Cairo logo"
        />
      </div>
      <div
        style={{
          display: "inline-block",
          fontFamily: "cursive",
          fontSize: 30,
        }}
      >
        Autify
      </div>
    </NavLink>
  );
}

export default NavBrand;
