import { useFormikContext } from "formik";
import React from "react";

function SubmitButton(props) {
  const { isSubmitting, isValid, dirty } = useFormikContext();
  console.log(isSubmitting);
  return (
    <button
      disabled={isSubmitting || !isValid || !dirty}
      className="btn btn-submit"
      type="submit"
      {...props}
    >
      Submit
    </button>
  );
}

export default SubmitButton;
