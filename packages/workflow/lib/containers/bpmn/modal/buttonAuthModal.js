'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ButtonAuthModal = function ButtonAuthModal(_ref) {
  var props = _extends({}, _ref);

  var buttonAuth = props.buttonAuth,
      saveBpmnJson = props.saveBpmnJson,
      bpmnJson = props.bpmnJson,
      curElementId = props.curElementId;
  bpmnJson[curElementId] = bpmnJson[curElementId] || {};
  var _bpmnJson$curElementI = bpmnJson[curElementId].buttonList,
      buttonList = _bpmnJson$curElementI === void 0 ? [] : _bpmnJson$curElementI;
  var columns = [{
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    ellipsis: true
  }, {
    key: 'name',
    title: '按钮名称',
    dataIndex: 'name',
    ellipsis: true
  }, {
    key: 'functionName',
    title: '执行函数',
    dataIndex: 'functionName',
    ellipsis: true
  }];
  var rowSelection = {
    type: 'checkbox',
    selectedRowKeys: buttonList,
    onChange: function onChange(selectedRowKeys, selectRow) {
      bpmnJson[curElementId].buttonList = selectedRowKeys;
      saveBpmnJson(bpmnJson);
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Table, {
    rowKey: "id",
    dataSource: buttonAuth,
    columns: columns,
    rowSelection: rowSelection,
    size: "small",
    title: function title() {
      return '按钮权限选择';
    }
  }));
};

var _default = ButtonAuthModal;
exports["default"] = _default;