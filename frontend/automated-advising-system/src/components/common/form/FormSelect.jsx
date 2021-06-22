import React from "react";
import { useField } from "formik";
import FormError from "./FormError";

function FormSelect({ label, ...props }) {
  const [field, meta] = useField(props);
  const className =
    meta.error && meta.touched ? "form-control is-invalid" : "form-control";

  return (
    <>
      <div className="form-group">
        <label>{label}</label>
        <select
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

export default FormSelect;
