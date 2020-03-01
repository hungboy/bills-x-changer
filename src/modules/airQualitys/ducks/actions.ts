import * as actionTypes from "./types";
import { IFetchLatestResult, IFetchLatestParams } from "../api/fetchLatest";
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

export interface IFetchLatestDataArgs {
  city?: string;
  country?: string;
  location?: string;
}

export interface IFetchLatestData {
  type: actionTypes.FETCH_LATEST_DATA;
  payload: IFetchLatestDataArgs;
}

export const fetchLatestData = (
  payload: IFetchLatestDataArgs
): IFetchLatestData => ({
  type: actionTypes.FETCH_LATEST_DATA,
  payload
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
