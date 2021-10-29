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

var _localeMessages = require("../i18n/localeMessages");

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

var Option = _antd.Select.Option;
var ALL_VALUE = 'all';

var CustomMultiSelect = /*#__PURE__*/function (_Component) {
  _inherits(CustomMultiSelect, _Component);

  var _super = _createSuper(CustomMultiSelect);

  function CustomMultiSelect(props) {
    var _this;

    _classCallCheck(this, CustomMultiSelect);

    _this = _super.call(this, props);
    _this.handleSelectChange = _this.handleSelectChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomMultiSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'multi-select');
    }
  }, {
    key: "handleSelectChange",
    value: function handleSelectChange(selectedValue, allValues) {
      var _this$props = this.props,
          value = _this$props.value,
          onChange = _this$props.onChange;
      var emptyValue = []; // !!!兼容旧数据（旧的multiSelect类型字段模板formData值是""，后面才改成[]）

      if (typeof value === 'undefined' || value === '') {
        value = [];
      }

      value = value.filter(function (item) {
        return allValues.indexOf(item) > -1;
      });

      if (value.length === allValues.length) {
        value.push(ALL_VALUE);
      } // 增加了一个“全选”


      if (value.indexOf(ALL_VALUE) <= -1 && selectedValue.indexOf(ALL_VALUE) > -1) {
        onChange(allValues);
      } else if (value.indexOf(ALL_VALUE) > -1 && selectedValue.indexOf(ALL_VALUE) <= -1) {
        onChange(emptyValue);
      } else {
        if (selectedValue.indexOf(ALL_VALUE) > -1) {
          selectedValue.splice(selectedValue.indexOf(ALL_VALUE), 1);
          onChange(selectedValue);
        } else {
          onChange(selectedValue);
        }
      }
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
      var _this2 = this;

      var popupContainer = this.props.formContext && this.props.formContext.popupContainer;
      var messages = this.props.formContext && this.props.formContext.messages;
      var _this$props2 = this.props,
          schema = _this$props2.schema,
          id = _this$props2.id,
          options = _this$props2.options,
          disabled = _this$props2.disabled,
          readonly = _this$props2.readonly,
          autofocus = _this$props2.autofocus,
          placeholder = _this$props2.placeholder; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      }

      var value = this.props.value; // enumOptions会由react-jsonschema-form注入到组件的options中 https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components note

      var enumOptions = options.enumOptions || [];

      if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
        enumOptions = schema.data;
      } // !!!兼容旧数据（旧的multiSelect类型字段模板formData值是""，后面才改成[]）


      if (typeof value === 'undefined' || value === '') {
        value = [];
      } // 根据value和enumOptions来判断是否需要添加“全选”


      value = value.filter(function (item) {
        var result = false;
        enumOptions.map(function (enums) {
          if (enums.value === item) {
            result = true;
          }
        });
        return result;
      }); // 当value值为非空数组时，要自动判断是否添加“全选”

      if (value.length > 0 && value.length === enumOptions.map(function (enums) {
        return enums.value;
      }).length) {
        value.push(ALL_VALUE);
      } // 如果选项为空时，不添加“全选”按钮


      var checkAllOptions = '';

      if (enumOptions.length > 0) {
        checkAllOptions = /*#__PURE__*/_react["default"].createElement(Option, {
          key: "all",
          label: messages[(0, _localeMessages.getMessageId)('xformCheckAllLabel')],
          value: ALL_VALUE
        }, messages[(0, _localeMessages.getMessageId)('xformCheckAllLabel')]);
      } // 对于value值为空数组的情况，value的值传入undefined，这样才能显示组件的placeholder


      if (value && value.length <= 0) {
        value = undefined;
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
          'xform-custom-multiple-select': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement(_antd.Select, {
        id: id,
        value: value,
        disabled: disabled,
        readOnly: readonly,
        mode: "multiple",
        onChange: function onChange(value) {
          _this2.handleSelectChange(value, enumOptions.map(function (enums) {
            return enums.value;
          }));
        },
        autoFocus: autofocus,
        placeholder: placeholder,
        optionFilterProp: "label",
        optionLabelProp: "label",
        getPopupContainer: popupContainer //{...options}

      }, checkAllOptions, enumOptions.map(function (enums, index) {
        return /*#__PURE__*/_react["default"].createElement(Option, {
          key: index,
          value: enums.value,
          label: enums.label
        }, enums.label);
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage));
    }
  }]);

  return CustomMultiSelect;
}(_react.Component);

exports["default"] = CustomMultiSelect;