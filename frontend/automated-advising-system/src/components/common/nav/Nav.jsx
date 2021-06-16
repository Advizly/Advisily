import React from "react";
import NavBrand from "./NavBrand";

function Nav({ children }) {
  return (
    <nav className="navbar app-header sticky-top navbar-expand-lg navbar-dark ">
      <NavBrand />

      <div className="collapse navbar-collapse">{children}</div>
    </nav>
  );
}

export default Nav;
