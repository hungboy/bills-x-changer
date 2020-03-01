export enum Parameter {
  PM25 = "pm25",
  PM10 = "pm10",
  SO2 = "so2",
  NO2 = "no2",
  O3 = "o3",
  CO = "co",
  BC = "bc"
}

export enum ParameterName {
  PM25 = "Particulate Matter < 2.5 µm",
  PM10 = "Particulate Matter < 10 µm",
  SO2 = "Sulfur Dioxide",
  NO2 = "Nitrogen Dioxide",
  O3 = "Ozone",
  CO = "Carbon Monoxide",
  BC = "Black Carbon"
}

export const calculateCoordinates = ({
  lat,
  lon
}: {
  lat: number;
  lon: number;
}) => `coordinates=${lat},${lon}`;

export enum Sort {
  ASCENDING = "asc",
  DESCENDING = "desc"
}
