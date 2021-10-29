"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _index = _interopRequireDefault(require("../../scalable-form-antd/index"));

var _localeMessages = require("../../i18n/localeMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
})("5f76b243ab7e93cc598f890c66dbdfab", ".app-xform-builder-base-config-popover{min-width:400px;z-index:1000!important}.app-xform-builder-base-config-popover .base-config-wrapper{padding:8px 4px}.app-xform-builder-base-config-popover .base-config-wrapper .popover-title{font-size:14px;color:rgba(0,0,0,.65);margin-bottom:20px;margin-left:3px}");

var BaseFormConfigPopover = /*#__PURE__*/function (_PureComponent) {
  _inherits(BaseFormConfigPopover, _PureComponent);

  var _super = _createSuper(BaseFormConfigPopover);

  function BaseFormConfigPopover(props) {
    var _this;

    _classCallCheck(this, BaseFormConfigPopover);

    _this = _super.call(this, props);
    _this.renderPopoverContent = _this.renderPopoverContent.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BaseFormConfigPopover, [{
    key: "renderPopoverContent",
    value: function renderPopoverContent() {
      var _this$props = this.props,
          messages = _this$props.messages,
          formData = _this$props.formData,
          formDataChangeHandler = _this$props.formDataChangeHandler;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "base-config-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: "popover-title"
      }, messages[(0, _localeMessages.getMessageId)('xformBaseConfigPopoverTitle')]), /*#__PURE__*/_react["default"].createElement(_index["default"], {
        formItemLayout: {
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 20
          }
        },
        alignType: "vertical",
        onChange: function onChange(formData) {
          formDataChangeHandler(formData);
        },
        jsonSchema: {
          type: 'object',
          title: '',
          properties: {
            formTitle: {
              title: messages[(0, _localeMessages.getMessageId)('xformBaseConfigFormTitleLabel')],
              type: 'string',
              maxLength: 20
            },
            formDesc: {
              title: messages[(0, _localeMessages.getMessageId)('xformBaseConfigFormDescLabel')],
              type: 'string',
              maxLength: 200
            }
          }
        },
        uiSchema: {
          formTitle: {
            'ui:options': {
              placeholder: messages[(0, _localeMessages.getMessageId)('xformBaseConfigFormTitlePlaceholder')]
            }
          },
          formDesc: {
            'ui:widget': 'textarea',
            'ui:options': {
              placeholder: messages[(0, _localeMessages.getMessageId)('xformBaseConfigFormDescPlaceholder')]
            }
          }
        },
        formData: _objectSpread({}, formData)
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          visible = _this$props2.visible,
          visibleChangeHandler = _this$props2.visibleChangeHandler,
          popupContainer = _this$props2.popupContainer;
      return /*#__PURE__*/_react["default"].createElement(_antd.Popover, {
        title: "",
        content: this.renderPopoverContent(),
        visible: visible,
        onVisibleChange: visibleChangeHandler,
        trigger: "click",
        placement: "bottomLeft",
        overlayClassName: "app-xform-builder-base-config-popover",
        getPopupContainer: popupContainer
      }, children);
    }
  }]);

  return BaseFormConfigPopover;
}(_react.PureComponent);

exports["default"] = BaseFormConfigPopover;

_defineProperty(BaseFormConfigPopover, "propTypes", {
  messages: _propTypes["default"].object.isRequired,
  popupContainer: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].element.isRequired,
  visible: _propTypes["default"].bool.isRequired,
  formData: _propTypes["default"].shape({
    formTitle: _propTypes["default"].string,
    formDesc: _propTypes["default"].string
  }).isRequired,
  formDataChangeHandler: _propTypes["default"].func.isRequired,
  visibleChangeHandler: _propTypes["default"].func.isRequired
});