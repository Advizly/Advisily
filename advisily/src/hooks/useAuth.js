import { useState, useEffect } from "react";
import auth from "../services/authService";

function useAuth(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return { user };
}

export default useAuth;
