import React from "react";
import { useFormikContext } from "formik";

import { FormCheckbox, FormGroup, FormInput } from "../common/form";
import { Row, ColMedium } from "../common/grid";
import { formatCourseData } from "../../utils/coursesUtils";
import useCourses from "../../hooks/useCourses";

function FinishedCourses() {
  const { concCourses, collateralCourses, coreCourses, electiveCourses } =
    useCourses();
  const { values, setFieldValue } = useFormikContext();

  const handleCourseCheck = (target) => {
    const { name, checked } = target;
    const value = target.value;
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
      setFieldValue("coursesIds", []);
  };
  const renderCourseRow = (row) => {
    return row.map((course) => {
      const { courseId, formatedTitle } = formatCourseData(course);

      return (
        <ColMedium key={courseId}>
          <FormCheckbox
            label={formatedTitle}
            name="coursesIds"
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
      <Row key={"key" + row[0].course_id}>{renderCourseRow(row)}</Row>
    ));
  };

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
        name="coursesIds"
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
          name="generalElectiveCredits"
          label="How many credits did you use from the general elective credits?"
          min={0}
        />
        <hr />
      </FormGroup>
    </>
  );
}

export default FinishedCourses;
