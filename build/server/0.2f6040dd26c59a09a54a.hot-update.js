require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/client/modules/weather/containers/weather.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_apollo__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_immutability_helper__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_axios__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_axios__);















//import WEATHER_QUERY from '../graphql/weather_get.graphql';

var Weather = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Weather, _React$Component);

  function Weather(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Weather);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Weather.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Weather)).call(this, props));

    _this.subscription = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Weather, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.loading) {
        this.getLocation();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription();
      }
    }
  }, {
    key: 'getLocation',
    value: function getLocation() {
      var _this2 = this;

      var geolocation = navigator.geolocation;

      new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        if (!geolocation) {
          reject(new Error('Not Supported'));
        }

        geolocation.getCurrentPosition(function (position) {
          console.log(_this2.getWeatherForecast(position.coords.latitude, position.coords.longitude));
          return _this2.getWeatherForecast(position.coords.latitude, position.coords.longitude);
        }, function () {
          reject(new Error('Permission denied'));
        });
      });
    }
  }, {
    key: 'getWeatherForecast',
    value: function getWeatherForecast(lat, long) {
      var API_KEY = '46ddd9c3c6a545d0d62e60754768e38d';
      var WEATHER_URL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + API_KEY;

      return __WEBPACK_IMPORTED_MODULE_12_axios___default.a.get(WEATHER_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          console.log(res.data);
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

      console.log(this.getLocation.cod);
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { className: 'text-center mt-4 mb-4' },
        'ITS DAT BOI WUDDUP',
        this.getLocation.cod
      );
    }
  }]);

  return Weather;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

Weather.propTypes = {};

var WeatherWithApollo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_apollo__["compose"])()(Weather);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_redux__["connect"])(function (state) {
  return {};
}, function (dispatch) {
  return {};
})(WeatherWithApollo));

/***/ })

};
//# sourceMappingURL=index.07d2b41d73d28d23a768.js.map