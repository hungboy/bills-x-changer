import React from "react";
import { IFetchLatestResult } from "../../api/fetchLatest";
import { LoadingSpinner } from "../../../common";

export interface IWorldAirQualityMapProps
  extends IWorldAIrQualityMapDispatches {
  isFetchingLatestData: boolean;
  fetchLatestDataFailure: boolean;
  fetchLatestDataPageFailure: boolean;
  latestData: IFetchLatestResult[] | null;
}
export interface IWorldAIrQualityMapDispatches {
  fetchLatestData: () => void;
}

export const WorldAirQualityMap = ({
  isFetchingLatestData,
  fetchLatestDataFailure,
  fetchLatestDataPageFailure,
  latestData,
  fetchLatestData
}: IWorldAirQualityMapProps) => {
  React.useEffect(() => {
    fetchLatestData();
  }, []);
  debugger;
  return (
    <div className="world-air-quality-map">
      {isFetchingLatestData && (
        <LoadingSpinner classes={["world-air-quality-map__loading-spinner"]} />
      )}

      <div className="world-air-quality-map__map"> MAP PLACEHOLDER</div>
      <div className="world-air-quality-map__latest-data"></div>
    </div>
  );
};
