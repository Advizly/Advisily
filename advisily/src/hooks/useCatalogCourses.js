import { useEffect, useState } from "react";

import { getCatalogCourses } from "../services/catalogsService";
import { getAllCourses } from "../services/coursesService";
import { CourseTypeIds } from "../config.json";
import { groupCourses } from "../utils/coursesUtils";
import useAuth from "./useAuth";

const NUMBER_OF_COLS = 3;

const useCatalogCourses = (catalogId) => {
  // // const [catalogCoursesCategorized, setCatalogCoursesCategorized] = useState(
  // //   []
  // // );
  // const [allCourses, setAllCourses] = useState([]);
  // const user = useAuth();
  // async function getAndFilterCourses() {
  //   const catalogCoursesIds = await getCatalogCourses(catalogId).then(
  //     (courses) => {
  //       categoriseCatalogCourses(courses);
  //       return courses.map((course) => course.courseId);
  //     }
  //   );
  //   const courses = await getAllCourses();
  //   courses.filter((course) => !catalogCoursesIds.includes(course.courseId));
  //   setAllCourses(courses);
  // }
  // useEffect(() => {
  //   if (user && catalogId) {
  //     getAndFilterCourses();
  //   }
  // }, [user, catalogId]);
  // return {
  //   catalogCoursesCategorized,
  //   allCourses,
  // };
};
export default useCatalogCourses;
