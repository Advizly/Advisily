import React from "react";
import { useField } from "formik";

function  FormCheckbox({ label, ...props }) {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  const inputClassName = meta.error
    ? "form-check-input is-invalid"
    : " form-check-input";
  const divClassName = field.checked ? "form-check-disabled " : "";
  return (
    <div className={"form-check " + divClassName}>
      <label htmlFor={props.value} className="form-check-label">
        {label}
      </label>
      <input
        type="checkbox"
        id={props.value}
        className={inputClassName}
        {...field}
        {...props}
      ></input>
    </div>
  );
}

export default FormCheckbox;
