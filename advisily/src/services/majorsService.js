import { apiBaseUrl } from "../config";
import http from "./httpService";

const apiEndPoint = apiBaseUrl + "/majors";
export const getMajors = async () => {
  const { data: majors } = await http.get(apiEndPoint);
  return majors;
};

export const getMajor = async (majorId) => {
  const { data: major } = await http.get(`${apiEndPoint}/${majorId}`);
  return major;
};

const exported = { getMajors, getMajor };
export default exported;
