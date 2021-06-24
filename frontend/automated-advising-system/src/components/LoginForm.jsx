import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Form, FormInput, SubmitButton } from "./common/form";
import GoogleLogin from "./GoogleLogin";
function LoginForm(props) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Student Email is required"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <div className="m-auto">
      <Form
        title="Login"
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <FormInput
          label="AUC email"
          name="email"
          type="email"
          aria-required="true"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          aria-required="true"
        />
        <div className="d-flex justify-content-between ">
          <Link to="/forgot-password">Forgot password?</Link>
          <p>
            New user?<Link to="/sign-up"> Sign up</Link>
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
