import React from "react";
import { useField } from "formik";
import FieldError from "./FieldError";

function FormInput({ label, visible = true, ...props }) {
  const [field, { error, touched }] = useField(props);
  if (!visible) return null;
  const className =
    error && touched ? "form-control is-invalid" : "form-control";

  return (
    <>
      <div className="form-group">
        <label className="form-label" htmlFor={props.name || props.id}>
          {label}
        </label>
        <input
          className={className}
          aria-invalid={error}
          {...field}
          {...props}
        />
      </div>
      <FieldError name={props.name} />
    </>
  );
}

export default FormInput;
