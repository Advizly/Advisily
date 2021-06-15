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
      .min(100000000, "Studnet ID must be positive and consist of 9 digits")
      .max(999999999, "Studnet ID must consist of no more than 9 digits")
      .required("Student ID is required"),
    password: Yup.string().required("Catalog is required"),
  });
  return (
    <Form
      title="Login"
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <FormInput label="Student ID" name="studentId" type="number" />
      <FormInput label="Password" name="password" type="password" />
      <SubmitButton />
    </Form>
  );
}

export default LoginForm;
