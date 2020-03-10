import { IFetchLatestResult } from '../../api/fetchLatest';
import {
  ICategorizedLatestResultsMap,
  ILatestMeasurementResult
} from '../../interfaces/types';

export const extractDataByParameter = (
  results: IFetchLatestResult[]
): ICategorizedLatestResultsMap => {
  const measurementDataMap: ICategorizedLatestResultsMap = results.reduce(
    (dataMap, { measurements, ...rest }) => {
      measurements.forEach(measurement => {
        if (typeof dataMap[measurement.parameter] === 'undefined') {
          dataMap[measurement.parameter] = [];
        }
        const measurementData = { ...rest, measurement };

        dataMap[measurement.parameter].push(
          measurementData as ILatestMeasurementResult
        );
      });

      return dataMap;
    },
    {} as ICategorizedLatestResultsMap
  );

  return measurementDataMap;
};
