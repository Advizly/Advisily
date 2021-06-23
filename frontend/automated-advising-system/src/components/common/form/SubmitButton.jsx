import { useFormikContext } from "formik";
import React from "react";

function SubmitButton(props) {
  const { isSubmitting, isValid, touched, dirty } = useFormikContext();
  return (
    <button
      disabled={isSubmitting || !isValid || (!touched && !dirty)}
      className="btn my-3"
      type="submit"
      {...props}
    >
      Submit
    </button>
  );
}

export default SubmitButton;
