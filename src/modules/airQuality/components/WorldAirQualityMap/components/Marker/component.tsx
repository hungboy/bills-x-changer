import React, { useEffect, useContext, useRef } from 'react';
import L from 'leaflet';
import { IFetchLatestResult } from '../../../../api/fetchLatest';
import { context as MapContext } from '../context';

export type MarkerData = IFetchLatestResult;

export interface IMarkerProps {
  data: MarkerData;
  children?: React.FunctionComponent<any>;
}

export const Marker: React.FunctionComponent<IMarkerProps> = ({
  data,
  children
}: IMarkerProps) => {
  const { layerRef: parentRef } = useContext(MapContext);

  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (parentRef !== null && (parentRef.current ?? false) && (data ?? false)) {
      const {
        coordinates: { latitude, longitude }
      } = data;
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        markerRef.current = L.circleMarker([latitude, longitude]).addTo(
          parentRef.current
        );
      }
    }
  }, [parentRef, data]);

  return typeof children === 'undefined'
    ? null
    : children({ parentRef: markerRef });
};
