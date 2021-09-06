import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import { FormPolarRadioGroup, FormSelectGroup } from "../../components/form";
import { stringToBool } from "../../utils/stringUtils";
import useMajors from "../../hooks/useMajors";
import useCatalogs from "../../hooks/useCatalogs";
import {
  MAJOR_ID,
  CATALOG_ID,
  SECOND_MAJOR_ID,
  SECOND_CATALOG_ID,
  MINOR_IDS,
  IS_DOUBLE_MAJORING,
  IS_MINORING,
} from "./fieldNames";

function MajorInfo() {
  const { values, setFieldValue } = useFormikContext();
  const { isMinoring, isDoubleMajoring } = values;

  const { majors, minors } = useMajors();
  const { catalogs: firstMajorCatalogs } = useCatalogs(values.majorId);
  const { catalogs
    : secondMajorCatalogs } = useCatalogs(values.secondMajorId);

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
        defaultOption={"--select a major--"}
      />

      <br />

      <FormSelectGroup
        label={"Which catalog are you follwoing? (declaration catalog)"}
        name={CATALOG_ID}
        items={firstMajorCatalogs}
        defaultOption={"--select a catalog--"}
        visible={values.majorId}
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
        multiple
        items={minors}
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
        items={majors}
      />

      <FormSelectGroup
        label="Second Major Catalog:"
        name={SECOND_CATALOG_ID}
        visible={stringToBool(isDoubleMajoring)}
        defaultOption={"---select a catalog---"}
        items={secondMajorCatalogs}
        visible={values.secondMajorId}
      />
      <hr />
    </>
  );
}

export default MajorInfo;
