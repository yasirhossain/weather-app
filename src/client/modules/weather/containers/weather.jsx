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
    } else {
      console.log(`sorry but this didnt work`);
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
    const widthStyle = {
      width: `${100 / this.state.forecastData.length}%`
    };

    const mainCardStyle = {
      background: `-webkit-linear-gradient(0deg, #43cff3, #e56363 ${this.state.currentData.main.temp}%)`,
      background: `linear-gradient(0deg, #43cff3, #e56363 ${this.state.currentData.main.temp}%)`
    };

    return (
      <div className="weather text-center mt-4 mb-4 container">
        <h1><i className="fa fa-map-marker"></i> { this.state.currentData.name }</h1>

        <h2><i className="fa fa-cloud"></i> Today's Forecast</h2>
        <ul className="current-day list-unstyled">
          <li className="card">
            <div className="container" style={mainCardStyle}>
              <label className="title">{ momentjs.unix(this.state.currentData.dt).format('ddd') }</label>
              <label className="number">{ Math.round(this.state.currentData.main.temp) }</label>
              <label>{ this.state.currentData.weather[0].main }</label>
              <label>
                <i className="fa fa-chevron-up"></i> { Math.round(this.state.currentData.main.temp_max) }
              </label>
              <label>
                <i className="fa fa-chevron-down"></i> { Math.round(this.state.currentData.main.temp_min) }
              </label>
            </div>
          </li>
        </ul>

        <div className="forecast clearfix">
          <h2><i className="fa fa-cloud"></i> Upcoming Forecast</h2>
          <ul className="day list-unstyled">
            {
              this.state.forecastData.map(function(day) {
                let dayString = momentjs.unix(day.dt).format('ddd');
                let dayCardStyle = {
                  background: `-webkit-linear-gradient(0deg, #43cff3, #e56363 ${day.temp.day}%)`,
                  background: `linear-gradient(0deg, #43cff3, #e56363 ${day.temp.day}%)`
                };
                return (
                  <li key={day.dt} className="card" style={widthStyle}>
                    <div className="container" style={dayCardStyle}>
                      <label className="title">{ dayString }</label>
                      <label className="number">{ Math.round(day.temp.day) }</label>
                      <label>{ day.weather[0].main }</label>
                      <label>
                        <i className="fa fa-chevron-up"></i> { Math.round(day.temp.max) }
                      </label>
                      <label>
                        <i className="fa fa-chevron-down"></i> { Math.round(day.temp.min) }
                      </label>
                    </div>
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
