import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, FormInput, SubmitButton } from "../components/common/form";
import GoogleLogin from "../components/GoogleLogin";
import auth from "../services/authService";
import useAuth from "../hooks/useAuth";

import defaultValues from "./defaultValues";
import validationSchema from "./validationSchema";
function LoginForm(props) {
  const { user } = useAuth();
  if (user) return <Redirect to="/" />;

  const onSubmit = async (values, { setErrors }) => {
    console.log("Values: ", values);
    try {
      const { studentId, password } = values;

      await auth.login(studentId, password);
      const user = auth.getCurrentUser();
      console.log("User from login: ", user);

      window.location = "/advising";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
        setErrors({ studentId: " ", password: ex.response.data });
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
        {/* <FormInput
          label="AUC email"
          name="email"
          type="email"
          aria-required="true"
        /> */}
        <FormInput
          label="AUC ID"
          name="studentId"
          type="number"
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
