"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antdMobile = require("antd-mobile");

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
})("e1e250589c3e4be4b45e0f896ac122c8", ".xform-custom-checkbox.disabled .am-list-content,.xform-custom-checkbox.disabled .am-list-extra{color:#bbb}");

var ListItem = _antdMobile.List.Item;
var CheckboxItem = _antdMobile.Checkbox.CheckboxItem;

var CustomCheckbox = /*#__PURE__*/function (_PureComponent) {
  _inherits(CustomCheckbox, _PureComponent);

  var _super = _createSuper(CustomCheckbox);

  function CustomCheckbox() {
    _classCallCheck(this, CustomCheckbox);

    return _super.apply(this, arguments);
  }

  _createClass(CustomCheckbox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'checkbox');
    }
  }, {
    key: "getOptionLabel",
    value: function getOptionLabel(enumOptions, value) {
      var result = '';
      enumOptions.map(function (enums) {
        if (enums.value === value) {
          result = enums.label;
        }
      });
      return result;
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
    } // 根据options中的validate字段判断是否必填

  }, {
    key: "_isFieldRequired",
    value: function _isFieldRequired(validate) {
      var isFieldRequired = false;
      validate.map(function (validateItem) {
        if (validateItem.type === 'empty') {
          isFieldRequired = true;
        }
      });
      return isFieldRequired;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          schema = _this$props.schema,
          options = _this$props.options,
          value = _this$props.value,
          disabled = _this$props.disabled,
          _onChange = _this$props.onChange; // react-jsonschema-form组件对于array类型的字段会丢失掉required这个props，只能通过自己的逻辑判断来补齐这个逻辑

      var required = false;

      if (typeof options.validate !== 'undefined') {
        required = this._isFieldRequired(options.validate);
      }

      var enumOptions = options.enumOptions || [];

      if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
        enumOptions = schema.data;
      } //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过


      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'xform-custom-widget': true,
          'xform-custom-checkbox': true,
          'xform-item-has-error': _errorType !== '',
          disabled: disabled
        })
      }, /*#__PURE__*/_react["default"].createElement(ListItem, {
        wrap: true,
        multipleLine: true,
        error: _errorType !== '',
        extra: value.map(function (item) {
          return _this.getOptionLabel(enumOptions, item);
        }).join(',')
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: (0, _classnames["default"])({
          required: required
        })
      }, schema.title)), enumOptions.map(function (enums) {
        return /*#__PURE__*/_react["default"].createElement(CheckboxItem, {
          key: enums.value,
          disabled: disabled,
          checked: value.indexOf(enums.value) > -1,
          onChange: function onChange() {
            // 这里react-jsonschema-form的onChange没有对formData进行deepClone会导致组件刷新失败，这里必须要自己进行deepClone。参见https://github.com/mozilla-services/react-jsonschema-form/blob/master/src/components/Form.js#L101
            var result = [];
            value.map(function (item) {
              return result.push(item);
            });

            if (result.indexOf(enums.value) > -1) {
              result.splice(result.indexOf(enums.value), 1);
            } else {
              result.push(enums.value);
            }

            _onChange(result);
          }
        }, enums.label);
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-item-error-explain"
      }, validateMessage));
    }
  }]);

  return CustomCheckbox;
}(_react.PureComponent);

exports["default"] = CustomCheckbox;