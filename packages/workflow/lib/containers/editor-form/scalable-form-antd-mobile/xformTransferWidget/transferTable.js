"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _difference = _interopRequireDefault(require("lodash/difference"));

var _excluded = ["leftColumns", "rightColumns"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TableTransfer = function TableTransfer(_ref) {
  var leftColumns = _ref.leftColumns,
      rightColumns = _ref.rightColumns,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react["default"].createElement(_antd.Transfer, _extends({}, restProps, {
    showSelectAll: false
  }), function (_ref2) {
    var direction = _ref2.direction,
        filteredItems = _ref2.filteredItems,
        onItemSelectAll = _ref2.onItemSelectAll,
        onItemSelect = _ref2.onItemSelect,
        listSelectedKeys = _ref2.selectedKeys,
        listDisabled = _ref2.disabled;
    var columns = direction === 'left' ? leftColumns : rightColumns;
    var rowSelection = {
      getCheckboxProps: function getCheckboxProps(item) {
        return {
          disabled: listDisabled || item.disabled
        };
      },
      onSelectAll: function onSelectAll(selected, selectedRows) {
        var treeSelectedKeys = selectedRows.filter(function (item) {
          return !item.disabled;
        }).map(function (_ref3) {
          var key = _ref3.key;
          return key;
        });
        var diffKeys = selected ? (0, _difference["default"])(treeSelectedKeys, listSelectedKeys) : (0, _difference["default"])(listSelectedKeys, treeSelectedKeys);
        onItemSelectAll(diffKeys, selected);
      },
      onSelect: function onSelect(_ref4, selected) {
        var key = _ref4.key;
        onItemSelect(key, selected);
      },
      selectedRowKeys: listSelectedKeys
    };
    return /*#__PURE__*/_react["default"].createElement(_antd.Table, {
      rowSelection: rowSelection,
      columns: columns,
      dataSource: filteredItems,
      size: "small",
      style: {
        pointerEvents: listDisabled ? 'none' : null
      },
      onRow: function onRow(_ref5) {
        var key = _ref5.key,
            itemDisabled = _ref5.disabled;
        return {
          onClick: function onClick() {
            if (itemDisabled || listDisabled) return;
            onItemSelect(key, !listSelectedKeys.includes(key));
          }
        };
      }
    });
  });
};

var TransferTable = /*#__PURE__*/function (_React$Component) {
  _inherits(TransferTable, _React$Component);

  var _super = _createSuper(TransferTable);

  function TransferTable() {
    _classCallCheck(this, TransferTable);

    return _super.apply(this, arguments);
  }

  _createClass(TransferTable, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          transferData = _this$props.transferData,
          transferSelectedData = _this$props.transferSelectedData,
          leftColumns = _this$props.leftColumns,
          rightColumns = _this$props.rightColumns,
          leftTitle = _this$props.leftTitle,
          rightTitle = _this$props.rightTitle,
          onChange = _this$props.onChange,
          targetKeys = _this$props.targetKeys,
          disabled = _this$props.disabled;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(TableTransfer, {
        disabled: disabled,
        titles: [leftTitle, rightTitle],
        dataSource: transferData ? transferData : [],
        targetKeys: targetKeys,
        showSearch: true,
        onChange: onChange,
        filterOption: function filterOption(inputValue, item) {
          return item.title.indexOf(inputValue) !== -1 || item.department.indexOf(inputValue) !== -1;
        },
        leftColumns: leftColumns,
        rightColumns: rightColumns
      }));
    }
  }]);

  return TransferTable;
}(_react["default"].Component);

exports["default"] = TransferTable;