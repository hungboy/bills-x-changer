import React, { useEffect } from 'react';
import { IFetchLatestResult } from '../../api/fetchLatest';
import { LoadingSpinner } from '../../../common';
import { Map } from './components/Map';
import { Marker } from './components/Marker';
import './styles.scss';
export interface IWorldAirQualityMapProps
  extends IWorldAirQualityMapDispatches {
  isFetchingLatestData: boolean;
  fetchLatestDataFailure: boolean;
  fetchLatestDataPageFailure: boolean;
  latestData: IFetchLatestResult[] | null;
}

export interface IWorldAirQualityMapDispatches {
  fetchLatestData: () => void;
}

export const WorldAirQualityMap = ({
  isFetchingLatestData,
  fetchLatestDataFailure,
  fetchLatestDataPageFailure,
  fetchLatestData,
  latestData
}: IWorldAirQualityMapProps) => {
  useEffect(() => {
    const onMount = () => {
      fetchLatestData();
    };
    onMount();
  }, [fetchLatestData]);

  return (
    <div className="world-air-quality-map">
      {isFetchingLatestData && (
        <LoadingSpinner classes={['world-air-quality-map__loading-spinner']} />
      )}

      <div className="world-air-quality-map__map">
        <Map
          markers={null}
          render={({ mapRef }) => renderMarkers(latestData, mapRef)}
        />
      </div>
      <div className="world-air-quality-map__latest-data"></div>
    </div>
  );
};

const renderMarkers = (
  latestData: IFetchLatestResult[] | null,
  parentRef: React.RefObject<any>
) => {
  if (latestData) {
    return latestData.map(data => <Marker data={data} parentRef={parentRef} />);
  }
  return null;
};
