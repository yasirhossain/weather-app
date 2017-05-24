import React, { Component } from 'react';

import momentjs from 'moment';

import axios from 'axios';

class CurrentWeather extends Component {
  constructor(props) {
    super(props);
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
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
  }

  componentWillMount() {
    this.getCurrentWeather(this.props.lat, this.props.lon);
  }

  componentWillReceiveProps(nextProps) {
    this.getCurrentWeather(nextProps.lat, nextProps.lon);
  }

  getCurrentWeather(lat, long) {
    const WEATHER_CURRENT_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.props.api}&units=${this.props.metric}`;
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
  }

  render() {
    let dayCardStyle = {
      background: `-webkit-linear-gradient(#43cff3, #e56363 ${100 - this.state.currentData.main.temp}%)`,
      background: `linear-gradient(#43cff3, #e56363 ${100 - this.state.currentData.main.temp}%)`
    };
    return (
      <div>
        <h2><i className="fa fa-cloud"></i> Today's Forecast</h2>
        <ul className="current-day list-unstyled">
          <li className="card">
            <div className="container" style={dayCardStyle}>
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
      </div>
    );
  }
}

export default CurrentWeather;
