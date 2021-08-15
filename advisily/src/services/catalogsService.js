import { apiBaseUrl } from "../config";
import http from "./httpService";

const apiEndPoint = apiBaseUrl;
const catCourseUrl = (catId) => `${apiEndPoint}/cat_courses/${catId}`;

export const getCatalogs = async () => {
  const { data: catalogs } = await http.get(apiEndPoint + "/catalogs");
  return catalogs;
};

export const getCatalogCourses = async (catId) => {
  const { data: catCourses } = await http.get(catCourseUrl(catId));
  return catCourses;
};

export const getCoreCourses = async (catId) => {
  const { data: courses } = await http.get(catCourseUrl(catId) + "/1");
  return courses;
};

export const getConcCourses = async (catId) => {
  const { data: courses } = await http.get(catCourseUrl(catId) + "/2");
  return courses;
};

export const getElectiveCourses = async (catId) => {
  const { data: courses } = await http.get(catCourseUrl(catId) + "/3");
  return courses;
};

export const getCollateralCourses = async (catId) => {
  const { data: catCourses } = await http.get(catCourseUrl(catId) + "/4");
  return catCourses;
};

const catalogsService = {
  getCatalogs,
  getCatalogCourses,
  getCoreCourses,
  getConcCourses,
  getElectiveCourses,
  getCollateralCourses,
};
export default catalogsService;
