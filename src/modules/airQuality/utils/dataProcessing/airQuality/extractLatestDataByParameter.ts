import { IFetchLatestResult } from '../../../api/fetchLatest';
import {
  CategorizedLatestResultsMap,
  ILatestMeasurementResult
} from '../../../interfaces/types';

export const extractDataByParameter = (
  results: IFetchLatestResult[]
): CategorizedLatestResultsMap => {
  const measurementDataMap: CategorizedLatestResultsMap = results.reduce(
    (dataMap, { measurements, ...rest }) => {
      measurements.forEach(measurement => {
        if (typeof dataMap[measurement.parameter] === 'undefined') {
          dataMap[measurement.parameter] = [];
        }
        if (measurement.value > 0) {
          const measurementData = { ...rest, measurement };

          dataMap[measurement.parameter].push(
            measurementData as ILatestMeasurementResult
          );
        }
      });

      return dataMap;
    },
    {} as CategorizedLatestResultsMap
  );

  return measurementDataMap;
};
