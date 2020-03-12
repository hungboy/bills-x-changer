import {
  CategorizedLatestResultsMap,
  CategorizedMeasurementRangeMap
} from '../../../interfaces/types';

import { Parameter } from '../../../interfaces/constants';

export const extractMeasurementsRange = (
  latestResults: CategorizedLatestResultsMap
): CategorizedMeasurementRangeMap => {
  const measurementRangeMap = Object.entries(latestResults).reduce(
    (rangeMap, [parameter, measurements]) => {
      let max = Number.MIN_VALUE;
      let min = Number.MAX_VALUE;
      let groupUnit = '';
      measurements.forEach(({ location, measurement: { value, unit } }) => {
        max = Math.max(max, value);
        min = Math.min(min, value);
        groupUnit = unit;
      });

      rangeMap[parameter as Parameter] = { max, min, unit: groupUnit };
      return rangeMap;
    },
    {} as CategorizedMeasurementRangeMap
  );
  return measurementRangeMap;
};
