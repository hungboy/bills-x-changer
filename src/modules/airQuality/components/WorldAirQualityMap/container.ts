import { connect } from 'react-redux';
import { IStoreState } from '../../../../ducks/types';
import {
  getFetchLatestDataPageFailure,
  getIsFetchingLatestData,
  getLatestData,
  getLatestDataByParameter,
  getSelectedParameterFilter
} from '../../ducks/selectors';
import { fetchLatestData } from '../../ducks/actions';
import { WorldAirQualityMap } from './component';

export const mapStateToProps = (state: IStoreState) => ({
  isFetchingLatestData: getIsFetchingLatestData(state),
  fetchLatestDataFailure: getFetchLatestDataPageFailure(state),
  fetchLatestDataPageFailure: getIsFetchingLatestData(state),
  latestData: getLatestDataByParameter(state, getSelectedParameterFilter(state))
});

export const dispatchMap = { fetchLatestData };

export const ConnectedWorldAirQualityMap = connect(
  mapStateToProps,
  dispatchMap
)(WorldAirQualityMap);
