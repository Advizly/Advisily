import { apiBaseUrl } from "../config";
import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndPoint = apiBaseUrl + "/auth";
const tokenKey = "token";

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

http.setJwt(getJwt());

export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(getJwt());
};
export const login = async (studentId, password) => {
  const { data: jwt } = await http.post(apiEndPoint, { studentId, password });
  localStorage.setItem(tokenKey, jwt);
};
export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

const auth = { login, logout, getCurrentUser, loginWithJwt, getJwt };
export default auth;
