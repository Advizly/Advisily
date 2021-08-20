import React from "react";
import { Form, FormInput, SubmitButton } from "../../components/form";
import * as Yup from "yup";
import { forgotPassword } from "../../services/userService";

function ForgotPassword(props) {
  const initalValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleSubmit = async ({ email }) => {
    try {
      const res = await forgotPassword(email);
      console.log(res);
      alert(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      initialValues={initalValues}
      validationSchema={validationSchema}
      title="Reset Password"
      onSubmit={handleSubmit}
    >
      <FormInput type="email" name="email" label="AUC Eamil" />
      <SubmitButton />
    </Form>
  );
}

export default ForgotPassword;
