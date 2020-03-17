import React from 'react';
import { LoadingSpinner } from '../common';
import { Link } from 'react-router-dom';
import './styles.scss';

export const Home = () => {
  return (
    <div className="home-root">
      <Link className="air-quality_link" to="air-quality">
        <LoadingSpinner
          classes={['air-quality_link']}
          subtitle="Checkout the World Air Quality Map!"
        />
      </Link>
    </div>
  );
};
