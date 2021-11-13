import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";

// eslint-disable-next-line
import { FormCheckbox, FormGroup, FormInput } from "../../components/form";
import { Row, ColMedium } from "../../components/grid";
import {
  categoriseCatalogCourses,
  formatCourseData,
  groupCourses,
} from "../../utils/coursesUtils";

// eslint-disable-next-line
import {
  COURSES_IDS,
  EXEMPTED_CREDITS,
  GENERAL_ELECTIVE_CREDITS,
} from "./fieldNames";
import CoursesModal from "./coursesModal";

import useApi from "../../hooks/useApi";

import {
  getPrefixes as getPrefixesApi,
  getAllCourses,
} from "../../services/coursesService";
import { getCatalogCourses } from "../../services/catalogsService";

function CoursesSubForm() {
  const { values, setFieldValue } = useFormikContext();

  const prefixesApi = useApi(getPrefixesApi);
  const catalogApi = useApi(getCatalogCourses, handleCatalogCouresesResponse);
  const coursesApi = useApi(getAllCourses);

  useEffect(() => {
    prefixesApi.request();
    coursesApi.request();
  }, []);
  useEffect(() => {
    if (values.catalogId) catalogApi.request(values.catalogId);
  }, [values.catalogId]);

  const handleCourseCheck = ({ target }) => {
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
      // const selectedTopics=course.courseCode==4930
      
      return (
        <ColMedium key={courseId}>
          <FormCheckbox
            label={formatedTitle}
            name={COURSES_IDS}
            value={JSON.stringify(courseId)}
            onChange={handleCourseCheck}
          />

          {!prerequisiteFullfilled(course) && (
            <div className="alert alert-warning">
              <strong>Warning:</strong> Did you fulfill the
              prerequisites/corequisite for this course?
            </div>
          )}
          {/* {selectedTopics&&(<>
          <button className="btn btn-sm w-1 m-2">+</button>
          <button className="btn  btn-sm w-1 m-2">-</button>
          </>
          )
    } */}
        </ColMedium>
      );
    });
  };

  const renderCoursesTabular = (courses) => {
    return courses.map((row) => (
      <Row key={"key" + row[0].courseId}>{renderCourseRow(row)}</Row>
    ));
  };

  const renderCatalogCourses = (catalogCourses) => {
    return catalogCourses.map((catalogCourse) => {
      return (
        <>
          <h5>{catalogCourse.courseType}</h5>
          {renderCoursesTabular(catalogCourse.courses)}
          <hr />
        </>
      );
    });
  };

  if (!values.catalogId)
    return (
      <p className="text-center">
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
        labelClass="fs-5 fw-bold"
      >
        <p className="clr-danger fs-5 fw-normal">
          (exempted and transferred courses, as well)
        </p>
        <br />
        {renderCatalogCourses(catalogApi.data)}

        <h5>General Electives</h5>

        <FormInput
          label="Enter the number of credits you used from you general electives"
          type="number"
          min={0}
          name={GENERAL_ELECTIVE_CREDITS}
        />

        {/* <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add general electives
        </button> */}
        <CoursesModal
          show={showModal}
          onClose={() => setShowModal(false)}
          prefixes={prefixesApi.data}
          courses={coursesApi.data}
        />
        <br />
        <hr />
        <h5>Exempted Credits</h5>

        <FormInput
          name={EXEMPTED_CREDITS}
          label="How many credits(if any) are you exempted from?(excluding the arabic courses)"
          type="number"
          min={0}
        />
        <hr />
      </FormGroup>
    </>
  );
}

export default CoursesSubForm;
function handleCatalogCouresesResponse(courses) {
  const categorized = categoriseCatalogCourses(courses);
  categorized.forEach((category) => {
    category.courses.sort((c1, c2) => {
      if (c1.prefix < c2.prefix) return -1;
      if (c2.prefix > c1.prefix) return 1;
      return c1.courseCode - c2.courseCode;
    });
    category.courses = groupCourses(category.courses, 3);
  });
  categorized.sort((c1, c2) =>
    c1.courseType < c2.courseType ? -1 : c1.courseType > c2.courseType
  );
  return categorized;
}
