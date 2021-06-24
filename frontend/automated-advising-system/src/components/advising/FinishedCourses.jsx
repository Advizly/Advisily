import React from "react";
import { useFormikContext } from "formik";

import { FormCheckbox, FormGroup } from "../common/form";
import { Row, ColMedium } from "../common/grid";
import { getAllCourses } from "../../services/coursesService";
import * as CoursesUtils from "../../utils/coursesUtils";

const courses = getAllCourses();

function FinishedCourses({ onBack, onNext }) {
  const { values, setFieldValue } = useFormikContext();

  const handleCourseCheck = (target) => {
    const { name, checked, value } = target;
    const selectedIds = { ...values[name] };

    if (checked) setFieldValue(name, [selectedIds, value]);
    else {
      if (window.confirm("Are you sure you want to uncheck this course?"))
        setFieldValue(name, [selectedIds.filter((v) => v !== value)]);
    }
  };

  const handleUncheckAll = () => {
    if (window.confirm("Are you sure you want to uncheck all the courses?"))
      setFieldValue("finishedCoursesId", []);
  };

  const renderCourseRow = (row) => {
    return row.map((course) => {
      const { courseId, formatedTitle } = CoursesUtils.formatCourseData(course);
      return (
        <ColMedium key={courseId}>
          <FormCheckbox
            label={formatedTitle}
            name="finishedCoursesId"
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
      <button
        type="button"
        onClick={handleUncheckAll}
        className=" btn btn-sm float-end my-2"
      >
        Uncheck all?
      </button>
      <br />
      <FormGroup
        name="finishedCoursesId"
        label="Please select all the courses you will have finished by the end of the current semester:"
      >
        {renderCourses()}
      </FormGroup>

      <div className="d-flex justify-content-between ">
        <button className="btn my-3" onClick={onBack} type="button">
          Back
        </button>
        <button className="btn my-3" onClick={onNext} type="button">
          Next
        </button>
      </div>
    </>
  );
}

export default FinishedCourses;
