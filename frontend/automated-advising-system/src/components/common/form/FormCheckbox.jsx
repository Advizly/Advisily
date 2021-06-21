import React from "react";
import { useField } from "formik";
import ErrorMessage from "./FormError";

function FormCheckbox({ label, test, ...props }) {
  const [field, meta] = useField(props);
  const inputClassName = meta.error
    ? "form-check-input is-invalid"
    : " form-check-input";
  const divClassName = props.disabled ? "form-check-disabled" : "";
  return (
    <div className={"form-check " + divClassName}>
      <label htmlFor={props.name}>{label}</label>
      <input type="checkbox" className={inputClassName} {...field} {...props} />
      {<ErrorMessage error={meta.error} visible={meta.error && meta.touched} />}
    </div>
  );
}

export default FormCheckbox;
