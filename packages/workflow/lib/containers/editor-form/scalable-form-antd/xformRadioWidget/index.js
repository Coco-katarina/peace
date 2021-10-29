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

/**
 * xform基础widget => radio单选按钮组
 */
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
})("b7b239198fc32880a4ad8e86cc074f42", ".xform-custom-radio.has-error .ant-radio-inner{border-color:#f50}.xform-custom-radio .vertical .ant-radio-wrapper{display:block;height:25px;line-height:25px}");

var RadioGroup = _antd.Radio.Group;
var RadioButton = _antd.Radio.Button;

var CustomRadio = /*#__PURE__*/function (_Component) {
  _inherits(CustomRadio, _Component);

  var _super = _createSuper(CustomRadio);

  function CustomRadio() {
    _classCallCheck(this, CustomRadio);

    return _super.apply(this, arguments);
  }

  _createClass(CustomRadio, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'radio');
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
      var formContext = this.props.formContext;
      var schema = this.props.schema;
      var options = this.props.options,
          value = this.props.value,
          disabled = this.props.disabled,
          readonly = this.props.readonly,
          _onChange = this.props.onChange; //判断节点禁用属性
      //let formContext = this.props.formContext;

      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      }

      var enumOptions = options.enumOptions || [];

      if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
        enumOptions = schema.data;
      }

      var labelType = formContext.labelType; // 如果labelType为inline则单选、复选默认inline的方式排列；如果labelType为vertical则单选、复选默认vertical方式排列

      var vertical = typeof options.vertical === 'boolean' ? options.vertical : labelType === 'vertical'; //默认使用普通radio方式

      var style = options.style || 'normal';

      if (style === 'button') {
        //RadioButton类型默认必须是inline的
        vertical = false;
      } //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过


      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      var form = '';

      switch (style) {
        case 'normal':
          form = /*#__PURE__*/_react["default"].createElement(RadioGroup, {
            value: value,
            onChange: function onChange(event) {
              _onChange(event.target.value);
            }
          }, enumOptions.map(function (enums, index) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
              disabled: disabled,
              readOnly: readonly,
              key: index,
              value: enums.value
            }, enums.label);
          }));
          break;

        case 'button':
          form = /*#__PURE__*/_react["default"].createElement(RadioGroup, {
            value: value,
            onChange: function onChange(event) {
              _onChange(event.target.value);
            }
          }, enumOptions.map(function (enums, index) {
            return /*#__PURE__*/_react["default"].createElement(RadioButton, {
              disabled: disabled,
              readOnly: readonly,
              key: index,
              value: enums.value
            }, enums.label);
          }));
          break;

        default:
          //什么也不做
          form = '';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-radio': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'vertical': vertical
        })
      }, form, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage)));
    }
  }]);

  return CustomRadio;
}(_react.Component);

exports["default"] = CustomRadio;