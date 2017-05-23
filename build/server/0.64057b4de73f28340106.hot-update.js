require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/client/modules/weather/containers/weather.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Weather; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_moment__ = __webpack_require__("./node_modules/react-moment/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_axios__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_axios__);
















var Weather = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Weather, _React$Component);

  function Weather(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Weather);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Weather.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Weather)).call(this, props));

    _this.state = {
      currentWeatherData: {
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

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Weather, [{
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

        new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
          geolocation.getCurrentPosition(function (position) {
            _this2.getWeatherForecast(position.coords.latitude, position.coords.longitude);
          }, function () {
            reject(new Error('Permission denied'));
          });
        });
      }
    }
  }, {
    key: 'getWeatherForecast',
    value: function getWeatherForecast(lat, long) {
      var _this3 = this;

      var API_KEY = '46ddd9c3c6a545d0d62e60754768e38d';
      var WEATHER_CURRENT_URL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + API_KEY + '&units=imperial';
      //const WEATHER_FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`;
      var WEATHER_FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + long + '&appid=' + API_KEY + '&units=imperial&cnt=7';

      __WEBPACK_IMPORTED_MODULE_12_axios___default.a.get(WEATHER_CURRENT_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          console.log(res.data);
          _this3.setState({
            currentWeatherData: res.data
          });
          return res.data;
        }
      }, function (res) {
        throw new Error(res.data.message);
      });

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

      __WEBPACK_IMPORTED_MODULE_12_axios___default.a.get(WEATHER_FORECAST_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          var forecastData = [];
          console.log(res.data);
          res.data.list.map(function (timeData, index) {
            forecastData.push(timeData);
          });
          _this3.setState({
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
    key: 'render',
    value: function render() {
      var loading = this.props.loading;

      console.log(this.state.currentData);
      console.log(this.state.forecastData);
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { className: 'text-center mt-4 mb-4' },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'h1',
          null,
          this.state.currentData.city.name,
          ', ',
          this.state.currentData.city.country
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'h2',
          null,
          'Today\'s Forecast'
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'ul',
          { className: 'day list-unstyled' },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'li',
            { className: 'card' },
            'Time ',
            this.state.currentData.main.dt_txt,
            this.state.currentData.main.temp,
            'Hi ',
            this.state.currentData.main.temp_max,
            'Low ',
            this.state.currentData.main.temp_min
          )
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'h2',
          null,
          'Upcoming Forecast'
        ),
        this.state.weatherData.listing.map(function (day) {
          return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            { className: 'forecast', key: day.dt },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'label',
              null,
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_11_react_moment___default.a,
                { format: 'dddd' },
                day[0].dt_txt
              )
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'ul',
              { className: 'day list-unstyled' },
              day.map(function (hour) {
                return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  'li',
                  { key: hour.dt, className: 'card' },
                  'Time ',
                  hour.dt_txt,
                  hour.main.temp,
                  'Hi ',
                  hour.main.temp_max,
                  'Low ',
                  hour.main.temp_min
                );
              })
            )
          );
        })
      );
    }
  }]);

  return Weather;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);



/***/ })

};
//# sourceMappingURL=index.a54ce8f0ce558e1bd14d.js.map