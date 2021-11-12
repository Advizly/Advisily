import http from "./httpService";

const apiEndPoint = "/academics/courses";

export const getAllCourses = async () => {
  const { data: courses } = await http.get(apiEndPoint);
  return courses;
};

export const getCourse = async (courseId) => {
  const { data: course } = await http.get(`${apiEndPoint}/${courseId}`);
  return course;
};
export const getPrefixes = async (courseId) => {
  const { data: prefixes } = await http.get(`${apiEndPoint}/prefixes`);
  return prefixes;
};

const coursesService = { getAllCourses, getCourse };

export default coursesService;
