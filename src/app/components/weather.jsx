import React from 'react';

import styles from './weather.scss';

import Weather from './weather/weather_index';

export default () => {
  return (
    <div className="section">
      <div className="container-fluid">
        <h1>Weather</h1>
        <Weather />
      </div>
    </div>
  );
};
