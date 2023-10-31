import React, { useState } from "react";

import {
    formatCourseData,
    // groupCourses,
    // groupCoursesBySemesterNumber,
    sortCourses,
    renderCoursesList
  } from "../utils/coursesUtils";

const ResultsComponent = ({ resultCoursesApi }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const semestersPre = resultCoursesApi?.semesters?.filter(
    (r) => r.planType === 0
  );
  const semestersCon = resultCoursesApi?.semesters?.filter(
    (r) => r.planType === 1
  );

  const selectedSemesters =
    selectedTab === 0 ? semestersPre : selectedTab === 1 ? semestersCon : [];


  const handleTabChange = (tabIndex) => {
    setSelectedTab(tabIndex);
  };


  return (
<div className="container mt-5">
      <ul className="nav nav-tabs mb-5">
        <li className="nav-item">
          <button
            className={`nav-link ${selectedTab === 0 ? "active" : ""}`}
            onClick={() => handleTabChange(0)}
          >
            Plan A
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${selectedTab === 1 ? "active" : ""}`}
            onClick={() => handleTabChange(1)}
          >
            Plan B
          </button>
        </li>
      </ul>

      {selectedSemesters.map(({ semesterNumber, courses }) => {
        const results = courses.filter(c=>c.planType===selectedTab)
      const sortedCourses = sortCourses(results);
      console.log(sortedCourses)
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
      })}
     
    </div>
  );
};
  




export default ResultsComponent;
