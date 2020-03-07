import React, { useEffect, useContext } from 'react';
import L from 'leaflet';
import { IFetchLatestResult } from '../../../../api/fetchLatest';
import { context as MapContext } from '../context';
import './styles.scss';

export interface IMapProps {
  markers: Marker[] | null;
  children: React.ReactNode;
}

export type Marker = IFetchLatestResult;

export function Map({ markers, children }: IMapProps) {
  const { mapRef, setMapRef, layerRef, setLayerRef } = useContext(MapContext);

  useEffect(() => {
    // Add base map
    // Bounding the drag to the edges of the world
    // Reducing zoom levels to usable levels
    const map = L.map('map-component', {
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

    setMapRef(map);
  }, [setMapRef]);

  useEffect(() => {
    if (layerRef?.current) {
      layerRef.current.clearLayers();
    } else {
      const layer = L.layerGroup().addTo(mapRef?.current);
      setLayerRef(layer);
    }
  }, [markers, layerRef, setLayerRef, mapRef]);

  return <div id="map-component">{children}</div>;
}

export default Map;
