import * as actionTypes from "./actionTypes";

export interface ISetFetchingData {
  type: actionTypes.SET_FETCHING_DATA;
  payload: { fetchingData: boolean };
}

export const setFetchingData = (fetchingData: boolean): ISetFetchingData => ({
  type: actionTypes.SET_FETCHING_DATA,
  payload: { fetchingData }
});

export type HomeActions = ISetFetchingData;
