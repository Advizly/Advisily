import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { Form } from "../common/form";
import GoogleLogin from "../GoogleLogin";
import SubmitButton from "../common/form/SubmitButton";
import AccountInfo from "./AccountInfo";
import MajorInfo from "../advising/MajorInfo";

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const next = () => setStep((step) => step + 1);
  const back = () => setStep((step) => step - 1);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    password: "",
    passwordConfirmation: "",

    majorId: "",
    catalogId: "",
    isDoubleMajoring: "",
    secondMajorId: "",
    secondMajorCatalogId: "",
    isMinoring: "",
    minorsId: [],
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Please enter a valid name")
      .min(1)
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Please enter a valid name")
      .min(1)
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required(" Required."),
    studentId: Yup.number()
      .integer()
      .min(100000000, "Studnet ID must be positive and consist of 9 digits")
      .max(999999999, "Studnet ID must consist of no more than 9 digits")
      .required("Required"),

    password: Yup.string()
      .min(8, "You password must contain at least 8 characters")
      .matches(/^\S*$/, "Password can't contain spaces")
      .matches(/[a-zA-Z]/, "Password must have at least one letter")
      .matches(/\d/, "Password must have at least one number")
      .required("Required"),
    passwordConfirmation: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords don't match"),

    catalogId: Yup.string().required("Required"),
    majorId: Yup.string().required("Required Major"),
    isMinoring: Yup.boolean().required("Required"),
    minorsId: Yup.array().required(),
    isDoubleMajoring: Yup.boolean().required("Required"),
    secondMajorId: Yup.string()
      .notRequired()
      .when("isDoubleMajoring", {
        is: true,
        then: Yup.string()
          .required("Select your second major")
          .notOneOf(
            [Yup.ref("majorId"), null],
            "You can't select the same major"
          ),
      }),
    secondMajorCatalogId: Yup.string()
      .notRequired()
      .when("isDoubleMajoring", {
        is: true,
        then: Yup.string().required("Required"),
      }),
  });

  const onSubmit = (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setInterval(() => setSubmitting(false), 2000);
  };

  return (
    <>
      <Form
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={initialValues}
        title={"Sign Up"}
      >
        {step === 1 && <AccountInfo />}

        {step === 2 && <MajorInfo />}

        <div className="d-flex justify-content-between ">
          {step === 1 && (
            <>
              <button className="btn my-3 ms-auto" onClick={next} type="button">
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button className="btn my-3" onClick={back} type="button">
                Back
              </button>
              <SubmitButton label="Sign Up" />
            </>
          )}
        </div>

        {/* Already a user */}
        <div className="d-flex align-items-center">
          <p className="ms-auto ">
            Already a user? <Link to="/login">Login</Link>
          </p>
        </div>
      </Form>
      <div className="d-flex justify-content-center">
        <strong className="text-center">
          Or login in using
          <GoogleLogin />
        </strong>
      </div>
    </>
  );
};

export default SignUpForm;
