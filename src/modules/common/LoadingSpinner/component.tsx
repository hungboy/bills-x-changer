import React from "react";
import clsx from "clsx";
import "./styles.scss";

export interface ILoadingSpinnerProps {
  classes?: string[];
}

export const LoadingSpinner = ({ classes }: ILoadingSpinnerProps) => {
  return (
    <div className={clsx("loading-grid", classes)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
