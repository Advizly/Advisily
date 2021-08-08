import React from "react";
import googleLogo from "../assets/google.png";

function GoogleLogin(props) {
  return (
    <button className="google-login" type="button" {...props}>
      <img src={googleLogo} alt="Google Logo" />
      <strong>Google</strong>
    </button>
  );
}

export default GoogleLogin;
