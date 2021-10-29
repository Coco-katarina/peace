'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _antd = require("antd");

var _workflowProcessForm = require("../../actions/workflowProcessForm");

var _icons = require("@ant-design/icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Option = _antd.Select.Option;
var RangePicker = _antd.DatePicker.RangePicker;

var ProcessApproval = function ProcessApproval(props) {
  //console.log(props);
  var dispatch = props.dispatch,
      match = props.match,
      processPageConfig = props.processPageConfig,
      history = props.history;

  var _Form$useForm = _antd.Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  (0, _react.useEffect)(function () {
    var params = match.params;
    dispatch((0, _workflowProcessForm.getProcessPageConfig)(params.processId));
  }, []);

  var onFinish = function onFinish(values) {
    console.log('Success:', values);
  };

  var searchJson = processPageConfig || [{
    type: 'select',
    label: '状态',
    name: 'state',
    placeholder: "审核状态",
    options: [{
      value: 1,
      name: '待审批',
      "default": true
    }, {
      value: 2,
      name: '审批通过'
    }, {
      value: 3,
      name: '审批退回'
    }, {
      value: 4,
      name: '全部'
    }]
  }, {
    type: 'rangePicker',
    label: '日志日期',
    name: 'logTime'
  }, {
    type: 'input',
    label: '关键字',
    name: 'keyword',
    placeholder: "客户名称/储备项目/销售"
  }];

  var getDefaultValue = function getDefaultValue(searchJson) {
    var defaultV = {};

    var _iterator = _createForOfIteratorHelper(searchJson),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var sj = _step.value;

        switch (sj.type) {
          case 'input':
            if (sj.defaultV) {
              defaultV[sj.name] = sj.defaultV;
            }

            break;

          case 'select':
            var defaultValue = sj.options.find(function (sjo) {
              return sjo["default"];
            });

            if (defaultValue) {
              defaultV[sj.name] = defaultValue.value;
            }

            break;

          default:
            '';
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return defaultV;
  };

  var tableColumns = [{
    title: '序号',
    key: 'index',
    render: function render(t, r, i) {
      return i + 1;
    }
  }, {
    title: '日志日期',
    key: 'logTime'
  }, {
    title: '提交日期',
    key: 'upTime'
  }, {
    title: '今日事务',
    key: 'today'
  }, {
    title: '是否拜访',
    key: 'logTime',
    filters: [{
      text: '是',
      value: '是'
    }, {
      text: '否',
      value: '否'
    }],
    onFilter: function onFilter(value, record) {
      return record.logTime.indexOf(value) === 0;
    }
  }, {
    title: '明日计划',
    key: 'logTime'
  }, {
    title: '存在问题',
    key: 'logTime'
  }, {
    title: '当前状态',
    key: 'logTime'
  }, {
    title: '批复意见',
    key: 'logTime'
  }, {
    title: '批复时间',
    key: 'logTime'
  }, {
    title: '操作',
    render: function render(r) {
      return /*#__PURE__*/_react["default"].createElement("a", {
        style: {
          cursor: 'pointer'
        },
        onClick: function onClick() {
          window.open('http://localhost:5000/process/detail', // "_blank",
          "_self", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, \n                        scrollbars=yes, resizable=no, copyhistory=yes, width=900, height=700 ");
        }
      }, "\u67E5\u770B\u8BE6\u60C5");
    }
  }].map(function (c) {
    c['ellipsis'] = true;
    return c;
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      height: document.body.clientHeight,
      backgroundColor: '#fff'
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Space, {
    wrap: true
  }, /*#__PURE__*/_react["default"].createElement(_antd.Button, null, "\u6DFB\u52A0 + \u6D41\u7A0B\u540D\u79F0"), /*#__PURE__*/_react["default"].createElement(_antd.Form, {
    layout: 'inline',
    form: form,
    initialValues: getDefaultValue(searchJson),
    onFinish: onFinish
  }, /*#__PURE__*/_react["default"].createElement(_antd.Space, {
    wrap: true
  }, function () {
    return searchJson.map(function (sj) {
      var content = '';

      switch (sj.type) {
        case 'input':
          content = /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            placeholder: sj.placeholder
          });
          break;

        case 'select':
          content = /*#__PURE__*/_react["default"].createElement(_antd.Select, {
            style: {
              minWidth: 120
            }
          }, sj.options.map(function (sjo) {
            return /*#__PURE__*/_react["default"].createElement(Option, {
              key: sjo.value,
              value: sjo.value
            }, sjo.name);
          }));
          break;

        case 'rangePicker':
          content = /*#__PURE__*/_react["default"].createElement(RangePicker, null);
          break;

        default:
          '';
      }

      if (content) {
        return /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
          key: sj.name,
          label: sj.label,
          name: sj.name
        }, content);
      }
    });
  }(), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    type: "primary",
    htmlType: "submit",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.SearchOutlined, null)
  }, "\u67E5\u8BE2"))))), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Table, {
    dataSource: [{
      logTime: '2021'
    }],
    columns: tableColumns
  })));
};

function mapStateToProps(state) {
  var processPageConfig = state.processPageConfig;
  return {
    processPageConfig: processPageConfig.data
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(ProcessApproval);

exports["default"] = _default;