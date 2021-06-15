import React from "react";

function SubmitButton(props) {
  return (
    <button className="btn" type="submit" style={{ marginTop: 10 }} {...props}>
      Submit
    </button>
  );
}

export default SubmitButton;
