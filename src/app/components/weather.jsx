import React from 'react';

import styles from './weather.scss';

import Weather from './weather/weather_index';

export default () => {
  return (
    <div className="section">
      <div className="container-fluid">
        <Weather />
      </div>
    </div>
  );
};
