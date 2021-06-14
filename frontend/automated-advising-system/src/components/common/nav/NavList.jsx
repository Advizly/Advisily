import React from "react";

function NavList({ children, extraClasses = "", ...others }) {
  return (
    <ul className={"navbar-nav " + extraClasses} {...others}>
      {children}
    </ul>
  );
}

export default NavList;
