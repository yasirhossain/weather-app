require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./src/client/app/app.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = App;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styled_components__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styled_components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_styled_components__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nav_bar__ = __webpack_require__("./src/client/app/nav_bar.jsx");







var footerHeight = '40px';

var Footer = __WEBPACK_IMPORTED_MODULE_2_styled_components___default.a.footer.withConfig({
  displayName: 'app__Footer',
  componentId: 'hteuf5-0'
})(['position: \'absolute\',bottom: 0,width: \'100%\',lineHeight: ', ',height: ', ''], footerHeight, footerHeight);

function App(_ref) {
  var children = _ref.children;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__nav_bar__["a" /* default */], null),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_reactstrap__["Container"],
      { id: 'content' },
      children
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      Footer,
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'text-center' })
    )
  );
}

App.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element
};

/***/ }),

/***/ "./src/client/app/nav_bar.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__package_json__ = __webpack_require__("./package.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules__ = __webpack_require__("./src/client/modules/index.jsx");







var NavBar = function NavBar() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Navbar"],
    { color: 'faded', light: true },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Container"],
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Row"],
        { className: 'align-items-center' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
          { to: '/', className: 'navbar-brand' },
          'Weather App'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Nav"],
          null,
          __WEBPACK_IMPORTED_MODULE_4__modules__["a" /* default */].navItems
        ),
        (!__WEBPACK_IMPORTED_MODULE_3__package_json__["app"].persistGraphQL || true) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Nav"],
          { className: 'ml-auto', navbar: true },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["NavItem"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '/graphiql' },
              'GraphiQL'
            )
          )
        )
      )
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (NavBar);

/***/ }),

/***/ "./src/client/modules/counter/containers/counter.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__graphql_count_get_graphql__ = __webpack_require__("./src/client/modules/counter/graphql/count_get.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__graphql_count_get_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__graphql_count_get_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_count_add_mutation_graphql__ = __webpack_require__("./src/client/modules/counter/graphql/count_add_mutation.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_count_add_mutation_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__graphql_count_add_mutation_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_count_subscribe_graphql__ = __webpack_require__("./src/client/modules/counter/graphql/count_subscribe.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_count_subscribe_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__graphql_count_subscribe_graphql__);
















var Counter = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Counter, _React$Component);

  function Counter(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Counter);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Counter.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Counter)).call(this, props));

    _this.subscription = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Counter, [{
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
    key: 'subscribeToCount',
    value: function subscribeToCount() {
      var subscribeToMore = this.props.subscribeToMore;

      this.subscription = subscribeToMore({
        document: __WEBPACK_IMPORTED_MODULE_13__graphql_count_subscribe_graphql___default.a,
        variables: {},
        updateQuery: function updateQuery(prev, _ref) {
          var amount = _ref.subscriptionData.data.countUpdated.amount;

          return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
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

      if (loading) {
        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'text-center' },
          'Loading...'
        );
      } else {
        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'text-center mt-4 mb-4' },
          'Current count, is ',
          count.amount,
          '. This is being stored server-side in the database and using Apollo subscription for real-time updates.',
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_10_reactstrap__["Button"],
            { id: 'graphql-button', color: 'primary', onClick: addCount(1) },
            'Click to increase count'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          'Current reduxCount, is ',
          reduxCount,
          '. This is being stored client-side with Redux.',
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_10_reactstrap__["Button"],
            { id: 'redux-button', color: 'primary', value: '1', onClick: this.handleReduxIncrement.bind(this) },
            'Click to increase reduxCount'
          )
        );
      }
    }
  }]);

  return Counter;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

Counter.propTypes = {
  loading: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool.isRequired,
  count: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  updateCountQuery: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  onReduxIncrement: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  addCount: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  subscribeToMore: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  reduxCount: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number.isRequired
};

var CounterWithApollo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_11__graphql_count_get_graphql___default.a, {
  props: function props(_ref2) {
    var _ref2$data = _ref2.data,
        loading = _ref2$data.loading,
        count = _ref2$data.count,
        subscribeToMore = _ref2$data.subscribeToMore;

    return { loading: loading, count: count, subscribeToMore: subscribeToMore };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_12__graphql_count_add_mutation_graphql___default.a, {
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
                return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
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
}))(Counter);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(function (state) {
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
})(CounterWithApollo));

/***/ }),

/***/ "./src/client/modules/counter/index.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_counter__ = __webpack_require__("./src/client/modules/counter/containers/counter.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers__ = __webpack_require__("./src/client/modules/counter/reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__connector__ = __webpack_require__("./src/client/modules/connector.js");








/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_4__connector__["a" /* default */]({
  route: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_2__containers_counter__["a" /* default */] }),
  reducer: { counter: __WEBPACK_IMPORTED_MODULE_3__reducers__["a" /* default */] }
}));

/***/ }),

/***/ "./src/client/modules/index.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__counter__ = __webpack_require__("./src/client/modules/counter/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favicon__ = __webpack_require__("./src/client/modules/favicon/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favicon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__favicon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__post__ = __webpack_require__("./src/client/modules/post/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weather__ = __webpack_require__("./src/client/modules/weather/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__connector__ = __webpack_require__("./src/client/modules/connector.js");







//export default new Feature(counter, post, weather);
/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_4__connector__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__counter__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__weather__["a" /* default */]));

/***/ }),

/***/ "./src/client/modules/post/components/post_comment_form.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_reactstrap__);






var required = function required(value) {
  return value ? undefined : 'Required';
};

var renderField = function renderField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      type = _ref.type,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;

  var color = 'normal';
  if (touched && error) {
    color = 'danger';
  }

  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormGroup"],
    { color: color },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["Input"], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, input, { placeholder: label, type: type })),
    touched && error && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormFeedback"],
      null,
      error
    )
  );
};

renderField.propTypes = {
  input: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
  label: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  type: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  meta: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
};

var CommentForm = function CommentForm(props) {
  var handleSubmit = props.handleSubmit,
      submitting = props.submitting,
      initialValues = props.initialValues,
      onSubmit = props.onSubmit;


  var operation = 'Add';
  if (initialValues.id !== null) {
    operation = 'Edit';
  }

  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Form"],
    { name: 'comment', onSubmit: handleSubmit(onSubmit) },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormGroup"],
      null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Row"],
        null,
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Col"],
          { xs: '2' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Label"],
            null,
            operation,
            ' comment'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Col"],
          { xs: '8' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_redux_form__["Field"], { name: 'content', component: renderField, type: 'text', label: 'Content', validate: required })
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Col"],
          { xs: '2' },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Button"],
            { color: 'primary', type: 'submit', className: 'float-right', disabled: submitting },
            'Submit'
          )
        )
      )
    )
  );
};

CommentForm.propTypes = {
  handleSubmit: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  initialValues: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
  onSubmit: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  submitting: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_redux_form__["reduxForm"])({
  form: 'comment',
  enableReinitialize: true
})(CommentForm));

/***/ }),

/***/ "./src/client/modules/post/components/post_form.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_reactstrap__);






var required = function required(value) {
  return value ? undefined : 'Required';
};

var renderField = function renderField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      type = _ref.type,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;

  var color = 'normal';
  if (touched && error) {
    color = 'danger';
  }

  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormGroup"],
    { color: color },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Label"],
      null,
      label
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["Input"], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, input, { placeholder: label, type: type })),
      touched && error && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_reactstrap__["FormFeedback"],
        null,
        error
      )
    )
  );
};

renderField.propTypes = {
  input: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
  label: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  type: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  meta: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
};

var PostForm = function PostForm(props) {
  var handleSubmit = props.handleSubmit,
      submitting = props.submitting,
      onSubmit = props.onSubmit;


  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Form"],
    { name: 'post', onSubmit: handleSubmit(onSubmit) },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_redux_form__["Field"], { name: 'title', component: renderField, type: 'text', label: 'Title', validate: required }),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_redux_form__["Field"], { name: 'content', component: renderField, type: 'text', label: 'Content', validate: required }),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Button"],
      { color: 'primary', type: 'submit', disabled: submitting },
      'Submit'
    )
  );
};

PostForm.propTypes = {
  handleSubmit: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  onSubmit: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  submitting: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_redux_form__["reduxForm"])({
  form: 'post',
  enableReinitialize: true
})(PostForm));

/***/ }),

/***/ "./src/client/modules/post/containers/post_comments.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_redux_form__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_redux_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_redux_form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_post_comment_form__ = __webpack_require__("./src/client/modules/post/components/post_comment_form.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_post_comment_add_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_comment_add.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_post_comment_add_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__graphql_post_comment_add_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_comment_edit_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_comment_edit.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_comment_edit_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__graphql_post_comment_edit_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__graphql_post_comment_delete_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_comment_delete.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__graphql_post_comment_delete_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__graphql_post_comment_delete_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__graphql_post_comment_subscription_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_comment_subscription.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__graphql_post_comment_subscription_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__graphql_post_comment_subscription_graphql__);




















function AddComment(prev, node) {
  // ignore if duplicate
  if (node.id !== null && prev.post.comments.some(function (comment) {
    return node.id === comment.id;
  })) {
    return prev;
  }

  return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
    post: {
      comments: {
        $push: [node]
      }
    }
  });
}

function DeleteComment(prev, id) {
  var index = prev.post.comments.findIndex(function (x) {
    return x.id === id;
  });

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
    post: {
      comments: {
        $splice: [[index, 1]]
      }
    }
  });
}

var PostComments = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(PostComments, _React$Component);

  function PostComments(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PostComments);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PostComments.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(PostComments)).call(this, props));

    _this.subscribeToCommentList = function (postId) {
      var subscribeToMore = _this.props.subscribeToMore;


      _this.subscription = subscribeToMore({
        document: __WEBPACK_IMPORTED_MODULE_16__graphql_post_comment_subscription_graphql___default.a,
        variables: { postId: postId },
        updateQuery: function updateQuery(prev, _ref) {
          var _ref$subscriptionData = _ref.subscriptionData.data.commentUpdated,
              mutation = _ref$subscriptionData.mutation,
              id = _ref$subscriptionData.id,
              node = _ref$subscriptionData.node;


          var newResult = prev;

          if (mutation === 'CREATED') {
            newResult = AddComment(prev, node);
          } else if (mutation === 'DELETED') {
            newResult = DeleteComment(prev, id);
          }

          return newResult;
        }
      });
    };

    props.onCommentSelect({ id: null, content: '' });

    _this.subscription = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(PostComments, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && this.props.postId !== nextProps.postId) {
        this.subscription = null;
      }

      // Subscribe or re-subscribe
      if (!this.subscription) {
        this.subscribeToCommentList(nextProps.postId);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.subscription) {
        // unsubscribe
        this.subscription();
      }
    }
  }, {
    key: 'renderComments',
    value: function renderComments() {
      var _this2 = this;

      var _props = this.props,
          comments = _props.comments,
          onCommentSelect = _props.onCommentSelect;


      return comments.map(function (_ref2) {
        var id = _ref2.id,
            content = _ref2.content;

        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_11_reactstrap__["ListGroupItem"],
          { className: 'justify-content-between', key: id },
          content,
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'span',
              { className: 'badge badge-default badge-pill edit-comment',
                onClick: function onClick() {
                  return onCommentSelect({ id: id, content: content });
                } },
              'Edit'
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'span',
              { className: 'badge badge-default badge-pill delete-comment', onClick: function onClick() {
                  return _this2.onCommentDelete(id);
                } },
              'Delete'
            )
          )
        );
      });
    }
  }, {
    key: 'onCommentDelete',
    value: function onCommentDelete(id) {
      var _props2 = this.props,
          comment = _props2.comment,
          deleteComment = _props2.deleteComment,
          onCommentSelect = _props2.onCommentSelect;


      if (comment.id === id) {
        onCommentSelect({ id: null, content: '' });
      }

      deleteComment(id);
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(values) {
      var _props3 = this.props,
          addComment = _props3.addComment,
          editComment = _props3.editComment,
          postId = _props3.postId,
          comment = _props3.comment,
          onCommentSelect = _props3.onCommentSelect,
          onFormSubmitted = _props3.onFormSubmitted;


      if (comment.id === null) {
        addComment(values.content, postId);
      } else {
        editComment(comment.id, values.content);
      }

      onCommentSelect({ id: null, content: '' });
      onFormSubmitted();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          postId = _props4.postId,
          comment = _props4.comment;


      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'h3',
          null,
          'Comments'
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__components_post_comment_form__["a" /* default */], { postId: postId, onSubmit: this.onSubmit.bind(this), initialValues: comment }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('h1', null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_11_reactstrap__["ListGroup"],
          null,
          this.renderComments()
        )
      );
    }
  }]);

  return PostComments;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

PostComments.propTypes = {
  postId: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string.isRequired,
  comments: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.array.isRequired,
  comment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object.isRequired,
  addComment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  editComment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  deleteComment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  onCommentSelect: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  onFormSubmitted: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  subscribeToMore: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired
};

var PostCommentsWithApollo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_13__graphql_post_comment_add_graphql___default.a, {
  props: function props(_ref3) {
    var mutate = _ref3.mutate;
    return {
      addComment: function addComment(content, postId) {
        return mutate({
          variables: { input: { content: content, postId: postId } },
          optimisticResponse: {
            addComment: {
              id: -1,
              content: content,
              __typename: 'Comment'
            }
          },
          updateQueries: {
            getPost: function getPost(prev, _ref4) {
              var addComment = _ref4.mutationResult.data.addComment;

              return AddComment(prev, addComment);
            }
          }
        });
      }
    };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_14__graphql_post_comment_edit_graphql___default.a, {
  props: function props(_ref5) {
    var postId = _ref5.ownProps.postId,
        mutate = _ref5.mutate;
    return {
      editComment: function editComment(id, content) {
        return mutate({
          variables: { input: { id: id, postId: postId, content: content } },
          optimisticResponse: {
            __typename: 'Mutation',
            editComment: {
              id: id,
              content: content,
              __typename: 'Comment'
            }
          }
        });
      }
    };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_15__graphql_post_comment_delete_graphql___default.a, {
  props: function props(_ref6) {
    var postId = _ref6.ownProps.postId,
        mutate = _ref6.mutate;
    return {
      deleteComment: function deleteComment(id) {
        return mutate({
          variables: { input: { id: id, postId: postId } },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteComment: {
              id: id,
              __typename: 'Comment'
            }
          },
          updateQueries: {
            getPost: function getPost(prev, _ref7) {
              var deleteComment = _ref7.mutationResult.data.deleteComment;

              return DeleteComment(prev, deleteComment.id);
            }
          }
        });
      }
    };
  }
}))(PostComments);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(function (state) {
  return { comment: state.post.comment };
}, function (dispatch) {
  return {
    onCommentSelect: function onCommentSelect(comment) {
      dispatch({
        type: 'COMMENT_SELECT',
        value: comment
      });
    },
    onFormSubmitted: function onFormSubmitted() {
      dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10_redux_form__["reset"])('comment'));
    }
  };
})(PostCommentsWithApollo));

/***/ }),

/***/ "./src/client/modules/post/containers/post_list.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = AddPost;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_posts_get_graphql__ = __webpack_require__("./src/client/modules/post/graphql/posts_get.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__graphql_posts_get_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__graphql_posts_get_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_posts_subscription_graphql__ = __webpack_require__("./src/client/modules/post/graphql/posts_subscription.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__graphql_posts_subscription_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__graphql_posts_subscription_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_delete_graphql__ = __webpack_require__("./src/client/modules/post/graphql/post_delete.graphql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__graphql_post_delete_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__graphql_post_delete_graphql__);

















function AddPost(prev, node) {
  // ignore if duplicate
  if (node.id !== null && prev.postsQuery.edges.some(function (post) {
    return node.id === post.cursor;
  })) {
    return prev;
  }

  var edge = {
    cursor: node.id,
    node: node,
    __typename: 'PostEdges'
  };

  return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
    postsQuery: {
      totalCount: {
        $set: prev.postsQuery.totalCount + 1
      },
      edges: {
        $unshift: [edge]
      }
    }
  });
}

function DeletePost(prev, id) {
  var index = prev.postsQuery.edges.findIndex(function (x) {
    return x.node.id === id;
  });

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return __WEBPACK_IMPORTED_MODULE_9_immutability_helper___default()(prev, {
    postsQuery: {
      totalCount: {
        $set: prev.postsQuery.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
}

var PostList = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(PostList, _React$Component);

  function PostList(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, PostList);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PostList.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(PostList)).call(this, props));

    _this.subscribeToPostList = function (endCursor) {
      var subscribeToMore = _this.props.subscribeToMore;


      _this.subscription = subscribeToMore({
        document: __WEBPACK_IMPORTED_MODULE_13__graphql_posts_subscription_graphql___default.a,
        variables: { endCursor: endCursor },
        updateQuery: function updateQuery(prev, _ref) {
          var _ref$subscriptionData = _ref.subscriptionData.data.postsUpdated,
              mutation = _ref$subscriptionData.mutation,
              node = _ref$subscriptionData.node;

          var newResult = prev;

          if (mutation === 'CREATED') {
            newResult = AddPost(prev, node);
          } else if (mutation === 'DELETED') {
            newResult = DeletePost(prev, node.id);
          }

          return newResult;
        }
      });
    };

    _this.subscription = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(PostList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.loading) {
        var endCursor = this.props.postsQuery ? this.props.postsQuery.pageInfo.endCursor : 0;
        var nextEndCursor = nextProps.postsQuery.pageInfo.endCursor;

        // Check if props have changed and, if necessary, stop the subscription
        if (this.subscription && endCursor !== nextEndCursor) {
          this.subscription();
          this.subscription = null;
        }

        // Subscribe or re-subscribe
        if (!this.subscription) {
          this.subscribeToPostList(nextEndCursor);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.subscription) {
        // unsubscribe
        this.subscription();
      }
    }
  }, {
    key: 'renderPosts',
    value: function renderPosts() {
      var _props = this.props,
          postsQuery = _props.postsQuery,
          deletePost = _props.deletePost;


      return postsQuery.edges.map(function (_ref2) {
        var _ref2$node = _ref2.node,
            id = _ref2$node.id,
            title = _ref2$node.title;

        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_11_reactstrap__["ListGroupItem"],
          { className: 'justify-content-between', key: id },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'span',
            null,
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_10_react_router_dom__["Link"],
              { className: 'post-link', to: '/post/' + id },
              title
            )
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'span',
            { className: 'badge badge-default badge-pill delete-button', onClick: deletePost(id) },
            'Delete'
          )
        );
      });
    }
  }, {
    key: 'renderLoadMore',
    value: function renderLoadMore() {
      var _props2 = this.props,
          postsQuery = _props2.postsQuery,
          loadMoreRows = _props2.loadMoreRows;


      if (postsQuery.pageInfo.hasNextPage) {
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_11_reactstrap__["Button"],
          { id: 'load-more', color: 'primary', onClick: loadMoreRows },
          'Load more ...'
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          loading = _props3.loading,
          postsQuery = _props3.postsQuery;


      if (loading && !postsQuery) {
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', null);
      } else {
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'h2',
            null,
            'Posts'
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_10_react_router_dom__["Link"],
            { to: '/post/add' },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_11_reactstrap__["Button"],
              { color: 'primary' },
              'Add'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('h1', null),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_11_reactstrap__["ListGroup"],
            null,
            this.renderPosts()
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'small',
              null,
              '(',
              postsQuery.edges.length,
              ' / ',
              postsQuery.totalCount,
              ')'
            )
          ),
          this.renderLoadMore()
        );
      }
    }
  }]);

  return PostList;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

PostList.propTypes = {
  loading: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool.isRequired,
  postsQuery: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  deletePost: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func.isRequired,
  loadMoreRows: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func.isRequired,
  subscribeToMore: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_12__graphql_posts_get_graphql___default.a, {
  options: function options() {
    return {
      variables: { limit: 10, after: 0 }
    };
  },
  props: function props(_ref3) {
    var data = _ref3.data;
    var loading = data.loading,
        postsQuery = data.postsQuery,
        fetchMore = data.fetchMore,
        subscribeToMore = data.subscribeToMore;

    var loadMoreRows = function loadMoreRows() {
      return fetchMore({
        variables: {
          after: postsQuery.pageInfo.endCursor
        },
        updateQuery: function updateQuery(previousResult, _ref4) {
          var fetchMoreResult = _ref4.fetchMoreResult;

          var totalCount = fetchMoreResult.postsQuery.totalCount;
          var newEdges = fetchMoreResult.postsQuery.edges;
          var pageInfo = fetchMoreResult.postsQuery.pageInfo;

          return {
            // By returning `cursor` here, we update the `fetchMore` function
            // to the new cursor.
            postsQuery: {
              totalCount: totalCount,
              edges: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(previousResult.postsQuery.edges), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(newEdges)),
              pageInfo: pageInfo,
              __typename: "PostsQuery"
            }
          };
        }
      });
    };

    return { loading: loading, postsQuery: postsQuery, subscribeToMore: subscribeToMore, loadMoreRows: loadMoreRows };
  }
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_apollo__["graphql"])(__WEBPACK_IMPORTED_MODULE_14__graphql_post_delete_graphql___default.a, {
  props: function props(_ref5) {
    var mutate = _ref5.mutate;
    return {
      deletePost: function deletePost(id) {
        return function () {
          return mutate({
            variables: { id: id },
            optimisticResponse: {
              __typename: 'Mutation',
              deletePost: {
                id: id,
                __typename: 'Post'
              }
            },
            updateQueries: {
              getPosts: function getPosts(prev, _ref6) {
                var deletePost = _ref6.mutationResult.data.deletePost;

                return DeletePost(prev, deletePost.id);
              }
            }
          });
        };
      }
    };
  }
}))(PostList));

/***/ }),

/***/ "./src/client/modules/post/index.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_post_list__ = __webpack_require__("./src/client/modules/post/containers/post_list.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_post_add__ = __webpack_require__("./src/client/modules/post/containers/post_add.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_post_edit__ = __webpack_require__("./src/client/modules/post/containers/post_edit.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reducers__ = __webpack_require__("./src/client/modules/post/reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__connector__ = __webpack_require__("./src/client/modules/connector.js");












/* unused harmony default export */ var _unused_webpack_default_export = (new __WEBPACK_IMPORTED_MODULE_7__connector__["a" /* default */]({
  route: [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/posts', component: __WEBPACK_IMPORTED_MODULE_3__containers_post_list__["a" /* default */] }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/post/add', component: __WEBPACK_IMPORTED_MODULE_4__containers_post_add__["a" /* default */] }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/post/:id', component: __WEBPACK_IMPORTED_MODULE_5__containers_post_edit__["a" /* default */] })],
  navItem: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_reactstrap__["NavItem"],
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
      { to: '/posts', className: 'nav-link' },
      'Posts'
    )
  ),
  reducer: { post: __WEBPACK_IMPORTED_MODULE_6__reducers__["a" /* default */] }
}));

/***/ }),

/***/ "./src/client/modules/weather/index.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_weather__ = __webpack_require__("./src/client/modules/weather/containers/weather.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers__ = __webpack_require__("./src/client/modules/weather/reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__connector__ = __webpack_require__("./src/client/modules/connector.js");









/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_5__connector__["a" /* default */]({
  route: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/weather', component: __WEBPACK_IMPORTED_MODULE_3__containers_weather__["a" /* default */] }),
  navItem: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_reactstrap__["NavItem"],
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
      { to: '/weather', className: 'nav-link' },
      'Weather'
    )
  ),
  reducer: { weather: __WEBPACK_IMPORTED_MODULE_4__reducers__["a" /* default */] }
}));

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("reactstrap");

/***/ })

};
//# sourceMappingURL=index.17062ebef23edbb4cc16.js.map