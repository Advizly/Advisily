import React from "react";
import { Link } from "react-router-dom";
import { ADVISILY } from "../constant/websiteName";
function AdvisingHome(props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="frame">
        <h1 className="text-center mb-3">Advising</h1>
        <h3>Why {ADVISILY}?</h3>
        <ul>
          <li>
            <strong>No more waiting!</strong>
            <p>
              with an automated advisor you don't need to schedule an
              appointment and wait for your turn.
            </p>
          </li>
          <li>
            <strong>Quick</strong>
            <p>You are only a couple of button presses away from your plan.</p>
          </li>
          <li>
            <strong>See ahead in the future</strong>
            <p>
              We will create for you a plan up until graduation. However, seeing
              further ahead in the future is less accurate.
            </p>
          </li>
        </ul>
        <h3>Important notes </h3>
        <li>
          <strong>It is not perfect</strong>
          <p>
            This is just an automated advisor that is meant to help you with
            your advising. It is still subject to error, so you have to review
            the results and ensure there are no problem. If you have any doubts
            about your results, you may schedule an appointment with your human
            advisor.
          </p>
        </li>
        <li>
          <strong>Seeing ahead in the future is not accurate</strong>
          <p>
            The more semesters generated ahead of time, the less accurate the
            results.
          </p>
        </li>
        {/* <h3>How things work?</h3>
        <p>
          <em>Your role </em>&mdash; You only need to answer some questions
          about major-related info and your preferences and leave the rest to
          us!
        </p>
        <p>
          <em>Our role </em>&mdash; We generate a plan for you courses according
          to your preferences.
        </p> */}
        {/* <h3>What are you waiting for?</h3> */}
        <div className="my-5 text-center">
          <Link to="/advising/form" className="m-4">
            <button className="btn btn-primary btn-lg">
              Let's get started!
            </button>
          </Link>
          <Link to="/advising/results">
            <button className="btn btn-lg"> Previous result</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdvisingHome;
