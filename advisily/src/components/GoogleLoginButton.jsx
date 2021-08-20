import React from "react";
import googleLogo from "../assets/pictures/google-logo.png";

function GoogleLoginButton(props) {
  return (
    <button className="google-login" type="button" {...props}>
      <img src={googleLogo} alt="Google Logo" />
      <strong>Google</strong>
    </button>
  );
}

export default GoogleLoginButton;
