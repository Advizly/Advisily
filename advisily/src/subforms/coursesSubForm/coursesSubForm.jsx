import React, { useState } from "react";
import { useFormikContext } from "formik";

import { FormCheckbox, FormGroup, FormInput } from "../../components/form";
import { Row, ColMedium } from "../../components/grid";
import { formatCourseData } from "../../utils/coursesUtils";
import useCatalogCourses from "../../hooks/useCatalogCourses";

import { COURSES_IDS, GENERAL_ELECTIVE_CREDITS } from "./fieldNames";
import CoursesModal from "./coursesModal";
function CoursesSubForm() {
  const { values, setFieldValue } = useFormikContext();
  const {
    concCourses,
    collateralCourses,
    coreCourses,
    electiveCourses,
    engCoreCourses,
  } = useCatalogCourses(values.catalogId);

  const handleCourseCheck = (target) => {
    const { name, checked, value } = target;
    const selectedIds = values[name].map((id) => id);

    if (checked) setFieldValue(name, [...selectedIds, value]);
    //if (window.confirm("Are you sure you want to uncheck this course?"))
    else
      setFieldValue(
        name,
        selectedIds.filter((v) => v !== value)
      );
  };

  const handleUncheckAll = () => {
    if (window.confirm("Are you sure you want to uncheck all the courses?"))
      setFieldValue(COURSES_IDS, []);
  };

  const prerequisiteFullfilled = (course) => {
    const selectedCourseIds = values[COURSES_IDS].map((id) => parseInt(id));

    const { requisites } = course;

    if (!requisites.length) return true;
    if (!selectedCourseIds.includes(course.courseId)) return true;

    return requisites.some((reqSet) => {
      return reqSet.every((r) => {
        if (r.requisiteTypeId === 1)
          return selectedCourseIds.includes(r.courseId);
        if (r.requisiteTypeId === 2 || r.requisiteTypeId === 3)
          return selectedCourseIds.includes(r.courseId);

        return true;
      });
    });
  };

  const [showModal, setShowModal] = useState(false);

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
          {!prerequisiteFullfilled(course) && (
            <div className="alert alert-warning ">
              <strong>Warning:</strong> you didn't fullfil the prerequisites for
              this course
            </div>
          )}
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

        {engCoreCourses.length ? (
          <>
            <h5>Engineering Core Requirements</h5>
            {renderCoursesTabular(engCoreCourses)}
            <hr />
          </>
        ) : null}
        <h5>Concenteration Requirements</h5>
        {renderCoursesTabular(concCourses)}
        <hr />

        {collateralCourses.length ? (
          <>
            <h5>Collateral Requirements</h5>
            {renderCoursesTabular(collateralCourses)}
            <hr />
          </>
        ) : null}

        <h5>Major Electives</h5>
        {renderCoursesTabular(electiveCourses)}
        <hr />
        <h5>General Electives</h5>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add general electives
        </button>
        <CoursesModal show={showModal} onClose={() => setShowModal(false)} />
        <hr />
      </FormGroup>
    </>
  );
}

export default CoursesSubForm;
