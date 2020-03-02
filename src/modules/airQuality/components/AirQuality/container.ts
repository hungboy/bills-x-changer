import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { IStoreState } from "../../../../ducks/types";
import {
  getFetchLatestDataFailure,
  getFetchLatestDataPageFailure,
  getIsFetchingLatestData
} from "../../ducks/selectors";
import { AirQuality } from "./component";

export const mapStateToProps = (state: IStoreState) => ({
  isFetchingLatestData: getFetchLatestDataFailure(state),
  fetchLatestDataFailure: getFetchLatestDataPageFailure(state),
  fetchLatestDataPageFailure: getIsFetchingLatestData(state)
});

export const ConnectedAirQuality = withRouter(
  connect(mapStateToProps)(AirQuality)
);
