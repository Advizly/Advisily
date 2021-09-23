import { useState, useEffect } from "react";
import auth from "../services/authService";

function useAuth(refresh) {
  const [user, setUser] = useState(auth.getCurrentUser());
  useEffect(() => {
    if (refresh) auth.refreshUser(user).then((newUser) => setUser(newUser));
  }, [refresh]);

  return user;
}

export default useAuth;
