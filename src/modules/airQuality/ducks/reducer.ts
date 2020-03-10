import { IFetchLatestResult } from '../api/fetchLatest';
import { AirQualityActions, IFetchLatestDataPageSuccess } from './actions';
import * as actionTypes from './types';
import { ICategorizedLatestResultsMap } from '../interfaces/types';
import { Parameter } from '../interfaces/constants';

export interface IAirQualityState
  extends IAirQualityLatestResultsState,
    IWorldAirQualityMapState {
  isFetchingData: boolean;
}

export interface IWorldAirQualityMapState {
  parameterFilter: Parameter | null;
}

export const initialWorldAirQualityMapState: IWorldAirQualityMapState = {
  parameterFilter: null
};

export interface IAirQualityLatestResultsState {
  isFetchingLatestData: boolean;
  latestResults: IFetchLatestResult[] | null;
  categorizedLatestResults: ICategorizedLatestResultsMap | null;
  fetchLatestDataFailure: boolean;
  fetchLatestDataPageFailure: boolean;
}

export const initialAirQualityLatestResultsState: IAirQualityLatestResultsState = {
  latestResults: null,
  categorizedLatestResults: null,
  isFetchingLatestData: false,
  fetchLatestDataFailure: false,
  fetchLatestDataPageFailure: false
};

export const initialState: IAirQualityState = {
  isFetchingData: false,
  ...initialAirQualityLatestResultsState,
  ...initialWorldAirQualityMapState
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
      return handleFetchLatestDataPageSucceess(action, state);

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

const handleFetchLatestDataPageSucceess = (
  action: IFetchLatestDataPageSuccess,
  state: IAirQualityState
): IAirQualityState => {
  let nextState = {
    ...state,
    latestResults: [
      ...(state.latestResults ?? []),
      ...action.payload.latestResults
    ]
  };

  Object.entries(action.payload.categorizedLatestResults).forEach(
    ([parameter, categorizedResults]) => {
      if (nextState.categorizedLatestResults === null) {
        nextState.categorizedLatestResults = {};
      }
      if (
        typeof nextState.categorizedLatestResults[parameter] === 'undefined'
      ) {
        nextState.categorizedLatestResults[parameter] = [];
      }
      nextState.categorizedLatestResults[parameter] = [
        ...nextState.categorizedLatestResults[parameter],
        ...categorizedResults
      ];
    }
  );

  return nextState;
};
