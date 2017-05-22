require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./node_modules/persisted_queries.json":
/***/ (function(module, exports) {

module.exports = {
	"mutation addComment($input: AddCommentInput!) {\n  addComment(input: $input) {\n    ...CommentInfo\n    __typename\n  }\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 1,
	"mutation addCount($amount: Int!) {\n  addCount(amount: $amount) {\n    amount\n    __typename\n  }\n}\n": 2,
	"mutation addPost($input: AddPostInput!) {\n  addPost(input: $input) {\n    ...PostInfo\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 3,
	"mutation deleteComment($input: DeleteCommentInput!) {\n  deleteComment(input: $input) {\n    id\n    __typename\n  }\n}\n": 4,
	"mutation deletePost($id: ID!) {\n  deletePost(id: $id) {\n    id\n    __typename\n  }\n}\n": 5,
	"mutation editComment($input: EditCommentInput!) {\n  editComment(input: $input) {\n    ...CommentInfo\n    __typename\n  }\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 6,
	"mutation editPost($input: EditPostInput!) {\n  editPost(input: $input) {\n    ...PostInfo\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 7,
	"query getCount {\n  count {\n    amount\n    __typename\n  }\n}\n": 8,
	"query getPost($id: ID!) {\n  post(id: $id) {\n    ...PostInfo\n    comments {\n      ...CommentInfo\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 9,
	"query getPosts($limit: Int!, $after: ID) {\n  postsQuery(limit: $limit, after: $after) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...PostInfo\n        __typename\n      }\n      __typename\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 10,
	"subscription onCommentUpdated($postId: ID!) {\n  commentUpdated(postId: $postId) {\n    mutation\n    id\n    postId\n    node {\n      ...CommentInfo\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 11,
	"subscription onCountUpdated {\n  countUpdated {\n    amount\n    __typename\n  }\n}\n": 12,
	"subscription onPostUpdated($id: ID!) {\n  postUpdated(id: $id) {\n    ...PostInfo\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 13
};

/***/ }),

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

    _this.state = {
      weatherData: {
        city: {
          name: '',
          country: ''
        },
        list: []
      }
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
      console.log(geolocation);

      if (geolocation) {
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
      var WEATHER_URL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + API_KEY;

      return __WEBPACK_IMPORTED_MODULE_12_axios___default.a.get(WEATHER_URL).then(function (res) {
        if (res.data.cod !== '200' && res.data.message) {
          throw new Error(res.data.message);
        } else {
          _this3.setState({
            weatherData: res.data
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
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { className: 'text-center mt-4 mb-4' },
        this.state.weatherData.city.name,
        ', ',
        this.state.weatherData.city.country
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
//# sourceMappingURL=index.dba304f44058f140dd61.js.map