import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAdvisingResultCourses,
  retrieveAdvisingSession,
} from "../services/advisingService";
import { getCurrentUser } from "../services/authService";
import { formatCourseData } from "../utils/coursesUtils";

function AdvisingResults(props) {
  const [courses, setCourses] = useState([]);
  const user = getCurrentUser();
  const advisingSessionId = retrieveAdvisingSession() || user.advisingSessionId;
  useEffect(() => {
    getAdvisingResultCourses(advisingSessionId)
      .then((courses) => {
        courses.forEach(
          (course) =>
            (course.credits = course.credits === null ? 3 : course.credits)
        );
        courses = courses.sort(
          (c1, c2) => c1.semesterNumber - c2.semesterNumber
        );
        setCourses(courses);
      })
      .catch((err) => console.log(err));
  }, [advisingSessionId]);

  const renderCourses = () => {
    let arr = [];
    const formatedCourses = courses.map((course) => {
      let { courseId, formatedTitle } = formatCourseData(course);

      if (courseId === 10)
        courseId = `${courseId}` + Math.random() * 100 * Math.random();
      arr.push(courseId);
      return <li key={courseId}>{formatedTitle}</li>;
    });

    const totalCredits = courses
      .map((c) => c.credits)
      .reduce((c1, c2) => c1 + c2, 0);

    return (
      <>
        <ul>{formatedCourses}</ul>
        <strong>Total Credits: </strong>
        {totalCredits}
      </>
    );
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="frame ">
        <h1 className="text-center">Your results are here!</h1>
        {/* <h5>Status:</h5>
        <p>
          <strong>On track</strong>. Keep it going! you are currently moving on
          track and expected to graduate after 4 semester.
        </p> */}
        <h5>Recomended courses:</h5>
        <p>
          The following is a list of courses suggested for you to take in your
          next semester.
        </p>
        {renderCourses()}
        {/* <h5 className="my-2">
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
        </ol>*/}
        <hr />
        <div className="d-flex justify-content-end">
          {/* <button className="btn ">Email me</button> */}
          <Link to="/advising/form" replace>
            <button className="btn btn-primary">New Advising Session?</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdvisingResults;
