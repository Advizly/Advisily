const _ = require("lodash");
const { filterPlanCourses } = require("./filters");
const { courseTaken } = require("./utils");

module.exports = { generatePlan };

function generatePlan({
  user,
  planCourses,
  advisingSession,
  catalogCourses,
  catalog,
}) {
  let userCourses = user.courses;
  userCourses = sortBySemester(userCourses);

  const filteredCourses = filterPlanCourses({
    planCourses,
    user,
    catalogCourses,
    catalog,
  });

  if (!filteredCourses.length) return [];

  filteredCourses.forEach(
    //convert null credits to 3 by default
    (course) => (course.credits = course.credits !== null ? course.credits : 3)
  );
  // return filteredCourses;
  const sortedCourses = sortBySemester(filteredCourses);
  // return sortedCourses;
  const groupedCourses = groupByCoRequisites(sortedCourses, userCourses);

  let resultCourses = getResultCourses(groupedCourses, advisingSession);
  return resultCourses;
}

function getResultCourses(groupedCourses, advisingSession) {
  if (!groupedCourses.length) return [];

  const { overloadingCredits } = advisingSession;

  let creditsSum = 0,
    resultCourses = [],
    reachedMaxCredits = false;
  const MAX_CREDITS = overloadingCredits ? overloadingCredits : 18;

  for (let i = 0; i < groupedCourses.length && !reachedMaxCredits; i++) {
    const { courseGroup, totalCredits } = groupedCourses[i];

    if (creditsSum + totalCredits <= MAX_CREDITS) {
      creditsSum += totalCredits;
      courseGroup.forEach((course) => resultCourses.push(course));
    }
    reachedMaxCredits = creditsSum === MAX_CREDITS;
  }

  resultCourses.map((c) => _.omit(c, ["requisites"]));
  return resultCourses;
}

function groupByCoRequisites(courses, userCourses) {
  let allReqIds = [];
  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];
    if (allReqIds.includes(course.courseId)) {
      //skip courses which were added before
      courses[i].remove = true; //and mark for removal
      continue;
    }

    coReqIds = getCoRequisitesIds(courses[i], userCourses);
    // if (coReqIds.length)
    courses[i] = formCourseGroup(course, courses, coReqIds);

    allReqIds = allReqIds.concat(coReqIds);
  }
  return courses.filter((c) => !c.remove);
}

function formCourseGroup(course, courses, coReqIds) {
  let totalCredits = course.credits,
    courseGroup = [course];

  const coReqCourses = courses.filter((c) => coReqIds.includes(c.courseId));

  coReqCourses.forEach((req) => {
    totalCredits += req.credits;
    courseGroup.push(req);
  });
  const group = { courseGroup: courseGroup, totalCredits };

  return group;
}

function getCoRequisitesIds(course, userCourses) {
  let ids = [],
    foundSet = false;

  course.requisites.forEach((reqSet) => {
    if (!reqSet.length || foundSet) return;

    reqSet.forEach((requisite) => {
      const { requisiteTypeId, courseId } = requisite;
      if (courseTaken(courseId, userCourses)) return; //skip taken requisites
      if (requisiteTypeId !== 2 && requisiteTypeId !== 3) return; //skip non-conncurent requisites

      ids.push(courseId);
      foundSet = true;
    });
  });
  return ids;
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
  return courses.sort((c1, c2) => c1.semesterNumber - c2.semesterNumber);
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
