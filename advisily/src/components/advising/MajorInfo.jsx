import React, { useState } from "react";
import { useFormikContext } from "formik";

import { FormPolarRadioGroup, FormSelectGroup } from "../common/form";

import { stringToBool } from "../../utils/stringUtils";

import { getMajors } from "../../services/majorsService";
import { getMinors } from "../../services/minorsService";
import { getCatalogs } from "../../services/catalogsService";
import { useEffect } from "react";
import { formatCatalogs } from "../../utils/catalogUtils";

function MajorInfo(changeButton = false) {
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    getMinors().then((minors) => setMinors(minors));
    getCatalogs().then((catalogs) => setCatalogs(formatCatalogs(catalogs)));
    getMajors().then((majors) => {
      console.log(majors);
      setMajors(majors);
    });
  }, []);

  const { values, setFieldValue } = useFormikContext();
  const { isMinoring, isDoubleMajoring } = values;
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
        idSelector="major_id"
        nameSelector="title"
        valueSelector="id"
        defaultOption={"--select a major--"}
        changeButton={changeButton}
      />

      <br />

      <FormSelectGroup
        label={"Which catalog are you follwoing?"}
        name="catalogId"
        items={catalogs}
        valueSelector="id"
        defaultOption={"--select a catalog--"}
        changeButton={changeButton}
      />
      <br />

      {/* Minor(s) */}
      <FormPolarRadioGroup name="isMinoring" label="Are you taking minor(s)?" />

      <FormSelectGroup
        name="minorsId"
        label="Select minor(s):"
        visible={stringToBool(isMinoring)}
        nameSelector="title"
        idSelector="minor_id"
        multiple
        items={minors}
        valueSelector="id"
        changeButton={changeButton}
      />

      {stringToBool(isMinoring) && (
        <p className="my-1">
          <strong>Tip: </strong>hold ctrl while clicking to select multiple
          minors
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
        idSelector="major_id"
        nameSelector="title"
        items={majors}
        valueSelector="major_id"
        changeButton={changeButton}
      />

      <FormSelectGroup
        label="Second Major Catalog:"
        name="secondMajorCatalogId"
        visible={stringToBool(isDoubleMajoring)}
        defaultOption={"---select a catalog---"}
        items={catalogs}
        valueSelector="id"
        changeButton={changeButton}
      />
      <hr />
    </>
  );
}

export default MajorInfo;
