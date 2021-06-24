import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { FormInput, Form, FormSelectGroup } from "./common/form";
import GoogleLogin from "./GoogleLogin";
import SubmitButton from "./common/form/SubmitButton";
import { getCatalogs } from "../services/catalogsService";
import { getMajors } from "../services/majorsService";

const SignUpForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    catalog: "",
    major: "",
    password: "",
    passwordConfirmation: "",
  };
  const catalogs = getCatalogs();
  const majors = getMajors();

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
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
    studentId: Yup.number()
      .integer()
      .min(100000000, "Studnet ID must be positive and consist of 9 digits")
      .max(999999999, "Studnet ID must consist of no more than 9 digits")
      .required("Student ID is required"),

    password: Yup.string()
      .min(8, "You password must contain at least 8 characters")
      .matches(/^\S*$/, "Password can't contain spaces")
      .matches(/[a-zA-Z]/, "Password must have at least one letter")
      .matches(/\d/, "Password must have at least one number")
      .required("Password is required"),
    passwordConfirmation: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords don't match"),
    catalog: Yup.string().required("You need to select a catalog"),
  });

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Form
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
      title="Sign Up"
    >
      <div className="d-flex">
        <div>
          <FormInput label="First Name" name="firstName" aria-required="true" />
        </div>
        <div className="mx-3">
          <FormInput label="Last Name" name="lastName" aria-required="true" />
        </div>
      </div>
      <FormInput
        label="AUC Email "
        name="email"
        type="email"
        aria-required="true"
      />
      <FormInput
        label="Student ID"
        name="studentId"
        type="number"
        aria-required="true"
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        aria-required="true"
      />
      <FormInput
        label="Confirm Password"
        name="passwordConfirmation"
        type="password"
      />

      <FormSelectGroup
        label="Declaration Catalog"
        name="catalog"
        aria-required="true"
        defaultOption="--select a catalog--"
        items={catalogs}
        valueSelector="id"
      />
      <FormSelectGroup
        label="Major"
        name="major"
        aria-required="true"
        defaultOption="--select a major--"
        items={majors}
        valueSelector="id"
      />

      <SubmitButton label="Sign Up" />
      <div className="d-flex align-items-center">
        <p className="ms-auto ">
          Already a user? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="d-flex justify-content-center">
        <strong className="text-center">
          Or login in using
          <GoogleLogin />
        </strong>
      </div>
    </Form>
  );
};

export default SignUpForm;
