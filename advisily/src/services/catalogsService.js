import { apiBaseUrl } from "../config";
import http from "./httpService";

const apiEndPoint = apiBaseUrl;
const catCourseUrl = (catId) => `${apiEndPoint}/cat_courses/${catId}`;

const getCatalogs = async () => {
  const { data: catalogs } = await http.get(apiEndPoint + "/catalogs");
  return catalogs;
};

const getCatalogCourses = async (catId) => {
  const { data: catCourses } = await http.get(catCourseUrl(catId));
  return catCourses;
};

const getCoreCourses = async (catId) => {
  const { data: courses } = await http.get(catCourseUrl(catId) + "/1");
  return courses;
};

const getConcCourses = async (catId) => {
  const { data: courses } = await http.get(catCourseUrl(catId) + "/2");
  return courses;
};

const getElectiveCourses = async (catId) => {
  const { data: courses } = await http.get(catCourseUrl(catId) + "/3");
  return courses;
};

const getCollateralCourses = async (catId) => {
  const { data: catCourses } = await http.get(catCourseUrl(catId) + "/4");
  return catCourses;
};

export {
  getCatalogs,
  getCatalogCourses,
  getCoreCourses,
  getConcCourses,
  getElectiveCourses,
  getCollateralCourses,
};
