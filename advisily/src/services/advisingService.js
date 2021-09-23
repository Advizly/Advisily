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
  const { data } = await http.post(apiEndpoint, sessionInfo);
  return data;
};

export const updateAdvisingSessions = async (sessionInfo) => {
  const { data } = await http.put(apiEndpoint, sessionInfo);
  return data;
};

export const generatePlan = async (advisingSessionId) => {
  const res = await http.post(`${apiEndpoint}/generate-plan`, {
    advisingSessionId,
  });
};
export const getAdvisingResultCourses = async (advisingSessionId) => {
  const { data: courses } = await http.get(
    `${apiEndpoint}/${advisingSessionId}/results/courses`
  );
  return courses;
};

export const saveAdvisingSession = (advisingSessionId) => {
  localStorage.setItem("advisingSessionId", advisingSessionId);
};
export const retrieveAdvisingSession = () =>
  localStorage.getItem("advisingSessionId");

const advisingService = {
  getAdvisingSessions,
  getAdvisingSession,
  addAdvisingSession,
  updateAdvisingSessions,
  generatePlan,
  getAdvisingResultCourses,
  saveAdvisingSession,
  retrieveAdvisingSession,
};
export default advisingService;
