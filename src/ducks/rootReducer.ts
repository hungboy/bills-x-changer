import { combineReducers } from "redux";
import { reducer as home } from "../modules/home/ducks/reducer";
import { reducer as airQuality } from "../modules/airQualitys/ducks/reducer";

export default combineReducers({ home, airQuality });
