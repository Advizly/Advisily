import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";
function ProtectedRoute({ component: Component, render, ...rest }) {
  const user = auth.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return <Redirect to={{ pathname: "/login" }} />;

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
