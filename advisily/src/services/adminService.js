import http from "./httpService";


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


const adminService = {getAllMajors, getYears, getCatalogCourses};

export default adminService;