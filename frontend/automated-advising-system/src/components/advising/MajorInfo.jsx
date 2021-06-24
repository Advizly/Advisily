import React, { useState } from "react";
import { useFormikContext } from "formik";

import { FormPolarRadioGroup, FormSelectGroup } from "../common/form";

import { stringToBool } from "../../utils/stringUtils";

import { getMajors } from "../../services/majorsService";
import { getMinors } from "../../services/minorsService";
import { getCatalogs } from "../../services/catalogsService";
import { useEffect } from "react";

function MajorInfo({ onNext }) {
  const [changeMajor, setChangeMajor] = useState(false);
  const [changeCatalog, setChangeCatalog] = useState(false);

  const { values, setFieldValue } = useFormikContext();
  const { isMinoring, isDoubleMajoring } = values;
  const majors = getMajors();
  const minors = getMinors();
  const catalogs = getCatalogs();

  useEffect(() => {
    let mounted = true; //prevents memory leak

    if (!stringToBool(isMinoring) && mounted) setFieldValue("minorsId", []);

    if (!stringToBool(isDoubleMajoring) && mounted) {
      setFieldValue("secondMajorId", "");
      setFieldValue("secondMajorCatalogId", "");
    }
    return () => {
      mounted = false;
    };
  }, [isDoubleMajoring, isMinoring, setFieldValue]);

  return (
    <>
      <FormSelectGroup
        label="What is your major?"
        items={majors}
        name="majorId"
        valueSelector="id"
        disabled={!changeMajor}
        changeButton={true}
        onChange={() => setChangeMajor(!changeMajor)}
      />

      <br />

      <FormSelectGroup
        label={"Which catalog are you follwoing?"}
        name="catalogId"
        items={catalogs}
        valueSelector="id"
        defaultOption={"--select a catalog--"}
        disabled={!changeCatalog}
        changeButton={true}
        onChange={() => setChangeCatalog(!changeCatalog)}
      />
      <br />

      {/* Minor(s) */}
      <FormPolarRadioGroup name="isMinoring" label="Are you taking minor(s)?" />

      <FormSelectGroup
        name="minorsId"
        label="Select minor(s):"
        visible={stringToBool(isMinoring)}
        multiple
        items={minors}
        valueSelector="id"
      />

      {stringToBool(isMinoring) && (
        <p className="my-1">
          <strong>Tip: </strong>hole ctrl to select multiple minors
        </p>
      )}
      {/* Double Major */}
      <FormPolarRadioGroup
        name="isDoubleMajoring"
        label="Are you double majoring?"
      />

      <FormSelectGroup
        label="Second Major:"
        name="secondMajorId"
        visible={stringToBool(isDoubleMajoring)}
        defaultOption={"---select a major---"}
        items={majors}
        valueSelector="id"
      />

      <FormSelectGroup
        label="Second Major Catalog:"
        name="secondMajorCatalogId"
        visible={stringToBool(isDoubleMajoring)}
        defaultOption={"---select a catalog---"}
        items={catalogs}
        valueSelector="id"
      />
      <hr />

      <div className="d-flex ">
        <button className="btn my-3 ms-auto" onClick={onNext} type="button">
          Next
        </button>
      </div>
    </>
  );
}

export default MajorInfo;
