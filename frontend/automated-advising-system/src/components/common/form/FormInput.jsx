import { useField } from "formik";
import React from "react";
import FormError from "./FormError";

function FormInput({ label, visible = true, ...props }) {
  const [field, meta] = useField(props);
  if (!visible) return null;
  const className =
    meta.error && meta.touched ? "form-control is-invalid" : "form-control";
  return (
    <>
      <div className="form-group">
        <label htmlFor={props.name || props.id}>{label}</label>
        <input
          className={className}
          aria-invalid={meta.error}
          {...field}
          {...props}
        />
      </div>
      <FormError error={meta.error} visible={meta.touched && meta.error} />
    </>
  );
}

export default FormInput;
