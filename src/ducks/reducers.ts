import { combineReducers } from "redux";
import { reducer as home } from "../modules/home/ducks/reducer";

export const rootReducer = combineReducers({ home });
