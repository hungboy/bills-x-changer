import { takeEvery, put, all, call } from "redux-saga/effects";
import {
  IFetchLatestData,
  fetchLatestDataPage,
  fetchLatestDataFailure,
  fetchLatestDataSuccess,
  fetchLatestDataPageSuccess,
  fetchLatestDataPageFailure
} from "../actions";
import { FETCH_LATEST_DATA } from "../types";
import {
  fetchLatest,
  IFetchLatestParams,
  IFetchLatestResponseBody
} from "../../api/fetchLatest";

export function* fetchLatestData({ type, payload = {} }: IFetchLatestData) {
  try {
    const results: null | IFetchLatestResponseBody = yield call(
      fetchLatestPage,
      payload
    );

    if (results === null) {
      throw new Error("Failed to fetch first page");
    }

    const {
      meta: { limit, found }
    } = results;

    const pageCount = Math.ceil(found / limit);
    const pageFetchRequests = [];
    for (let i = 1; i <= pageCount; i++) {
      pageFetchRequests.push(call(fetchLatestPage, { ...payload, page: i }));
    }

    const completedPageFetchRequests = yield all(pageFetchRequests);

    const completeFailure = completedPageFetchRequests.reduce(
      (failed: boolean, response: IFetchLatestResponseBody) => {
        return failed && response;
      },
      true
    );

    if (completeFailure) {
      console.log("Failed to fetch latest remaining data pages", {
        payload,
        limit,
        found
      });
    }

    yield put(fetchLatestDataSuccess());
  } catch (e) {
    console.log("Failed to fetch latest data:", { payload, e });
    yield put(fetchLatestDataFailure());
  }
}

export function* fetchLatestPage(params: IFetchLatestParams) {
  try {
    yield put(fetchLatestDataPage(params));

    const {
      meta,
      results: latestResults
    }: IFetchLatestResponseBody = yield call(fetchLatest, params);

    yield put(fetchLatestDataPageSuccess({ latestResults }));

    return { meta, results: latestResults };
  } catch (e) {
    console.log("FetchLatestDataPage Failure:", params);
    yield put(fetchLatestDataPageFailure());

    return null;
  }
}

export function* watchFetchLatestData() {
  yield takeEvery(FETCH_LATEST_DATA, fetchLatestData);
}
