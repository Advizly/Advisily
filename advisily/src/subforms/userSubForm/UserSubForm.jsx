import React from "react";
import { FormInput } from "../../components/form";
import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  STUDENT_ID,
  PASSWORD,
  REPEAT_PASSWORD,
} from "./fieldNames";

const UserSubForm = () => {
  return (
    <>
      <div className="d-flex">
        <div>
          <FormInput
            label="First Name"
            name={FIRST_NAME}
            aria-required="true"
          />
        </div>
        <div className="mx-3">
          <FormInput label="Last Name" name={LAST_NAME} aria-required="true" />
        </div>
      </div>
      <FormInput
        label="AUC Email"
        name={EMAIL}
        type="email"
        aria-required="true"
      />
      <FormInput
        label="Student ID"
        name={STUDENT_ID}
        type="number"
        aria-required="true"
      />
      <FormInput
        label="Password"
        name={PASSWORD}
        type="password"
        aria-required="true"
      />
      <FormInput
        label="Confirm Password"
        name={REPEAT_PASSWORD}
        type="password"
      />
    </>
  );
};

export default UserSubForm;
