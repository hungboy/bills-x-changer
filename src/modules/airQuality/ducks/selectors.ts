import { IStoreState } from '../../../ducks/types';
import { Parameter } from '../interfaces/constants';
export const getLatestData = (state: IStoreState) =>
  state.airQuality.latestResults;

export const getFetchLatestDataFailure = (state: IStoreState) =>
  state.airQuality.fetchLatestDataFailure;

export const getFetchLatestDataPageFailure = (state: IStoreState) =>
  state.airQuality.fetchLatestDataPageFailure;

export const getIsFetchingLatestData = (state: IStoreState) =>
  state.airQuality.isFetchingLatestData;

export const getLatestCategorizedData = (state: IStoreState) =>
  state.airQuality.categorizedLatestResults;

export const getLatestDataByParameter = (
  state: IStoreState,
  parameter: Parameter | null
) => {
  const categorizedLatestResults = state.airQuality.categorizedLatestResults;

  if (parameter === null || categorizedLatestResults === null) {
    return null;
  }
  return categorizedLatestResults[parameter] ?? null;
};

export const getLatestDataRange = (
  state: IStoreState,
  parameter: Parameter | null
) => {
  const categorizedMeasurementRange =
    state.airQuality.categorizedMeasurementRange;

  if (parameter === null || categorizedMeasurementRange === null) {
    return null;
  }

  return categorizedMeasurementRange[parameter];
};

export const getSelectedParameterFilter = (state: IStoreState) =>
  state.airQuality.parameterFilter;
