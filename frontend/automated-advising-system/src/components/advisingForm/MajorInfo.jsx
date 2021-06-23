import React from "react";
import { useFormikContext } from "formik";

import { FormPolarRadioGroup, FormSelectGroup } from "../common/form";

import { stringToBool } from "../../utils/stringUtils";

import { getMajors } from "../../services/majorsService";
import { getMinors } from "../../services/minorsService";
import { getCatalogs } from "../../services/catalogsService";

function MajorInfo({ onNext }) {
  const { values } = useFormikContext();
  const { isMinoring, isDoubleMajoring } = values;
  const majors = getMajors();
  const minors = getMinors();
  const catalogs = getCatalogs();
  return (
    <>
      <FormSelectGroup
        title={"What is your major?"}
        name="major"
        items={majors}
        valueSelector="id"
        defaultOption={"--select a major--"}
      />
      <br />

      <FormSelectGroup
        title={"Which catalog are you follwoing?"}
        name="catalog"
        items={catalogs}
        valueSelector="id"
        defaultOption={"--select a catalog--"}
      />
      <br />

      {/* Minor(s) */}
      <FormPolarRadioGroup name="isMinoring" title="Are you taking minor(s)?" />

      <FormSelectGroup
        name="minors"
        label="Select minor(s):"
        visible={stringToBool(isMinoring)}
        multiple
        items={minors}
        valueSelector="id"
      />

      {stringToBool(isMinoring) && (
        <p className="my-1">
          <strong>Tip: </strong>press ctrl to select multiple minors
        </p>
      )}
      {/* Double Major */}
      <FormPolarRadioGroup
        name="isDoubleMajoring"
        title="Are you double majoring?"
      />

      <FormSelectGroup
        label="Second Major:"
        name="secondMajor"
        visible={stringToBool(isDoubleMajoring)}
        defaultOption={"---select a major---"}
        items={majors}
        valueSelector="id"
      />

      <hr />

      <div className="d-flex ">
        <button className="btn my-3 ms-auto" onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default MajorInfo;
