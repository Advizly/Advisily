const { GENERAL_ELECTIVE_CODE, MAJOR_ELECTIVE_CODE } = require("./constants");
const {
  concurrentNotRemoved,
  courseTaken,
  prerequisiteFulfilled,
  getUserElectives,
  _isElective,
  _isGeneralElective,
  _isMajorElective,
  _isMathElective,
} = require("./utils");

module.exports = { filterPlanCourses };
function filterPlanCourses(planCourses, user, catalog) {
  let filtered = filterRequisites(planCourses, user);

  filtered = removeTakenElectives(filtered, user.courses, catalog);
  return filtered;
}

function filterRequisites(planCourses, user) {
  const userCourses = user.courses;

  let filteredCourses = planCourses.filter((course, index, array) => {
    if (_isElective(course)) return true; //ignore elective courses ... will be handled by another function.
    if (courseTaken(course.courseId, userCourses)) return false; //remove taken courses
    if (!prerequisiteFulfilled(course, user, array)) return false; //remove courses whose prerequisites aren't fulfilled
    return true;
  });

  filteredCourses = filteredCourses.filter(
    (course) => concurrentNotRemoved(course, userCourses, filteredCourses) //remove courses whose concurrent courses were removed
  );

  filteredCourses = filteredCourses.filter(
    (course) => concurrentNotRemoved(course, userCourses, filteredCourses) //re-iterate
  );

  return filteredCourses;
}

function removeTakenElectives(filteredCourses, userCourses, catalog) {
  const catalogCourses = catalog.courses;
  const { electives } = getUserElectives({ catalogCourses, userCourses });

  /**
   * Logic
   * - get all courses that don't count as concenteration, collateral, core requirements.
   * - if course counts as math elective:
   *     if exists math elective: remove 1 math elective
   *     else if course counts as both: try to remove one major elective
   *    else: try to remove general elective
   *
   * - if course counts as major elective:
   *
   * -
   */

  for (let i = 0; i < electives.length; i++) {
    let nextElectiveIndex = -1;
    const elective = electives[i];
    if (_isMathElective(elective))
      nextElectiveIndex = filteredCourses.findIndex((course) =>
        _isMathElective(course)
      );

    if (_isMajorElective(elective) && nextElectiveIndex === -1)
      nextElectiveIndex = filteredCourses.findIndex((course) =>
        _isMajorElective(course)
      );

    if (_isGeneralElective(elective) || nextElectiveIndex === -1) {
      nextElectiveIndex = filteredCourses.findIndex((course) =>
        _isGeneralElective(course)
      );
    }
    if (nextElectiveIndex === -1) continue;

    filteredCourses.splice(nextElectiveIndex, 1);
  }

  return filteredCourses;
}

function _filterCoursesByCode(courses, courseCode) {
  return courses.filter((course) => course.courseCode === courseCode);
}
