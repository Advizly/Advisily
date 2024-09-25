import http from "./httpService";

export const getAllCourseNames = async () => {
  const apiEndpoint = "/courses";

  const { data: courses } = await http.get(apiEndpoint);

  // Create an empty array to store the course titles

  return courses;
}

export const createCatalog = async (catalog) => {
  const apiEndpoint = "/catalogs";

  try {
    const response = await http.post(apiEndpoint, catalog);

    // Check if the request was successful
      return response; // You can return any relevant data from the response
    
      // Handle the error or throw an exception
    
  } catch (error) {
    console.error('Error creating catalog:', error.message);
    // Handle the error or throw an exception
  }
}

export const addCoursetoPlan = async (newCoursePlan, newCourseCat) => {
  console.log("HELLO", newCourseCat);
  const courseadded= await http.post('courses/addCourseToPlan', newCoursePlan);
  const courseaddedcat= await http.post('courses/addCourseToCat', newCourseCat);

  

  return courseadded;
};

export const removeCourseFromPlan = async(removeCourse) =>{
  const apiEndpoint = "/courses/removeCourseFromPlan";
  const apiEndpoint2 = "/courses/removeCourseFromCatalog"

  await http.delete(apiEndpoint, {data: removeCourse});
  await http.delete(apiEndpoint2, {data: removeCourse});

}

export const getTypes = async() =>{
  const apiEndpoint = "/courses/types";
  const res = await http.get(apiEndpoint);
  
  return res;

}

export const copyCatalog = async (sourceCatalogId, targetCatalogId) => {
  
  const apiEndpoint1 = "/catalogs/copyPlancourses";
  const apiEndpoint2 = "/catalogs/copyCatcourses";

  try {
    const response1 = await http.post(apiEndpoint2, {sourceCatalogId, targetCatalogId});
    const response2 = await http.post(apiEndpoint1, {sourceCatalogId, targetCatalogId});

    // Check if the request was successful
      return response2; // You can return any relevant data from the response
    
      // Handle the error or throw an exception
    
  } catch (error) {
    console.error('Error creating catalog:', error.message);
    // Handle the error or throw an exception
  }
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


const adminService = {getAllMajors, getYears, getCatalogCourses, getAllCourseNames, getCourseIdByCourseName, createCatalog, copyCatalog, addCoursetoPlan, removeCourseFromPlan, getTypes};

export default adminService;