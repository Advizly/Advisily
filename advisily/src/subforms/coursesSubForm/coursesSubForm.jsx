import React from "react";
import { useFormikContext } from "formik";

import { FormCheckbox, FormGroup, FormInput } from "../../components/form";
import { Row, ColMedium } from "../../components/grid";
import { formatCourseData } from "../../utils/coursesUtils";
import useCatalogCourses from "../../hooks/useCatalogCourses";

import { COURSES_IDS, GENERAL_ELECTIVE_CREDITS } from "./fieldNames";
function CoursesSubForm() {
  const { values, setFieldValue } = useFormikContext();
  const { concCourses, collateralCourses, coreCourses, electiveCourses } =
    useCatalogCourses(values.catalogId);

  const handleCourseCheck = (target) => {
    const { name, checked, value } = target;
    const selectedIds = values[name].map((id) => id);

    if (checked) setFieldValue(name, [...selectedIds, value]);
    else if (window.confirm("Are you sure you want to uncheck this course?"))
      setFieldValue(
        name,
        selectedIds.filter((v) => v !== value)
      );
  };

  const handleUncheckAll = () => {
    if (window.confirm("Are you sure you want to uncheck all the courses?"))
      setFieldValue(COURSES_IDS, []);
  };
  const renderCourseRow = (row) => {
    return row.map((course) => {
      const { courseId, formatedTitle } = formatCourseData(course);
      return (
        <ColMedium key={courseId}>
          <FormCheckbox
            label={formatedTitle}
            name={COURSES_IDS}
            value={JSON.stringify(courseId)}
            onChange={({ target }) => {
              handleCourseCheck(target);
            }}
          />
        </ColMedium>
      );
    });
  };

  const renderCoursesTabular = (courses) => {
    return courses.map((row) => (
      <Row key={"key" + row[0].courseId}>{renderCourseRow(row)}</Row>
    ));
  };

  if (!values.catalogId)
    return (
      <p className="text-center ">
        Please select you declaration catalog catalog first.
      </p>
    );

  return (
    <>
      <button
        type="button"
        onClick={handleUncheckAll}
        className=" btn btn-sm float-end my-2"
      >
        Uncheck all?
      </button>
      <br />

      <FormGroup
        name={COURSES_IDS}
        label="Please select all the courses you will have finished by the end of the current semester:"
      >
        <h5>Core Requirements</h5>
        {renderCoursesTabular(coreCourses)}
        <hr />

        <h5>Concenteration Requirements</h5>
        {renderCoursesTabular(concCourses)}
        <hr />

        <h5>Collateral Requirements</h5>
        {renderCoursesTabular(collateralCourses)}
        <hr />

        <h5>Major Electives</h5>
        {renderCoursesTabular(electiveCourses)}
        <hr />
        <h5>General Electives</h5>
        <FormInput
          type="number"
          name={GENERAL_ELECTIVE_CREDITS}
          label="How many credits did you use from the general elective credits?"
          min={0}
        />
        <hr />
      </FormGroup>
    </>
  );
}

export default CoursesSubForm;
