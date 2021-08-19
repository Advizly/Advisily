import React from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";

function EmailVerification() {
  const user = auth.getCurrentUser();
  if (user) return <Redirect to={{ pathname: "/" }} />;
  return (
    <div className="text-center my-4">
      <h1>Email Verification</h1>
      <p>
        Please check your email inbox to verify your email. If you already
        confirmed your email, <a href="/login">login here</a>.
      </p>
      <p>
        Recieved nothing?
        <button type="button" className="btn btn-sm mx-2" onClick={() => {}}>
          Resend
        </button>
      </p>
    </div>
  );
}

export default EmailVerification;
