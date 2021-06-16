import React from "react";
import { Field } from "formik";

function FormCheckbox({ label, name, ...rest }) {
  return (
    <div className="form-check">
      <Field
        type="checkbox"
        id={name}
        name={name}
        {...rest}
        className="form-check-input"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default FormCheckbox;
