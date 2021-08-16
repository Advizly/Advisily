import { useState, useEffect } from "react";
import auth from "../services/authService";

function useAuth(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return { user };
}

export default useAuth;
