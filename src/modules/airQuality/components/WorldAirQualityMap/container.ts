import { connect } from "react-redux";
import { IStoreState } from "../../../../ducks/types";
import {
  getFetchLatestDataFailure,
  getFetchLatestDataPageFailure,
  getIsFetchingLatestData,
  getLatestData
} from "../../ducks/selectors";
import { fetchLatestData } from "../../ducks/actions";
import { WorldAirQualityMap } from "./component";

export const mapStateToProps = (state: IStoreState) => ({
  isFetchingLatestData: getIsFetchingLatestData(state),
  fetchLatestDataFailure: getFetchLatestDataPageFailure(state),
  fetchLatestDataPageFailure: getIsFetchingLatestData(state),
  latestData: getLatestData(state)
});

export const dispatchMap = { fetchLatestData };

export const ConnectedWorldAirQualityMap = connect(
  mapStateToProps,
  dispatchMap
)(WorldAirQualityMap);
