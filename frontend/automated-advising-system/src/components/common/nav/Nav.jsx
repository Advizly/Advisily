import React from "react";
import NavBrand from "./NavBrand";

function Nav({ children }) {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark  rounded">
      <NavBrand />

      <div className="collapse navbar-collapse">{children}</div>
    </nav>
  );
}

export default Nav;
