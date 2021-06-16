import React from "react";
import * as Yup from "yup";
import { Form, FormInput, SubmitButton } from "./common/form";
function LoginForm(props) {
  const initialValues = {
    studentId: "",
    password: "",
  };

  const validationSchema = Yup.object({
    studentId: Yup.number()
      .integer()
      .min(100000000, "Invalid student ID")
      .max(999999999, "Invalid student ID")
      .required("Student ID is required"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <>
      <Form
        title="Login"
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <FormInput label="Student ID" name="studentId" type="number" />
        <FormInput label="Password" name="password" type="password" />
        <div className="d-flex my-2 ">
          <a href="#">Forgot password?</a>
          <p className="ms-auto">
            New user?<a href="#"> Sign up</a>
          </p>
        </div>
        <SubmitButton />
        <div className="d-flex justify-content-end">
          <p>
            Or login in using <a href="#"> Google</a>
          </p>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
