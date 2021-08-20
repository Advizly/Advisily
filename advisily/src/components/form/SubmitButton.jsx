import { useFormikContext } from "formik";
import React from "react";

function SubmitButton({ label = "Submit", ...props }) {
  const { isSubmitting } = useFormikContext();
  return (
    <div className="my-3 d-flex flex-column">
      <button
        disabled={isSubmitting}
        className="btn ms-auto"
        type="submit"
        {...props}
      >
        {label}
      </button>
    </div>
  );
}

export default SubmitButton;
