import React from "react";
import FieldError from "./FieldError";

function FormGroup({ label, ...props }) {
  return (
    <>
      <div className="form-group">
        {label && <label className="form-label">{label}</label>}
        {props.children}
      </div>
      {<FieldError name={props.name} />}
    </>
  );
}

export default FormGroup;
