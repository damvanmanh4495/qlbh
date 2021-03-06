import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import UserContext from "./../contexts/UserContext";

// handle the public routes
const PublicRoute: React.FunctionComponent<RouteProps> = ({ component: Component, ...rest }) => {
  const userCtx = useContext(UserContext);
  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        !userCtx.userInfo ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/" }} />
          )
      }
    />
  );
};

export default PublicRoute;
