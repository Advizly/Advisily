import { apiBaseUrl } from "../config";
import http from "./httpService";
const apiEndPoint = apiBaseUrl + "/advising/paces";

const getPaces = async () => {
  const { data: paces } = await http.get(apiEndPoint);
  return paces;
};

export { getPaces };
