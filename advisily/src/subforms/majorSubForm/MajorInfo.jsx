import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import {
  FormPolarRadioGroup,
  FormSelectGroup,
} from "../../components/common/form";
import { stringToBool } from "../../utils/stringUtils";
import useMajors from "../../hooks/useMajors";
import {
  MAJOR_ID,
  CATALOG_ID,
  SECOND_MAJOR_ID,
  SECOND_CATALOG_ID,
  MINOR_IDS,
  IS_DOUBLE_MAJORING,
  IS_MINORING,
} from "./fieldNames";

function MajorInfo({ showChangeButton = false }) {
  const { majors, catalogs, minors } = useMajors();
  const { values, setFieldValue } = useFormikContext();
  const { isMinoring, isDoubleMajoring } = values;

  useEffect(() => {
    let mounted = true; //prevents memory leak

    if (!stringToBool(isMinoring) && mounted) setFieldValue(MINOR_IDS, []);

    if (!stringToBool(isDoubleMajoring) && mounted) {
      setFieldValue(SECOND_MAJOR_ID, "");
      setFieldValue(SECOND_CATALOG_ID, "");
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
        name={MAJOR_ID}
        idSelector="major_id"
        nameSelector="title"
        valueSelector="major_id"
        defaultOption={"--select a major--"}
        changeButton={showChangeButton}
      />

      <br />

      <FormSelectGroup
        label={"Which catalog are you follwoing?"}
        name={CATALOG_ID}
        items={catalogs}
        valueSelector="id"
        defaultOption={"--select a catalog--"}
        changeButton={showChangeButton}
      />
      <br />

      {/* Minor(s) */}
      <FormPolarRadioGroup
        name={IS_MINORING}
        label="Are you taking minor(s)?"
      />

      <FormSelectGroup
        name={MINOR_IDS}
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
        name={IS_DOUBLE_MAJORING}
        label="Are you double majoring?"
      />

      <FormSelectGroup
        label="Second Major:"
        name={SECOND_MAJOR_ID}
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
        name={SECOND_CATALOG_ID}
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
