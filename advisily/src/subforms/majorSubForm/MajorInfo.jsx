import React, { useEffect, useState } from "react";
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
  SEMESTER_NUMBER,
  STANDING_ID,
} from "./fieldNames";
import { getStandings } from "../../services/standingsServices";
import semesters from "../../constant/semesters";

function MajorInfo() {
  const [standings, setStandings] = useState([]);
  useEffect(() => {
    getStandings()
      .then((res) => setStandings(res))
      .catch((err) => console.log("Error: ", err));
  }, []);

  const { values, setFieldValue } = useFormikContext();
  const { isMinoring, isDoubleMajoring } = values;

  const { majors, minors } = useMajors();
  const { catalogs: firstMajorCatalogs } = useCatalogs(values.majorId);
  const { catalogs: secondMajorCatalogs } = useCatalogs(values.secondMajorId);
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
        label={"What is your current standing?"}
        items={standings}
        name={STANDING_ID}
        defaultOption="--select standing--"
        idSelector="standingId"
        nameSelector="standing"
        valueSelector="standingId"
      />

      <FormSelectGroup
        label={"Which semester number is this one?"}
        defaultOption={"--select a semester--"}
        items={semesters}
        name={SEMESTER_NUMBER}
      />
      <p className="my-1">
        The number of semesters you have taken starting from English 0210 or
        RHET 1010
      </p>
      <br />

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
      />
      <hr />
    </>
  );
}

export default MajorInfo;
