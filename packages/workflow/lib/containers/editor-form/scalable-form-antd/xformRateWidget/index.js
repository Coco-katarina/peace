"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _antd = require("antd");

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

var CustomRate = /*#__PURE__*/function (_PureComponent) {
  _inherits(CustomRate, _PureComponent);

  var _super = _createSuper(CustomRate);

  function CustomRate(props) {
    var _this;

    _classCallCheck(this, CustomRate);

    _this = _super.call(this, props);
    _this.handleRateNumberChange = _this.handleRateNumberChange.bind(_assertThisInitialized(_this));
    _this.handleRateHoverChange = _this.handleRateHoverChange.bind(_assertThisInitialized(_this));
    _this.getRateNumberFromValue = _this.getRateNumberFromValue.bind(_assertThisInitialized(_this));
    _this.getRateLabelFromValue = _this.getRateLabelFromValue.bind(_assertThisInitialized(_this));
    _this.getEnumOptions = _this.getEnumOptions.bind(_assertThisInitialized(_this));
    _this.state = {
      currentRateLabel: _this.getRateLabelFromValue(props.value)
    };
    return _this;
  }

  _createClass(CustomRate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'rate');
    }
  }, {
    key: "handleRateHoverChange",
    value: function handleRateHoverChange(number) {
      if (!number) {
        return;
      }

      var enumOptions = this.getEnumOptions();
      var currentEnumItem = enumOptions[number - 1];
      this.setState({
        currentRateLabel: currentEnumItem.label
      });
    }
  }, {
    key: "handleRateNumberChange",
    value: function handleRateNumberChange(number) {
      var onChange = this.props.onChange;
      var enumOptions = this.getEnumOptions();
      var currentEnumItem = enumOptions[number - 1];
      currentEnumItem && this.setState({
        currentRateLabel: currentEnumItem.label
      });
      currentEnumItem && onChange(currentEnumItem.value);
    }
  }, {
    key: "getRateLabelFromValue",
    value: function getRateLabelFromValue(value) {
      var enumOptions = this.getEnumOptions();
      var result = '';
      enumOptions.map(function (enums) {
        if (enums.value === value) {
          result = enums.label;
        }
      });
      return result;
    }
  }, {
    key: "getRateNumberFromValue",
    value: function getRateNumberFromValue(value) {
      var enumOptions = this.getEnumOptions();
      var result = '';
      enumOptions.map(function (enums, number) {
        if (enums.value === value) {
          result = number + 1;
        }
      });
      return result;
    }
  }, {
    key: "getEnumOptions",
    value: function getEnumOptions() {
      var _this$props = this.props,
          schema = _this$props.schema,
          options = _this$props.options;
      var enumOptions = options.enumOptions || [];

      if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
        enumOptions = schema.data;
      }

      return enumOptions;
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
    key: "handleCurrentRateLabel",
    value: function handleCurrentRateLabel(value) {
      if (!value) {
        return;
      }

      var res = this.getRateNumberFromValue(value) - 1;
      var enumOptions = this.getEnumOptions();
      enumOptions.length > 0 && this.setState({
        currentRateLabel: enumOptions[res].label
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          schema = _this$props2.schema,
          options = _this$props2.options,
          value = _this$props2.value,
          disabled = _this$props2.disabled,
          readonly = _this$props2.readonly;
      var currentRateLabel = this.state.currentRateLabel;
      var enumOptions = options.enumOptions || [];

      if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
        enumOptions = schema.data;
      }

      var tooltips = [];

      if (enumOptions.length > 0) {
        enumOptions.map(function (e) {
          tooltips.push(e.label);
        });
      } //判断节点禁用属性


      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
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
          'xform-custom-rate': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Rate, {
        count: enumOptions.length,
        disabled: disabled,
        readOnly: readonly,
        value: this.getRateNumberFromValue(value) //onHoverChange={this.handleRateHoverChange}
        ,
        onChange: this.handleRateNumberChange,
        onBlur: this.handleCurrentRateLabel(value),
        tooltips: tooltips
      }), /*#__PURE__*/_react["default"].createElement("span", null, currentRateLabel)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage));
    }
  }]);

  return CustomRate;
}(_react.PureComponent);

exports["default"] = CustomRate;