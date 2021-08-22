import { apiBaseUrl } from "../config";
import http from "./httpService";

const apiEndPoint = apiBaseUrl + "/academics/majors";
export const getMajors = async (majorId) => {
  const { data: majors } = await http.get(apiEndPoint, { params: { majorId } });
  return majors;
};

export const getMajor = async (majorId) => {
  const { data: major } = await http.get(`${apiEndPoint}/${majorId}`);
  return major;
};

const majorsService = { getMajors, getMajor };
export default majorsService;
