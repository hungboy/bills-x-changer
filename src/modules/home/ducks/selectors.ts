import { IStoreState } from "../../../ducks/types";

export const getIsFetchingData = (state: IStoreState) =>
  state.home.fetchingData;
