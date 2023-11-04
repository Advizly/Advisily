import { useState, useEffect } from "react";
import auth from "../services/authService";
const tokenKey = "token";


function useAuth(refresh) {
  const [user, setUser] = useState(auth.getCurrentUser());
  useEffect(() => {
    console.log("Use effect called: getting user");
    if (refresh) auth.refreshUser(user).then((newUser) => setUser(newUser));
  }, [refresh]);

  return user;
}

export default useAuth;
