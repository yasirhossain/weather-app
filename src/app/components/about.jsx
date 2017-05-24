import React from 'react';
import { Link } from 'react-router';

import styles from './about.scss';

export default () => {
  return (
    <div className="about section">
      <div className="copy-container">
        <h2><i className="fa fa-cloud"></i></h2>
        <h1>Weather App</h1>
        <p>
          An app that allows you to get a 5 day forecast of weather based on your current location.
          <br />
          You can also manually enter a city around the world and toggle between Farenheit or Celcius.
        </p>
      </div>
    </div>
  );
};
