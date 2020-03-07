import { createContext } from 'react';

export interface IMapContext {
  mapRef: React.RefObject<any> | null;
  setMapRef: (ref: any) => void;
  layerRef: React.RefObject<any> | null;
  setLayerRef: (ref: any) => void;
}

export const DEFAULT_MAP_CONTEXT: IMapContext = {
  mapRef: null,
  setMapRef: (ref: any) => {},
  layerRef: null,
  setLayerRef: (ref: any) => {}
};

export const context = createContext(DEFAULT_MAP_CONTEXT);

context.displayName = 'MAP CONTEXT';
