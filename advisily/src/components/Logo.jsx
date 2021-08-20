import React from "react";
import logo from "../assets/pictures/auc-logo.png";

function Logo() {
  return (
    <div className="container bg-light rounded logo ">
      <img
        src={logo}
        width={100}
        height={60}
        alt="The American University in Cairo logo"
      />
    </div>
  );
}

export default Logo;
