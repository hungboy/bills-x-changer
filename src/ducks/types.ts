import { IHomeState } from "../modules/home/ducks/reducer";
import { IAirQualityState } from "../modules/airQuality/ducks/reducer";
export interface IStoreState {
  home: IHomeState;
  airQuality: IAirQualityState;
}
