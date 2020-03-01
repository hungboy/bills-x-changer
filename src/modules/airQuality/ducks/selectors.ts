import { IStoreState } from "../../../ducks/types";

export const getLatestData = (state: IStoreState) =>
  state.airQuality.latestResults;

export const getFetchLatestDataFailure = (state: IStoreState) =>
  state.airQuality.fetchLatestDataFailure;

export const getFetchLatestDataPageFailure = (state: IStoreState) =>
  state.airQuality.fetchLatestDataPageFailure;
