import React from "react";
import { FormGroup, FormRadio } from ".";

function FormPolarRadioGroup({
  name,
  label,
  trueLabel = "yes",
  falseLabel = "no",
  ...props
}) {
  return (
    <FormGroup name={name} label={label}>
      <FormRadio label={trueLabel} name={name} value={"true"} {...props} />
      <FormRadio label={falseLabel} name={name} value={"false"} {...props} />
    </FormGroup>
  );
}

export default FormPolarRadioGroup;
