import React from "react";
import * as Yup from "yup";
import { Form, SubmitButton, FormCheckbox } from "./common/form";
import { getCourses } from "../services/courses";

const courses = getCourses();

function CoursesForm(props) {
  const initialValues = { courses: [] };
  const validationSchema = Yup.object({
    courses: Yup.array(),
  });

  const groupCourses = (coursesPerRow = 2) => {
    const groupedCourses = [];
    let row = [];
    for (let i = 1; i <= courses.length; i++) {
      row.push(courses[i - 1]);

      if ((i !== 0 && i % coursesPerRow === 0) || i === courses.length) {
        groupedCourses.push(row);
        row = [];
        //update
      }
    }
    return groupedCourses;
  };

  const renderCourses = () => {
    return groupedCourses.map((row, index, arr) => (
      <div className="row" key={"key" + row[0].courseLongNumber}>
        {row.map((course) => {
          const courseId = course.courseLongNumber;
          return (
            <div className="col form-check" key={courseId}>
              <FormCheckbox
                label={course.courseTitle}
                name={"courses"}
                value={courseId}
              />
            </div>
          );
        })}
        {index !== 0 && !(index % 5) && index !== arr.length - 1 ? (
          <hr />
        ) : null}
      </div>
    ));
  };

  const groupedCourses = groupCourses(2);
  return (
    <>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        title={"Courses Taken"}
      >
        <h4 className="strike-through">
          Please select all the courses you have taken so far:
        </h4>
        <br />
        {renderCourses()}
        <SubmitButton />
      </Form>
    </>
  );
}

export default CoursesForm;
