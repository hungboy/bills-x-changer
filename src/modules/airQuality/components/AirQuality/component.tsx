import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { ProtectedRoute } from "../../../common";
import { WorldAirQualityMap } from "../WorldAirQualityMap";
import {
  LocationDetails,
  routePredicate as locationRoutePredicate
} from "../LocationDetails";
import { ILocationQueryStringProps } from "../LocationDetails/component";
import { LoadingSpinner } from "../../../common";
import queryString from "query-string";
import "./styles.scss";

export interface IAirQualityProps extends RouteComponentProps {
  isFetchingLatestData: boolean;
  fetchLatestDataFailure: boolean;
  fetchLatestDataPageFailure: boolean;
}

export const AirQuality = ({
  isFetchingLatestData,
  fetchLatestDataFailure,
  fetchLatestDataPageFailure,
  ...routeProps
}: IAirQualityProps) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${routeProps.match.path}/location-details`}
        component={LocationDetails}
        redirectPath={routeProps.match.path}
        predicate={locationRoutePredicate}
        {...routeProps}
      />
      <Route path="*" exact component={WorldAirQualityMap} />
    </Switch>
  );
};
