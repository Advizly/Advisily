import { apiBaseUrl } from "../config";
import http from "axios";

const apiEndPoint = apiBaseUrl + "/minors";

const getMinors = async () => {
  const { data: minors } = await http.get(apiEndPoint);
  return minors;
};
const getMinor = async (minorId) => {
  const { data: minor } = await http.get(`${apiEndPoint}/${minorId}`);
  return minor;
};

export { getMinors, getMinor };
