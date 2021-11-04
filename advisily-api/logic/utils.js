const {
  Course_Types,
  StandingsIds,
  RequisiteIds,
  MAJOR_ELECTIVE_CODE,
  GENERAL_ELECTIVE_CODE,
  MATH_ELECTIVE_CODE,
} = require("./constants");

module.exports = {
  concurrentNotRemoved,
  courseTaken,
  prerequisiteFulfilled,
  getUserElectives,
  _isElective,
  _isGeneralElective,
  _isMajorElective,
  _isMathElective,
  _isMajorConcenteration,
  addCourseTypes,
  groupBySemester,
};

function courseTaken(courseId, userCourses) {
  const userCourseIds = userCourses.map((c) => c.courseId);
  return userCourseIds.includes(courseId);
}

//returns true if all prerequisites of "course" were taken
function prerequisiteFulfilled(course, user, planCourses) {
  const { requisites } = course;
  if (!requisites.length) return true;
  const res = requisites.some((reqSet) => {
    return reqSet.every((r) => {
      if (r.requisiteTypeId === RequisiteIds.PREREQUISITE)
        return courseTaken(r.courseId, user.courses);

      if (r.requisiteTypeId === RequisiteIds.JUNIOR_STANDING)
        return user.standingId >= StandingsIds.JUNIOR;

      if (r.requisiteTypeId === RequisiteIds.SENIOR_STANIDNG)
        return user.standingId >= StandingsIds.SENIOR;

      if (r.requisiteTypeId === RequisiteIds.FINISHED_300_LEVEL)
        return finished300LevelCourses(user, planCourses);

      return true;
    });
  });

  return res;
}
function finished300LevelCourses(user, planCourses) {
  const courses300LvlIds = planCourses
    .filter(
      (course) =>
        course.courseCode >= 3000 &&
        course.courseCode < 4000 &&
        course.courseTypeId === Course_Types.Concentration &&
        course.prefix === "CSCE"
    )
    .map((course) => course.courseId);
  const userCoursesIds = user.courses.map((course) => course.courseId);

  return courses300LvlIds.every((courseId) =>
    userCoursesIds.includes(courseId)
  );
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
      if (
        r.requisiteTypeId === RequisiteIds.COREQUISITE &&
        !courseTaken(r.courseId, userCourses)
      )
        return courseIds.includes(r.courseId);
      if (
        r.requisiteTypeId === RequisiteIds.PREREQUISITE_OR_CONCURRENT &&
        !courseTaken(r.courseId, userCourses)
      )
        return courseIds.includes(r.courseId);

      return true;
    });
  });
  return res;
}

function _isElective(course) {
  return (
    _isMajorElective(course) ||
    _isGeneralElective(course) ||
    _isMathElective(course)
  );
}

function _isMajorElective(course) {
  const { courseTypeId, courseCode } = course;
  if (
    courseTypeId !== undefined &&
    (courseTypeId === Course_Types.MajorElectives ||
      courseTypeId == Course_Types.MathOrMajorElective)
  )
    return true;

  return courseCode === MAJOR_ELECTIVE_CODE;
}
function _isGeneralElective(course) {
  const { courseTypeId, courseCode } = course;
  if (
    courseTypeId !== undefined &&
    courseTypeId === Course_Types.GeneralElectives
  )
    return true;

  return courseCode === GENERAL_ELECTIVE_CODE;
}
function _isMathElective(course) {
  const { courseTypeId, courseCode } = course;

  if (
    courseTypeId !== undefined &&
    (courseTypeId === Course_Types.MathElectives ||
      courseTypeId === Course_Types.MathOrMajorElective)
  )
    return true;

  return courseCode === MATH_ELECTIVE_CODE;
}
function _isMajorConcenteration(course) {
  const { courseTypeId } = course;
  return courseTypeId && courseTypeId === Course_Types.Concentration;
}

function getUserElectives({ userCourses, catalogCourses }) {
  const catalogElectiveCourses = catalogCourses.filter((course) =>
    _isElective(course)
  );
  const electiveCoursesIds = catalogElectiveCourses.map(
    (course) => course.courseId
  );
  const catalogCoursesIds = catalogCourses.map((course) => course.courseId);
  const electives = userCourses.filter(
    (course) =>
      electiveCoursesIds.includes(course.courseId) ||
      // !catalogCoursesIds.includes(course.courseId) ||
      _isElective(course)
  );

  return { electives };
}

function addCourseTypes(courses, catalogCourses) {
  const map = {};
  catalogCourses.forEach(
    (course) => (map[course.courseId] = course.courseTypeId)
  );

  return courses.map((course) => {
    let courseTypeId = map[course.courseId];

    if (_isMajorElective(course)) courseTypeId = Course_Types.MajorElectives;
    if (_isMathElective(course)) courseTypeId = Course_Types.MathElectives;
    if (_isMajorElective(course) && _isMathElective(course))
      courseTypeId = Course_Types.MathOrMajorElective;
    if (_isGeneralElective(course) || courseTypeId === undefined)
      courseTypeId = Course_Types.GeneralElectives;

    // if (courseTypeId === undefined)
      // console.log("From addCourseTypes", course.courseTitle, course.courseCode);

    return {
      ...course,
      courseTypeId,
    };
  });
}

//return array of objects.
//each object has semester number and array of courses that should be taken in this semester
function groupBySemester(coursesCoReqs) {
  let groups = [];

  for (let i = 0; i < coursesCoReqs.length; i++) {
    const { courseGroup } = coursesCoReqs[i];
    const { semesterNumber } = courseGroup[0];

    let groupIndx = groups.findIndex(
      (g) => g.semesterNumber === semesterNumber
    );
    if (groupIndx === -1)
      groups.push({ semesterCourses: [coursesCoReqs[i]], semesterNumber });
    else groups[groupIndx].semesterCourses.push(coursesCoReqs[i]);
  }

  return groups;
}
