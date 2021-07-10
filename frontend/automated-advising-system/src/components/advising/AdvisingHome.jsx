import React from "react";
import { Link } from "react-router-dom";
function AdvisingHome(props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="frame">
        <h1 className="text-center mb-3">Advising</h1>
        <h3>Why Advisly?</h3>
        <ul>
          <li>
            <strong>No more waiting!</strong>
            <p>
              with an automated advisor you don't need to schedule an
              appointment, wait for your turn, and
            </p>
          </li>
          <li>
            <strong>Quick</strong>
            <p>You are only a couple of button presses away from your plan</p>
          </li>
          <li>
            <strong>Convenience</strong>
            <p>You get to choose your preferences and we create your plan a</p>
          </li>
          <li>
            <strong>As many sessions as you want</strong>
            <p>
              Advising sessions are not once per semester. You can come again at
              any time, edit your preferences, and get a new plan.
            </p>
          </li>
        </ul>

        <h3>How things work?</h3>
        <p>
          <em>Your role </em>&mdash; You only need to answer some questions
          about major-related info and your preferences and leave the rest to
          us!
        </p>
        <p>
          <em>Our role </em>&mdash; We generate a plan for you courses according
          to your preferences.
        </p>
        <h3>What are you waiting for?</h3>
        <div className="my-5 text-center">
          <Link to="/advising/form" className="m-4">
            <button className="btn btn-primary btn-lg">
              Let's get started!
            </button>
          </Link>
          <Link to="/advising/results">
            <button className="btn btn-lg"> previous result</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdvisingHome;
