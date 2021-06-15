import React from "react";
import * as Yup from "yup";
import { FormInput, Form } from "./common/form";
import SubmitButton from "./common/form/SubmitButton";

const SignUpForm = () => {
  const initialValues = { firstName: "", lastName: "", email: "" };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
  });

  const onSubmit = (values) => alert(JSON.stringify(values, null, 2));

  return (
    <Form
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
      title="Sign Up"
    >
      <FormInput label="First Name" name="firstName" />
      <FormInput label="Last Name" name="lastName" />
      <FormInput label="Email " name="email" />
      <SubmitButton />
    </Form>
  );
};

export default SignUpForm;
