"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var xformBuilderBlock4NameSpace = 'xformBuilderJdsfec';

var Element = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Element, _React$PureComponent);

  var _super = _createSuper(Element);

  function Element(props) {
    var _this;

    _classCallCheck(this, Element);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (formCode, _ref) {
      var jsonSchema = _ref.jsonSchema,
          uiSchema = _ref.uiSchema,
          formData = _ref.formData,
          bizData = _ref.bizData,
          sequence = _ref.sequence;
      console.log('submit by editor', formCode, jsonSchema, uiSchema, formData, bizData, sequence);
    });

    _this.state = {
      uiSchema: {},
      jsonSchema: {},
      bizData: {},
      sequence: [],
      formData: {}
    };
    return _this;
  }

  _createClass(Element, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "portal"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-builder-demos"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "simple-container"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "simple-xform-container"
      }, /*#__PURE__*/_react["default"].createElement(_schema["default"], {
        platformConfigSupport: true,
        platform: "both",
        systemTemplate: "397ef9b6b4a5457695bae9b2bbab26a9",
        jsonSchema: this.state.jsonSchema,
        uiSchema: this.state.uiSchema,
        formData: this.state.formData,
        bizData: this.state.bizData,
        sequence: this.state.sequence,
        onSubmit: this.handleSubmit //jsonSchema={formSchema.jsonSchema}
        // uiSchema={formSchema.uiSchema}
        //formData={formSchema.formData}
        //bizData={formSchema.bizData}
        //sequence={formSchema.sequence}
        ,
        namespace: xformBuilderBlock4NameSpace
      })))));
    }
  }]);

  return Element;
}(_react["default"].PureComponent);

var _default = Element;
exports["default"] = _default;