import React from "react";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { Form, FormInput, SubmitButton } from "./common/form";
import GoogleLogin from "./GoogleLogin";
import auth from "../services/authService";
import useAuth from "../hooks/useAuth";
function LoginForm(props) {
  const { user } = useAuth();
  if (user) return <Redirect to="/" />;

  const initialValues = {
    studentId: "",
    password: "",
  };
  const validationSchema = Yup.object({
    // email: Yup.string()
    //   .email("Invalid email")
    //   .required("Student Email is required"),
    // studentId: Yup.number()
    //   .positive()
    //   .integer()
    //   .min(100000000, "Studnet ID must be positive and consist of 9 digits")
    //   .max(999999999, "Studnet ID must consist of no more than 9 digits")
    //   .required("Student ID is required"),
    // password: Yup.string().required("Password is required"),
  });
  const onSubmit = async (values, { setErrors }) => {
    try {
      // const { studentId, password } = values;
      const studentId = 900192240,
        password = "abcd1234";
      await auth.login(studentId, password);
      const user = auth.getCurrentUser();
      console.log("User from login: ", user);

      window.location = "/advising";
      // console.log(location);
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
        initialValues={initialValues}
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
