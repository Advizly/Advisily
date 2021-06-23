import React from "react";
import { Link } from "react-router-dom";
function Advising(props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="frame">
        <h1 className="text-center mb-3">Advising</h1>

        <h3>How it works?</h3>
        <p>
          <em>Your role</em> &mdash; Advisify will ask you for some information
          about your major and prefrences such
        </p>
        <div className="d-flex justify-content-between">
          <Link to="/advising/form">
            <button className="btn">Let's get started!</button>
          </Link>
          <Link to="/advising/results">
            <button className="btn">View previous result</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Advising;
