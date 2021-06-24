import React from "react";
import FormError from "./FormError";

function FormGroup({ label, ...props }) {
  return (
    <>
      <div className="form-group">
        {label && <label className="form-label">{label}</label>}
        {props.children}
      </div>
      {<FormError name={props.name} />}
    </>
  );
}

export default FormGroup;
