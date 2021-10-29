"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antdMobile = require("antd-mobile");

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _localeMessages = require("../i18n/localeMessages");

var _util = _interopRequireDefault(require("../util"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (elementID, css) {
  if (typeof window == 'undefined') return;
  if (typeof document == 'undefined') return;
  if (typeof document.head == 'undefined') return;
  if (window.document.getElementById(elementID)) return;
  var style = document.createElement('style');
  style.type = "text/css";
  style.id = elementID;
  style.innerHTML = css;
  document.head.appendChild(style);
})("a5b40b9ae24c5973593c014e718a1ee6", ".xform-custom-daterangepicker.disabled .am-list-content,.xform-custom-daterangepicker.disabled .am-list-extra{color:#bbb}");

var ListItem = _antdMobile.List.Item;
var DATE_FORMAT = 'YYYY-MM-DD';

var CustomDateRangePickerWidget = /*#__PURE__*/function (_PureComponent) {
  _inherits(CustomDateRangePickerWidget, _PureComponent);

  var _super = _createSuper(CustomDateRangePickerWidget);

  function CustomDateRangePickerWidget() {
    var _this;

    _classCallCheck(this, CustomDateRangePickerWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "updateInitRange", function () {
      var _this$props = _this.props,
          options = _this$props.options,
          onChange = _this$props.onChange;
      var initRange = options.initRange;
      var defaultRange,
          needInitChange = true;

      switch (initRange) {
        case 'beforeweek':
          defaultRange = [(0, _moment["default"])().subtract(7, 'days'), (0, _moment["default"])()];
          break;

        case 'beforemonth':
          defaultRange = [(0, _moment["default"])().subtract(1, 'months'), (0, _moment["default"])()];
          break;

        case 'beforeyear':
          defaultRange = [(0, _moment["default"])().subtract(1, 'years'), (0, _moment["default"])()];
          break;

        case 'afterweek':
          defaultRange = [(0, _moment["default"])(), (0, _moment["default"])().add(7, 'days')];
          break;

        case 'aftermonth':
          defaultRange = [(0, _moment["default"])(), (0, _moment["default"])().add(1, 'months')];
          break;

        case 'afteryear':
          defaultRange = [(0, _moment["default"])(), (0, _moment["default"])().add(1, 'years')];
          break;

        default:
          needInitChange = false;
      }

      if (needInitChange) {
        var dateString = [defaultRange[0].format(DATE_FORMAT), defaultRange[1].format(DATE_FORMAT)];
        onChange(dateString);
      }
    });

    return _this;
  }

  _createClass(CustomDateRangePickerWidget, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.setTimeout(function () {
        _this2.updateInitRange();
      }, 0);
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'date-range');
    }
  }, {
    key: "_getValidateMessage",
    value: function _getValidateMessage(errorType, validate) {
      var errorMessage = '';
      validate.map(function (validateItem) {
        if (validateItem.type === errorType) {
          errorMessage = validateItem.message;
          return false;
        }
      });
      return errorMessage;
    }
  }, {
    key: "judgeDate",
    value: function judgeDate(rangeDate) {
      var onChange = this.props.onChange;

      if (rangeDate[0] && rangeDate[1] && rangeDate[0] > rangeDate[1]) {
        rangeDate = rangeDate.reverse();
      }

      onChange(rangeDate);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          options = _this$props2.options,
          schema = _this$props2.schema,
          required = _this$props2.required,
          value = _this$props2.value,
          readonly = _this$props2.readonly;
      var messages = this.props.formContext && this.props.formContext.messages;
      var disabled = this.props.disabled;
      var placeholder = [messages[(0, _localeMessages.getMessageId)('xformDefaultStartDatePlaceholder')], messages[(0, _localeMessages.getMessageId)('xformDefaultEndDatePlaceholder')]];
      var initRange = options.initRange;
      var defaultRange; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      }

      switch (initRange) {
        case 'beforeweek':
          defaultRange = [(0, _moment["default"])().subtract(7, 'days'), (0, _moment["default"])()];
          break;

        case 'beforemonth':
          defaultRange = [(0, _moment["default"])().subtract(1, 'months'), (0, _moment["default"])()];
          break;

        case 'beforeyear':
          defaultRange = [(0, _moment["default"])().subtract(1, 'years'), (0, _moment["default"])()];
          break;

        case 'afterweek':
          defaultRange = [(0, _moment["default"])(), (0, _moment["default"])().add(7, 'days')];
          break;

        case 'aftermonth':
          defaultRange = [(0, _moment["default"])(), (0, _moment["default"])().add(1, 'months')];
          break;

        case 'afteryear':
          defaultRange = [(0, _moment["default"])(), (0, _moment["default"])().add(1, 'years')];
          break;
      }

      var form = '',
          startDate,
          endDate,
          defaultStartDate,
          defaultEndDate;

      if (_typeof(value) === 'object' && value.length > 0) {
        startDate = typeof value[0] !== 'undefined' ? (0, _moment["default"])(value[0], DATE_FORMAT).toDate() : undefined;
        endDate = typeof value[1] !== 'undefined' ? (0, _moment["default"])(value[1], DATE_FORMAT).toDate() : undefined;

        if (_typeof(defaultRange) === 'object' && defaultRange.length > 0) {
          defaultStartDate = typeof defaultRange[0] !== 'undefined' ? defaultRange[0].toDate() : undefined;
          defaultEndDate = typeof defaultRange[1] !== 'undefined' ? defaultRange[1].toDate() : undefined;
        }

        form = /*#__PURE__*/_react["default"].createElement("div", {
          className: "date-range-picker-wrapper"
        }, /*#__PURE__*/_react["default"].createElement(_antdMobile.DatePicker, {
          maxDate: new Date(2100, 11, 31, 23, 59, 59),
          mode: "date",
          format: DATE_FORMAT,
          value: startDate,
          defaultValue: defaultStartDate,
          disabled: disabled || readonly,
          onChange: function onChange(dateValue) {
            var rangeValue = value.slice();
            rangeValue[0] = _util["default"].formatDate(dateValue, 'yyyy-MM-dd');

            _this3.judgeDate(rangeValue); //onChange(rangeValue);

          },
          extra: placeholder[0] //{...options}

        }, /*#__PURE__*/_react["default"].createElement(ListItem, {
          arrow: "horizontal",
          wrap: true,
          multipleLine: true
        }, /*#__PURE__*/_react["default"].createElement("label", {
          className: (0, _classnames["default"])({
            required: required
          })
        }, schema.title))), /*#__PURE__*/_react["default"].createElement(_antdMobile.DatePicker, {
          maxDate: new Date(2100, 11, 31, 23, 59, 59),
          mode: "date",
          format: DATE_FORMAT,
          value: endDate,
          defaultValue: defaultEndDate,
          disabled: disabled || readonly,
          onChange: function onChange(dateValue) {
            var rangeValue = value.slice();
            rangeValue[1] = _util["default"].formatDate(dateValue, 'yyyy-MM-dd');

            _this3.judgeDate(rangeValue); //onChange(rangeValue);

          },
          extra: placeholder[1] //{...options}

        }, /*#__PURE__*/_react["default"].createElement(ListItem, {
          arrow: "horizontal",
          wrap: true,
          multipleLine: true
        }, /*#__PURE__*/_react["default"].createElement("label", {
          className: (0, _classnames["default"])({
            required: required
          })
        }, schema.title))));
      } else {
        form = /*#__PURE__*/_react["default"].createElement("div", {
          className: "date-range-picker-wrapper"
        }, /*#__PURE__*/_react["default"].createElement(_antdMobile.DatePicker, {
          maxDate: new Date(2100, 11, 31, 23, 59, 59),
          mode: "date",
          format: DATE_FORMAT,
          defaultValue: defaultStartDate,
          disabled: disabled || readonly,
          onChange: function onChange(dateValue) {
            var rangeValue = value ? value.slice() : [];
            rangeValue[0] = _util["default"].formatDate(dateValue, 'yyyy-MM-dd');

            _this3.judgeDate(rangeValue); //onChange(rangeValue);

          },
          extra: placeholder[0] //{...options}

        }, /*#__PURE__*/_react["default"].createElement(ListItem, {
          arrow: "horizontal",
          wrap: true,
          multipleLine: true
        }, /*#__PURE__*/_react["default"].createElement("label", {
          className: (0, _classnames["default"])({
            required: required
          })
        }, schema.title))), /*#__PURE__*/_react["default"].createElement(_antdMobile.DatePicker, {
          maxDate: new Date(2100, 11, 31, 23, 59, 59),
          mode: "date",
          format: DATE_FORMAT,
          defaultValue: defaultEndDate,
          disabled: disabled || readonly,
          onChange: function onChange(dateValue) {
            var rangeValue = value ? value.slice() : [];

            if (!rangeValue[0]) {
              _antd.message.warning('请先选择开始时间');

              return;
            }

            rangeValue[1] = _util["default"].formatDate(dateValue, 'yyyy-MM-dd');

            _this3.judgeDate(rangeValue); //onChange(rangeValue);

          },
          extra: placeholder[1] //{...options}

        }, /*#__PURE__*/_react["default"].createElement(ListItem, {
          arrow: "horizontal",
          wrap: true,
          multipleLine: true
        }, /*#__PURE__*/_react["default"].createElement("label", {
          className: (0, _classnames["default"])({
            required: required
          })
        }, schema.title))));
      } //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过


      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'xform-custom-widget': true,
          'xform-custom-daterangepicker': true,
          'xform-item-has-error': _errorType !== '',
          disabled: disabled
        })
      }, form, /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-item-error-explain"
      }, validateMessage));
    }
  }]);

  return CustomDateRangePickerWidget;
}(_react.PureComponent);

exports["default"] = CustomDateRangePickerWidget;