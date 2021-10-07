const _ = require("lodash");
const {
  StandingsIds,
  JUNIOR_CREDITS,
  SENIOR_CREDITS,
  Course_Types,
} = require("./constants");
const { filterPlanCourses } = require("./filters");
const { courseTaken, _isElective, addCourseTypes } = require("./utils");

module.exports = { generatePlan };

function generatePlan({ user, planCourses, advisingSession, catalog }) {
  planCourses = addCourseTypes(planCourses, catalog.courses);
  planCourses.push({
    courseId: 1432,
    credits: 3,
    requisites: [],
    semesterNumber: 1,
    courseTypeId: Course_Types.Collateral,
  }); // calc 1

  const semestersToPlan = 10;
  let resultSemesters = [];

  user.totalCredits = user.courses
    .map((course) => course.credits)
    .reduce((c1, c2) => c1 + c2, 0);

  for (let i = 0; i < semestersToPlan; i++) {
    user.courses = addCourseTypes(user.courses, catalog.courses);
    user.courses = sortBySemester(user.courses);

    let filteredCourses = addCourseTypes(planCourses, catalog.courses);

    filteredCourses = filterPlanCourses({ planCourses, user, catalog });

    filteredCourses.forEach(
      //convert null credits to 3 by default
      (course) =>
        (course.credits = course.credits !== null ? course.credits : 3)
    );

    const sortedCourses = sortBySemester(filteredCourses);

    const resultCourses = getResultCourses(
      user,
      sortedCourses,
      advisingSession
    );
    resultSemesters.push({ resultCourses, semesterNumber: i + 1 });

    updateUser(user, resultCourses);
  }
  return resultSemesters;
}

function updateUser(user, resultCourses) {
  user.courses = user.courses.concat(resultCourses);
  resultCourses.forEach((course) => (user.totalCredits += course.credits));

  if (user.totalCredits > JUNIOR_CREDITS) user.standingId = StandingsIds.JUNIOR;
  if (user.totalCredits > SENIOR_CREDITS) user.standingId = StandingsIds.SENIOR;
  // console.log("User standing: ", user.standingId, user.totalCredits);
}

function getResultCourses(user, courses, advisingSession) {
  const { overloadingCredits } = advisingSession;
  const { semesterNumber } = user;
  if (!courses.length) return [];

  const coursesIdsMap = {};
  courses.forEach((course) => (coursesIdsMap[course.courseId] = course));

  courses = mapCoRequisitesToIds(courses, user.courses);

  const MAX_CREDITS = overloadingCredits ? overloadingCredits : 18;
  let reachedMaxCredits = false;
  const obj = {
    coursesIdsMap,
    resultCourses: [],
    resultCoursesIds: [],
    totalCredits: 0,
    MAX_CREDITS,
  };

  for (let i = 0; i < courses.length && !reachedMaxCredits; i++) {
    const course = courses[i];
    obj.course = course;
    if (!obj.resultCoursesIds.includes(course.courseId) || _isElective(course))
      tryAddingCourse(obj);

    reachedMaxCredits = obj.totalCredits === MAX_CREDITS;
  }

  return obj.resultCourses;
}

function tryAddingCourse(obj) {
  const {
    course,
    coursesIdsMap,
    resultCourses,
    resultCoursesIds,
    totalCredits,
    MAX_CREDITS,
  } = obj;

  if (course.credits + totalCredits > MAX_CREDITS) return false;

  resultCoursesIds.push(course.courseId);
  obj.totalCredits += course.credits;
  resultCourses.push(course);

  const { requisites } = course;
  if (!requisites.length) return true;
  const requisitesAdded = requisites.some((reqSet) => {
    if (!reqSet.length) return true;

    return reqSet.every((requisiteId) => {
      if (resultCoursesIds.includes(requisiteId)) return true;
      //else
      const nextCourse = coursesIdsMap[requisiteId];
      if (nextCourse === undefined) return false;

      const nextObj = {
        ...obj,
        course: nextCourse,
      };
      if (tryAddingCourse(nextObj)) {
        obj.totalCredits = nextObj.totalCredits;
        return true;
      }
      return false;
    });
  });

  if (requisitesAdded) return true;

  obj.totalCredits -= course.credits;
  resultCourses.pop();
  resultCoursesIds.pop();
  return false;
}

function mapCoRequisitesToIds(courses, userCourses) {
  for (let i = 0; i < courses.length; i++) {
    coReqIds = getCoRequisitesIds(courses[i], userCourses);
    courses[i].requisites = coReqIds;
  }
  return courses;
}

function getCoRequisitesIds(course, userCourses) {
  const reqSets = [];
  course.requisites.forEach((reqSet) => {
    if (!reqSet.length) return;

    const set = reqSet
      .filter((requisite) => {
        const { requisiteTypeId, courseId } = requisite;
        if (courseTaken(courseId, userCourses)) return false; //skip taken requisites
        if (requisiteTypeId !== 2 && requisiteTypeId !== 3) return false; //skip non-conncurent requisites

        return true;
      })
      .map((requisite) => requisite.courseId);

    reqSets.push(set);
  });
  return reqSets;
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

function sortBySemester(courses) {
  return courses.sort((c1, c2) => {
    if (_isElective(c1) && !_isElective(c2)) return 1;
    if (!_isElective(c1) && _isElective(c2)) return -1;
    return c1.semesterNumber - c2.semesterNumber;
  });
}

/*****
 * Algorithm:
 * get plan courses.
 * get courses finished by the user.
 * get the difference between both.
 * take the reamining courses in the plan and return the first X courses where SUM(X.crdits) <= 18.
 */

/*
 *
 **BASE****
 * 1- add plans/plans courses table: has each plan and catalogId and the needed courses.
 * 2- retrieve courses from plans table to create base for comparison. (remember to sort by semester number)
 * 3- get the courses finished by the user so far.
 * 4- do validation (skip for now): did he fulfill the prerequisites?
 * 5- remove the courses finished from the plan courses.
 * 6- get the first X courses from plans courses till their total credit is 18 or the maximum below 18.
 *  ***To be added******
 * 7-  do calculations to see if the student is on track (how?) IMPORTANT!!
 * divided courses to according to their type and check if he is late in a certain course category.
 * give values to courses in the plan; the ones with higher value are more important. (how??)
 * 10- plan X semesters ahead: repeat the base process X time. stopping condition is finishing the courses or reaching X semester.
 */
