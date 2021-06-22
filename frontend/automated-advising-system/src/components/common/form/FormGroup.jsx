import React from "react";
import { useField } from "formik";
import FormError from "./FormError";

function FormGroup({ title, ...props }) {
  const [meta] = useField(props);
  return (
    <>
      <h4>{title}</h4>
      <div className="form-group">{props.children}</div>
      {<FormError error={meta.error} visible={meta.error && meta.touched} />}
    </>
  );
}

export default FormGroup;
