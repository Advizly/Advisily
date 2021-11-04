import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAdvisingResultCourses,
  retrieveAdvisingSession,
  getUserAdvisingSessionId,
  getAdvisingResults,
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
import { getStudentCourses, getUsers } from "../services/userService";

function AdvisingResults(props) {
  const [userIndex, setUserIndex] = useState(0);
  const incrementIndex = () => {
    setUserIndex(userIndex + 1 < users.length ? userIndex + 1 : userIndex);
  };
  const decrementIndex = () => {
    setUserIndex(userIndex - 1 >= 0 ? userIndex - 1 : userIndex);
  };
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const getUsersApi = useApi(getUsers, (users) => {
    setUsers(users);
    setUser(users[userIndex]);
  });
  useEffect(() => {
    getUsersApi.request();
  }, []);
  useEffect(() => {
    setUser(users[userIndex]);
  }, [userIndex]);

  // const user=getCurrentUser()
  const [advisingSessionId, setAdvisingSessionId] = useState(null);
  const resultCoursesApi = useApi(getAdvisingResults);

  const advisingSessionIdApi = useApi(getUserAdvisingSessionId, (res) =>
    setAdvisingSessionId(res)
  );

  const userCoursesApi = useApi(getStudentCourses, (courses) => {
    return renderCoursesList(courses);
  });

  useEffect(() => {
    if (advisingSessionId && user) resultCoursesApi.request(advisingSessionId);
  }, [advisingSessionId]);
  useEffect(() => {
    console.log("USER EFFECT");
    if (user && user.userId) {
      userCoursesApi.request(user.userId);

      advisingSessionIdApi.request(user.userId);
    }
  }, [user]);

  const renderCoursesList = (courses) => {
    return courses.map((course) => {
      let { courseId, formatedTitle } = formatCourseData(course);
      if (courseId === 1 || courseId === 2)
        courseId = `${courseId}` + Math.random() * 100 * Math.random();

      return <li key={courseId}>{formatedTitle}</li>;
    });
  };
  console.log("USER:", user);

  const renderResults = (results) => {
    console.log("RESULT: ,", results);
    if (!results || !results.semesters) return null;

    const result = results.semesters.map(({ semesterNumber, courses }) => {
      const sortedCourses = sortCourses(courses);
      const totalCredits = sortedCourses
        .map((c) => (c.credits !== null ? c.credits : 3))
        .reduce((c1, c2) => c1 + c2);
      return (
        <>
          <h5>Semester Number {semesterNumber}</h5>
          {renderCoursesList(sortedCourses)}
          <br />
          <p>
            <strong>Total Credits: </strong>
            {totalCredits}
          </p>
          <hr />
        </>
      );
    });
    return result;

    // const rows = groupCourses(result, 2);
    // return rows.map((columns) => {
    //   return (
    //     <Row>
    //       {columns.map((column) => (
    //         <ColMedium>{column}</ColMedium>
    //       ))}
    //     </Row>
    //   );
    // });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="frame ">
        <h1 className="text-center">Your results are here!</h1>
        <div className="d-flex justify-content-between">
          <button className="btn " onClick={decrementIndex}>
            Previous
          </button>
          <button className="btn " onClick={incrementIndex}>
            Next
          </button>
        </div>
        <br />
        {user && (
          <>
            <h3 className="text-center">User Info</h3>
            <p>
              <strong>User Id: </strong>
              {user.userId}
            </p>
            <p>
              <strong>Name: </strong>
              {user.firstName + " " + user.lastName}
            </p>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <p>
              <strong>Standing: </strong>
              {user.standing}
            </p>
            <hr />
          </>
        )}

        <h3 className="text-center">User courses</h3>
        {userCoursesApi.data}
        <hr />
        <h3 className="text-center">Advised Courses</h3>
        {renderResults(resultCoursesApi.data)}

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
