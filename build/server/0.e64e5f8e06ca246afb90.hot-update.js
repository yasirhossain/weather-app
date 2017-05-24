require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/client/modules/weather/containers/weather.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Weather; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_moment__ = __webpack_require__("./node_modules/react-moment/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_axios__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_axios__);

















var Weather = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(Weather, _React$Component);

  function Weather(props) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, Weather);

    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Weather.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(Weather)).call(this, props));

    _this.state = {
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
        weather: [{
          description: '',
          main: ''
        }]
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

    _this.subscription = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Weather, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getLocation();
    }
  }, {
    key: 'getLocation',
    value: function getLocation() {
      var _this2 = this;

      if (navigator) {
        var geolocation = navigator.geolocation;

        new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
          geolocation.getCurrentPosition(function (position) {
            _this2.getWeatherForecast(position.coords.latitude, position.coords.longitude);
          }, function () {
            reject(new Error('Permission denied'));
          });
        });
      } else {
        console.log('sorry but this didnt work');
      }
    }
  }, {
    key: 'getCityData',
    value: function getCityData(city) {
      var API_KEY = '46ddd9c3c6a545d0d62e60754768e38d';
      var WEATHER_CITY_URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY + '&units=imperial';

      __WEBPACK_IMPORTED_MODULE_13_axios___default.a.get(WEATHER_CITY_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          /*
          let forecastData = [];
          res.data.list.map((timeData, index) => {
            forecastData.push(timeData);
          });
          */
          console.log(res.data);
          /*
          this.setState({
            weatherData: res.data,
            forecastData: forecastData
          });
          */
          return res.data;
        }
      }, function (res) {
        throw new Error(res.data.message);
      });
    }
  }, {
    key: 'getCurrentWeather',
    value: function getCurrentWeather(lat, long) {
      var _this3 = this;

      var API_KEY = '46ddd9c3c6a545d0d62e60754768e38d';
      var WEATHER_CURRENT_URL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + API_KEY + '&units=imperial';
      __WEBPACK_IMPORTED_MODULE_13_axios___default.a.get(WEATHER_CURRENT_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          _this3.setState({
            currentData: res.data
          });
          return res.data;
        }
      }, function (res) {
        throw new Error(res.data.message);
      });
    }
  }, {
    key: 'renderCurrentWeahter',
    value: function renderCurrentWeahter() {
      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'h2',
          null,
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-cloud' }),
          ' Today\'s Forecast'
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'ul',
          { className: 'current-day list-unstyled' },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            'li',
            { className: 'card' },
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'div',
              { className: 'container', style: mainCardStyle },
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                { className: 'title' },
                __WEBPACK_IMPORTED_MODULE_11_moment___default.a.unix(this.state.currentData.dt).format('ddd')
              ),
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                { className: 'number' },
                Math.round(this.state.currentData.main.temp)
              ),
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                null,
                this.state.currentData.weather[0].main
              ),
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                null,
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-chevron-up' }),
                ' ',
                Math.round(this.state.currentData.main.temp_max)
              ),
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'label',
                null,
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-chevron-down' }),
                ' ',
                Math.round(this.state.currentData.main.temp_min)
              )
            )
          )
        )
      );
    }
  }, {
    key: 'getWeatherForecast',
    value: function getWeatherForecast(lat, long) {
      var _this4 = this;

      var API_KEY = '46ddd9c3c6a545d0d62e60754768e38d';
      var WEATHER_FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + long + '&appid=' + API_KEY + '&units=imperial&cnt=5';

      __WEBPACK_IMPORTED_MODULE_13_axios___default.a.get(WEATHER_FORECAST_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          var forecastData = [];
          res.data.list.map(function (timeData, index) {
            forecastData.push(timeData);
          });
          console.log(res.data);
          console.log(forecastData);
          _this4.setState({
            weatherData: res.data,
            forecastData: forecastData
          });
          return res.data;
        }
      }, function (res) {
        throw new Error(res.data.message);
      });
    }
  }, {
    key: 'renderWeatherForecast',
    value: function renderWeatherForecast() {
      var widthStyle = {
        width: 100 / this.state.forecastData.length + '%'
      };

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        { className: 'forecast clearfix' },
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'h1',
          null,
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-map-marker' }),
          ' ',
          this.state.weatherData.city.name
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'h2',
          null,
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-cloud' }),
          ' 5 Day Forecast'
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'ul',
          { className: 'day list-unstyled' },
          this.state.forecastData.map(function (day) {
            var dayString = __WEBPACK_IMPORTED_MODULE_11_moment___default.a.unix(day.dt).format('ddd');
            var dayCardStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({
              background: '-webkit-linear-gradient(0deg, #43cff3, #e56363 ' + day.temp.day + '%)'
            }, 'background', 'linear-gradient(0deg, #43cff3, #e56363 ' + day.temp.day + '%)');
            return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'li',
              { key: day.dt, className: 'card', style: widthStyle },
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'div',
                { className: 'container', style: dayCardStyle },
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                  'label',
                  { className: 'title' },
                  dayString
                ),
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                  'label',
                  { className: 'number' },
                  Math.round(day.temp.day)
                ),
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                  'label',
                  null,
                  day.weather[0].main
                ),
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                  'label',
                  null,
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-chevron-up' }),
                  ' ',
                  Math.round(day.temp.max)
                ),
                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                  'label',
                  null,
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement('i', { className: 'fa fa-chevron-down' }),
                  ' ',
                  Math.round(day.temp.min)
                )
              )
            );
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var mainCardStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({
        background: '-webkit-linear-gradient(0deg, #43cff3, #e56363 ' + this.state.currentData.main.temp + '%)'
      }, 'background', 'linear-gradient(0deg, #43cff3, #e56363 ' + this.state.currentData.main.temp + '%)');

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        { className: 'weather text-center mt-4 mb-4 container' },
        this.renderWeatherForecast()
      );
    }
  }]);

  return Weather;
}(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);



/***/ })

};
//# sourceMappingURL=index.c0f5ed29426810a6160c.js.map