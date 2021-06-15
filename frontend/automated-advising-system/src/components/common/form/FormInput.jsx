import { useField } from "formik";
import React from "react";
import ErrorMessage from "./FormError";

function FormInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="form-group">
        <label htmlFor={props.name || props.id}>{label}</label>
        <input className="form-control" {...field} {...props} />
      </div>
      <ErrorMessage error={meta.error} visible={meta.touched && meta.error} />
    </>
  );
}

export default FormInput;
