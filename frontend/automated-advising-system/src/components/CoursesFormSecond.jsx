import React from "react";
import * as Yup from "yup";
import { Form, SubmitButton, FormCheckbox } from "./common/form";
import { getAllCourses, getTakenCourses } from "../services/coursesService";
import * as CourseUtil from "../utils/coursesUtils";
import { ColLarge, Row } from "./common/grid";

const courses = getAllCourses();
const taken = getTakenCourses();

function CoursesForm(props) {
  const initialValues = { coursesIds: taken };
  const validationSchema = Yup.object({
    coursesIds: Yup.array().required(),
  });

  const renderCourseRow = (row) => {
    return row.map((course) => {
      const { courseId, formatedTitle } = CourseUtil.formatCourseData(course);
      return (
        <ColLarge key={courseId}>
          <FormCheckbox
            label={formatedTitle}
            name="coursesIds"
            value={courseId}
          />
        </ColLarge>
      );
    });
  };

  const renderCourses = () => {
    return groupedCourses.map((row, index, arr) => {
      const horizontalLine =
        index !== 0 && !(index % 5) && index !== arr.length - 1;
      return (
        <Row key={"key" + row[0].longNumber}>
          {renderCourseRow(row)}
          {horizontalLine ? <hr /> : null}
        </Row>
      );
    });
  };

  const handleSubmit = (values, { setSubmitting, ...others }) => {
    console.log(values, others);

    setInterval(() => {
      setSubmitting(false);
    }, 2000);
  };

  const groupedCourses = CourseUtil.groupCourses(courses, 2);
  return (
    <>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        title={"Advising"}
        onSubmit={handleSubmit}
      >
        <h4>Please select all the courses you have taken so far:</h4>
        <br />
        {renderCourses()}
        <SubmitButton />
      </Form>
    </>
  );
}

export default CoursesForm;
