"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

var _classnames = _interopRequireDefault(require("classnames"));

var _localeMessages = require("../i18n/localeMessages");

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
})("85bede0c0223c6362789b2359212f4d1", ".xform-custom-daterangepicker .ant-calendar-picker{width:100%!important}");

var RangePicker = _antd.DatePicker.RangePicker;
var DATE_FORMAT = 'YYYY-MM-DD';

var CustomDateRangePickerWidget = /*#__PURE__*/function (_Component) {
  _inherits(CustomDateRangePickerWidget, _Component);

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
      var formContext = this.props.formContext || {};
      var logger = formContext.logger || {};
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
    key: "render",
    value: function render() {
      var popupContainer = this.props.formContext && this.props.formContext.popupContainer;
      var messages = this.props.formContext && this.props.formContext.messages;
      var options = this.props.options;
      var value = this.props.value,
          disabled = this.props.disabled,
          _onChange = this.props.onChange,
          placeholder = this.props.placeholder || [messages[(0, _localeMessages.getMessageId)('xformDefaultStartDatePlaceholder')], messages[(0, _localeMessages.getMessageId)('xformDefaultEndDatePlaceholder')]]; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      }

      var initRange = options.initRange;
      var defaultRange;

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

      var form = ''; // ant组件的数据结构，点击clear时返回value = ['', '']

      if (_typeof(value) === 'object' && value.length === 2 && value[0] !== '' && value[1] !== '') {
        form = /*#__PURE__*/_react["default"].createElement(RangePicker, {
          placeholder: placeholder,
          disabled: disabled,
          defaultValue: defaultRange,
          format: DATE_FORMAT,
          value: [(0, _moment["default"])(value[0], DATE_FORMAT), (0, _moment["default"])(value[1], DATE_FORMAT)],
          getCalendarContainer: popupContainer,
          onChange: function onChange(date, dateString) {
            _onChange(dateString);
          } // {...options}

        });
      } else {
        form = /*#__PURE__*/_react["default"].createElement(RangePicker, {
          placeholder: placeholder,
          disabled: disabled,
          defaultValue: defaultRange,
          format: DATE_FORMAT,
          getCalendarContainer: popupContainer,
          onChange: function onChange(date, dateString) {
            _onChange(dateString);
          } //{...options}

        });
      } //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过


      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-daterangepicker': true,
          'has-error': _errorType !== ''
        })
      }, form, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage));
    }
  }]);

  return CustomDateRangePickerWidget;
}(_react.Component);

exports["default"] = CustomDateRangePickerWidget;