import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch, useLocation } from "react-router-dom";
import {
  // getAdvisingResultCourses,
  // retrieveAdvisingSession,
  getUserAdvisingSessionId,
  getAdvisingResults,
} from "../services/advisingService";
import { getCurrentUser } from "../services/authService";
import {
  formatCourseData,
  // groupCourses,
  // groupCoursesBySemesterNumber,
  sortCourses,
} from "../utils/coursesUtils";

import { Row, ColMedium } from "../components/grid";
import useApi from "../hooks/useApi";
import {
  getStudentCourses,
  // getUsers
} from "../services/userService";
import hoursPdf from "../assets/pdfs/FacultyOfficeHours.pdf";

function AdvisingResults({}) {
  const params = useParams();
  const res = useRouteMatch();
  const location = useLocation();
  console.log(params, res, location.state, res.params);
  // const [userIndex, setUserIndex] = useState(0);
  // const incrementIndex = () => {
  //   setUserIndex(userIndex + 1 < users.length ? userIndex + 1 : userIndex);
  // };
  // const decrementIndex = () => {
  //   setUserIndex(userIndex - 1 >= 0 ? userIndex - 1 : userIndex);
  // };

  // const [user, setUser] = useState(null);
  // const [users, setUsers] = useState([]);
  // const getUsersApi = useApi(getUsers, (users) => {
  //   setUsers(users);
  //   setUser(users[userIndex]);
  // });
  // useEffect(() => {
  //   getUsersApi.request();
  // }, []);
  // useEffect(() => {
  //   setUser(users[userIndex]);
  // }, [userIndex]);
  const user = getCurrentUser();

  const [advisingSessionId, setAdvisingSessionId] = useState(null);
  const resultCoursesApi = useApi(getAdvisingResults);

  const advisingSessionIdApi = useApi(getUserAdvisingSessionId, (res) =>
    setAdvisingSessionId(res)
  );

  const userCoursesApi = useApi(getStudentCourses, (courses) =>
    renderCoursesList(courses)
  );

  useEffect(() => {
    if (advisingSessionId && user) resultCoursesApi.request(advisingSessionId);
  }, [advisingSessionId]);
  useEffect(() => {
    if (user && user.userId) {
      advisingSessionIdApi.request(user.userId);
      userCoursesApi.request(user.userId);
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

  const renderResults = (results) => {
    if (!results || !results.semesters || !results.semesters.length)
      return null;

    const result = results.semesters.map(({ semesterNumber, courses }) => {
      const sortedCourses = sortCourses(courses);
      let totalCredits;
      if (sortedCourses.length)
        totalCredits = sortedCourses
          .map((c) => (c.credits !== null ? c.credits : 3))
          .reduce((c1, c2) => c1 + c2, 0);
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
  };
  const resultsAvailable = () =>
    resultCoursesApi.data &&
    resultCoursesApi.data.semesters &&
    resultCoursesApi.data.semesters.length;

  const resultsAvailableUI = () => (
    <>
      <h1 className="text-center">Your results are here!</h1>
      <p>
        Your advising hold will be released, if you still want to see a human
        advisor, please click <a href={hoursPdf}>here</a> to check your advisor
        schedule. You can find you advisor in degree works through{" "}
        <a href="https://ssb-prod.ec.aucegypt.edu/PROD/twbkwbis.P_ValLogin">
          banner self-service
        </a>
        .
      </p>

      <br />
      <h5 className="fw-bold ">Important Notes:</h5>
      <ol>
        <li>
          It is recommended to take CSCE 3304 - Digital Design II after CSCE
          3301 - Computer Architecture.
        </li>

        <li>
          {" "}
          CSCE 4411 - Fundamentals of Distributed Systems is offered in Fall
          only.
        </li>
        <li>
          All students admitted to the University starting Fall 2019 must
          complete one generic course in Arab World studies and another course
          that focuses on Egypt that must be taken from the Arab World Studies
          (Egypt Category). For more information, please refer to the{" "}
          <a href="https://catalog.aucegypt.edu/">catalog</a>.
        </li>
        <li>
          {" "}
          Before starting your Senior Project I, you must have completed all
          your CSCE 3000-level concentration courses. In addition, you must have
          taken two 4000-level courses or will be taking them concurrently with
          Senior Project I.
        </li>
        <li>
          If you are following the new 4.5 year plan, kindly note that ENGR
          2105: Engineering Mechanics is a different course from ENGR 2102:
          Engineering Mechanics I(statics) and ENGR 2104: Engineering Mechanics
          II (dynamics). You should either take both ENGR 2102 and
        </li>
      </ol>

      {/* <div className="d-flex justify-content-between">
        <button className="btn " onClick={decrementIndex}>
          Previous
        </button>
        <button className="btn " onClick={incrementIndex}>
          Next
        </button>
      </div> */}
      <br />
      {/* {user && (
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
      <hr /> */}
      <h3 className="text-center">Advised Courses</h3>
      {renderResults(resultCoursesApi.data)}
    </>
  );
  const noResultsUI = () => (
    <div className="text-center">
      <h2>Results</h2>
      <h4>No results available yet or you have not done advising</h4>
    </div>
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="frame ">
        {resultsAvailable() ? resultsAvailableUI() : noResultsUI()}
        <div className="d-flex justify-content-between">
          <Link to="/advising/form" replace>
            <button className="btn">New Advising Session?</button>
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
