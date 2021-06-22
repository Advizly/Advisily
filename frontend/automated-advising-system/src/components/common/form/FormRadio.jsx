import React from "react";
import { useField } from "formik";

function FormRadio({ label, ...props }) {
  const [field, meta] = useField(props);
  const inputClassName =
    meta.error && meta.touched
      ? "form-check-input is-invalid"
      : " form-check-input";
  return (
    <div className={"form-check"}>
      <label htmlFor={props.name} className="form-check-label">
        <input type="radio" className={inputClassName} {...field} {...props} />
        {label}
      </label>
    </div>
  );
}

export default FormRadio;
