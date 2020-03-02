import React from "react";
import { IFetchLatestResult } from "../../api/fetchLatest";
import { LoadingSpinner } from "../../../common";

export interface IWorldAirQualityMapProps {
  isFetchingLatestData: boolean;
  fetchLatestDataFailure: boolean;
  fetchLatestDataPageFailure: boolean;
  latestData: IFetchLatestResult[] | null;
}

export const WorldAirQualityMap = ({
  isFetchingLatestData,
  fetchLatestDataFailure,
  fetchLatestDataPageFailure,
  latestData
}: IWorldAirQualityMapProps) => {
  return (
    <div className="world-air-quality-map">
      {isFetchingLatestData && (
        <LoadingSpinner classes={["world-air-quality-map__loading-spinner"]} />
      )}

      <div className="world-air-quality-map__map"> MAP PLACEHOLDER</div>
    </div>
  );
};
