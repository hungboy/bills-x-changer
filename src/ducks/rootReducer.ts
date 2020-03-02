import { combineReducers } from "redux";
import { ducks as homeDucks } from "../modules/home";
import { ducks as airQualityDucks } from "../modules/airQuality";

const { reducer: home } = homeDucks;
const { reducer: airQuality } = airQualityDucks;

export default combineReducers({ home, airQuality });
