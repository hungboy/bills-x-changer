import React, { useEffect, useState, useRef } from 'react';
import { IFetchLatestResult } from '../../api/fetchLatest';
import { LoadingSpinner } from '../../../common';
import { Map } from './components/Map';
import { Marker } from './components/Marker';
import { Map as LeafletMap, LeafletEvent } from 'leaflet';
import { context as MapContext } from './components/context';
import './styles.scss';
import { calculateCoordinatesString } from '../../interfaces/constants';
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
  const currentMapRef: LeafletMap | null = mapRef.current;
  const setMapRef = (ref: any) => (mapRef.current = ref);
  const layerRef = useRef<any>(null);
  const setLayerRef = (ref: any) => (layerRef.current = ref);
  const [shouldRefreshMap, setShouldRefreshMap] = useState<boolean>(false);
  const [isMapPositionDirty, setMapPositionDirty] = useState<boolean>(true);

  const shouldClearLayer = () => {
    const refreshMap = shouldRefreshMap;

    if (refreshMap) {
      setShouldRefreshMap(false);
    }

    return refreshMap;
  };

  const toggleRefreshMap = () => setShouldRefreshMap(true);

  useEffect(() => {
    const onMount = () => {
      fetchLatestData();
      setMapPositionDirty(false);
    };
    onMount();
  }, [fetchLatestData, setMapPositionDirty]);

  useEffect(() => {
    if (currentMapRef !== null) {
      currentMapRef.on('zoomend', (event: LeafletEvent) => {
        setMapPositionDirty(true);
      });
      currentMapRef.on('moveend', (event: LeafletEvent) => {
        setMapPositionDirty(true);
      });
    }
  }, [currentMapRef]);

  return (
    <div className="world-air-quality-map">
      <MapContext.Provider
        value={{ mapRef, setMapRef, layerRef, setLayerRef, shouldClearLayer }}
      >
        {isMapPositionDirty && (
          <div className="world-air-quality-map__fetch-latest-button">
            FETCH STUFF!
          </div>
        )}
        {isFetchingLatestData && (
          <LoadingSpinner
            classes={['world-air-quality-map__loading-spinner']}
          />
        )}

        <div className="world-air-quality-map__map">
          <Map>{renderMarkers(latestData)}</Map>
        </div>
        <div className="world-air-quality-map__latest-data"></div>
      </MapContext.Provider>
    </div>
  );
};

const renderMarkers = (latestData: IFetchLatestResult[] | null) => {
  if (latestData) {
    return latestData.map(data => (
      <Marker
        key={`${data.location}-${data.city}-${
          data.country
        }-${calculateCoordinatesString(data.coordinates)}`}
        data={data}
      />
    ));
  }
  return null;
};
