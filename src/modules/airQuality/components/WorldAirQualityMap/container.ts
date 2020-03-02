import { connect } from "react-redux";
import { IStoreState } from "../../../../ducks/types";
import {
  getFetchLatestDataFailure,
  getFetchLatestDataPageFailure,
  getIsFetchingLatestData,
  getLatestData
} from "../../ducks/selectors";
import { WorldAirQualityMap } from "./component";

export const mapStateToProps = (state: IStoreState) => ({
  isFetchingLatestData: getFetchLatestDataFailure(state),
  fetchLatestDataFailure: getFetchLatestDataPageFailure(state),
  fetchLatestDataPageFailure: getIsFetchingLatestData(state),
  latestData: getLatestData(state)
});

export const ConnectedWorldAirQualityMap = connect(mapStateToProps)(
  WorldAirQualityMap
);
