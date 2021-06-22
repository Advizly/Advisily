import React from "react";
import { useFormikContext } from "formik";
import { FormRadio, SubmitButton, FormInput, FormGroup } from "../common/form";

function AdvisingQuestions({
  onBack,
  onShowAdvanced,
  showSpecialOptions,
  ...props
}) {
  const { values, isValid, touched, dirty } = useFormikContext();
  return (
    <>
      <FormGroup
        name="overloading"
        title="Are you willing to overload in the next fall?"
      >
        <FormRadio label="yes" name="overloading" value={true} />
        <FormRadio label="no" name="overloading" value={false} />
      </FormGroup>
      <hr />

      <FormGroup
        name="takingSummer"
        title="Are you planning to take course(s) in next Summer?"
      >
        <FormRadio label="yes" name="takingSummer" value={true} />
        <FormRadio label="no" name="takingSummer" value={false} />
        {values.takingSummer == "true" && (
          <FormInput
            type="number"
            name="summerCredits"
            label="How many crdeits?"
            min={0}
            max={7}
          />
        )}
      </FormGroup>
      <hr />
      <FormGroup
        name="takingWinter"
        title="Are you planning to take course(s) in next Winter?"
      >
        <FormRadio label="yes" name="takingWinter" value={true} />
        <FormRadio label="no" name="takingWinter" value={false} />
        {values.takingWinter == "true" && (
          <FormInput
            type="number"
            name="winterCredits"
            label="How many crdeits:"
            min={0}
            max={4}
          />
        )}
      </FormGroup>
      <hr />
      {isValid && touched && dirty && (
        <button className="btn my-2" onClick={onShowAdvanced}>
          Show/Hide Advanced Options
        </button>
      )}
      {showSpecialOptions ? (
        <>
          <FormGroup
            name="isMinoring"
            title="Are you taking more than one major?"
          >
            <FormRadio label="yes" name="isMinoring" value={true} />
            <FormRadio label="no" name="isMinoring" value={false} />
            {values.isMinoring === "true" && (
              <FormInput label="TEST" name="minors" />
            )}
          </FormGroup>
          <FormGroup name="isDoubleMajoring" title="Are you taking minor(s)?">
            <FormRadio label="yes" name="isDoubleMajoring" value={true} />
            <FormRadio label="no" name="isDoubleMajoring" value={false} />
            {values.isDoubleMajoring === "true" && (
              <FormInput label="TEST" name="doubleMajors" />
            )}
          </FormGroup>
          <hr />
        </>
      ) : null}

      <div className="d-flex justify-content-between ">
        <button className="btn my-3" onClick={onBack}>
          Back
        </button>
        <SubmitButton />
      </div>
    </>
  );
}

export default AdvisingQuestions;
