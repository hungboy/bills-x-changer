import { connect } from "react-redux";
import { IStoreState } from "../../../../ducks/types";
import { getIsFetchingLatestData, getLatestData } from "../../ducks/selectors";
import { fetchLatestDataByCoordinates } from "../../ducks/actions";
import { LocationDetails } from "./component";

export const mapStateToProps = (state: IStoreState) => {
  return {
    isFetchingLatestData: getIsFetchingLatestData(state),
    latestResults: getLatestData(state)
  };
};

export const dispatchMap = {
  fetchLatestDataByCoordinates
};

export const ConnectedLocationDetails = connect(
  mapStateToProps,
  dispatchMap
)(LocationDetails);
