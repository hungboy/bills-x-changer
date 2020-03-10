export enum Parameter {
  PM25 = 'pm25',
  PM10 = 'pm10',
  SO2 = 'so2',
  NO2 = 'no2',
  O3 = 'o3',
  CO = 'co',
  BC = 'bc'
}

export type ParameterStrings =
  | 'PM25'
  | 'PM10'
  | 'SO2'
  | 'NO2'
  | 'O3'
  | 'CO'
  | 'BC';

export enum ParameterName {
  PM25 = 'Particulate Matter < 2.5 µm',
  PM10 = 'Particulate Matter < 10 µm',
  SO2 = 'Sulfur Dioxide',
  NO2 = 'Nitrogen Dioxide',
  O3 = 'Ozone',
  CO = 'Carbon Monoxide',
  BC = 'Black Carbon'
}

export const calculateCoordinatesString = ({
  latitude,
  longitude
}: {
  latitude: number;
  longitude: number;
}) => `coordinates=${latitude},${longitude}`;

export enum Sort {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}
