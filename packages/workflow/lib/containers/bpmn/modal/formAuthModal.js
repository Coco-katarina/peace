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

// import { SearchOutlined } from '@ant-design/icons';
//import { Func } from '$utils';
var FormAuthModal = function FormAuthModal(_ref) {
  var props = _extends({}, _ref);

  var formFileds = props.formFileds,
      saveBpmnJson = props.saveBpmnJson,
      bpmnJson = props.bpmnJson,
      curElementId = props.curElementId;
  bpmnJson[curElementId] = bpmnJson[curElementId] || {};
  var _bpmnJson$curElementI = bpmnJson[curElementId],
      _bpmnJson$curElementI2 = _bpmnJson$curElementI.canEditCodes,
      canEditCodes = _bpmnJson$curElementI2 === void 0 ? [] : _bpmnJson$curElementI2,
      _bpmnJson$curElementI3 = _bpmnJson$curElementI.showCodes,
      showCodes = _bpmnJson$curElementI3 === void 0 ? [] : _bpmnJson$curElementI3; //console.log(formFileds)

  var fieldsData = formFileds.map(function (v) {
    return {
      code: v.code,
      title: v.jsonSchema && v.jsonSchema.title || '',
      type: v.jsonSchema && v.jsonSchema.type || '',
      isEdit: canEditCodes.includes(v.code) ? true : false
    };
  });
  var columns = [{
    key: 'code',
    title: '字段编码',
    dataIndex: 'code',
    ellipsis: true
  }, {
    key: 'title',
    title: '字段标题',
    dataIndex: 'title',
    ellipsis: true
  }, {
    key: 'type',
    title: '字段类型',
    dataIndex: 'type',
    ellipsis: true
  }, {
    key: 'isEdit',
    title: '可编辑',
    dataIndex: 'isEdit',
    ellipsis: true,
    render: function render(text, record) {
      return /*#__PURE__*/_react["default"].createElement(_antd.Switch, {
        checked: text,
        onChange: function onChange(checked) {
          if (checked) {
            !canEditCodes.includes(record.code) && canEditCodes.push(record.code);
          } else {
            if (canEditCodes.includes(record.code)) {
              canEditCodes = canEditCodes.filter(function (v) {
                return v != record.code;
              });
            }
          }

          bpmnJson[curElementId].canEditCodes = canEditCodes.filter(function (v) {
            return fieldsData.map(function (f) {
              return f.code;
            }).includes(v);
          });
          saveBpmnJson(bpmnJson);
        }
      });
    }
  }];
  var rowSelection = {
    type: 'checkbox',
    selectedRowKeys: showCodes,
    onChange: function onChange(selectedRowKeys, selectRow) {
      bpmnJson[curElementId].showCodes = selectedRowKeys;
      saveBpmnJson(bpmnJson);
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Table, {
    rowKey: "code",
    dataSource: fieldsData || [],
    columns: columns,
    rowSelection: rowSelection,
    size: "small",
    title: function title() {
      return '勾选可见性';
    }
  }));
};

var _default = FormAuthModal;
exports["default"] = _default;