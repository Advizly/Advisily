import http from "./httpService";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { saveAdvisingSession } from "./advisingService";
import { getUser } from "./userService";
const apiEndPoint = "/users/login";
const tokenKey = "token";

const cookies = new Cookies();

export const getJwt = () => {
  return cookies.get(tokenKey);
};

http.setJwt(getJwt());

export const loginWithJwt = (jwt) => {
  cookies.set(tokenKey, jwt, {maxAge:15*60});
  const { advisingSessionId } = getCurrentUser();
  saveAdvisingSession(advisingSessionId);
  http.setJwt(getJwt());
};
export const login = async ({ email, password }) => {
  
  const { data: jwt } = await http.post(apiEndPoint, {
    email,
    password,
  });
  
  
  cookies.set(tokenKey, jwt, {maxAge:15*60});
};
export const logout = () => { 
  cookies.remove(tokenKey);
};

export const refreshUser = async (user) => {
  try {
    const res = await getUser(user.userId);
    console.log("REFRESH ", res);
    const { user: newUser } = res;
    const token = cookies.get(tokenKey);
    
    if (!newUser) throw new Error("Error refreshing user");
    if (!newUser.isVerified) return user;
    //loginWithJwt(token);

    return jwtDecode(token);
  } catch (ex) {
    console.log("From refreshUser", ex, user);
  }
};

export const getCurrentUser = () => {
  try {
    const jwt = cookies.get(tokenKey);
    console.log("JWT get user", jwt);
    if(jwt ==undefined ) return null;
    else console.log("JWT ISSSSS: ",jwt)
    let user = jwtDecode(jwt);

    // console.log("Before refresh");
    // if (user && !user.isVerified) user = await refreshUser(user);
    // console.log("after refresh");

    // console.log("user from get current user", user);
    return user;
  } catch (ex) {
    console.error("getCUrrentUser: ",ex)
    //cookies.remove(tokenKey)
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
