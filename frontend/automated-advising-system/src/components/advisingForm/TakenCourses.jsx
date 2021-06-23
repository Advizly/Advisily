import React from "react";
import { useFormikContext } from "formik";

import { FormCheckbox, FormGroup, SubmitButton } from "../common/form";
import { Row, ColMedium } from "../common/grid";
import { getAllCourses } from "../../services/coursesService";
import * as CoursesUtils from "../../utils/coursesUtils";

const courses = getAllCourses();

function TakenCourses({ onBack }) {
  const { values, setFieldValue } = useFormikContext();
  const handleCourseCheck = (target) => {
    const { name, checked, value } = target;
    if (checked) setFieldValue(name, [...values[name], value]);
    else {
      if (window.confirm("Are you sure you want to uncheck this course?"))
        setFieldValue(name, [...values[name].filter((v) => v !== value)]);
    }
  };

  const renderCourseRow = (row) => {
    return row.map((course) => {
      const { courseId, formatedTitle } = CoursesUtils.formatCourseData(course);
      return (
        <ColMedium key={courseId}>
          <FormCheckbox
            label={formatedTitle}
            name="courseId"
            value={courseId}
            onChange={({ target }) => {
              handleCourseCheck(target);
            }}
          />
        </ColMedium>
      );
    });
  };

  const renderCourses = () => {
    return groupedCourses.map((row, index, arr) => {
      const horizontalSeparator = index !== 0 && !(index % 5);
      return (
        <Row key={"key" + row[0].longNumber}>
          {renderCourseRow(row)}
          {horizontalSeparator ? <hr /> : null}
        </Row>
      );
    });
  };

  const groupedCourses = CoursesUtils.groupCourses(courses, 2);
  return (
    <>
      <FormGroup
        name="courseId"
        label="Please select all the courses you will have finished by the end of the
    current semester:"
      >
        {renderCourses()}
      </FormGroup>

      <div className="d-flex justify-content-between ">
        <button className="btn my-3" onClick={onBack} type="button">
          Back
        </button>
        <SubmitButton />
      </div>
    </>
  );
}

export default TakenCourses;
