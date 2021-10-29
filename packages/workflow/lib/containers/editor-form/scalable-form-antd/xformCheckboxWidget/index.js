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
 * xform基础widget => checkbox复选按钮组
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
})("6900e7ee4d0350a260c6a5b86dec127b", ".xform-custom-checkbox.has-error .ant-checkbox-inner{border-color:#f50}.xform-custom-checkbox .vertical .ant-checkbox-wrapper{display:block;height:25px;line-height:25px;margin-left:0}");

var CheckboxGroup = _antd.Checkbox.Group;

var CustomCheckbox = /*#__PURE__*/function (_Component) {
  _inherits(CustomCheckbox, _Component);

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
    key: "_getEnumsFromNameList",
    value: function _getEnumsFromNameList(enumOptions, enumNames) {
      var result = []; // 容错代码：当formData传递的为空字符串时也能正确解析

      if (typeof enumNames === 'undefined' || typeof enumNames === 'string') {
        enumNames = [];
      }

      enumNames.map(function (name) {
        enumOptions.map(function (enumOption) {
          if (enumOption.label === name) {
            result.push(enumOption.value);
          }
        });
      });
      return result;
    }
  }, {
    key: "_getEnumNamesFromValueList",
    value: function _getEnumNamesFromValueList(enumOptions, enums) {
      var result = []; // 容错代码：当formData传递的为空字符串时也能正确解析

      if (typeof enums === 'undefined' || typeof enums === 'string') {
        enums = [];
      }

      enums.map(function (value) {
        enumOptions.map(function (enumOption) {
          if (enumOption.value === value) {
            result.push(enumOption.label);
          }
        });
      });
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var formContext = this.props.formContext;
      var schema = this.props.schema;
      var options = this.props.options,
          value = this.props.value,
          disabled = this.props.disabled,
          _onChange = this.props.onChange; //判断节点禁用属性
      //let formContext = this.props.formContext;

      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      }

      var enumOptions = options.enumOptions || [];
      var enums = [],
          enumNames = [];

      if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
        enumOptions = schema.data;
      }

      var labelType = formContext.labelType; // 如果labelType为inline则单选、复选默认inline的方式排列；如果labelType为vertical则单选、复选默认vertical方式排列

      var vertical = typeof options.vertical === 'boolean' ? options.vertical : labelType === 'vertical';
      enumOptions.map(function (enumsOption) {
        enums.push(enumsOption.value);
        enumNames.push(enumsOption.label);
      }); //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过

      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-checkbox': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'vertical': vertical
        })
      }, /*#__PURE__*/_react["default"].createElement(CheckboxGroup, {
        disabled: disabled,
        value: this._getEnumNamesFromValueList(enumOptions, value),
        options: enumNames,
        onChange: function onChange(checkedList) {
          _onChange(_this._getEnumsFromNameList(enumOptions, checkedList));
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage)));
    }
  }]);

  return CustomCheckbox;
}(_react.Component);

exports["default"] = CustomCheckbox;