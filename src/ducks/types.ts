import { IHomeState } from "../modules/home/ducks/reducer";
import { IAirQualityState } from "../modules/airQualitys/ducks/reducer";
export interface IStoreState {
  home: IHomeState;
  airQuality: IAirQualityState;
}
