import React from "react";
import { Route, Redirect } from "react-router-dom";

interface IProtectedRoute {
  children: React.ReactNode | null;
  path: string;
  exact: boolean;
}

function ProtectedRoute({ children, ...props }: IProtectedRoute) {
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