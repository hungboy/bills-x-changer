import { all } from "redux-saga/effects";
import * as airQualitySagas from "../modules/airQuality/ducks/sagas";

export default function* rootSaga() {
  yield all([airQualitySagas.watchFetchLatestData()]);
}
