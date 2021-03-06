import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import CustomLayout from "../layouts/CustomLayout";
import UserContext from "./../contexts/UserContext";

const PrivateRoute: React.FunctionComponent<RouteProps> = ({ path, component: Component, ...rest }) => {
  const userCtx = useContext(UserContext);
  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={props => (
        userCtx.userInfo ? (
          path === "/sale" ? <Component {...props} /> : <CustomLayout {...props}><Component {...props} /></CustomLayout>
        ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
      )}
    />
  );
}

export default PrivateRoute;
