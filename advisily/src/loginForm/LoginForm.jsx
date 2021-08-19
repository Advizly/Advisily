import React from "react";
import { Link, Redirect } from "react-router-dom";

import { Form, FormInput, SubmitButton } from "../components/common/form";
import GoogleLogin from "../components/GoogleLogin";
import auth from "../services/authService";
import useAuth from "../hooks/useAuth";

import defaultValues from "./defaultValues";
import validationSchema from "./validationSchema";
import { PASSWORD, EMAIL } from "./fieldNames";
function LoginForm(props) {
  const { user } = useAuth();
  if (user) return <Redirect to="/" />;

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
        // setErrors({ studentId: "", password: "" });
        setStatus({ error: response.data });
      }
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
        {/* <FormInput
          label="AUC ID"
          name="studentId"
          type="number"
          aria-required="true"
        /> */}
        <FormInput
          label="Password"
          name={PASSWORD}
          type="password"
          aria-required="true"
        />
        <div className="d-flex justify-content-between ">
          <Link to="/forgot-password">Forgot password?</Link>
          <p>
            New user?<Link to="/sign-up"> Sign up</Link>
          </p>
        </div>
        <div>
          <p>
            <Link to="/email-verification"> Resend email verification?</Link>
          </p>
        </div>
        <SubmitButton label="Login" />
      </Form>
      <div className="d-flex justify-content-center">
        <strong className="text-center">
          Or login in using
          <GoogleLogin />
        </strong>
      </div>
    </div>
  );
}

export default LoginForm;
