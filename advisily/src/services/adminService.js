import http from "./httpService";

export const getAllCourseNames = async () => {
  const apiEndpoint = "/courses";

  const { data: courses } = await http.get(apiEndpoint);

  // Create an empty array to store the course titles
  const courseTitles = [];

  // Map over the response data and push each course title to the array
  courses.forEach((course) => {
    courseTitles.push(course.courseTitle);});
  return courseTitles;
}

export const getCourseIdByCourseName = async (courseName) =>
{
  const apiEndpoint = "/courses";
  const { data: courses } = await http.get(apiEndpoint);

  const matchedCourse = courses.find((course) => course.courseTitle === courseName);

  if (!matchedCourse) {
    throw new Error(`Could not find course with name "${courseName}"`);
  }

  return matchedCourse.courseId;

}

export const getAllMajors = async () => {
    const apiEndpoint = "/courses/majors";
    
    const { data: majors } = await http.get(apiEndpoint);
    return majors;
  };


  export const getYears = async (majorId) => {
    const apiEndpoint = "/catalogs/years";
    
    const { data: years } = await http.get(apiEndpoint, {params:{majorId}});
    return years;
  };

  export const getCatalogCourses = async (catalogId) => {
    const apiEndpoint = "/catalogs/plans/courses";
    
    const { data: catalogCourses } = await http.get(apiEndpoint, {params:{catalogId}});
    return catalogCourses;
  };


const adminService = {getAllMajors, getYears, getCatalogCourses, getAllCourseNames, getCourseIdByCourseName};

export default adminService;