import { apiBaseUrl } from "../config";
import http from "./httpService";
// import _ from "lodash";

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
  // const data = _.pick(sessionInfo, [
  //   "studentId",
  //   "overloadingCredits",
  //   "summerCredits",
  //   "winterCredits",
  //   "paceId",
  //   "generalElectiveCredits",
  //   "semestersPlanned",
  // ]);
  await http.post(apiEndpoint, sessionInfo);
};

export const updateAdvisingSessions = async (sessionInfo) => {
  // const data = _.pick(sessionInfo, [
  //   "advisingSessionId",
  //   "studentId",
  //   "overloadingCredits",
  //   "summerCredits",
  //   "winterCredits",
  //   "paceId",
  //   "generalElectiveCredits",
  //   "semestersPlanned",
  // ]);
  await http.put(apiEndpoint, sessionInfo);
};

const exported = {
  getAdvisingSessions,
  getAdvisingSession,
  addAdvisingSession,
  updateAdvisingSessions,
};
export default exported;
