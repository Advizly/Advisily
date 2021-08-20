import React, { useState } from "react";
import { useField } from "formik";
import FieldError from "./FieldError";

function FormSelect({ label, changeButton = false, visible = true, ...props }) {
  const [field, { error, touched }] = useField(props);
  const [editable, setEditable] = useState(!changeButton);

  if (!visible) return null;
  const className =
    error && touched && !props.disabled
      ? "form-control is-invalid"
      : "form-control";

  return (
    <>
      <div className="form-group">
        {label && <label className="form-label">{label}</label>}
        <div className="d-flex">
          <select
            className={className}
            aria-invalid={error}
            disabled={!editable}
            {...field}
            {...props}
          />
          {changeButton && (
            <button
              className="btn-link"
              onClick={() => setEditable(!editable)}
              type="button"
            >
              change?
            </button>
          )}
        </div>
      </div>

      <FieldError name={props.name} />
    </>
  );
}

export default FormSelect;
