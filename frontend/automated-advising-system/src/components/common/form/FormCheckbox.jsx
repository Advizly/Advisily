import React from "react";
import { useField } from "formik";

function FormCheckbox({ label, ...props }) {
  const [field, meta] = useField(props);
  const checked = field.value.includes(props.value);
  const inputClassName = meta.error
    ? "form-check-input is-invalid"
    : " form-check-input";
  const divClassName = checked ? "form-check-disabled" : "";
  return (
    <div className={"form-check " + divClassName}>
      <label htmlFor={props.name} className="form-check-label">
        {label}
      </label>
      <input
        type="checkbox"
        className={inputClassName}
        checked={checked}
        {...field}
        {...props}
      />
    </div>
  );
}

export default FormCheckbox;
