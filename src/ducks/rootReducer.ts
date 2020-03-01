import { combineReducers } from "redux";
import { reducer as home } from "../modules/home/ducks/reducer";
import { reducer as airQuality } from "../modules/airQuality/ducks/reducer";

export default combineReducers({ home, airQuality });
