import { apiBaseUrl } from "../config";
import http from "./httpService";

const apiEndPoint = apiBaseUrl + "/academics/courses";

export const getAllCourses = async () => {
  const { data: courses } = await http.get(apiEndPoint);
  return courses;
};

export const getCourse = async (courseId) => {
  const { data: course } = await http.get(`${apiEndPoint}/${courseId}`);
  return course;
};

const coursesService = { getAllCourses, getCourse };

export default coursesService;
