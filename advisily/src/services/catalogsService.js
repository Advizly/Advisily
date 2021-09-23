import { apiBaseUrl, CourseTypeIds } from "../config.json";

import http from "./httpService";

const apiEndPoint = apiBaseUrl + "/catalogs";
const catCourseUrl = `${apiEndPoint}/courses`;
const planCoursesUrl = `${apiEndPoint}/plans/courses`;

export const getCatalogs = async (majorId) => {
  if (!majorId) return [];
  const { data: catalogs } = await http.get(apiEndPoint, {
    params: { majorId },
  });
  return catalogs;
};

export const getCatalogCourses = async (catalogId) => {
  const { data: catCourses } = await http.get(catCourseUrl, {
    params: { catalogId },
  });
  return catCourses;
};

export const getCoreCourses = async (catalogId) => {
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

export const getEngCoreCourses = async (catalogId) => {
  const { data: catCourses } = await http.get(catCourseUrl, {
    params: { catalogId, courseTypeId: CourseTypeIds.engCore },
  });
  return catCourses;
};

export const getPlanCourses = async (catalogId) => {
  const { data: planCourses } = await http.get(planCoursesUrl, {
    params: { catalogId },
  });
  return planCourses;
};

const catalogsService = {
  getCatalogs,
  getCatalogCourses,
  getCoreCourses,
  getConcCourses,
  getElectiveCourses,
  getCollateralCourses,
  getEngCoreCourses,
  getPlanCourses,
};
export default catalogsService;
