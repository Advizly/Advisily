import React from "react";
import { FormCheckbox } from "../common/form";
import { Row, ColMedium } from "../common/grid";
import { getAllCourses } from "../../services/coursesService";
import * as CoursesUtils from "../../utils/coursesUtils";

const courses = getAllCourses();

function TakenCourses({ onBack }) {
  const renderCourseRow = (row) => {
    return row.map((course) => {
      const { courseId, formatedTitle } = CoursesUtils.formatCourseData(course);
      return (
        <ColMedium key={courseId}>
          <FormCheckbox
            label={formatedTitle}
            name="courseId"
            value={courseId}
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
      <h5>
        Please select all the courses you will have finished by the end of the
        current semester:
      </h5>
      <br />
      {renderCourses()}
      <button className="btn m-2 ms-auto" onClick={onBack}>
        Back
      </button>
    </>
  );
}

export default TakenCourses;
