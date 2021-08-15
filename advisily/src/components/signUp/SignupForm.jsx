import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import _ from "lodash";

import { Form } from "../common/form";
import GoogleLogin from "../GoogleLogin";
import SubmitButton from "../common/form/SubmitButton";
import AccountInfo from "./AccountInfo";
import MajorInfo from "../advising/MajorInfo";
import {
  register,
  addStudentMajor,
  addStudentMinor,
} from "../../services/userService";
import auth from "../../services/authService";
import useFormStep from "../../hooks/useFormStep";
const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState(
    "one or more required field(s) is invalid."
  );
  const { next, back, step } = useFormStep();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    password: "",
    repeatPassword: "",

    majorId: "",
    catalogId: "",
    isDoubleMajoring: "",
    secondMajorId: "",
    secondCatalogId: "",
    isMinoring: "",
    minorIds: [],
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
    repeatPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords don't match"),

    catalogId: Yup.string().required("Required"),
    isMinoring: Yup.boolean().required("Required"),
    minorIds: Yup.array().required(),
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
    secondCatalogId: Yup.string()
      .notRequired()
      .when("isDoubleMajoring", {
        is: true,
        then: Yup.string().required("Required"),
      }),
  });

  const submitMajorInfo = (values) => {
    const { studentId } = auth.getCurrentUser();
    const { majorId, catalogId, secondMajorId, secondCatalogId, minorIds } =
      _.pick(values, [
        "majorId",
        "catalogId",
        "minorIds",
        "secondMajorId",
        "secondCatalogId",
      ]);
    addStudentMajor(studentId, majorId, catalogId);
    if (secondMajorId)
      addStudentMajor(studentId, secondMajorId, secondCatalogId);
    minorIds.forEach((id) => addStudentMinor(studentId, id));
  };

  const onSubmit = async (values, { setErrors }) => {
    // alert(JSON.stringify(values, null, 2));
    try {
      const res = await register(values);
      auth.loginWithJwt(res.headers["x-auth-token"]);
      submitMajorInfo(values);
      window.location = "/advising";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrorMessage("Email or ID already registered");
        setErrors({ email: " ", studentId: " " });
        console.log(ex.response.data);
      }
    }
  };

  return (
    <>
      <Form
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={initialValues}
        errorMessage={errorMessage}
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
