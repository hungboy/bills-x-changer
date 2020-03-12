import { createContext } from 'react';
import { Map } from 'leaflet';

export interface IMapContext {
  mapRef: React.MutableRefObject<Map | undefined> | null;
  setMapRef: (ref: Map) => void;
}

export const DEFAULT_MAP_CONTEXT: IMapContext = {
  mapRef: null,
  setMapRef: (ref: Map) => {}
};

export const context = createContext(DEFAULT_MAP_CONTEXT);

context.displayName = 'MAP CONTEXT';
