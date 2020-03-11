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
      let max = Number.MAX_VALUE;
      let min = Number.MIN_VALUE;
      measurements.forEach(({ measurement: { value } }) => {
        max = Math.max(max, value);
        min = Math.min(min, value);
      });

      rangeMap[parameter as Parameter] = { max, min };

      return rangeMap;
    },
    {} as CategorizedMeasurementRangeMap
  );

  return measurementRangeMap;
};
