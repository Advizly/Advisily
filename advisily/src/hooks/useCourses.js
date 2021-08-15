import { useEffect, useState } from "react";

import {
  getCoreCourses,
  getConcCourses,
  getCollateralCourses,
  getElectiveCourses,
} from "../services/catalogsService";
import { groupCourses } from "../utils/coursesUtils";
const useCourses = () => {
  const [coreCourses, setCoreCourses] = useState([]);
  const [concCourses, setConcCourses] = useState([]);
  const [collateralCourses, setCollateralCourses] = useState([]);
  const [electiveCourses, setElectiveCourses] = useState([]);

  useEffect(() => {
    getCoreCourses(1).then((courses) =>
      setCoreCourses(groupCourses(courses, 3))
    );
    getCollateralCourses(1).then((courses) =>
      setCollateralCourses(groupCourses(courses, 3))
    );
    getConcCourses(1).then((courses) =>
      setConcCourses(groupCourses(courses, 3))
    );
    getElectiveCourses(1).then((courses) =>
      setElectiveCourses(groupCourses(courses, 3))
    );
  }, []);
  return { coreCourses, concCourses, collateralCourses, electiveCourses };
};
export default useCourses;
