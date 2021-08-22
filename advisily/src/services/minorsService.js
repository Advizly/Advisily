import { apiBaseUrl } from "../config";
import http from "axios";

const apiEndPoint = apiBaseUrl + "/academics/minors";
export const getMinors = async () => {
  const { data: minors } = await http.get(apiEndPoint);
  return minors;
};
export const getMinor = async (minorId) => {
  const { data: minor } = await http.get(`${apiEndPoint}/${minorId}`);
  return minor;
};
const minorsService = { getMinors, getMinor };
export default minorsService;
