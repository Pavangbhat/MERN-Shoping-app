import React from "react";
import { isAuthenticated } from "./index";
import { Route, Redirect } from "react-router-dom";

function AdminRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 1 ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;
