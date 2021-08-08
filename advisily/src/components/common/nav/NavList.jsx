import React from "react";

function NavList({ children, extraClasses = "", ...others }) {
  return (
    <ul className={"navbar-nav nav-list " + extraClasses} {...others}>
      {children}
    </ul>
  );
}

export default NavList;
