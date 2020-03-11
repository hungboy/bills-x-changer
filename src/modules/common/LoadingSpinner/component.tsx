import React from 'react';
import clsx from 'clsx';
import './styles.scss';

export interface ILoadingSpinnerProps {
  classes?: string[];
  subtitle?: string;
}

export const LoadingSpinner = ({ classes, subtitle }: ILoadingSpinnerProps) => {
  return (
    <div className={clsx('loading-grid', classes)}>
      <div className={'loading-grid_spinner'}>
        <div className="loading-grid_spinner_dot"></div>
        <div className="loading-grid_spinner_dot"></div>

        <div className="loading-grid_spinner_dot"></div>

        <div className="loading-grid_spinner_dot"></div>

        <div className="loading-grid_spinner_dot"></div>

        <div className="loading-grid_spinner_dot"></div>

        <div className="loading-grid_spinner_dot"></div>
        <div className="loading-grid_spinner_dot"></div>

        <div className="loading-grid_spinner_dot"></div>
      </div>
      {typeof subtitle === 'string' && (
        <div className="loading-grid_subtitle">{subtitle}</div>
      )}
    </div>
  );
};
