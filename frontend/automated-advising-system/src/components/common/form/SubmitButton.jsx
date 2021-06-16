import { useFormikContext } from "formik";
import React from "react";

function SubmitButton(props) {
  const { isSubmitting, isValid, dirty } = useFormikContext();
  console.log(isSubmitting);
  return (
    <button
      disabled={isSubmitting || !isValid || !dirty}
      className="btn"
      type="submit"
      style={{ marginTop: 10, marginBottom: 10, width: "100%" }}
      {...props}
    >
      Submit
    </button>
  );
}

export default SubmitButton;
