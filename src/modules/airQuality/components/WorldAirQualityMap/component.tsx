import React, { useEffect, useState, useRef } from 'react';
import { ILatestMeasurementResult } from '../../interfaces/types';
import { LoadingSpinner, SelectDropdown } from '../../../common';
import { Map } from './components/Map';
import { Map as LeafletMap } from 'leaflet';
import { MapLegend } from './components/MapLegend';
import {
  MarkerLayer,
  IMarker,
  RenderMarker
} from './components/MarkerLayer/component';
import { LatLngExpression } from 'leaflet';
import { context as MapContext } from './components/context';
import {
  ParameterName,
  ParameterStrings,
  Parameter
} from '../../interfaces/constants';
import { IDropdownOption } from '../../../common/SelectDropdown/types';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import * as d3Color from 'd3-color';
import './styles.scss';
import colorVariables from '../../../../styles/colors.module.scss';

export interface IWorldAirQualityMapProps
  extends IWorldAirQualityMapDispatches {
  isFetchingLatestData: boolean;
  fetchLatestDataFailure: boolean;
  fetchLatestDataPageFailure: boolean;
  latestData: ILatestMeasurementResult[] | null;
  latestDataRange: { max: number; min: number; unit: string } | null;
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
  fetchLatestData,
  latestData,
  latestDataRange,
  setWorldAirQualityMapParameterFilter
}: IWorldAirQualityMapProps) => {
  const mapRef = useRef<LeafletMap>();
  const setMapRef = (ref: LeafletMap) => (mapRef.current = ref);

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
            <div
              id="world-air-quality-map__map"
              className="world-air-quality-map__map"
            >
              <Map>
                {latestData &&
                  mapRef.current &&
                  renderLatestDataMarkerLayer(
                    latestData,
                    latestDataRange,
                    mapRef as React.MutableRefObject<LeafletMap>,
                    shouldClearLayer
                  )}
              </Map>
            </div>
            {latestDataRange && (
              <MapLegend
                {...{
                  colorScalar: createColorScalar({
                    min: latestDataRange.min,
                    max: latestDataRange.max
                  }),
                  max: latestDataRange.max,
                  min: latestDataRange.min,
                  width: 300,
                  height: 100,
                  subtitle: `Measured in ${latestDataRange.unit}`,
                  parentElementIDSelector: '#world-air-quality-map__map'
                }}
              />
            )}
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
) => (
  <SelectDropdown
    classes={['world-air-quality-map__parameter-selector']}
    emptyString="Select a Pollutant"
    options={options}
    onSelect={handleParameterSelect}
  />
);

const applyOpacity = (color: string, opacity: number = 0.8): string => {
  let newColor = d3Color.color(color) ?? color;
  if (typeof newColor !== 'string') {
    newColor.opacity = opacity;
    return (newColor as any).formatRgb() as string;
  }
  return newColor;
};

const createColorScalar = ({
  max,
  min,
  maxColor = colorVariables.black,
  minColor = colorVariables.blue
}: {
  max: number;
  min: number;
  maxColor?: string;
  minColor?: string;
}): ScaleLinear<string, string> => {
  return scaleLinear<string>()
    .domain([min, max])
    .range([applyOpacity(minColor), applyOpacity(maxColor)]);
};

const renderLatestDataMarker = (
  colorScalar: ScaleLinear<string, string>
): RenderMarker<ILatestMeasurementResult> => (
  marker: IMarker<ILatestMeasurementResult>
) => {
  const {
    data: {
      coordinates: { latitude, longitude },
      measurement: { value }
    }
  } = marker;

  const color = colorScalar(value);

  return {
    latlng: [latitude, longitude] as LatLngExpression,
    options: {
      fill: true,
      fillColor: color,
      fillOpacity: 1,
      radius: 10,
      color: '#000000',
      weight: 1,
      opacity: 1
    }
  };
};

const renderLatestDataMarkerLayer = (
  latestData: ILatestMeasurementResult[] | null,
  latestDataRange: { max: number; min: number; unit: string } | null,
  mapRef: React.MutableRefObject<LeafletMap>,
  shouldClearLayer?: () => boolean
) => {
  if (latestData && latestDataRange) {
    const markers = latestData.map(data => ({ data }));
    return (
      <MarkerLayer
        renderMarker={
          renderLatestDataMarker(
            createColorScalar({
              max: latestDataRange.max,
              min: latestDataRange.min
            })
          ) as RenderMarker<ILatestMeasurementResult>
        }
        markers={markers}
        shouldClearLayer={shouldClearLayer}
      />
    );
  }

  return null;
};
