require("source-map-support").install();
exports.id = 0;
exports.modules = {

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

/***/ })

};
//# sourceMappingURL=index.02febb5491b1a4707c23.js.map