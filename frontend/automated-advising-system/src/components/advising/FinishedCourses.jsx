import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";

import { FormCheckbox, FormGroup } from "../common/form";
import { Row, ColMedium } from "../common/grid";
import {
  // getCatalogCourses,
  getCoreCourses,
  getConcCourses,
  getCollateralCourses,
  getElectiveCourses,
} from "../../services/catalogsService";
import { groupCourses, formatCourseData } from "../../utils/coursesUtils";

function FinishedCourses() {
  // const [courses, setCourses] = useState([]);
  const [coreCourses, setCoreCourses] = useState([]);
  const [concCourses, setConcCourses] = useState([]);
  const [collateralCourses, setCollateralCourses] = useState([]);
  const [electiveCourses, setElectiveCourses] = useState([]);

  useEffect(() => {
    // getCatalogCourses(1).then((courses) => setCourses(groupCourses(courses)));
    getCoreCourses(1).then((courses) =>
      setCoreCourses(groupCourses(courses, 3))
    );
    getCollateralCourses(1).then((courses) =>
      setCollateralCourses(groupCourses(courses, 3))
    );
    getConcCourses(1).then((courses) =>
      setConcCourses(groupCourses(courses, 3))
    );
    getElectiveCourses(1).then((courses) =>
      setElectiveCourses(groupCourses(courses, 3))
    );
  }, []);

  const { values, setFieldValue, getFieldProps } = useFormikContext();

  const handleCourseCheck = (target) => {
    const { name, checked } = target;
    const value = parseInt(target.value);
    const selectedIds = values[name].map((id) => parseInt(id));
    const props = getFieldProps(name);
    console.log(props, values[name], ...selectedIds);

    if (checked) setFieldValue(name, [...selectedIds, value]);
    else {
      if (window.confirm("Are you sure you want to uncheck this course?"))
        setFieldValue(
          name,
          selectedIds.filter((v) => v !== value)
        );
    }
  };

  const handleUncheckAll = () => {
    if (window.confirm("Are you sure you want to uncheck all the courses?"))
      setFieldValue("finishedCoursesId", []);
  };
  const renderCourseRow = (row) => {
    return row.map((course) => {
      const { courseId, formatedTitle } = formatCourseData(course);

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

  const renderCourses = (courses) => {
    return courses.map((row, index, arr) => {
      const horizontalSeparator = index !== 0 && !(index % 5);
      return (
        <Row key={"key" + row[0].course_id}>
          {renderCourseRow(row)}
          {/* {horizontalSeparator ? <hr /> : null} */}
        </Row>
      );
    });
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
        name="finishedCoursesId"
        label="Please select all the courses you will have finished by the end of the current semester:"
      >
        <h5>Core Requirements</h5>
        {renderCourses(coreCourses)}
        <hr />

        <h5>Concenteration Requirements</h5>
        {renderCourses(concCourses)}
        <hr />

        <h5>Collateral Requirements</h5>
        {renderCourses(collateralCourses)}
        <hr />

        {/* <h5>Major Electives</h5>
        {renderCourses(electiveCourses)}
        <hr /> */}
      </FormGroup>
    </>
  );
}

export default FinishedCourses;
