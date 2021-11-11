import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ResetPassword from "./resetPassword/ResetPassword";
import ForgotPassword from "./forgotPassword/ForgotPassword";
import LoginForm from "./loginForm/LoginForm";
import SignUpForm from "./signUpForm/SignupForm";
import VerifyEmail from "./verifyEmail/VerifyEmail";

import {
  ACCOUNT_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGN_UP_ROUTE,
  VERIFY_EMAIL_ROUTE,
} from "./routes";
import { NOT_FOUND_ROUTE } from "../common";
import auth from "../services/authService";

function AccountRouter({ history }) {
  useEffect(() => {
    if (auth.getCurrentUser()) history.push("/");
  }, [history]);

  return (
    <Switch>
      <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPassword} />
      <Route path={RESET_PASSWORD_ROUTE} component={ResetPassword} />
      <Route path={VERIFY_EMAIL_ROUTE} component={VerifyEmail} />
      <Route path={LOGIN_ROUTE} component={LoginForm} />
      <Route path={SIGN_UP_ROUTE} component={SignUpForm} />
      <Redirect to={{ pathname: { NOT_FOUND_ROUTE } }} />
    </Switch>
  );
}
export {
  ACCOUNT_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGN_UP_ROUTE,
  VERIFY_EMAIL_ROUTE,
};
export default AccountRouter;
