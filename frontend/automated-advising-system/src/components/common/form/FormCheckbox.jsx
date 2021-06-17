import React from "react";
import { useField } from "formik";
import ErrorMessage from "./FormError";

function FormCheckbox({ label, ...props }) {
  const [field, meta] = useField(props);
  const className = meta.error
    ? "form-check-input is-invalid"
    : " form-check-input";

  return (
    <div className="form-check">
      <label htmlFor={props.name}>{label}</label>
      <input type="checkbox" className={className} {...field} {...props} />
      {<ErrorMessage error={meta.error} visible={meta.error && meta.touched} />}
    </div>
  );
}

export default FormCheckbox;
