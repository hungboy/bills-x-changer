import axios from "axios";
import { configs } from "../api";
import { Parameter, Sort } from "../interfaces/constants";
import {
  City,
  Country,
  Location,
  Coordinates,
  Radius,
  Distance,
  Name,
  License,
  Website,
  Page,
  Limit,
  Found,
  Value,
  LastUpdated,
  Unit,
  SourceName
} from "../interfaces/types";

const URL = "/v1/latest";
const { openaqURL } = configs;

export interface IFetchLatestByDestinationParams {
  city: City;
  parameter?: Parameter;
  country: Country;
  location?: Location;
}

export interface IFetchLatestParams {
  city?: City;
  parameter?: Parameter;
  country?: Country;
  location?: Location;
  coordinates?: Coordinates;
  radius?: Radius;
  sort?: Sort;
  page?: Page;
}

export interface IFetchLatestMeta {
  name: Name;
  license: License;
  website: Website;
  page: Page;
  limit: Limit;
  found: Found;
}

export interface IFetchLatestMeasurement {
  parameter: Parameter;
  value: Value;
  lastUpdated: LastUpdated;
  unit: Unit;
  sourceName: SourceName;
  averagingPeriod: {
    value: Value;
    unit: Unit;
  };
}

export interface IFetchLatestResult {
  location: Location;
  city: City;
  country: Country;
  distance: Distance;
  measurements: IFetchLatestMeasurement[];
}

export interface IFetchLatestResponseBody {
  meta: IFetchLatestMeta;
  results: IFetchLatestResult[];
}

export const fetchLatest = async (
  params: IFetchLatestParams
): Promise<IFetchLatestResponseBody> => {
  const requestConfigs = {
    baseURL: openaqURL,
    params: { ...params, has_geo: true, limit: 1000 }
  };

  const { data }: { data: IFetchLatestResponseBody } = await axios.get(
    URL,
    requestConfigs
  );

  return data;
};
