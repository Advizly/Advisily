import React from "react";
import PropTypes from "prop-types";

import { ADVISILY } from "../constant/websiteName";

const NotOperating = (props) => {
  return (
    <div>
      <p>Sorry, {ADVISILY} is not currently operating.</p>
    </div>
  );
};

export default NotOperating;
