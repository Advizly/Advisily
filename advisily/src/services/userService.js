import { apiBaseUrl } from "../config";
import http from "./httpService";
const apiEndPoint = apiBaseUrl + "/users";

/*User  is expected to have the following:
    studentId, firstName,lastName, auc email, password, repeatPassword
*/
export const register = (userInfo) => {
  console.log("post req");
  return http.post(apiEndPoint, userInfo);
};
export const getUser = async (studentId) => {
  const { data, headers } = await http.get(`${apiEndPoint}/${studentId}`);
  if (!data || !data.length) return null;

  return { user: data[0], token: headers["x-auth-token"] };
};
export const validateResetToken = async (token) => {
  return await http.post(`${apiEndPoint}/validate-reset-token`, { token });
};
export const resetPassword = async (token, password) => {
  return await http.post(`${apiEndPoint}/reset-password`, {
    token,
    password,
  });
};
export const forgotPassword = async (email) => {
  return await http.post(`${apiEndPoint}/forgot-password`, { email });
};
export const resendVerification = async (email) => {
  return await http.post(`${apiEndPoint}/resend-verification`, { email });
};

export const getStudentMajors = async (studentId) => {
  const { data: majors } = await http.get(
    `${apiEndPoint}/user_majors/${studentId}`
  );
  console.log("Majors; ", majors);
  return majors;
};
export const getStudentMinors = async (studentId) => {
  const { data: minors } = await http.get(
    `${apiEndPoint}/user_minors/${studentId}`
  );
  return minors;
};

export const getStudentCourses = async (studentId) => {
  const { data: studentCourses } = await http.get(
    `${apiEndPoint}/user_courses/${studentId}`
  );

  return studentCourses;
};

export const addStudentCourse = async (studentId, courseId) => {
  await http.post(`${apiEndPoint}/user_courses`, {
    studentId,
    courseId,
  });
};
export const deleteStudentCourse = async (studentId, courseId) => {
  const config = {
    data: { studentId, courseId },
  };
  const res = await http.delete(`${apiEndPoint}/user_courses`, config);
  return res;
};

export const addStudentMajor = async (studentId, majorId, catalogId) => {
  const res = await http.post(`${apiEndPoint}/user_majors`, {
    studentId,
    majorId,
    catalogId,
  });
  return res;
};

export const deleteStudentMajor = async (studentId, majorId) => {
  const res = await http.delete(`${apiEndPoint}/user_majors`, {
    data: {
      studentId,
      majorId,
    },
  });
  return res;
};
export const addStudentMinor = async (studentId, minorId) => {
  const config = {
    studentId,
    minorId,
  };
  const res = await http.post(`${apiEndPoint}/user_minors`, config);
  return res;
};

export const deleteStudentMinor = async (studentId, minorId) => {
  const config = {
    data: {
      studentId,
      minorId,
    },
  };
  const res = await http.delete(`${apiEndPoint}/user_minors`, config);
  return res;
};

const exported = {
  register,
  getUser,
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
