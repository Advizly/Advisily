import React from "react";
import { FormInput } from "../common/form";

const AccountInfo = () => {
  return (
    <>
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
        name="repeatPassword"
        type="password"
      />
    </>
  );
};

export default AccountInfo;
