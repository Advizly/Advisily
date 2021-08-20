import { useFormikContext } from "formik";
import React from "react";

function FormError({
  errorMessage = "One or more required field(s) is invalid",

  ...props
}) {
  const { isValid, submitCount, status } = useFormikContext();
  if (submitCount < 1 || (isValid && !status)) return null;

  const className = props.className
    ? "alert alert-danger " + props.className
    : "alert alert-danger";

  if (status && status.error) {
    errorMessage = status.error;
  }

  return (
    <div className={className} {...props}>
      {errorMessage}
    </div>
  );
}

export default FormError;
