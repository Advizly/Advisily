import { useField } from "formik";
import React from "react";

function FormInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="form-group">
        <label htmlFor={props.name || props.id}>{label}</label>
        <input className="form-control" {...field} {...props} />
      </div>
      {meta.touched && meta.error ? (
        <div className="alert alert-danger">{meta.error}</div>
      ) : null}
    </>
  );
}

export default FormInput;
