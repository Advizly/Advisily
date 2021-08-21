import React from "react";
import { Link } from "react-router-dom";

import { Form, SubmitButton } from "../../components/form";
import GoogleLoginButton from "../../components/GoogleLoginButton";

import UserSubForm from "../../subforms/userSubForm/UserSubForm";

//services
import { userService } from "../../services";

//routes
import { LOGIN_ROUTE, VERIFY_EMAIL_ROUTE } from "../routes";

//form
import validationSchema from "./validationSchema";
import defaultValues from "./defaultValues";

const SignUpForm = (props) => {
  const onSubmit = async (values, { setStatus }) => {
    try {
      console.log(`Subimtting Values:`, values);
      await userService.register(values);
      alert(
        "Account registered successfuly. Please verify your email to login."
      );
      props.history.push({
        pathname: VERIFY_EMAIL_ROUTE,
        state: {
          email: values.email,
        },
      });
    } catch (ex) {
      const { response } = ex;
      if (response) {
        const { status, data } = response;

        if (status && status >= 400 && status < 500) {
          setStatus({ error: data.error });
        }

        console.log(response.data);
      }
      console.log(response);
    }
  };

  return (
    <>
      <Form
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={defaultValues}
        title={"Sign Up"}
      >
        <UserSubForm />
        <SubmitButton label="Sign Up" />

        {/* Already a user */}
        <div className="d-flex align-items-center">
          <p className="ms-auto ">
            Already a user? <Link to={LOGIN_ROUTE}>Login</Link>
          </p>
        </div>
      </Form>
      <div className="d-flex justify-content-center">
        <strong className="text-center">
          Or login in using
          <GoogleLoginButton />
        </strong>
      </div>
    </>
  );
};

export default SignUpForm;
