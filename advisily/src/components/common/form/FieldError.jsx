import { useFormikContext } from "formik";
import React from "react";

function FieldError({ name, ...props }) {
  const { getFieldMeta } = useFormikContext();
  const { error, touched } = getFieldMeta(name);
  if (!error || !touched) return null;

  return (
    <div className="clr-danger" {...props}>
      {error}
    </div>
  );
}

export default FieldError;
