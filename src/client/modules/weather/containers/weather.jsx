import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import momentjs from 'moment';
import Moment from 'react-moment';

import axios from 'axios';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: {
        city: {
          name: '',
          country: ''
        },
        main: {
          temp: '',
          temp_max: '',
          temp_min: ''
        },
        weather: [
          {
            description: '',
            main: ''
          }
        ]
      },
      weatherData: {
        city: {
          name: '',
          country: ''
        },
        list: []
      },
      forecastData: []
    };

    this.subscription = null;
  }

  componentWillMount() {
    this.getLocation();
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
    const WEATHER_CURRENT_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`;
    //const WEATHER_FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`;
    const WEATHER_FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial&cnt=7`;

    axios.get(WEATHER_CURRENT_URL).then(
      (res) => {
        if (res.data.cod !== '200' && res.data.message){
          throw new Error(res.data.message);
        } else {
          this.setState({
            currentData: res.data,
          });
          return res.data;
        }
      },
      (res) => {
        throw new Error(res.data.message);
      }
    );

    /*
    axios.get(WEATHER_FORECAST_URL).then(
      (res) => {
        if (res.data.cod !== '200' && res.data.message){
          throw new Error(res.data.message);
        } else {
          let fiveDayForecast = [];
          let dayArray = [];
          res.data.list.map((timeData, index) => {
            if ((index + 1) % 8 === 0) {
              fiveDayForecast.push(dayArray);
              dayArray = new Array;
            } else {
              dayArray.push(timeData);
            }
          });
          this.setState({
            weatherData: res.data,
            fiveDayForecast: fiveDayForecast
          });
          return res.data;
        }
      },
      (res) => {
        throw new Error(res.data.message);
      }
    );
    */

    axios.get(WEATHER_FORECAST_URL).then(
      (res) => {
        if (res.data.cod !== '200' && res.data.message){
          throw new Error(res.data.message);
        } else {
          let forecastData = [];
          console.log(res.data);
          res.data.list.map((timeData, index) => {
            forecastData.push(timeData);
          });
          this.setState({
            weatherData: res.data,
            forecastData: forecastData
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
    const widthStyle = `(100 / ${this.state.forecastData.length})%`;
    console.log(this.state.currentData);
    console.log(this.state.weatherData);
    console.log(this.state.forecastData);
    return (
      <div className="text-center mt-4 mb-4">
        <h1>{ this.state.currentData.name }</h1>

        <h2>Today's Forecast</h2>
        <ul className="day list-unstyled">
          <li className="card">
            { this.state.currentData.main.temp }
            Hi { this.state.currentData.main.temp_max }
            Low { this.state.currentData.main.temp_min }
          </li>
        </ul>

        <h2>Upcoming Forecast</h2>
        <div className="forecast">
          <ul className="day list-unstyled">
            {
              this.state.forecastData.map(function(day) {
                return (
                  <li key={day.dt} className="card">
                    { day.temp.day }
                    Hi { day.temp.max }
                    Low { day.temp.min }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
