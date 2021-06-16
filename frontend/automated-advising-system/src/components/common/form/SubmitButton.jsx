import { useFormikContext } from "formik";
import React from "react";

function SubmitButton(props) {
  const { isSubmitting, isValid, dirty, touched } = useFormikContext();
  console.log(isSubmitting);
  return (
    <button
      disabled={isSubmitting || !isValid}
      className="btn btn-submit"
      type="submit"
      {...props}
    >
      Submit
    </button>
  );
}

export default SubmitButton;
