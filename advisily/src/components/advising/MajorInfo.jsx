import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import { FormPolarRadioGroup, FormSelectGroup } from "../common/form";
import { stringToBool } from "../../utils/stringUtils";
import useMajorInfo from "../../hooks/useMajorInfo";

function MajorInfo({ showChangeButton = false }) {
  const { majors, catalogs, minors } = useMajorInfo();
  const { values, setFieldValue } = useFormikContext();
  const { isMinoring, isDoubleMajoring } = values;
  useEffect(() => {
    let mounted = true; //prevents memory leak

    if (!stringToBool(isMinoring) && mounted) setFieldValue("minorIds", []);

    if (!stringToBool(isDoubleMajoring) && mounted) {
      setFieldValue("secondMajorId", "");
      setFieldValue("secondCatalogId", "");
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
        valueSelector="major_id"
        defaultOption={"--select a major--"}
        changeButton={showChangeButton}
      />

      <br />

      <FormSelectGroup
        label={"Which catalog are you follwoing?"}
        name="catalogId"
        items={catalogs}
        valueSelector="id"
        defaultOption={"--select a catalog--"}
        changeButton={showChangeButton}
      />
      <br />

      {/* Minor(s) */}
      <FormPolarRadioGroup name="isMinoring" label="Are you taking minor(s)?" />

      <FormSelectGroup
        name="minorIds"
        label="Select minor(s):"
        visible={stringToBool(isMinoring)}
        nameSelector="title"
        idSelector="minor_id"
        multiple
        items={minors}
        valueSelector="minor_id"
        changeButton={showChangeButton}
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
        changeButton={showChangeButton}
      />

      <FormSelectGroup
        label="Second Major Catalog:"
        name="secondCatalogId"
        visible={stringToBool(isDoubleMajoring)}
        defaultOption={"---select a catalog---"}
        items={catalogs}
        valueSelector="id"
        changeButton={showChangeButton}
      />
      <hr />
    </>
  );
}

export default MajorInfo;
