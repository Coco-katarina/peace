'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactHighlightWords = _interopRequireDefault(require("react-highlight-words"));

var _icons = require("@ant-design/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var NoticeModal = function NoticeModal(_ref) {
  var props = _extends({}, _ref);

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchText = _useState2[0],
      setSearchText = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      searchedColumn = _useState4[0],
      setSearchedColumn = _useState4[1];

  var searchInputRef = null;
  var companyUsers = props.companyUsers,
      saveBpmnJson = props.saveBpmnJson,
      bpmnJson = props.bpmnJson,
      curElementId = props.curElementId; //let { currentSelect, bpmnJson, curElementId } = this.state;

  bpmnJson[curElementId] = bpmnJson[curElementId] || {};
  var _bpmnJson$curElementI = bpmnJson[curElementId].noticeUsers,
      noticeUsers = _bpmnJson$curElementI === void 0 ? [] : _bpmnJson$curElementI;
  var userData = companyUsers.map(function (v) {
    return {
      id: v.id,
      name: v.name,
      account: v.account,
      department: v.departments.map(function (d) {
        return d.name;
      }).toString()
    };
  });

  var handleSearch = function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  var handleReset = function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };

  var getColumnSearchProps = function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: function filterDropdown(_ref2) {
        var setSelectedKeys = _ref2.setSelectedKeys,
            selectedKeys = _ref2.selectedKeys,
            confirm = _ref2.confirm,
            clearFilters = _ref2.clearFilters;
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            padding: 8
          }
        }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
          ref: function ref(node) {
            searchInputRef = node;
          },
          placeholder: "\u641C\u7D22 ".concat(dataIndex),
          value: selectedKeys[0],
          onChange: function onChange(e) {
            return setSelectedKeys(e.target.value ? [e.target.value] : []);
          },
          onPressEnter: function onPressEnter() {
            return handleSearch(selectedKeys, confirm, dataIndex);
          },
          style: {
            marginBottom: 8,
            display: 'block'
          }
        }), /*#__PURE__*/_react["default"].createElement(_antd.Space, null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "primary",
          onClick: function onClick() {
            return handleSearch(selectedKeys, confirm, dataIndex);
          },
          icon: /*#__PURE__*/_react["default"].createElement(_icons.SearchOutlined, null),
          size: "small",
          style: {
            width: 90
          }
        }, "\u641C\u7D22"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          onClick: function onClick() {
            return handleReset(clearFilters);
          },
          size: "small",
          style: {
            width: 90
          }
        }, "\u91CD\u7F6E")));
      },
      filterIcon: function filterIcon(filtered) {
        return /*#__PURE__*/_react["default"].createElement(_icons.SearchOutlined, {
          style: {
            color: filtered ? '#1890ff' : undefined
          }
        });
      },
      onFilter: function onFilter(value, record) {
        return record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '';
      },
      onFilterDropdownVisibleChange: function onFilterDropdownVisibleChange(visible) {
        if (visible) {
          setTimeout(function () {
            return searchInputRef.select();
          }, 100);
        }
      },
      render: function render(text) {
        return searchedColumn === dataIndex ? /*#__PURE__*/_react["default"].createElement(_reactHighlightWords["default"], {
          highlightStyle: {
            backgroundColor: '#ffc069',
            padding: 0
          },
          searchWords: [searchText],
          autoEscape: true,
          textToHighlight: text ? text.toString() : ''
        }) : text;
      }
    };
  };

  var columns = [{
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    ellipsis: true
  }, _objectSpread({
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    ellipsis: true
  }, getColumnSearchProps('name', '姓名')), {
    key: 'account',
    title: '账号',
    dataIndex: 'account',
    ellipsis: true
  }, _objectSpread({
    key: 'department',
    title: '所属部门',
    dataIndex: 'department',
    ellipsis: true
  }, getColumnSearchProps('department', '部门'))];
  var rowSelection = {
    type: 'checkbox',
    selectedRowKeys: noticeUsers.map(function (f) {
      return f.id;
    }),
    onChange: function onChange(selectedRowKeys, selectRow) {
      bpmnJson[curElementId].noticeUsers = selectRow.map(function (v) {
        return {
          id: v.id,
          name: v.name
        };
      });
      saveBpmnJson(bpmnJson);
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Table, {
    rowKey: "id",
    dataSource: userData || [],
    columns: columns,
    rowSelection: rowSelection,
    size: "small",
    title: function title() {
      return '抄送人员选择';
    }
  }));
};

var _default = NoticeModal;
exports["default"] = _default;