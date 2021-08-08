import { useFormikContext } from "formik";
import React from "react";

function FormError({
  errorMessage = "One or more required field(s) is invalid",
  ...props
}) {
  const { isValid, submitCount } = useFormikContext();
  if (submitCount < 1 || isValid) return null;

  const className = props.className
    ? "clr-danger " + props.className
    : "clr-danger";

  return (
    <div className={className} {...props}>
      {errorMessage}
    </div>
  );
}

export default FormError;
