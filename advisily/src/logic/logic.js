import catalogCoursesApi from "../services/catalogsService";
import userApi from "../services/userService";
// import _ from "lodash";
import auth from "../services/authService";

const user = auth.getCurrentUser();
export const getPlan = async (catalogId) => {
  const userCourses = await userApi.getStudentCourses(user.studentId);
  userCourses.sort((a, b) => a.semesterNumber - b.semesterNumber);

  const planCourses = await catalogCoursesApi.getPlanCourses(catalogId);

  const filteredPlanCourses = planCourses
    .filter((pc) => !userCourses.map((c) => c.courseId).includes(pc.courseId))
    .sort((a, b) => a.semesterNumber - b.semesterNumber);

  let creditsSum = 0;
  let resultCourses = [];
  for (let i = 0; i < filteredPlanCourses.length; i++) {
    const course = filteredPlanCourses[i];
    if (creditsSum + course.credits > 18) break;

    creditsSum += course.credits;
    resultCourses.push(course);
  }

  return resultCourses;
};

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
