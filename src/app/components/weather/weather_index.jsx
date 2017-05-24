import React, { Component } from 'react';

import momentjs from 'moment';

import axios from 'axios';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.API_KEY = `46ddd9c3c6a545d0d62e60754768e38d`;
    this.onCityEnter = this.onCityEnter.bind(this);
    this.state = {
      metric: 'imperial',
      lat: 0,
      lon: 0,
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
    this.getLocation();
  }

  getLocation() {
    if (navigator) {
      const geolocation = navigator.geolocation;

      new Promise((resolve, reject) => {
        geolocation.getCurrentPosition((position) => {
          this.setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          this.getWeatherForecast(this.state.lat, this.state.lon, this.state.metric);
        }, () => {
          reject (new Error('Permission denied'));
        });
      });
    } else {
      console.log(`sorry but this didnt work`);
    }
  }

  getCityData(city) {
    const WEATHER_CITY_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=${this.state.metric}`;
    axios.get(WEATHER_CITY_URL).then(
      (res) => {
        if (res.data.cod !== '200' && res.data.message){
          throw new Error(res.data.message);
        } else {
          this.setState({
            lat: res.data.coord.lat,
            lon: res.data.coord.lon
          });
          this.getWeatherForecast(res.data.coord.lat, res.data.coord.lon, this.state.metric);
          return res.data;
        }
      },
      (res) => {
        throw new Error(res.data.message);
      }
    );
  }

  getCurrentWeather(lat, long) {
    const WEATHER_CURRENT_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.API_KEY}&units=${this.state.metric}`;
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

  renderCurrentWeather() {
    return (
      <div>
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
      </div>
    )
  }

  getWeatherForecast(lat, long, metric) {
    const WEATHER_FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&appid=${this.API_KEY}&units=${metric}&cnt=5`;

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

  onCityEnter(event) {
    event.preventDefault();
    const city = this.refs.city.value;

    this.getCityData(city);

    this.refs.city.value = '';
  }

  renderCityForm() {
    return(
      <div className="city">
        <h2><i className="fa fa-globe"></i> Enter a City</h2>
        <form id="frmChat" role="form" onSubmit={this.onCityEnter}>
          <input type="city" className="form-control" id="txtCity" ref="city" placeholder="Enter a city..." name="city" />
        </form>
      </div>
    )
  }

  toggleIsActive(value) {
    return ((value===this.state.metric) ?'active':'');
  }

  toggleMetric(metric) {
    this.setState({
      metric: metric
    });
    this.getWeatherForecast(this.state.lat, this.state.lon, metric);
  }

  renderMetricToggle() {
    const activeStyle = {
      width: `${100 / this.state.forecastData.length}%`
    };

    return(
      <ul className="toggle list-unstyled">
        <li className={this.toggleIsActive('imperial')} onClick={() => this.toggleMetric('imperial')}>F</li>
        <li className={this.toggleIsActive('metric')} onClick={() => this.toggleMetric('metric')}>C</li>
      </ul>
    )
  }

  renderWeatherForecast() {
    const widthStyle = {
      width: `${100 / this.state.forecastData.length}%`
    };

    if (this.state.forecastData.length > 0) {
      return (
        <div className="forecast clearfix">
          <div className="header">
            <h1><i className="fa fa-map-marker"></i> { this.state.weatherData.city.name }</h1>
            { this.renderMetricToggle() }
          </div>
          <h2><i className="fa fa-cloud"></i> 5 Day Forecast</h2>
          <ul className="day list-unstyled">
            {
              this.state.forecastData.map(function(day) {
                let dayString = momentjs.unix(day.dt).format('ddd');
                let dayCardStyle = {
                  background: `-webkit-linear-gradient(#43cff3, #e56363 ${100 - day.temp.day}%)`,
                  background: `linear-gradient(#43cff3, #e56363 ${100 - day.temp.day}%)`
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
      )
    }
  }

  render() {
    return (
      <div className="weather text-center mt-4 mb-4 container">
        { this.renderCityForm() }
        { this.renderWeatherForecast() }
      </div>
    );
  }
}

export default Weather;
