import React from "react";
import { useState } from "react";
import * as Yup from "yup";

import { FormInput, Form, FormSelect } from "./common/form";
import SubmitButton from "./common/form/SubmitButton";

const catalogs = [
  { id: "1", name: "Fall2019" },
  { id: "2", name: "Spring 2019" },
  { id: "3", name: "Fall 2020" },
  { id: "4", name: "Spring 2020" },
  { id: "5", name: "Fall 2021" },
  { id: "6", name: "Spring 2021" },
];

const SignUpForm = () => {
  const [selectCatalog, setSelectCatalog] = useState(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    catalog: "",
    password: "",
    passwordConfirmation: "",
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
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
    studentId: Yup.number()
      .integer()
      .min(100000000, "Studnet ID must be positive and consist of 9 digits")
      .max(999999999, "Studnet ID must consist of no more than 9 digits")
      .required("Student ID is required"),
    catalog: Yup.string().required("Catalog is required"),

    password: Yup.string()
      .min(5)
      .matches(/^\S*$/, "Password can't contain spaces")
      .required("Password is required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
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
      <FormInput label="First Name" name="firstName" />
      <FormInput label="Last Name" name="lastName" />
      <FormInput label="AUC Email " name="email" type="email" />
      <FormInput label="Student ID" name="studentId" type="number" />
      <FormInput label="Password" name="password" type="password" />
      <FormInput
        label="Confirm Password"
        name="passwordConfirmation"
        type="password"
      />
      <FormSelect label="Declaration Catalog" name="catalog">
        <option value="" disabled>
          --select a catalog---
        </option>
        {catalogs.map((catalog) => (
          <option key={catalog.id}>{catalog.name}</option>
        ))}
      </FormSelect>

      <SubmitButton />
    </Form>
  );
};

export default SignUpForm;
