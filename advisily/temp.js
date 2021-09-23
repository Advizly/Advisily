import { useEffect, useState } from "react";

import {
  getCoreCourses,
  getConcCourses,
  getCollateralCourses,
  getElectiveCourses,
  getEngCoreCourses,
  getCatalogCourses,
} from "../services/catalogsService";
import { getAllCourses } from "../services/coursesService";
import { groupCourses } from "../utils/coursesUtils";
import useAuth from "./useAuth";
import { CourseTypeIds } from "../config.json";
import useApi from "./useApi";

const NUMBER_OF_COLS = 3;

const useCatalogCourses = (catalogId) => {
  const [coreCourses, setCoreCourses] = useState([]);
  const [concCourses, setConcCourses] = useState([]);
  const [collateralCourses, setCollateralCourses] = useState([]);
  const [electiveCourses, setElectiveCourses] = useState([]);
  const [engCoreCourses, setEngCoreCourses] = useState([]);
  const [generalElectiveCourses, setGeneralElectiveCourses] = useState([]);
  const user = useAuth();
  const coursesApi = useApi(getAllCourses);
  const catalogCoursesApi = useApi(getCatalogCourses);

  const handleGetCourses = async (catalogId) => {
    const catalogCourses = await getCatalogCourses(catalogId);
    divideCatalogCourses(catalogCourses);

    await coursesApi.request();
    const generalElectives = getGeneralElectives(
      coursesApi.data,
      catalogCourses
    );
    setGeneralElectiveCourses(generalElectives);
    console.log(generalElectives);
  };

  const divideCatalogCourses = (catalogCourses) => {};

  const getGeneralElectives = (courses, catalogCourses) => {
    return courses.filter(
      (course) => !catalogCourses.includes(course.courseId)
    );
  };

  useEffect(() => {
    if (user && catalogId) {
      handleGetCourses(catalogId);
    }
  }, [user, catalogId]);
  return {
    coreCourses,
    concCourses,
    collateralCourses,
    electiveCourses,
    engCoreCourses,
    generalElectiveCourses,
  };
};
export default useCatalogCourses;
