import { apiBaseUrl } from "../config";
import http from "./httpService";
const apiEndPoint = apiBaseUrl + "/users";
console.log("apiBaseUrl", apiBaseUrl);

/*User  is expected to have the following:
    userId, firstName,lastName, auc email, password, repeatPassword
*/
export const register = (userInfo) => {
  return http.post(`${apiEndPoint}/register`, userInfo);
};
export const getUser = async (userId) => {
  const { data, headers } = await http.get(`${apiEndPoint}/user`, {
    params: {
      userId,
    },
  });
  if (!data) return null;

  return { user: data, token: headers["x-auth-token"] };
};

export const getUsers = async () => {
  const { data: users } = await http.get(`${apiEndPoint}`);

  return users;
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

export const getStudentMajors = async (userId) => {
  const { data: majors } = await http.get(`${apiEndPoint}/user-majors`, {
    params: { userId },
  });
  return majors;
};
export const getStudentMinors = async (userId) => {
  const { data: minors } = await http.get(`${apiEndPoint}/user-minors`, {
    params: { userId },
  });
  return minors;
};

export const getStudentCourses = async (userId) => {
  const { data: studentCourses } = await http.get(
    `${apiEndPoint}/user-courses`,
    { params: { userId } }
  );

  return studentCourses;
};

export const addStudentCourse = async (userId, courseId) => {
  await http.post(`${apiEndPoint}/user-courses`, {
    userId,
    courseId,
  });
};
export const deleteStudentCourse = async (userId, courseId) => {
  const config = {
    data: { userId, courseId },
  };
  const res = await http.delete(`${apiEndPoint}/user-courses`, config);
  return res;
};

export const addStudentMajor = async (userId, majorId, catalogId) => {
  const res = await http.post(`${apiEndPoint}/user-majors`, {
    userId,
    majorId,
    catalogId,
  });
  return res;
};

export const deleteStudentMajor = async (userId, majorId) => {
  const res = await http.delete(`${apiEndPoint}/user-majors`, {
    data: {
      userId,
      majorId,
    },
  });
  return res;
};
export const addStudentMinor = async (userId, minorId) => {
  const config = {
    userId,
    minorId,
  };
  const res = await http.post(`${apiEndPoint}/user-minors`, config);
  return res;
};

export const deleteStudentMinor = async (userId, minorId) => {
  const config = {
    data: {
      userId,
      minorId,
    },
  };
  const res = await http.delete(`${apiEndPoint}/user-minors`, config);
  return res;
};

export const update = async (userId, updatedData) => {
  const res = await http.put(`${apiEndPoint}/${userId}`, updatedData);
  return res;
};

const userService = {
  register,
  update,
  getUser,
  getUsers,
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
export default userService;
