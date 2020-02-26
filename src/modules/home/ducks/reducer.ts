import { HomeActions } from "./actions";
import * as actionTypes from "./actionTypes";
export interface IHomeState {
  fetchingData: boolean;
}

export const initialState: IHomeState = {
  fetchingData: false
};

export const reducer = (
  state: IHomeState = initialState,
  action: HomeActions
) => {
  switch (action.type) {
    case actionTypes.SET_FETCHING_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
