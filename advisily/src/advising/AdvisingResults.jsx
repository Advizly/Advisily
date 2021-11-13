import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAdvisingResultCourses,
  retrieveAdvisingSession,
  getUserAdvisingSessionId,
  getAdvisingResults,
  verifyResults,
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

  // const user = getCurrentUser();
  const [advisingSessionId, setAdvisingSessionId] = useState(null);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(false);
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
    if (user && user.userId) {
      advisingSessionIdApi.request(user.userId);
      userCoursesApi.request(user.userId);
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
  const resultsAvailable = () =>
    resultCoursesApi.data &&
    resultCoursesApi.data.semesters &&
    resultCoursesApi.data.semesters.length;

  const resultsAvailableUI = () => (
    <>
      <h1 className="text-center">Your results are here!</h1>
      <br />
      <h4 className="fw-bold ">Important Note:</h4>
      <p>
        If you are not satisfied with your results you should contact your
        advisor and schedule a meeting. You can find you advisor in degree works
        through{" "}
        <a href="https://ssb-prod.ec.aucegypt.edu/PROD/twbkwbis.P_ValLogin">
          banner self-service
        </a>
        .
      </p>
      <p>
        {" "}
        If you are satisfied, please press on <strong>
          "Verify Results"
        </strong>{" "}
        button so that your hold will be removed later.
      </p>
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
    </>
  );
  const noResultsUI = () => (
    <div className="text-center">
      <h2>Results</h2>
      <h4>No results available yet or you have not done advising</h4>
    </div>
  );

  const handleVerify = async () => {
    if (!advisingSessionId)
      return alert("Sorry! An error occurred while verifying your results");

    if (window.confirm("Are you sure you want to verify these results?")) {
      try {
        await verifyResults(advisingSessionId);
        alert("Success! Your results were verified");
        setDisableVerifyBtn(true);
        window.location.reload(true);
      } catch (e) {
        console.log(e);
        alert("Sorry! An error occurred while verifying your results");
      }
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="frame ">
        {resultsAvailable() ? resultsAvailableUI() : noResultsUI()}
        <div className="d-flex justify-content-between">
          <Link to="/advising/form" replace>
            <button className="btn">New Advising Session?</button>
          </Link>
          {!!resultsAvailable() && !resultCoursesApi.data.isVerified && (
            <button
              disabled={disableVerifyBtn}
              className="btn btn-primary"
              type="button"
              onClick={handleVerify}
            >
              Verify Results
            </button>
          )}
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
