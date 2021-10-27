import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAdvisingResultCourses,
  retrieveAdvisingSession,
  getUserAdvisingSessionId,
} from "../services/advisingService";
import { getCurrentUser } from "../services/authService";
import {
  formatCourseData,
  groupCourses,
  groupCoursesBySemesterNumber,
  sortCourses,
} from "../utils/coursesUtils";

import { Row, ColMedium } from "../components/grid";
import useApi from "../hooks/useApi";
import { getStudentCourses } from "../services/userService";

function AdvisingResults(props) {
  const [advisingSessionId, setAdvisingSessionId] = useState(null);
  const resultCoursesApi = useApi(
    getAdvisingResultCourses,
    sortAndRemoveNullCredits
  );

  const advisingSessionIdApi = useApi(getUserAdvisingSessionId, (res) =>
    setAdvisingSessionId(res)
  );

  const userCoursesApi = useApi(getStudentCourses, (courses) => {
    return renderCoursesList(courses);
  });

  const user = getCurrentUser();
  useEffect(() => {
    if (advisingSessionId) resultCoursesApi.request(advisingSessionId);
  }, [advisingSessionId]);
  useEffect(() => {
    if (user) {
      userCoursesApi.request(user.userId);

      if (!advisingSessionId) advisingSessionIdApi.request(user.userId);
    }
  }, [user.userId]);

  const renderCoursesList = (courses) => {
    return courses.map((course) => {
      let { courseId, formatedTitle } = formatCourseData(course);
      if (courseId === 1 || courseId === 2)
        courseId = `${courseId}` + Math.random() * 100 * Math.random();

      return <li key={courseId}>{formatedTitle}</li>;
    });
  };
  const renderCourses = (courses) => {
    const sortedCourses = sortCourses(courses);
    const groupedCourses = groupCoursesBySemesterNumber(sortedCourses);

    const semesters = groupedCourses.map((group) => {
      const { semesterNumber } = group;

      const semesterCoursesUI = renderCoursesList(group.courses);

      const totalCredits = group.courses
        .map((c) => c.credits)
        .reduce((c1, c2) => c1 + c2, 0);

      return (
        <ColMedium>
          <h5>Semester Number: {semesterNumber}</h5>
          {semesterCoursesUI}
          <br />
          <strong>Total credits: </strong>
          {totalCredits}
        </ColMedium>
      );
    });

    const semestersGrouped = groupCourses(semesters, 2);
    return semestersGrouped.map((group) => (
      <>
        <Row>{group}</Row>
        <hr />
      </>
    ));
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="frame ">
        <h1 className="text-center">Your results are here!</h1>
        <br />

        <h3 className="text-center">User courses</h3>
        {userCoursesApi.data}
        <hr />
        <h3 className="text-center">Advised Courses</h3>
        {renderCourses(resultCoursesApi.data)}

        <div className="d-flex justify-content-between">
          <button className="btn ">Download</button>
          <Link to="/advising/form" replace>
            <button className="btn btn-primary">New Advising Session?</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdvisingResults;
function sortAndRemoveNullCredits(courses) {
  courses.forEach(
    (course) => (course.credits = course.credits === null ? 3 : course.credits)
  );
  courses.sort((c1, c2) => c1.semesterNumber - c2.semesterNumber);
  return courses;
}
