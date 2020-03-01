import { IStoreState } from "../../../ducks/types";

export const getLatestData = (state: IStoreState) =>
  state.airQuality.latestResults;
