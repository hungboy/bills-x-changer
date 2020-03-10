import { useEffect, useContext, useRef, useState } from 'react';
import L from 'leaflet';
import { context as MapContext } from '../context';

export interface IBaseMarker {}

export interface IMarker<T> extends IBaseMarker {
  data: T;
}

export interface IMarkerLayerProps<T> {
  markers: IMarker<T>[];
  renderMarker: RenderMarker<T>;
  shouldClearLayer?: () => boolean;
}

export type MarkerArgs = {
  latlng: L.LatLngExpression;
  options?: L.CircleMarkerOptions;
};
export type RenderMarker<T> = (marker: IMarker<T>) => MarkerArgs;
export const MarkerLayer = <T extends {}>({
  markers,
  shouldClearLayer,
  renderMarker
}: IMarkerLayerProps<T>) => {
  const { mapRef } = useContext(MapContext);
  const [hasRendered, setHasRendered] = useState(false);
  const layerRef = useRef<L.LayerGroup<any>>();

  let rerender = false;

  if (
    typeof layerRef.current !== 'undefined' &&
    typeof shouldClearLayer !== 'undefined'
  ) {
    rerender = shouldClearLayer();
    if (rerender) {
      layerRef.current.clearLayers();
    }
  }

  //Lay down initial layer
  useEffect(() => {
    if (layerRef.current ?? false) {
      return;
    }
    if (mapRef?.current ?? false) {
      layerRef.current = L.layerGroup().addTo(mapRef?.current);
    }
  }, [layerRef, markers, mapRef]);

  //Render markers
  useEffect(() => {
    if (typeof layerRef.current !== 'undefined' && (!hasRendered || rerender)) {
      for (const marker of markers) {
        const { latlng, options } = renderMarker(marker);
        L.circleMarker(latlng, options).addTo(layerRef.current);
      }
      setHasRendered(true);
    }
  }, [layerRef, markers, renderMarker, rerender, hasRendered]);

  return null;
};
