"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _Editor = _interopRequireDefault(require("./Editor"));

var _util = require("./common/util");

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
})("d2658cbc1711a4c42e6eda97c3eb69ff", ".simple-xform-container{margin-top:20px}");

var FormEditor = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(FormEditor, _React$PureComponent);

  var _super = _createSuper(FormEditor);

  function FormEditor(props) {
    var _this;

    _classCallCheck(this, FormEditor);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (formCode, _ref) {
      var jsonSchema = _ref.jsonSchema,
          uiSchema = _ref.uiSchema,
          formData = _ref.formData,
          bizData = _ref.bizData,
          sequence = _ref.sequence;
      console.log('submit by editor', formCode, jsonSchema, uiSchema, formData, bizData, sequence);
    });

    _defineProperty(_assertThisInitialized(_this), "onCurrentRef", function (child) {
      _this.props.onRef(child);
    });

    _defineProperty(_assertThisInitialized(_this), "filterUiSchema", function () {
      var _this$props = _this.props,
          bpmnNodes = _this$props.bpmnNodes,
          formSchema = _this$props.formSchema;
      var _formSchema$jsonSchem = formSchema.jsonSchema,
          jsonSchema = _formSchema$jsonSchem === void 0 ? {} : _formSchema$jsonSchem,
          _formSchema$uiSchema = formSchema.uiSchema,
          uiSchema = _formSchema$uiSchema === void 0 ? {} : _formSchema$uiSchema,
          _formSchema$formData = formSchema.formData,
          formData = _formSchema$formData === void 0 ? {} : _formSchema$formData,
          _formSchema$bizData = formSchema.bizData,
          bizData = _formSchema$bizData === void 0 ? {} : _formSchema$bizData,
          _formSchema$sequence = formSchema.sequence,
          sequence = _formSchema$sequence === void 0 ? [] : _formSchema$sequence;
      return uiSchema;
    });

    _this.state = {
      uiSchema: {},
      jsonSchema: {},
      bizData: {},
      sequence: [],
      formData: {}
    };
    _this.namespace = props.namespace || _util.util.getRandomString(8);
    return _this;
  }

  _createClass(FormEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.onSetNameSpace) {
        this.props.onSetNameSpace(this.namespace);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          bpmnNodes = _this$props2.bpmnNodes,
          formSchema = _this$props2.formSchema,
          contentHeight = _this$props2.contentHeight,
          businessTypeName = _this$props2.businessTypeName,
          processId = _this$props2.processId,
          formName = _this$props2.formName;
      var _formSchema$jsonSchem2 = formSchema.jsonSchema,
          jsonSchema = _formSchema$jsonSchem2 === void 0 ? {} : _formSchema$jsonSchem2,
          _formSchema$uiSchema2 = formSchema.uiSchema,
          uiSchema = _formSchema$uiSchema2 === void 0 ? {} : _formSchema$uiSchema2,
          _formSchema$formData2 = formSchema.formData,
          formData = _formSchema$formData2 === void 0 ? {} : _formSchema$formData2,
          _formSchema$bizData2 = formSchema.bizData,
          bizData = _formSchema$bizData2 === void 0 ? {} : _formSchema$bizData2,
          _formSchema$sequence2 = formSchema.sequence,
          sequence = _formSchema$sequence2 === void 0 ? [] : _formSchema$sequence2;
      var newUiSchema = this.filterUiSchema();
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "portal"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-builder-demos"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "simple-container"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "simple-xform-container"
      }, /*#__PURE__*/_react["default"].createElement(_Editor["default"], {
        platform: "laptop",
        systemTemplate: "397ef9b6b4a54576954fgsfg2bab26a9",
        jsonSchema: jsonSchema,
        uiSchema: newUiSchema,
        formData: formData,
        bizData: bizData,
        sequence: sequence,
        onSubmit: this.handleSubmit // {...this.props}
        ,
        customUploadRequest: this.props.customUploadRequest || function () {},
        env: this.props.env || "dev",
        namespace: this.namespace //bizDataSupport
        ,
        bpmnNodes: bpmnNodes,
        businessTypeName: businessTypeName,
        commonFieldSupport: true,
        systemFieldSupport: true,
        actions: this.props.actions,
        user: this.props.user,
        onCurrentRef: this.onCurrentRef,
        height: contentHeight,
        processId: processId,
        formName: formName
      })))));
    }
  }]);

  return FormEditor;
}(_react["default"].PureComponent);

function mapStateToProps(state) {
  var auth = state.auth,
      global = state.global;
  return {
    actions: global.actions,
    theme: global.theme,
    clientHeight: global.clientHeight,
    clientWidth: global.clientWidth,
    user: auth.user
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(FormEditor);

exports["default"] = _default;