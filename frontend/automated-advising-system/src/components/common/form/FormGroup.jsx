import React from "react";
import { useField } from "formik";
import FormError from "./FormError";

function FormGroup({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="form-group">
        {label && <label className="form-label">{label}</label>}
        {props.children}
      </div>
      {<FormError error={meta.error} visible={meta.error && meta.touched} />}
    </>
  );
}

export default FormGroup;
