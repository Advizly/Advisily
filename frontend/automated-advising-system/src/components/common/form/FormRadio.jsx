import React from "react";
import { useField } from "formik";

function FormRadio({ label, ...props }) {
  const [field, { error, touched }] = useField({ ...props, type: "radio" });
  const inputClassName =
    error && touched ? "form-check-input is-invalid" : " form-check-input";
  return (
    <div className="form-check">
      <label htmlFor={props.name} className="form-check-label">
        <input
          type="radio"
          className={inputClassName}
          checked={field.value}
          {...field}
          {...props}
        />
        {label}
      </label>
    </div>
  );
}

export default FormRadio;
