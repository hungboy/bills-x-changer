import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { ProtectedRoute } from '../../../common';
import { WorldAirQualityMap } from '../WorldAirQualityMap';
import {
  LocationDetails,
  routePredicate as locationRoutePredicate
} from '../LocationDetails';
import './styles.scss';

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
  const LOCATION_DETAILS_PATH = `${routeProps.match.path}/location-details`;

  return (
    <Switch>
      <ProtectedRoute
        path={LOCATION_DETAILS_PATH}
        component={LocationDetails}
        redirectPath={routeProps.match.path}
        predicate={locationRoutePredicate}
        {...routeProps}
      />
      <Route
        path="*"
        exact
        render={props => <WorldAirQualityMap {...props} />}
      />
    </Switch>
  );
};
