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
  const { data: jwt } = await http.post(apiEndPoint, {
    studentId,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
};
export const logout = () => {
  localStorage.removeItem(tokenKey);
};

// const refreshUser = async (user) => {
//   const { user: newUser, token } = await getUser(user.studentId);
//   console.log("refreshing user:", newUser);
//   if (!newUser) throw new Error("Error refreshing user");
//   if (!newUser.isVerified) return user;
//   loginWithJwt(token);

//   return jwtDecode(token);
// };

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

const auth = { login, logout, getCurrentUser, loginWithJwt, getJwt };
export default auth;
