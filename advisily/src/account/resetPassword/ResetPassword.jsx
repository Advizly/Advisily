import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

import { Form, FormInput, SubmitButton } from "../../components/form";
import { resetPassword, validateResetToken } from "../../services/userService";

import resetPasswordDefaultValues from "./defaultValues";
import resetPasswordSchema from "./validationSchema";
import { PASSWORD, REPEAT_PASSWORD } from "./fieldNames";

function ResetPassword(props) {
  const TokenStatus = {
    invalid: "Invalid",
    valid: "Valid",
    validating: "Validating",
  };

  const [token, setToken] = useState();
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.validating);

  const { location, history } = props;
  useEffect(() => {
    const { token: queryToken } = queryString.parse(location.search);
    console.log("Query :", queryToken);
    history.replace(location.pathname);
    validateResetToken(queryToken)
      .then(() => {
        setToken(queryToken);
        setTokenStatus(TokenStatus.valid);
      })
      .catch((err) => {
        console.log(err.response);
        setTokenStatus(TokenStatus.invalid);
      });
  }, []);

  const handleSubmit = async ({ password }) => {
    try {
      const res = await resetPassword(token, password);
      console.log(res.data);
      alert("Password reset successfuly. You can login with the new password.");
      window.location("/login");
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
      <FormInput name={PASSWORD} type="password" label="New password" />
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
