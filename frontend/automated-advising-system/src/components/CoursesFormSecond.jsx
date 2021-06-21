import React from "react";
import * as Yup from "yup";
import { Form, SubmitButton, FormCheckbox } from "./common/form";
import { getCourses } from "../services/courses";

const courses = getCourses();

function CoursesForm(props) {
  const initialValues = { courses: [] };
  const validationSchema = Yup.object({
    courses: Yup.array().required(),
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
    let myIndex = 0;
    return groupedCourses.map((row, index, arr) => (
      <div className="row" key={"key" + row[0].longNumber}>
        {row.map(({ longNumber, shortNumber, title, prefix }, index) => {
          const courseId = longNumber;
          const formatedTitle =
            prefix + " " + shortNumber + "/" + longNumber + " " + title;
          const disabled = myIndex % 3 !== 0 ? true : false;
          myIndex++;
          return (
            <div className="col" key={courseId}>
              <FormCheckbox
                label={formatedTitle}
                name="courses"
                value={courseId}
                disabled={disabled}
                checked={disabled}
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

  const handleSubmit = (values, { setSubmitting, ...others }) => {
    console.log(values, others);

    setInterval(() => {
      setSubmitting(false);
    }, 2000);
  };

  const groupedCourses = groupCourses(2);
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
