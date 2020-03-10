import React, { useEffect, useContext } from 'react';
import L from 'leaflet';
import { context as MapContext } from '../context';
import './styles.scss';

export interface IMapProps {
  children: React.ReactNode;
}

export function Map({ children }: IMapProps) {
  const {
    mapRef,
    setMapRef,
    layerRef,
    setLayerRef,
    shouldClearLayer
  } = useContext(MapContext);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (layerRef?.current && shouldClearLayer()) {
    layerRef.current.clearLayers();
  }

  useEffect(() => {
    if (layerRef?.current ?? false) {
      return;
    }
    if (mapRef?.current ?? false) {
      const layer = L.layerGroup().addTo(mapRef?.current);
      setLayerRef(layer);
    }
  }, [mapRef, layerRef, setLayerRef]);

  return <div id="map-component">{children}</div>;
}

export default Map;
