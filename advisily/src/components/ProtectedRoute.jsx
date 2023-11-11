import React from "react";
import { Route, Redirect } from "react-router-dom";
import { HOME_ROUTE } from "../common";
import auth from "../services/authService";
function ProtectedRoute({
  component: Component,
  render,
  requiresAdmin = false,
  ...rest
}) {
  const user = auth.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return <Redirect to={{ pathname: "/login" }} />;
        if (requiresAdmin && user && !user.isAdmin)
          return <Redirect to={{ pathname: HOME_ROUTE }} />;
        
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
