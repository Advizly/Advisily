import React from "react";
import NavBrand from "./NavBrand";

function Nav({ children }) {
  return (
    <nav className="navbar app-header navbar-expand-lg navbar-dark ">
      {children}
    </nav>
  );
}

export default Nav;
