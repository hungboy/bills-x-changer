import { IFetchLatestMeasurement } from '../api/fetchLatest';
import { ParameterStrings, Parameter } from './constants';

export type City = string;
export type Country = string;
export type Location = string;
export type Longitude = number;
export type Latitude = number;
export type Coordinates = string;
export type CoordinatesObject = { longitude: Longitude; latitude: Latitude };
export type Radius = number;
export type Distance = number;

export type Page = number;
export type Name = string;
export type License = string;
export type Website = string;
export type Limit = number;
export type Found = number;

export type Value = number;
export type LastUpdated = string;
export type Unit = string;
export type SourceName = string;

export interface ILatestMeasurementResult {
  location: Location;
  city: City;
  country: Country;
  distance: Distance;
  measurement: IFetchLatestMeasurement;
  coordinates: CoordinatesObject;
}

export type CategorizedLatestResultsMap = {
  [key in Parameter]: ILatestMeasurementResult[];
};

export type CategorizedMeasurementRangeMap = {
  [key in Parameter]: { min: number; max: number; unit: string };
};
