require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./node_modules/react-moment/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(51),__webpack_require__("./node_modules/moment-timezone/index.js"),__webpack_require__(0)):"function"==typeof define&&define.amd?define(["moment","moment-timezone","react"],t):"object"==typeof exports?exports["react-moment"]=t(require("moment"),require("moment-timezone"),require("react")):e["react-moment"]=t(e.moment,e["moment-timezone"],e.react)}(this,function(e,t,o){return function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){(function(e){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){var o={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(o[r]=e[r]);return o}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function f(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},l=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),p=o(3),c=r(p),s=o(1),m=r(s);o(2);var d=function(t){function o(e){a(this,o);var t=u(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,e));return t.state={content:""},t}return f(o,t),l(o,[{key:"componentWillMount",value:function(){this.generateContent(this.props)}},{key:"componentDidMount",value:function(){var t=this;this.interval=e.setInterval(function(){t.generateContent(t.props)},6e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"componentWillReceiveProps",value:function(e){this.generateContent(e)}},{key:"generateContent",value:function(e){var t=e.format,r=e.fromNow,n=e.from,a=e.toNow,u=e.to,f=e.calendar,i=e.ago,l=o.getDatetime(e),p="";p=t?l.format(t):n?l.from(n,i):r?l.fromNow(i):u?l.to(u,i):a?l.toNow(i):f?l.calendar():l.toString(),this.setState({content:p})}},{key:"render",value:function(){var e=this.props,t=(e.date,e.parse,e.format,e.fromNow,e.from,e.toNow,e.to,e.calendar,e.ago,e.utc,e.unix,e.tz,e.locale,n(e,["date","parse","format","fromNow","from","toNow","to","calendar","ago","utc","unix","tz","locale"])),r=o.getDatetime(this.props),a=this.state.content;return c["default"].createElement("time",i({dateTime:r.format()},t),a)}}],[{key:"getDatetime",value:function(e){var t=e.date,o=e.locale,r=e.parse,n=e.utc,a=e.unix,u=e.tz;t=t||e.children;var f=null;return o=o?o:m["default"].locale(),f=n?m["default"].utc(t,r,o):a?(0,m["default"])(1e3*t,r,o):(0,m["default"])(t,r,o),u&&(f=f.tz(u)),f}}]),o}(c["default"].Component);t["default"]=d;var y=[c["default"].PropTypes.string,c["default"].PropTypes.number,c["default"].PropTypes.array,c["default"].PropTypes.object],v=[c["default"].PropTypes.string,c["default"].PropTypes.array];d.propTypes={date:c["default"].PropTypes.oneOfType(y),parse:c["default"].PropTypes.oneOfType(v),format:c["default"].PropTypes.string,ago:c["default"].PropTypes.bool,fromNow:c["default"].PropTypes.bool,from:c["default"].PropTypes.oneOfType(y),toNow:c["default"].PropTypes.bool,to:c["default"].PropTypes.oneOfType(y),calendar:c["default"].PropTypes.bool,unix:c["default"].PropTypes.bool,utc:c["default"].PropTypes.bool,tz:c["default"].PropTypes.string,locale:c["default"].PropTypes.string},d.defaultProps={fromNow:!1,toNow:!1,calendar:!1,ago:!1,unix:!1,utc:!1}}).call(t,function(){return this}())},function(t,o){t.exports=e},function(e,o){e.exports=t},function(e,t){e.exports=o}])});

/***/ }),

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_moment__ = __webpack_require__("./node_modules/react-moment/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_axios__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_axios__);















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

      return __WEBPACK_IMPORTED_MODULE_11_axios___default.a.get(WEATHER_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          var fiveDayForecast = [];
          var dayArray = [];
          res.data.list.map(function (timeData, index) {
            dayArray.push(timeData);

            if ((index + 1) % 8 === 0) {
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
            null,
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'label',
              null,
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_react_moment___default.a, { date: day[0].dt })
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'ul',
              { className: 'Day' },
              day.map(function (hour) {
                return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  'li',
                  { key: hour.dt },
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
//# sourceMappingURL=index.6985f0ce8e5888e52d74.js.map