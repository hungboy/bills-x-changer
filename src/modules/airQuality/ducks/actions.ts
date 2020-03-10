import * as actionTypes from './types';
import { IFetchLatestResult, IFetchLatestParams } from '../api/fetchLatest';
import {
  Coordinates,
  Radius,
  ICategorizedLatestResultsMap
} from '../interfaces/types';
export interface ISetIsFetchingData {
  type: actionTypes.SET_IS_FETCHING_DATA;
  payload: { isFetchingData: boolean };
}

export const setIsFetchingData = (
  isFetchingData: boolean
): ISetIsFetchingData => ({
  type: actionTypes.SET_IS_FETCHING_DATA,
  payload: { isFetchingData }
});

export interface IFetchLatestDataByCoordinatesArgs {
  coordinates: Coordinates;
  radius: Radius;
}

export interface IFetchLatestDataByCoordinates {
  type: actionTypes.FETCH_LATEST_DATA;
  payload: IFetchLatestDataByCoordinatesArgs;
}

export const fetchLatestDataByCoordinates = (
  payload: IFetchLatestDataByCoordinatesArgs
): IFetchLatestDataByCoordinates => ({
  type: actionTypes.FETCH_LATEST_DATA,
  payload
});

export interface IFetchLatestData {
  type: actionTypes.FETCH_LATEST_DATA;
  payload?: IFetchLatestParams;
}

export const fetchLatestData = (): IFetchLatestData => ({
  type: actionTypes.FETCH_LATEST_DATA
});

export interface IFetchLatestDataSuccess {
  type: actionTypes.FETCH_LATEST_DATA_SUCCESS;
}

export const fetchLatestDataSuccess = (): IFetchLatestDataSuccess => ({
  type: actionTypes.FETCH_LATEST_DATA_SUCCESS
});

export interface IFetchLatestDataFailure {
  type: actionTypes.FETCH_LATEST_DATA_FAILURE;
}
export const fetchLatestDataFailure = (): IFetchLatestDataFailure => ({
  type: actionTypes.FETCH_LATEST_DATA_FAILURE
});

export interface IFetchLatestDataPageArgs extends IFetchLatestParams {}

export interface IFetchLatestDataPage {
  type: actionTypes.FETCH_LATEST_DATA_PAGE;
  payload: IFetchLatestDataPageArgs;
}

export const fetchLatestDataPage = (
  payload: IFetchLatestDataPageArgs
): IFetchLatestDataPage => ({
  type: actionTypes.FETCH_LATEST_DATA_PAGE,
  payload
});

export interface IFetchLatestDataPageSuccessArgs {
  latestResults: IFetchLatestResult[];
  categorizedLatestResults: ICategorizedLatestResultsMap;
}

export interface IFetchLatestDataPageSuccess {
  type: actionTypes.FETCH_LATEST_DATA_PAGE_SUCCESS;
  payload: IFetchLatestDataPageSuccessArgs;
}

export const fetchLatestDataPageSuccess = (
  payload: IFetchLatestDataPageSuccessArgs
): IFetchLatestDataPageSuccess => ({
  type: actionTypes.FETCH_LATEST_DATA_PAGE_SUCCESS,
  payload
});
export interface IFetchLatestDataPageFailure {
  type: actionTypes.FETCH_LATEST_DATA_PAGE_FAILURE;
}

export const fetchLatestDataPageFailure = (): IFetchLatestDataPageFailure => ({
  type: actionTypes.FETCH_LATEST_DATA_PAGE_FAILURE
});

export type LatestDataActions =
  | IFetchLatestData
  | IFetchLatestDataSuccess
  | IFetchLatestDataFailure
  | IFetchLatestDataPage
  | IFetchLatestDataPageSuccess
  | IFetchLatestDataPageFailure;

export type AirQualityActions = ISetIsFetchingData | LatestDataActions;
