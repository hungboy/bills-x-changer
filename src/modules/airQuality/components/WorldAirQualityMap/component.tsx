import React, { useEffect, useState, useRef } from 'react';
import { ILatestMeasurementResult } from '../../interfaces/types';
import { LoadingSpinner, SelectDropdown } from '../../../common';
import { Map } from './components/Map';
import {
  MarkerLayer,
  IMarker,
  RenderMarker
} from './components/MarkerLayer/component';
import { LatLngExpression } from 'leaflet';
import { context as MapContext } from './components/context';
import './styles.scss';
import {
  ParameterName,
  ParameterStrings,
  Parameter
} from '../../interfaces/constants';
import { IDropdownOption } from '../../../common/SelectDropdown/types';

export interface IWorldAirQualityMapProps
  extends IWorldAirQualityMapDispatches {
  isFetchingLatestData: boolean;
  fetchLatestDataFailure: boolean;
  fetchLatestDataPageFailure: boolean;
  latestData: ILatestMeasurementResult[] | null;
}

export interface IWorldAirQualityMapDispatches {
  fetchLatestData: () => void;
  setWorldAirQualityMapParameterFilter: ({
    parameter
  }: {
    parameter: Parameter;
  }) => void;
}

export const WorldAirQualityMap = ({
  isFetchingLatestData,
  fetchLatestDataFailure,
  fetchLatestDataPageFailure,
  fetchLatestData,
  latestData,
  setWorldAirQualityMapParameterFilter
}: IWorldAirQualityMapProps) => {
  const mapRef = useRef<any>(null);
  const setMapRef = (ref: any) => (mapRef.current = ref);

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

  const handleParameterSelect = (option: IDropdownOption<string[]>) => {
    toggleRefreshMap();
    setWorldAirQualityMapParameterFilter({
      parameter: Parameter[option.data[0] as ParameterStrings]
    });
  };

  useEffect(() => {
    const onMount = () => {
      fetchLatestData();
      setMapPositionDirty(false);
    };
    onMount();
  }, [fetchLatestData, setMapPositionDirty]);

  return (
    <div className="world-air-quality-map">
      <MapContext.Provider value={{ mapRef, setMapRef }}>
        {renderSelectDropdown(generateDropdownOptions(), handleParameterSelect)}
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
          <Map>
            {latestData &&
              renderLatestDataMarkerLayer(latestData, shouldClearLayer)}
          </Map>
        </div>
      </MapContext.Provider>
    </div>
  );
};

const generateDropdownOptions = (): IDropdownOption<string[]>[] =>
  Object.entries(ParameterName).map(([parameter, label]: [string, string]) => ({
    key: parameter,
    label,
    data: [parameter, label]
  }));

const renderSelectDropdown = <T extends {}>(
  options: IDropdownOption<T>[],
  handleParameterSelect?: (option: IDropdownOption<T>) => void
) => <SelectDropdown options={options} onSelect={handleParameterSelect} />;

const renderLatestDataMarker: RenderMarker<ILatestMeasurementResult> = (
  marker: IMarker<ILatestMeasurementResult>
) => {
  const {
    data: {
      coordinates: { latitude, longitude }
    }
  } = marker;

  return {
    latlng: [latitude, longitude] as LatLngExpression
  };
};

const renderLatestDataMarkerLayer = (
  latestData: ILatestMeasurementResult[] | null,
  shouldClearLayer?: () => boolean
) => {
  if (latestData) {
    const markers = latestData.map(data => ({ data }));

    return (
      <MarkerLayer
        renderMarker={
          renderLatestDataMarker as RenderMarker<ILatestMeasurementResult>
        }
        markers={markers}
        shouldClearLayer={shouldClearLayer}
      />
    );
  }

  return null;
};
