import { apiBaseUrl } from "../config";
import http from "./httpService";

const apiEndPoint = apiBaseUrl + "/courses";

export const getAllCourses = async () => {
  const { data: courses } = await http.get(apiEndPoint);
  return courses;
};

export const getCourse = async (course_id) => {
  const { data: course } = await http.get(`${apiEndPoint}/${course_id}`);
  return course;
};

const coursesService = { getAllCourses, getCourse };

export default coursesService;
