import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="text-center home-container">
      <h1> Your new academic advisor is here!</h1>
      <p className="home-text font-italic my-4">
        Advisify is an automated advisor to help you choose your courses.
      </p>
      <div className="home-buttons d-flex justify-content-center">
        {/* <Link to="/login">
          <button id="home-login-btn" className="btn  mx-2">
            Login
          </button>
        </Link> */}
        <Link to="/sign-up">
          <button id="home-signup-btn" className="btn nav-btn ">
            Get Started!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
