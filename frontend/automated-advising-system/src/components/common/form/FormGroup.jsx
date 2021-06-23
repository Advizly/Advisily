import React from "react";
import { useField } from "formik";
import FormError from "./FormError";

function FormGroup({ title, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <h5>{title}</h5>
      <div className="form-group">{props.children}</div>
      {<FormError error={meta.error} visible={meta.error && meta.touched} />}
    </>
  );
}

export default FormGroup;
