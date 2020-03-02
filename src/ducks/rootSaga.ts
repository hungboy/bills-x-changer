import { all } from "redux-saga/effects";
import { ducks as airQualityDucks } from "../modules/airQuality";
const { sagas: airQualitySagas } = airQualityDucks;
export default function* rootSaga() {
  yield all([airQualitySagas.watchFetchLatestData()]);
}
