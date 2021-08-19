import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { Form, FormInput, SubmitButton } from "../components/common/form";
import resetPasswordDefaultValues from "./defaultValues";
import resetPasswordSchema from "./validationSchema";
import { PASSWORD, REPEAT_PASSWORD } from "./fieldNames";
import { resetPassword, validateResetToken } from "../services/userService";
import { Redirect } from "react-router-dom";

function ResetPassword(props) {
  const TokenStatus = {
    invalid: "Invalid",
    valid: "Valid",
    validating: "Validating",
  };

  const [token, setToken] = useState();
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.validating);
  useEffect(() => {
    const { token: queryToken } = queryString.parse(props.location.search);
    props.history.replace(props.location.pathname);
    validateResetToken(queryToken)
      .then(() => {
        setToken(queryToken);
        setTokenStatus(TokenStatus.valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.invalid);
      });
  }, []);

  const handleSubmit = async ({ password }) => {
    try {
      const res = await resetPassword(token, password);
      console.log(res.data);
      alert("Success");
    } catch (error) {
      console.log(error);
    }
  };
  const getForm = () => (
    <Form
      initialValues={resetPasswordDefaultValues}
      title="Reset Password"
      validationSchema={resetPasswordSchema}
      onSubmit={handleSubmit}
    >
      <FormInput name={PASSWORD} type="password" label="Password" />
      <FormInput
        name={REPEAT_PASSWORD}
        type="password"
        label="Repeat password"
      />
      <SubmitButton />
    </Form>
  );

  const getBody = () => {
    switch (tokenStatus) {
      case TokenStatus.valid:
        return getForm();
      case TokenStatus.invalid:
        return <Redirect to={{ pathname: "/" }} />;
      default:
        return <div>Validating your request...</div>;
    }
  };

  return getBody();
}

export default ResetPassword;
