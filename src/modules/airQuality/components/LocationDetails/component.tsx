import React from "react";
import { Coordinates, Location, City, Country } from "../../interfaces/types";
import { IFetchLatestResult } from "../../api/fetchLatest";
import { IFetchLatestDataByCoordinatesArgs } from "../../ducks/actions";

export interface ILocationQueryStringProps {
  location: Location;
  city: City;
  country: Country;
  coordinates: Coordinates;
}

export interface ILocationDetailsDispatchProps {
  fetchLatestDataByCoordinates: (
    payload: IFetchLatestDataByCoordinatesArgs
  ) => void;
}

export interface ILocationDetailsProps
  extends ILocationQueryStringProps,
    ILocationDetailsDispatchProps {
  isFetchingLatestData: boolean;
  latestResults: IFetchLatestResult[] | null;
}

export const LocationDetails = (props: ILocationDetailsProps) => {
  return <div className="location-details">LOCATION DETAILS PLACEHOLDER</div>;
};
