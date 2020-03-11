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
  latestDataRange: { max: number; min: number } | null;
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
  const [hasRendered, setRendered] = useState<boolean>(false);

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
      setRendered(true);
    };
    onMount();
  }, [fetchLatestData]);
  return (
    <div className="world-air-quality-map">
      <MapContext.Provider value={{ mapRef, setMapRef }}>
        {isFetchingLatestData ||
          (!hasRendered && (
            <LoadingSpinner
              classes={['world-air-quality-map__loading-spinner']}
              subtitle={'Fetching Data...'}
            />
          ))}
        {!isFetchingLatestData && hasRendered && (
          <React.Fragment>
            {renderSelectDropdown(
              generateDropdownOptions(),
              handleParameterSelect
            )}
            <div className="world-air-quality-map__map">
              <Map>
                {latestData &&
                  renderLatestDataMarkerLayer(latestData, shouldClearLayer)}
              </Map>
            </div>
          </React.Fragment>
        )}
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
