import { connect } from 'react-redux';
import { IStoreState } from '../../../../ducks/types';
import {
  getFetchLatestDataPageFailure,
  getIsFetchingLatestData,
  getLatestDataByParameter,
  getSelectedParameterFilter
} from '../../ducks/selectors';
import {
  fetchLatestData,
  setWorldAirQualityMapParameterFilter
} from '../../ducks/actions';
import { WorldAirQualityMap } from './component';

export const mapStateToProps = (state: IStoreState) => {
  return {
    isFetchingLatestData: getIsFetchingLatestData(state),
    fetchLatestDataFailure: getFetchLatestDataPageFailure(state),
    fetchLatestDataPageFailure: getIsFetchingLatestData(state),
    latestData: getLatestDataByParameter(
      state,
      getSelectedParameterFilter(state)
    )
  };
};

export const dispatchMap = {
  fetchLatestData,
  setWorldAirQualityMapParameterFilter
};

export const ConnectedWorldAirQualityMap = connect(
  mapStateToProps,
  dispatchMap
)(WorldAirQualityMap);
