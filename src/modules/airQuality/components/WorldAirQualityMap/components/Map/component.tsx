import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import L from 'leaflet';
import { IFetchLatestResult } from '../../../../api/fetchLatest';
import { calculateCoordinatesString } from '../../../../interfaces/constants';
import './styles.scss';

export interface IMapProps {
  markers: Marker[] | null;
  render: (props: { mapRef: React.RefObject<any> }) => React.ReactNode | null;
}

export type Marker = IFetchLatestResult;

export function Map({ markers, render }: IMapProps) {
  // create map
  const mapRef = useRef<any>(null);
  useEffect(() => {
    // Add base map
    // Bounding the drag to the edges of the world
    // Reducing zoom levels to usable levels
    mapRef.current = L.map('map-component', {
      maxBounds: [
        [90, -180],
        [-90, 180]
      ],
      preferCanvas: true,
      center: [20, 0],
      zoom: 3,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          maxZoom: 12,
          minZoom: 3,
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
  }, []);

  // add marker
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (markerRef.current) {
    } else {
      markerRef.current = L.marker([0, 0]).addTo(mapRef.current);
    }
  }, []);

  // add base layer
  const layerRef = useRef<any>(null);

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.clearLayers();
    } else {
      layerRef.current = L.layerGroup().addTo(mapRef.current);
    }
  }, [markers]);

  return (
    <div id="map-component">
      {typeof render !== 'undefined' &&
        render !== null &&
        render({ mapRef: layerRef })}
    </div>
  );
}

export default Map;
