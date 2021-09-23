import { useEffect, useState } from "react";

import {
  getCoreCourses,
  getConcCourses,
  getCollateralCourses,
  getElectiveCourses,
  getEngCoreCourses,
} from "../services/catalogsService";

import { groupCourses } from "../utils/coursesUtils";
import useAuth from "./useAuth";

const NUMBER_OF_COLS = 3;

const useCatalogCourses = (catalogId) => {
  const [coreCourses, setCoreCourses] = useState([]);
  const [concCourses, setConcCourses] = useState([]);
  const [collateralCourses, setCollateralCourses] = useState([]);
  const [electiveCourses, setElectiveCourses] = useState([]);
  const [engCoreCourses, setEngCoreCourses] = useState([]);
  const user = useAuth();

  useEffect(() => {
    if (user && catalogId) {
      getCoreCourses(catalogId).then((courses) =>
        setCoreCourses(groupCourses(courses, NUMBER_OF_COLS))
      );
      getCollateralCourses(catalogId).then((courses) =>
        setCollateralCourses(groupCourses(courses, NUMBER_OF_COLS))
      );
      getConcCourses(catalogId).then((courses) =>
        setConcCourses(groupCourses(courses, NUMBER_OF_COLS))
      );
      getElectiveCourses(catalogId).then((courses) =>
        setElectiveCourses(groupCourses(courses, NUMBER_OF_COLS))
      );
      getEngCoreCourses(catalogId).then((courses) =>
        setEngCoreCourses(groupCourses(courses, NUMBER_OF_COLS))
      );
    }
  }, [user, catalogId]);
  return {
    coreCourses,
    concCourses,
    collateralCourses,
    electiveCourses,
    engCoreCourses,
  };
};
export default useCatalogCourses;
