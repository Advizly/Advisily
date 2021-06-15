import { useField } from "formik";
import React from "react";
import ErrorMessage from "./FormError";

function FormSelect({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="form-group">
        <label>Declaration Catalog</label>
        <select className="form-control" {...field} {...props} />
      </div>

      <ErrorMessage error={meta.error} visible={meta.touched && meta.error} />
    </>
  );
}

export default FormSelect;
