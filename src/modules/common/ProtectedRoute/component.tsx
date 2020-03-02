import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

export interface IProtectedRouteProps extends RouteComponentProps {
  predicate: (props: RouteComponentProps) => boolean;
  path: string;
  redirectPath: string;
  component: React.ComponentType<any>;
}

export const ProtectedRoute = ({
  predicate,
  path,
  redirectPath,
  component: Component,
  ...routeProps
}: IProtectedRouteProps) => {
  return (
    <Route
      {...routeProps}
      path={path}
      render={props => {
        return predicate(props) === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectPath} />
        );
      }}
    />
  );
};
