import React from "react";
import { useFormikContext } from "formik";

import { FormInput, FormPolarRadioGroup } from "../common/form";
import { stringToBool } from "../../utils/stringUtils";

function PreferencesInfo() {
  const { values, setFieldValue } = useFormikContext();
  const { takingSummer, takingWinter, overloading } = values;

  const handleOnChange = (target, fieldToResetName, resetValue = 0) => {
    setFieldValue(target.name, target.value);
    if (stringToBool(target.value) === false)
      setFieldValue(fieldToResetName, resetValue);
  };

  return (
    <>
      <FormPolarRadioGroup
        name="overloading"
        label="Are you willing to overload in the next semester?"
        onChange={({ target }) => {
          handleOnChange(target, "overloadingCredits");
        }}
      />
      <FormInput
        type="number"
        name="overloadingCredits"
        label="How many crdeits:"
        min={1}
        visible={stringToBool(overloading)}
      />
      <hr />
      <FormPolarRadioGroup
        name="takingSummer"
        label="Are you planning to take course(s) next Summer?"
        onChange={({ target }) => {
          handleOnChange(target, "summerCredits");
        }}
      />
      <FormInput
        type="number"
        name="summerCredits"
        label="How many crdeits?"
        min={0}
        max={7}
        visible={stringToBool(takingSummer)}
      />
      <hr />
      <FormPolarRadioGroup
        name="takingWinter"
        label="Are you planning to take course(s) next Winter?"
        onChange={({ target }) => {
          handleOnChange(target, "winterCredits");
        }}
      />
      <FormInput
        type="number"
        name="winterCredits"
        label="How many crdeits:"
        min={0}
        max={4}
        visible={stringToBool(takingWinter)}
      />

      <hr />
    </>
  );
}

export default PreferencesInfo;
