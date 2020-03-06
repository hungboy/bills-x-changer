import React, { useEffect, useState, useRef } from 'react';
import { IFetchLatestResult } from '../../api/fetchLatest';
import { LoadingSpinner } from '../../../common';
import { Map } from './components/Map';
import { Marker } from './components/Marker';
import { context as MapContext } from './components/context';
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
  const mapRef = useRef<any>(null);
  const setMapRef = (ref: any) => (mapRef.current = ref);
  const layerRef = useRef<any>(null);
  const setLayerRef = (ref: any) => (layerRef.current = ref);

  useEffect(() => {
    const onMount = () => {
      fetchLatestData();
    };
    onMount();
  }, [fetchLatestData]);

  return (
    <div className="world-air-quality-map">
      <MapContext.Provider value={{ mapRef, setMapRef, layerRef, setLayerRef }}>
        {isFetchingLatestData && (
          <LoadingSpinner
            classes={['world-air-quality-map__loading-spinner']}
          />
        )}

        <div className="world-air-quality-map__map">
          <Map markers={null}>{renderMarkers(latestData)}</Map>
        </div>
        <div className="world-air-quality-map__latest-data"></div>
      </MapContext.Provider>
    </div>
  );
};

const renderMarkers = (latestData: IFetchLatestResult[] | null) => {
  if (latestData) {
    return latestData.map(data => <Marker data={data} />);
  }
  return null;
};
