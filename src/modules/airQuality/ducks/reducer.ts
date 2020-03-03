import { IFetchLatestResult } from "../api/fetchLatest";
import { AirQualityActions } from "./actions";
import * as actionTypes from "./types";

export interface IAirQualityState extends IAirQualityLatestResultsState {
  isFetchingData: boolean;
}

export interface IAirQualityLatestResultsState {
  isFetchingLatestData: boolean;
  latestResults: IFetchLatestResult[] | null;
  fetchLatestDataFailure: boolean;
  fetchLatestDataPageFailure: boolean;
}

export const initialAirQualityLatestResultsState = {
  latestResults: null,
  isFetchingLatestData: false,
  fetchLatestDataFailure: false,
  fetchLatestDataPageFailure: false
};

export const initialState: IAirQualityState = {
  isFetchingData: false,
  ...initialAirQualityLatestResultsState
};

export const reducer = (state = initialState, action: AirQualityActions) => {
  switch (action.type) {
    case actionTypes.SET_IS_FETCHING_DATA:
      return { ...state, ...action.payload };

    case actionTypes.FETCH_LATEST_DATA:
      return {
        ...state,
        ...initialAirQualityLatestResultsState,
        isFetchingLatestData: true
      };

    case actionTypes.FETCH_LATEST_DATA_SUCCESS:
      return { ...state, isFetchingLatestData: false };

    case actionTypes.FETCH_LATEST_DATA_FAILURE:
      return {
        ...state,
        isFetchingLatestData: false,
        fetchLatestDataFailure: true
      };

    case actionTypes.FETCH_LATEST_DATA_PAGE_SUCCESS:
      return {
        ...state,
        latestResults: [
          ...(state.latestResults ?? []),
          ...action.payload.latestResults
        ]
      };

    case actionTypes.FETCH_LATEST_DATA_PAGE_FAILURE:
      return {
        ...state,

        fetchLatestDataPageFailure: true
      };

    case actionTypes.FETCH_LATEST_DATA_PAGE:
      return { ...state };

    default:
      //Reset state when accessing another portion of the app
      return { ...initialState };
  }
};
