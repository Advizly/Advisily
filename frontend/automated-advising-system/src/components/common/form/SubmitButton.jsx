import { useFormikContext } from "formik";
import React from "react";

function SubmitButton(props) {
  const { isSubmitting, isValid } = useFormikContext();
  return (
    <button
      disabled={isSubmitting || !isValid}
      className="btn my-3"
      type="submit"
      {...props}
    >
      Submit
    </button>
  );
}

export default SubmitButton;
