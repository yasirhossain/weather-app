import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import axios from 'axios';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {
        city: {
          name: '',
          country: ''
        },
        list: []
      }
    };

    this.subscription = null;
  }

  componentWillMount() {
    this.getLocation();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription();
    }
  }

  getLocation() {
    if (navigator) {
      const geolocation = navigator.geolocation;

      new Promise((resolve, reject) => {
        geolocation.getCurrentPosition((position) => {
          this.getWeatherForecast(position.coords.latitude, position.coords.longitude);
        }, () => {
          reject (new Error('Permission denied'));
        });
      });
    }
  }

  getWeatherForecast(lat, long) {
    const API_KEY = `46ddd9c3c6a545d0d62e60754768e38d`;
    const WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`;

    return axios.get(WEATHER_URL).then(
      (res) => {
        if (res.data.cod !== '200' && res.data.message){
          throw new Error(res.data.message);
        } else {
          this.setState({
            weatherData: res.data
          });
          return res.data;
        }
      },
      (res) => {
        throw new Error(res.data.message);
      }
    );
  }

  render() {
    const { loading } = this.props;
    console.log(this.state.weatherData);
    return (
      <div className="text-center mt-4 mb-4">
        { this.state.weatherData.city.name }, { this.state.weatherData.city.country }
      </div>
    );
  }
}
