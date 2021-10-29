"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XFormBuilderWithoutDragDropContext = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _reactRedux = require("react-redux");

var _localeHOC = _interopRequireDefault(require("./localeHOC"));

var _appForm = _interopRequireDefault(require("./app-form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// app的reducers和actionCreator集合
//import reducer from './reducer/index';
//import actionCreators from './actionCreator/index';
var dndAppForm = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  return /*#__PURE__*/_react["default"].createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend["default"]
  }, /*#__PURE__*/_react["default"].createElement(_appForm["default"], _extends({
    ref: ref
  }, props)));
}); // 使用redux进行数据管理以及APP之间数据通信 文档：http://hi.alibaba.net/_book/content/app_communicate.html 


var XFormBuilder = (0, _reactRedux.connect)(function (store, ownProps) {
  var namespace = ownProps.namespace;

  if (typeof namespace === 'undefined' || namespace === '') {
    console.warn('xformBuilder:使用xformBuilder组件建议传入唯一性的namespace属性，否则会因为store数据共享导致问题');
  }

  return {
    xformBuilderData: store.xformBuilderData[namespace] || store.xformBuilderData
  };
})((0, _localeHOC["default"])(dndAppForm));
XFormBuilder.defaultProps = {
  namespace: 'xformBuilderDefault'
};
var _default = XFormBuilder;
exports["default"] = _default;
var XFormBuilderWithoutDragDropContext = (0, _reactRedux.connect)(function (store, ownProps) {
  var namespace = ownProps.namespace;

  if (typeof namespace === 'undefined' || namespace === '') {
    console.warn('xformBuilder:使用xformBuilder组件建议传入唯一性的namespace属性，否则会因为store数据共享导致问题');
  }

  return {
    xformBuilderData: store.xformBuilderData[namespace] || store.xformBuilderData
  };
})((0, _localeHOC["default"])(_appForm["default"]));
exports.XFormBuilderWithoutDragDropContext = XFormBuilderWithoutDragDropContext;
XFormBuilderWithoutDragDropContext.defaultProps = {
  namespace: 'xformBuilderDefault'
}; // export const action = actionCreators;
// export const xformBuilderReducer = {
//     xformBuilderData: reducer
// };