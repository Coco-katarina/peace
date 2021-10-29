'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterRedux = require("react-router-redux");

var _icons = require("@ant-design/icons");

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var Option = _antd.Select.Option;
var TabPane = _antd.Tabs.TabPane;

var ProcessRecords = function ProcessRecords(props) {
  var visible = props.visible,
      recordData = props.recordData; // console.log(recordData);

  var onClose = function onClose() {
    var onCancel = props.onCancel;
    onCancel();
  };

  var timeLine = function timeLine(data) {
    return /*#__PURE__*/_react["default"].createElement(_antd.Timeline, null, /*#__PURE__*/_react["default"].createElement(_antd.Timeline.Item, null, "\u63D0\u4EA4\u7533\u8BF7\uFF1A", data.application, /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        display: 'inline-block',
        marginLeft: 30
      }
    }, /*#__PURE__*/_react["default"].createElement(_icons.ClockCircleOutlined, null), (0, _moment["default"])(data.submissionTime).format('YYYY-MM-DD-HH:mm:ss'), " ")), /*#__PURE__*/_react["default"].createElement(_antd.Timeline.Item, null, "\u65B9\u6848\u90E8\u5BA1\u6838\uFF1A"), /*#__PURE__*/_react["default"].createElement(_antd.Timeline.Item, null));
  };

  return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
    visible: visible,
    onCancel: onClose,
    title: "\u6D41\u7A0B\u8BB0\u5F55",
    destroyOnClose: true,
    footer: null
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: 16
  }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 12
  }, "\u5BA1\u6838\u7F16\u53F7\uFF1A", recordData.id), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 12
  }, "\u7533\u8BF7\u4E8B\u9879\uFF1A", recordData.name)), /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: 16
  }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 12
  }, "\u5BA1\u6838\u4EBA\uFF1A", recordData.application), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 12
  }, "\u7533\u8BF7\u90E8\u95E8\uFF1A", recordData.department))), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginTop: 5
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      display: 'inline-block',
      marginBottom: 5
    }
  }, "\u5BA1\u6838\u6D41\u7A0B\uFF1A"), timeLine(recordData)));
};

function mapStateToProps(state) {
  _objectDestructuringEmpty(state);

  return {};
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(ProcessRecords);

exports["default"] = _default;