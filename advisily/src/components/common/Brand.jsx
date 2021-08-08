import React from "react";
import { websiteName } from "../../constant/websiteName";

function Brand(props) {
  return (
    <div className="navbar-item brand-title">
      <h1 id="brand">{websiteName}</h1>
    </div>
  );
}

export default Brand;
