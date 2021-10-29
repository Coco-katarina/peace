"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antdMobile = require("antd-mobile");

var _classnames = _interopRequireDefault(require("classnames"));

var _excluded = ["_errorType", "validate"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
})("b2e5e70075cab70c80f592fd3dae97e5", ".xform-custom-textarea .am-textarea-item .am-textarea-label.am-textarea-label-5{width:100px;max-width:100px;margin-right:10px;white-space:normal;overflow:visible}.xform-custom-textarea .am-textarea-item .am-textarea-control{flex:1;-webkit-flex:1;min-height:75px;border:1px solid #eaeaea;padding:10px}.xform-custom-textarea .am-textarea-item .am-textarea-control textarea{font-size:14px}.xform-custom-textarea .am-textarea-item.am-textarea-item{height:auto;padding:10px 20px 13px}.xform-custom-textarea .textarea-label{background-color:#fff;padding:10px 0 0 20px;color:#000;font-size:14px;display:block}");

var CustomTextareaWidget = /*#__PURE__*/function (_PureComponent) {
  _inherits(CustomTextareaWidget, _PureComponent);

  var _super = _createSuper(CustomTextareaWidget);

  function CustomTextareaWidget(props) {
    var _this;

    _classCallCheck(this, CustomTextareaWidget);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function () {
      var inputElement = _reactDom["default"].findDOMNode(_this.textArea);

      if (inputElement && inputElement.click) {
        inputElement.click();
      }

      if (inputElement && inputElement.scrollIntoView) {
        inputElement.scrollIntoView();
      }
    });

    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.textarea = null;
    return _this;
  }

  _createClass(CustomTextareaWidget, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'textarea');
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
    key: "handleChange",
    value: function handleChange(value) {
      this.props.onChange(value);
    }
  }, {
    key: "_filterSystemOptions",
    value: //过滤掉react-json-schema中注入option中的属性，防止这部分属性添加到组件上
    function _filterSystemOptions(options) {
      var BLACK_LIST = ['enumOptions', 'disabled', 'readonly', 'help'];
      BLACK_LIST.map(function (name) {
        if (options.hasOwnProperty(name)) {
          delete options[name];
        }
      });
      return options;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          schema = _this$props.schema,
          options = _this$props.options,
          label = _this$props.label,
          readonly = _this$props.readonly,
          required = _this$props.required,
          placeholder = _this$props.placeholder,
          value = _this$props.value;
      var disabled = this.props.disabled; //解析schema中的约定maxlength

      var maxLength = schema.maxLength; //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过

      var validateMessage = '';

      var _errorType = options._errorType,
          validate = options.validate,
          otherOptions = _objectWithoutProperties(options, _excluded);

      otherOptions = this._filterSystemOptions(otherOptions);
      _errorType = _errorType || '';

      if (_errorType !== '' && typeof validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, validate);
      } //判断节点禁用属性


      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'xform-custom-widget': true,
          'xform-custom-textarea': true,
          'xform-item-has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: (0, _classnames["default"])({
          'textarea-label': true,
          required: required
        })
      }, label), /*#__PURE__*/_react["default"].createElement(_antdMobile.TextareaItem, _extends({
        ref: function ref(textarea) {
          _this2.textarea = textarea;
        } // title={(<label className={classnames({
        //     required: required
        // })}>{label}</label>)}
        ,
        placeholder: placeholder,
        value: value,
        editable: !readonly,
        disabled: disabled,
        count: maxLength,
        autoHeight: true //clear
        ,
        error: _errorType !== '',
        onChange: this.handleChange,
        onFocus: this.handleFocus
      }, otherOptions)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-item-error-explain"
      }, validateMessage));
    }
  }]);

  return CustomTextareaWidget;
}(_react.PureComponent);

exports["default"] = CustomTextareaWidget;