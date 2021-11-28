import http from "./httpService";
const apiEndpoint = "/advising";

export const getAdvisingSessions = async () => {
  const { data: advisingSessions } = await http.get(apiEndpoint);
  return advisingSessions;
};

export const getAdvisingSession = async (userId) => {
  const { data: advisingSessions } = await http.get(apiEndpoint, {
    params: { userId },
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
  await http.post(`${apiEndpoint}/generate-plan`, {
    advisingSessionId,
  });
};
export const getAdvisingResultCourses = async (advisingSessionId) => {
  const { data: courses } = await http.get(
    `${apiEndpoint}/${advisingSessionId}/results/courses`
  );
  return courses;
};

export const getAdvisingResults = async (advisingSessionId) => {
  const { data: results } = await http.get(
    `${apiEndpoint}/${advisingSessionId}/results`
  );
  return results;
};
export const saveAdvisingSession = (advisingSessionId) => {
  localStorage.setItem("advisingSessionId", advisingSessionId);
};
export const retrieveAdvisingSession = () =>
  localStorage.getItem("advisingSessionId");

export const getUserAdvisingSessionId = async (userId) => {
  const { data } = await http.get(`${apiEndpoint}/getUserAdvisingId/${userId}`);
  return data.advisingSessionId;
};

export const verifyResults = async (advisingSessionId) => {
  const { data } = await http.post(`${apiEndpoint}/verifyResults`, {
    advisingSessionId,
  });
  return data;
};
export const getAdvisedUsers = async () => {
  const { data: users } = await http.get(`${apiEndpoint}/getAdvisedUsers`);
  return users;
};

const advisingService = {
  getAdvisingSessions,
  getAdvisingSession,
  getAdvisedUsers,
  addAdvisingSession,
  updateAdvisingSessions,
  generatePlan,
  getAdvisingResults,
  getAdvisingResultCourses,
  saveAdvisingSession,
  retrieveAdvisingSession,
  verifyResults,
};
export default advisingService;
