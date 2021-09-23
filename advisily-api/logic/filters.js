const { GENERAL_ELECTIVE_CODE, MAJOR_ELECTIVE_CODE } = require("./constants");
const {
  concurrentNotRemoved,
  courseTaken,
  prerequisiteFulfilled,
  getMajorElectiveUserCourses,
} = require("./utils");

module.exports = { filterPlanCourses };
function filterPlanCourses({ planCourses, user, catalogCourses, catalog }) {
  const userCourses = user.courses;
  let filteredCourses = filterRequisites(planCourses, user);

  filteredCourses = removeTakenElectives(
    filteredCourses,
    catalogCourses,
    userCourses,
    catalog
  );
  return filteredCourses;
}

function filterRequisites(planCourses, user) {
  const userCourses = user.courses;

  let filteredCourses = planCourses.filter((course) => {
    if (course.courseCode === 4980) console.log("COURSE: ", course.requisites);
    if (courseTaken(course.courseId, userCourses)) return false; //remove taken courses
    if (!prerequisiteFulfilled(course, user)) return false; //remove courses whose prerequisites aren't fulfilled
    return true;
  });
  filteredCourses = filteredCourses.filter(
    (course) => {
      return concurrentNotRemoved(course, userCourses, filteredCourses);
    } //remove courses whose concurrent courses were removed
  );

  filteredCourses = filteredCourses.filter((course) =>
    concurrentNotRemoved(course, userCourses, filteredCourses)
  );

  return filteredCourses;
}

function removeTakenElectives(
  filteredCourses,
  catalogCourses,
  userCourses,
  catalog
) {
  //remove major elective courses
  const takenElectives = getMajorElectiveUserCourses({
    catalogCourses,
    userCourses,
  });

  for (let i = 0; i < takenElectives.length; i++) {
    let nextElectiveIndex = filteredCourses.findIndex(
      (course) => course.courseCode === MAJOR_ELECTIVE_CODE
    );
    if (nextElectiveIndex === -1)
      nextElectiveIndex = filteredCourses.findIndex(
        (course) => course.courseCode === GENERAL_ELECTIVE_CODE
      );
    if (nextElectiveIndex === -1) break;

    filteredCourses.splice(nextElectiveIndex, 1);
  }

  return filteredCourses;
}

function _filterCoursesByCode(courses, courseCode) {
  return courses.filter((course) => course.courseCode === courseCode);
}
