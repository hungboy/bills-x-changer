import { createContext } from 'react';

export interface IMapContext {
  mapRef: React.RefObject<any> | null;
  setMapRef: (ref: any) => void | null;
  layerRef: React.RefObject<any> | null;
  setLayerRef: (ref: any) => void | null;
}

export const DEFAULT_MAP_CONTEXT = {
  mapRef: null,
  setMapRef: null,
  layerRef: null,
  setLayerRef: null
};

export const context = createContext(DEFAULT_MAP_CONTEXT);
