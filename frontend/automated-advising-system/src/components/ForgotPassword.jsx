import React from "react";
import { Form, FormInput, SubmitButton } from "./common/form";
import * as Yup from "yup";

function ForgotPassword(props) {
  const initalValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <Form
      initialValues={initalValues}
      validationSchema={validationSchema}
      title="Reset Password"
    >
      <FormInput type="email" name="email" label="AUC Eamil" />
      <SubmitButton />
    </Form>
  );
}

export default ForgotPassword;
