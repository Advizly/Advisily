import { apiBaseUrl } from "../config";
import http from "./httpService";

const apiEndpoint = apiBaseUrl + "/advising";

export const getAdvisingSessions = async () => {
  const { data: advisingSessions } = await http.get(apiEndpoint);
  return advisingSessions;
};

export const getAdvisingSession = async (studentId) => {
  const { data: advisingSessions } = await http.get(apiEndpoint, {
    params: { studentId },
  });
  return advisingSessions;
};

export const addAdvisingSession = async (sessionInfo) => {
  await http.post(apiEndpoint, sessionInfo);
};

export const updateAdvisingSessions = async (sessionInfo) => {
  await http.put(apiEndpoint, sessionInfo);
};

const exported = {
  getAdvisingSessions,
  getAdvisingSession,
  addAdvisingSession,
  updateAdvisingSessions,
};
export default exported;
