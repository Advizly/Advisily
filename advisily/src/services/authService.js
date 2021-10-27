import { apiBaseUrl } from "../config";
import http from "./httpService";
import jwtDecode from "jwt-decode";
import { saveAdvisingSession } from "./advisingService";
import { getUser } from "./userService";
const apiEndPoint = apiBaseUrl + "/users/login";
const tokenKey = "token";

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

http.setJwt(getJwt());

export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
  const { advisingSessionId } = getCurrentUser();
  saveAdvisingSession(advisingSessionId);
  http.setJwt(getJwt());
};
export const login = async ({ email, password }) => {
  const { data: jwt } = await http.post(apiEndPoint, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
};
export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const refreshUser = async (user) => {
  try {
    const res = await getUser(user.userId);
    const { user: newUser, token } = res;
    if (!newUser) throw new Error("Error refreshing user");
    if (!newUser.isVerified) return user;
    loginWithJwt(token);

    return jwtDecode(token);
  } catch (ex) {
    console.log("From refreshUser", ex, user);
  }
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    let user = jwtDecode(jwt);

    // console.log("Before refresh");
    // if (user && !user.isVerified) user = await refreshUser(user);
    // console.log("after refresh");

    // console.log("user from get current user", user);
    return user;
  } catch (ex) {
    return null;
  }
};

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  refreshUser,
};
export default auth;
