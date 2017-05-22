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

/***/ })

};
//# sourceMappingURL=index.5e5be14a875d84e69c38.js.map