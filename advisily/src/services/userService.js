import { apiBaseUrl } from "../config";
import http from "./httpService";
import _ from "lodash";
const apiEndPoint = apiBaseUrl + "/students";

/*User  is expected to have the following:
    studentId, firstName,lastName, auc email, password, repeatPassword
*/
export const register = (userInfo) => {
  const user = _.pick(userInfo, [
    "studentId",
    "firstName",
    "lastName",
    "email",
    "password",
    "repeatPassword",
  ]);
  return http.post(apiEndPoint, user);
  //   console.log("Res: ", res);
};

export const getStudentMajors = async (studentId) => {
  // console.log("searching majors for id: ", studentId);
  const { data: majors } = await http.get(
    `${apiEndPoint}/student_majors/${studentId}`
  );
  // console.log("majors from service", majors);
  return majors;
};
export const getStudentMinors = async (studentId) => {
  // console.log("searching minors for id: ", studentId);

  const { data: minors } = await http.get(
    `${apiEndPoint}/student_minors/${studentId}`
  );
  // console.log("minors from service", minors);

  return minors;
};

export const getStudentCourses = async (studentId) => {
  // console.log("searching courses for id: ", studentId);

  const { data: studentCourses } = await http.get(
    `${apiEndPoint}/student_courses/${studentId}`
  );
  // console.log("courses from service", studentCourses);

  return studentCourses;
};

export const addStudentCourse = async (studentId, courseId) => {
  await http.post(`${apiEndPoint}/student_courses`, {
    studentId,
    courseId,
  });
};
export const deleteStudentCourse = async (studentId, courseId) => {
  const config = {
    data: { studentId, courseId },
  };
  const res = await http.delete(`${apiEndPoint}/student_courses`, config);
  console.log("delete student course res:", res);
  return res;
};

export const addStudentMajor = async (studentId, majorId, catalogId) => {
  const res = await http.post(`${apiEndPoint}/student_majors`, {
    studentId,
    majorId,
    catalogId,
  });
  console.log(res);
};

export const deleteStudentMajor = async (studentId, majorId) => {
  const res = await http.delete(`${apiEndPoint}/student_majors`, {
    data: {
      studentId,
      majorId,
    },
  });
  console.log(res);
};
export const addStudentMinor = async (studentId, minorId) => {
  const config = {
    studentId,
    minorId,
  };
  const res = await http.post(`${apiEndPoint}/student_minors`, config);
  console.log(res);
};

export const deleteStudentMinor = async (studentId, minorId) => {
  const config = {
    data: {
      studentId,
      minorId,
    },
  };
  const res = await http.delete(`${apiEndPoint}/student_minors`, config);
  console.log(res);
};

const exported = {
  register,
  getStudentMajors,
  getStudentMinors,
  getStudentCourses,
  addStudentCourse,
  deleteStudentCourse,
  addStudentMajor,
  deleteStudentMajor,
  addStudentMinor,
  deleteStudentMinor,
};
export default exported;
