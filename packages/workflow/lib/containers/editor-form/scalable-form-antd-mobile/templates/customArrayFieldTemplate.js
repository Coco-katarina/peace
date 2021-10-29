"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _classnames = _interopRequireDefault(require("classnames"));

var _reactIf = require("react-if");

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

var CustomArrayFieldTemplate = /*#__PURE__*/function (_Component) {
  _inherits(CustomArrayFieldTemplate, _Component);

  var _super = _createSuper(CustomArrayFieldTemplate);

  function CustomArrayFieldTemplate() {
    _classCallCheck(this, CustomArrayFieldTemplate);

    return _super.apply(this, arguments);
  }

  _createClass(CustomArrayFieldTemplate, [{
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
      var props = this.props;
      var uiSchema = props.uiSchema,
          formContext = props.formContext;
      var options = uiSchema.items && uiSchema.items['ui:options'] || {}; //const hiddenClassName = uiSchema.items && uiSchema.items.classNames || '';
      //判断节点是否禁用 禁用不可增加

      var currentNode = formContext.currentNode || null;
      var disnodes = options.disnodes ? options.disnodes : null;
      var canAdd = true;

      if (currentNode) {
        if (Array.isArray(disnodes) && disnodes.length > 0 && disnodes.includes(currentNode)) {
          canAdd = false;
        }
      } //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过


      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {//validateMessage = this._getValidateMessage(_errorType, options.validate);
      } //debugger;


      return /*#__PURE__*/_react["default"].createElement("div", {
        className: props.className + ' xform-array-field'
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-array': true,
          'has-error': _errorType !== ''
        })
      }, props.items && props.items.map(function (element) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "xform-array-field-item",
          key: element.key || element.index
        }, /*#__PURE__*/_react["default"].createElement("div", null, element.children), /*#__PURE__*/_react["default"].createElement("div", {
          className: "xform-array-buttons"
        }, element.hasMoveDown && /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          size: "small",
          type: "default",
          onClick: element.onReorderClick(element.index, element.index + 1)
        }, /*#__PURE__*/_react["default"].createElement(_icons.ArrowDownOutlined, null)), element.hasMoveUp && /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          size: "small",
          type: "default",
          onClick: element.onReorderClick(element.index, element.index - 1)
        }, /*#__PURE__*/_react["default"].createElement(_icons.ArrowUpOutlined, null)), /*#__PURE__*/_react["default"].createElement(_reactIf.If, {
          condition: props.items.length > 1
        }, /*#__PURE__*/_react["default"].createElement(_reactIf.Then, null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          size: "small",
          type: "default",
          onClick: element.onDropIndexClick(element.index)
        }, /*#__PURE__*/_react["default"].createElement(_icons.CloseOutlined, null))))));
      }), props.canAdd && canAdd && /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-array-bottom"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        size: "small",
        type: "primary",
        onClick: props.onAddClick
      }, /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage)));
    }
  }]);

  return CustomArrayFieldTemplate;
}(_react.Component);

exports["default"] = CustomArrayFieldTemplate;