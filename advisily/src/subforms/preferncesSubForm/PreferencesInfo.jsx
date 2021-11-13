import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";

import {
  FormInput,
  FormPolarRadioGroup,
  FormSelectGroup,
} from "../../components/form";
import { stringToBool } from "../../utils/stringUtils";
import { getPaces } from "../../services/pacesService";
import {
  OVERLOADING,
  OVERLOADING_CREDITS,
  // eslint-disable-next-line
  PACE_ID,
  SEMESTERS_TO_PLAN,
  // eslint-disable-next-line
  SUMMER_CREDITS,
  // eslint-disable-next-line
  TAKING_SUMMER,
  TAKING_WINTER,
  WINTER_CREDITS,
} from "./fieldNames";

import semesters from "../../constant/semesters";

function PreferencesInfo() {
  const { values, setFieldValue } = useFormikContext();
  // eslint-disable-next-line
  const { takingSummer, takingWinter, overloading } = values;

  const handleOnChange = (target, fieldToResetName, resetValue = 0) => {
    setFieldValue(target.name, target.value);
    if (stringToBool(target.value) === false)
      setFieldValue(fieldToResetName, resetValue);
  };
  // eslint-disable-next-line
  const [paces, setPaces] = useState([]);
  useEffect(() => {
    getPaces().then((res) => setPaces(res));
  }, []);

  return (
    <>
      <FormPolarRadioGroup
        name={OVERLOADING}
        label="Are you willing to overload in the next semester?"
        onChange={({ target }) => {
          handleOnChange(target, "overloadingCredits");
        }}
      />
      <FormInput
        type="number"
        name={OVERLOADING_CREDITS}
        label="How many crdeits are you taking next semester IN TOTAL:"
        min={1}
        visible={stringToBool(overloading)}
      />
      <hr />
      {/* <FormPolarRadioGroup
        name={TAKING_SUMMER}
        label="Are you planning to take course(s) next Summer?"
        onChange={({ target }) => {
          handleOnChange(target, "summerCredits");
        }}
      />
      <FormInput
        type="number"
        name={SUMMER_CREDITS}
        label="How many crdeits?"
        min={0}
        max={7}
        visible={stringToBool(takingSummer)}
      />
      <hr /> */}
      {/* <FormPolarRadioGroup
        name={TAKING_WINTER}
        label="Are you planning to take course(s) next Winter?"
        onChange={({ target }) => {
          handleOnChange(target, "winterCredits");
        }}
      />
      <FormInput
        type="number"
        name={WINTER_CREDITS}
        label="How many crdeits:"
        min={0}
        max={4}
        visible={stringToBool(takingWinter)}
      /> */}

      {/* <hr /> */}
      {/* <FormSelectGroup
        label={"What pace would you like to follow?"}
        name={PACE_ID}
        items={paces}
        valueSelector="paceId"
        idSelector="paceId"
        nameSelector="paceTitle"
      />
      <hr /> */}
      <FormSelectGroup
        label={
          "Up to how many semesters would you like to be planned ahead in time?"
        }
        name={SEMESTERS_TO_PLAN}
        items={semesters}
      />
    </>
  );
}

export default PreferencesInfo;
