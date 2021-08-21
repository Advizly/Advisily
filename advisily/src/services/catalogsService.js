import { apiBaseUrl } from "../config";
import http from "./httpService";

const apiEndPoint = apiBaseUrl + "/catalogs";
const catCourseUrl = `${apiEndPoint}/courses`;
const CourseTypeIds = {
  core: "1",
  concentertaion: "2",
  electives: "3",
  collateral: "4",
};

export const getCatalogs = async () => {
  const { data: catalogs } = await http.get(apiEndPoint);
  return catalogs;
};

export const getCatalogCourses = async (catalogId) => {
  const { data: catCourses } = await http.get(catCourseUrl, {
    params: { catalogId },
  });
  return catCourses;
};

export const getCoreCourses = async (catalogId) => {
  console.log("core courses: ", "courses");
  const { data: courses } = await http.get(catCourseUrl, {
    params: { catalogId, courseTypeId: CourseTypeIds.core },
  });
  return courses;
};

export const getConcCourses = async (catalogId) => {
  const { data: courses } = await http.get(catCourseUrl, {
    params: { catalogId, courseTypeId: CourseTypeIds.concentertaion },
  });
  return courses;
};

export const getElectiveCourses = async (catalogId) => {
  const { data: courses } = await http.get(catCourseUrl, {
    params: { catalogId, courseTypeId: CourseTypeIds.electives },
  });
  return courses;
};

export const getCollateralCourses = async (catalogId) => {
  const { data: catCourses } = await http.get(catCourseUrl, {
    params: { catalogId, courseTypeId: CourseTypeIds.collateral },
  });
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
