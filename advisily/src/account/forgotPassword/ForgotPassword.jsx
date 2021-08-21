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

  const handleSubmit = async ({ email }, { setStatus }) => {
    try {
      const res = await forgotPassword(email);
      console.log(res.data.message);
      alert(res.data.message);
    } catch (ex) {
      const { response } = ex;
      if (response && response.data && response.data.error)
        setStatus({ error: response.data.error });
      else setStatus({ error: "Unexpected error happened!" });
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
