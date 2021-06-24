import { useFormikContext } from "formik";
import React from "react";

function FormError({ name, ...props }) {
  const { getFieldMeta } = useFormikContext();
  const { error, touched } = getFieldMeta(name);
  if (error && touched)
    return (
      <div style={{ color: "#dc3545" }} className="" {...props}>
        {error}
      </div>
    );
  //else
  return null;
}

export default FormError;
