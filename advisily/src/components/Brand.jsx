import React from "react";
import { ADVISILY } from "../constant/websiteName";

function Brand(props) {
  return (
    <div className="navbar-item brand-title">
      <h1 id="brand">{ADVISILY}</h1>
    </div>
  );
}

export default Brand;
