import React from "react";
import { useField } from "formik";
import FormError from "./FormError";

function FormSelect({
  label,
  changeButton,
  onChange,
  visible = true,
  ...props
}) {
  const [field, meta] = useField(props);
  if (!visible) return null;
  const className =
    meta.error && meta.touched && !props.disabled
      ? "form-control is-invalid"
      : "form-control";

  console.log(meta.touched);
  return (
    <>
      <div className="form-group">
        {label && <label className="form-label">{label}</label>}
        <div className="d-flex">
          <select
            className={className}
            aria-invalid={meta.error}
            {...field}
            {...props}
          />
          {changeButton && (
            <button className="btn-link" onClick={onChange} type="button">
              change?
            </button>
          )}
        </div>
      </div>

      <FormError
        error={meta.error}
        visible={meta.touched && meta.error && !props.disabled}
      />
    </>
  );
}

export default FormSelect;
