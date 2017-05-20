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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_count_get_graphql__ = __webpack_require__("./src/client/modules/weather/graphql/count_get.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_count_get_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__graphql_count_get_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_count_add_mutation_graphql__ = __webpack_require__("./src/client/modules/weather/graphql/count_add_mutation.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_count_add_mutation_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__graphql_count_add_mutation_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_count_subscribe_graphql__ = __webpack_require__("./src/client/modules/weather/graphql/count_subscribe.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_count_subscribe_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__graphql_count_subscribe_graphql__);

















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
        if (this.subscription) {
          this.subscription();
          this.subscription = null;
        }

        // Subscribe or re-subscribe
        if (!this.subscription) {
          this.subscribeToCount();
        }
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
    key: 'handleReduxIncrement',
    value: function handleReduxIncrement(e) {
      var value = void 0;
      if (e && e.target) {
        value = e.target.value;
      } else {
        value = e;
      }

      this.props.onReduxIncrement(value);
    }
  }, {
    key: 'getLocation',
    value: function getLocation() {
      var geolocation = navigator.geolocation;

      var location = new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        if (!geolocation) {
          reject(new Error('Not Supported'));
        }

        geolocation.getCurrentPosition(function (position) {
          resolve(position);
          console.log(position);
        }, function () {
          reject(new Error('Permission denied'));
        });
      });
    }
  }, {
    key: 'subscribeToCount',
    value: function subscribeToCount() {
      var subscribeToMore = this.props.subscribeToMore;

      this.subscription = subscribeToMore({
        document: __WEBPACK_IMPORTED_MODULE_14__graphql_count_subscribe_graphql___default.a,
        variables: {},
        updateQuery: function updateQuery(prev, _ref) {
          var amount = _ref.subscriptionData.data.countUpdated.amount;

          return __WEBPACK_IMPORTED_MODULE_10_immutability_helper___default()(prev, {
            count: {
              amount: {
                $set: amount
              }
            }
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          count = _props.count,
          addCount = _props.addCount,
          reduxCount = _props.reduxCount;

      console.log(getLocation());
      if (loading) {
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          { className: 'text-center' },
          'Loading...'
        );
      } else {
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          { className: 'text-center mt-4 mb-4' },
          'ITS DAT BOI WUDDUP'
        );
      }
    }
  }]);

  return Weather;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

Weather.propTypes = {
  loading: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool.isRequired,
  count: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  updateCountQuery: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onReduxIncrement: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  addCount: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func.isRequired,
  subscribeToMore: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func.isRequired,
  reduxCount: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.number.isRequired
};

var WeatherWithApollo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_apollo__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_12__graphql_count_get_graphql___default.a, {
  props: function props(_ref2) {
    var _ref2$data = _ref2.data,
        loading = _ref2$data.loading,
        count = _ref2$data.count,
        subscribeToMore = _ref2$data.subscribeToMore;

    return { loading: loading, count: count, subscribeToMore: subscribeToMore };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_13__graphql_count_add_mutation_graphql___default.a, {
  props: function props(_ref3) {
    var ownProps = _ref3.ownProps,
        mutate = _ref3.mutate;
    return {
      addCount: function addCount(amount) {
        return function () {
          return mutate({
            variables: { amount: amount },
            updateQueries: {
              getCount: function getCount(prev, _ref4) {
                var mutationResult = _ref4.mutationResult;

                var newAmount = mutationResult.data.addCount.amount;
                return __WEBPACK_IMPORTED_MODULE_10_immutability_helper___default()(prev, {
                  count: {
                    amount: {
                      $set: newAmount
                    }
                  }
                });
              }
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addCount: {
                __typename: 'Count',
                amount: ownProps.count.amount + 1
              }
            }
          });
        };
      }
    };
  }
}))(Weather);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_redux__["connect"])(function (state) {
  return { reduxCount: state.counter.reduxCount };
}, function (dispatch) {
  return {
    onReduxIncrement: function onReduxIncrement(value) {
      dispatch({
        type: 'COUNTER_INCREMENT',
        value: Number(value)
      });
    }
  };
})(WeatherWithApollo));

/***/ })

};
//# sourceMappingURL=index.f75c44c147b85cba37fe.js.map