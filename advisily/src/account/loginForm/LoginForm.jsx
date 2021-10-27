import React from "react";
import { Link } from "react-router-dom";

import { Form, FormInput, SubmitButton } from "../../components/form";
// import GoogleLoginButton from "../../components/GoogleLoginButton";
import auth from "../../services/authService";

import {
  FORGOT_PASSWORD_ROUTE,
  SIGN_UP_ROUTE,
  VERIFY_EMAIL_ROUTE,
} from "../routes";

import defaultValues from "./defaultValues";
import validationSchema from "./validationSchema";
import { PASSWORD, EMAIL } from "./fieldNames";
function LoginForm(props) {
  const onSubmit = async (values, { setErrors, setStatus, ...rest }) => {
    console.log("Values: ", values);
    try {
      await auth.login(values);
      window.location = "/advising";
    } catch (ex) {
      const { response } = ex;
      const { status } = response;
      if (response && (status === 400 || status === 401)) {
        console.log(response.data);
      }
      console.log(response);
      setStatus({ error: response.data.error });
    }
  };
  return (
    <div className="m-auto">
      <Form
        title="Login"
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <FormInput
          label="AUC email"
          name={EMAIL}
          type="email"
          aria-required="true"
        />

        <FormInput
          label="Password"
          name={PASSWORD}
          type="password"
          aria-required="true"
        />
        <div className="d-flex justify-content-between ">
          <Link to={FORGOT_PASSWORD_ROUTE}>Forgot password?</Link>
          <p>
            New user?
            <Link to={SIGN_UP_ROUTE}> Sign up</Link>
          </p>
        </div>
        <div>
          <p>
            <Link to={VERIFY_EMAIL_ROUTE}> Resend email verification?</Link>
          </p>
        </div>
        <SubmitButton label="Login" />
      </Form>
      {/* <div className="d-flex justify-content-center">
        <strong className="text-center">
          Or login in using
          <GoogleLoginButton />
        </strong>
      </div> */}
    </div>
  );
}

export default LoginForm;
