import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { IFetchLatestResult } from '../../../../api/fetchLatest';
import { calculateCoordinatesString } from '../../../../interfaces/constants';

export type MarkerData = IFetchLatestResult;

export interface IMarkerProps {
  data: MarkerData;
  parentRef?: React.MutableRefObject<any>;
  children?: React.FunctionComponent<any>;
}

export const Marker: React.FunctionComponent<IMarkerProps> = ({
  data,
  parentRef,
  children
}: IMarkerProps) => {
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (
      typeof parentRef !== 'undefined' &&
      (parentRef.current ?? false) &&
      (data ?? false)
    ) {
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
