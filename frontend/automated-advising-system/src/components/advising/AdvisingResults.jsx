import React from "react";
import { Link } from "react-router-dom";

function AdvisingResults(props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="frame ">
        <h1 className="text-center">Your results are here!</h1>
        <h5>Status:</h5>
        <p>
          <strong>On track</strong>. Keep it going! you are currently moving on
          track and expected to graduate after 4 semester.
        </p>
        <h5>Recomended courses:</h5>
        <ul>
          <li>Course 1</li>
          <li>Course 2</li>
          <li>Course 3</li>
          <li>Course 4</li>
          <li>Lab 1</li>
        </ul>
        <strong>Total Credits: </strong>13
        <h5 className="my-2">
          You may choose 1 courses from the following to reach <em>16 </em>
          credits:
        </h5>
        <ul>
          <li>Course A</li>
          <li>Course B</li>
          <li>Course C</li>
        </ul>
        <h5>Recommendations:</h5>
        <ol>
          <li>
            It is recommended that you take one or more of the following
            courses:
            <ul>
              <li>Course 1</li>
              <li>Course 2</li>
              <li>Course 3</li>
            </ul>
          </li>
          <strong>Or</strong>
          <li>Take one of the following courses next summer:</li>
          <ul>
            <li>Course 1</li>
            <li>Course 3</li>
          </ul>
        </ol>
        <hr />
        <Link to="/advising/form" replace>
          <button className="btn ">New Advising Session?</button>
        </Link>
      </div>
    </div>
  );
}

export default AdvisingResults;
