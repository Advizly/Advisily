import http from "./httpService";


export const getAllMajors = async () => {
    const apiEndpoint = "/courses/majors";
    
    const { data: majors } = await http.get(apiEndpoint);
    return majors;
  };



const adminService = {getAllMajors};

export default adminService;