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
      weatherData: {
        city: {
          name: '',
          country: ''
        },
        list: []
      },
      fiveDayForecast: []
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
      var WEATHER_URL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + API_KEY + '&units=imperial';

      return __WEBPACK_IMPORTED_MODULE_12_axios___default.a.get(WEATHER_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          var fiveDayForecast = [];
          var dayArray = [];
          console.log(res.data.list.length);
          res.data.list.map(function (timeData, index) {
            var day = __WEBPACK_IMPORTED_MODULE_10_moment___default()(timeData.dt_txt).format('dddd');
            console.log(res.data.list[0]);
            var currentDay = __WEBPACK_IMPORTED_MODULE_10_moment___default()(res.data.list[0].dt_text).format('dddd');
            console.log(currentDay);
            /*
            if ((index + 1) % 8 === 0) {
              fiveDayForecast.push(dayArray);
              dayArray = new Array;
            } else {
              dayArray.push(timeData);
            }
            */

            if ((index + 1) % 8 === 0) {

              dayArray.push(timeData);
            } else {
              fiveDayForecast.push(dayArray);
              dayArray = new Array();
            }
          });
          _this3.setState({
            weatherData: res.data,
            fiveDayForecast: fiveDayForecast
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

      console.log(this.state.weatherData);
      console.log(this.state.fiveDayForecast);
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { className: 'text-center mt-4 mb-4' },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'h1',
          null,
          this.state.weatherData.city.name,
          ', ',
          this.state.weatherData.city.country
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'h2',
          null,
          '5 Day Forecast'
        ),
        this.state.fiveDayForecast.map(function (day) {
          return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            { className: 'forecast' },
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
//# sourceMappingURL=index.d80ebbb3d2f9d39f5f44.js.map