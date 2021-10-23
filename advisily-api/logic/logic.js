const _ = require("lodash");
const {
  StandingsIds,
  JUNIOR_CREDITS,
  SENIOR_CREDITS,
  Course_Types,
} = require("./constants");
const { filterPlanCourses } = require("./filters");
const {
  courseTaken,
  _isElective,
  addCourseTypes,
  _isGeneralElective,
  _isMajorConcenteration,
} = require("./utils");

module.exports = { generatePlan };

function generatePlan({ user, planCourses, advisingSession, catalog }) {
  planCourses = addCourseTypes(planCourses, catalog.courses);

  const { exemptedCredits } = advisingSession;
  for (let i = 0; i < Math.ceil(exemptedCredits / 3.0); i++)
    planCourses.push({
      courseId: 2,
      courseCode: -9,
      credits: 3,
      requisites: [],
      semesterNumber: 9,
      courseTypeId: Course_Types.GeneralElectives,
    }); //general elective

  const semestersToPlan = 10;
  let resultSemesters = [];

  user.totalCredits = user.courses
    .map((course) => course.credits)
    .reduce((c1, c2) => c1 + c2, 0);

  for (let i = 0; i < semestersToPlan; i++) {
    user.courses = addCourseTypes(user.courses, catalog.courses);
    user.courses = sortByPriority(user.courses);
    const planCoursesCopy = _.cloneDeep(planCourses);

    let filteredCourses = filterPlanCourses(planCoursesCopy, user, catalog);

    filteredCourses.forEach(
      //convert null credits to 3 by default
      (course) =>
        (course.credits = course.credits !== null ? course.credits : 3)
    );

    // const sortedCourses = sortByPriority(filteredCourses);

    const resultCourses = getResultCourses(
      user,
      filteredCourses,
      advisingSession
    );
    resultSemesters.push({ resultCourses, semesterNumber: i + 1 });

    updateUser(user, resultCourses);
  }
  return resultSemesters;
}

function addWeight(planCourses) {
  return planCourses;
  planCourses.sort((c1, c2) => c1.semesterNumber - c2.semesterNumber);
  for (let i = planCourses.length - 1; i >= 0; i--) {
    const course = planCourses[i];
  }
}

function updateUser(user, resultCourses) {
  user.courses = user.courses.concat(resultCourses);
  resultCourses.forEach((course) => (user.totalCredits += course.credits));

  if (user.totalCredits > JUNIOR_CREDITS) user.standingId = StandingsIds.JUNIOR;
  if (user.totalCredits > SENIOR_CREDITS) user.standingId = StandingsIds.SENIOR;
}

function getResultCourses(user, courses, advisingSession) {
  const { overloadingCredits } = advisingSession;
  if (!courses.length) return [];

  courses = mapCoRequisitesToIds(courses, user.courses);
  const coursesIdsMap = {};
  courses.forEach((course) => (coursesIdsMap[course.courseId] = course));

  const MAX_CREDITS = overloadingCredits ? overloadingCredits : 18;
  let reachedMaxCredits = false;
  const obj = {
    user,
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
    user,
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

      if (courseTaken(nextCourse.courseId, user.courses)) return true;

      const nextObj = { ...obj, course: nextCourse };
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
  for (let i = 0; i < courses.length; i++)
    courses[i].requisites = getCoRequisitesIds(courses[i], userCourses);

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
        if (
          requisiteTypeId !== undefined &&
          requisiteTypeId !== 2 &&
          requisiteTypeId !== 3
        )
          return false; //skip non-conncurent requisites

        return true;
      })
      .map((requisite) => requisite.courseId);

    reqSets.push(set);
  });
  return reqSets;
}

function isInChain(course) {
  const chain = [
    { prefix: "PHYS", courseCode: 2211 }, //PHYS III
    { prefix: "PHYS", courseCode: 2212 }, //PHYS III lab
    { prefix: "CSCE", courseCode: 2301 }, //digital I
    { prefix: "CSCE", courseCode: 2302 }, //digital I lab
    { prefix: "CSCE", courseCode: 2303 }, //Computer Org. & Assembey Lang.
    { prefix: "CSCE", courseCode: 3301 }, //Computer architecture
    { prefix: "CSCE", courseCode: 3302 }, //Computer architecture lab
    { prefix: "CSCE", courseCode: 3401 }, //OS
    { prefix: "CSCE", courseCode: 4301 }, //OS lab
    { prefix: "CSCE", courseCode: 4301 }, //Embeded
    { prefix: "CSCE", courseCode: 4302 }, //Embeded lab
    { prefix: "CSCE", courseCode: 4411 }, //distributed
  ];
  const res = chain.some(
    (chainCourse) =>
      course.prefix === chainCourse.prefix &&
      course.courseCode == chainCourse.courseCode
  );
  return res;
}

function sortByPriority(courses) {
  // return courses;
  return courses.sort((c1, c2) => {
    if (isInChain(c1) && !isInChain(c2)) return -1;
    if (!isInChain(c1) && isInChain(c2)) return 1;
    if (_isGeneralElective(c1) && !_isGeneralElective(c2)) return 1;
    if (!_isGeneralElective(c1) && _isGeneralElective(c2)) return -1;
    if (_isMajorConcenteration(c1) && _isElective(c2)) return -1;
    if (_isMajorConcenteration(c2) && _isElective(c1)) return 1;
    if (c1.semesterNumber != c2.semesterNumber)
      return c1.semesterNumber - c2.semesterNumber;
    return c1.courseCode - c2.courseCode;
  });
}
function decreasePriority(courses, courseTypeId) {
  return courses.sort((c1, c2) => {
    if (c1.courseTypeId === courseTypeId && c2.courseTypeId !== courseTypeId)
      return 1;
    return c1.courseTypeId !== courseTypeId && c2.courseTypeId === courseTypeId
      ? -1
      : 0;
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
