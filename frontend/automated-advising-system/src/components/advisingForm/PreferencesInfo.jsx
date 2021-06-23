import React from "react";
import { useFormikContext } from "formik";

import {
  FormInput,
  FormPolarRadioGroup,
  FormSelectGroup,
} from "../common/form";
import { stringToBool } from "../../utils/stringUtils";
import { getPaces } from "../../services/pacesService";

function PreferencesInfo({ onBack, onNext }) {
  const { values, setFieldValue } = useFormikContext();
  const { takingSummer, takingWinter } = values;
  const paces = getPaces();
  return (
    <>
      <FormSelectGroup
        label={"What pace would you like follow?"}
        name="pace"
        items={paces}
        valueSelector="id"
      />
      <br />

      <FormPolarRadioGroup
        name="isOverloading"
        label="Are you willing to overload in the next semester?"
        onChange={({ target }) => {
          setFieldValue(target.name, target.value);
        }}
      />

      <hr />

      <FormPolarRadioGroup
        name="takingSummer"
        label="Are you planning to take course(s) next Summer?"
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

      <div className="d-flex justify-content-between ">
        <button className="btn my-3" onClick={onBack} type="button">
          Back
        </button>
        <button className="btn my-3" onClick={onNext} type="button">
          Next
        </button>
      </div>
    </>
  );
}

export default PreferencesInfo;
