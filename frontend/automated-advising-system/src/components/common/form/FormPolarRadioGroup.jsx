import React from "react";
import { FormGroup, FormRadio } from ".";

function FormPolarRadioGroup({
  name,
  title,
  trueLabel = "yes",
  falseLabel = "no",
}) {
  return (
    <FormGroup name={name} title={title}>
      <FormRadio label={trueLabel} name={name} value={true} />
      <FormRadio label={falseLabel} name={name} value={false} />
    </FormGroup>
  );
}

export default FormPolarRadioGroup;
