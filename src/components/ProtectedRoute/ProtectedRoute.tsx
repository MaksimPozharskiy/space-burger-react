import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, ...props }) {
  const isToken = localStorage.getItem("refreshToken");

  return (
    <Route
      {...props}
      render={({ location }) =>
        isToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;