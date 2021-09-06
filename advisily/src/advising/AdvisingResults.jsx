import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getPlan } from "../logic/logic";
import { formatCourseData } from "../utils/coursesUtils";

function AdvisingResults(props) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getPlan(1)
      .then((r) => setCourses(r))
      .catch((err) => console.log(err));
  }, []);

  const renderCourses = () => {
    // console.log(courses);
    let arr = [];
    const res = courses.map((course) => {
      let { courseId, formatedTitle } = formatCourseData(course);

      if (courseId === 10)
        courseId = `${courseId}` + Math.random() * 100 * Math.random();
      arr.push(courseId);
      return <li key={courseId}>{formatedTitle}</li>;
    });
    return res;
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="frame ">
        <h1 className="text-center">Your results are here!</h1>
        <h5>Status:</h5>
        <p>
          <strong>On track</strong>. Keep it going! you are currently moving on
          track and expected to graduate after 4 semester.
        </p>
        <h5>Recomended courses:</h5>
        <ul>
          {renderCourses()}
          {/* <li>Course 1</li>
          <li>Course 2</li>
          <li>Course 3</li>
          <li>Course 4</li>
          <li>Lab 1</li> */}
        </ul>
        <strong>Total Credits: </strong>13
        <h5 className="my-2">
          You may choose 1 courses from the following to reach <em>16 </em>
          credits:
        </h5>
        <ul>
          <li>Course A</li>
          <li>Course B</li>
          <li>Course C</li>
        </ul>
        <h5>Recommendations:</h5>
        <ol>
          <li>
            It is recommended that you take one or more of the following
            courses:
            <ul>
              <li>Course 1</li>
              <li>Course 2</li>
              <li>Course 3</li>
            </ul>
          </li>
          <strong>Or</strong>
          <li>Take one of the following courses next summer:</li>
          <ul>
            <li>Course 1</li>
            <li>Course 3</li>
          </ul>
        </ol>
        <hr />
        <div className="d-flex justify-content-between">
          <button className="btn ">Email me</button>
          <Link to="/advising/form" replace>
            <button className="btn btn-primary">New Advising Session?</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdvisingResults;
