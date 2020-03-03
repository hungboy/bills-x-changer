import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import * as H from "history";
import clsx from "clsx";
import "./styles.scss";

export interface IRouteHeaderProps extends RouteChildrenProps {
  routes: IRouteTab[];
}

export interface IRouteTab {
  label: string;
  path: string;
}

export const RouteHeader = ({
  routes,
  location,
  history
}: IRouteHeaderProps) => {
  return (
    <div className="route-header-component">
      {renderRouteTabs(routes, location, history)}
    </div>
  );
};

const renderRouteTabs = (
  routes: IRouteTab[],
  location: H.Location,
  history: H.History
) =>
  routes.map(route => (
    <RouteTab
      key={`${route.label}-${route.path}`}
      {...{ location, history, ...route }}
    />
  ));

export interface IRouteTabProps
  extends Partial<RouteChildrenProps>,
    IRouteTab {}

export const RouteTab = ({
  label,
  path,
  location,
  history
}: IRouteTabProps) => {
  const onClick = () => {
    history?.push(path);
  };

  const selectedClass = path === location?.pathname ? "selected" : "";

  return (
    <div
      className={clsx("route-tab-component", selectedClass)}
      onClick={onClick}
    >
      <div className="label">{label}</div>
    </div>
  );
};
