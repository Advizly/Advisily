import http from "./httpService";
const apiEndPoint = "/academics/standings";

export const getStandings = async () => {
  const { data: standings } = await http.get(apiEndPoint);
  return standings;
};

const standingService = { getPaces: getStandings };
export default standingService;
