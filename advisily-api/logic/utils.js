const { Course_Types, Standings } = require("./constants");

module.exports = {
  concurrentNotRemoved,
  courseTaken,
  prerequisiteFulfilled,
  getMajorElectiveUserCourses,
};

function courseTaken(courseId, userCourses) {
  const userCourseIds = userCourses.map((c) => c.courseId);
  return userCourseIds.includes(courseId);
}

//returns true if all prerequisites of "course" were taken
function prerequisiteFulfilled(course, user) {
  const { requisites } = course;
  if (!requisites.length) return true;
  const res = requisites.some((reqSet) => {
    return reqSet.every((r) => {
      if (r.requisiteTypeId === 1) return courseTaken(r.courseId, user.courses);
      if (r.requisiteTypeId === 4) return user.standingId >= Standings.JUNIOR;

      if (r.requisiteTypeId === 5) return user.standingId >= Standings.SENIOR;
      return true;
    });
  });

  return res;
}

//checks if concurrent requisites of "course" were removed or not.
//return true if not removed
function concurrentNotRemoved(course, userCourses, filteredPlanCourses) {
  const courseIds = filteredPlanCourses.map((c) => c.courseId);
  const { requisites } = course;
  if (!requisites.length) return true;
  const res = requisites.some((reqSet) => {
    if (!reqSet.length) return true;

    return reqSet.every((r) => {
      if (r.requisiteTypeId === 2 && !courseTaken(r.courseId, userCourses))
        return courseIds.includes(r.courseId);
      if (r.requisiteTypeId === 3 && !courseTaken(r.courseId, userCourses))
        return courseIds.includes(r.courseId);

      return true;
    });
  });
  // console.log(res);
  return res;
}

function getMajorElectiveUserCourses({ userCourses, catalogCourses }) {
  const electiveCoursesIds = catalogCourses
    .filter((course) => course.courseTypeId === Course_Types.MajorElectives)
    .map((course) => course.courseId);

  return userCourses.filter((usrCourse) =>
    electiveCoursesIds.includes(usrCourse.courseId)
  );
}
