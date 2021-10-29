"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = localeMessagesWrapper;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _localeMessages = require("./i18n/localeMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function localeMessagesWrapper(YComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_Component) {
    _inherits(_class, _Component);

    var _super = _createSuper(_class);

    function _class(props) {
      var _this;

      _classCallCheck(this, _class);

      _this = _super.call(this, props);
      _this.getWrappedInstance = _this.getWrappedInstance.bind(_assertThisInitialized(_this));
      _this.XFormSubmit = _this.XFormSubmit.bind(_assertThisInitialized(_this));
      _this.XFormInitFormData = _this.XFormInitFormData.bind(_assertThisInitialized(_this));
      _this.XFormReset = _this.XFormReset.bind(_assertThisInitialized(_this));
      _this.XFormSetFormData = _this.XFormSetFormData.bind(_assertThisInitialized(_this));
      _this.XFormCurrentFormData = _this.XFormCurrentFormData.bind(_assertThisInitialized(_this));
      _this.XFormBizData = _this.XFormBizData.bind(_assertThisInitialized(_this));
      _this.XFormValidate = _this.XFormValidate.bind(_assertThisInitialized(_this));
      _this.XFormValidateSync = _this.XFormValidateSync.bind(_assertThisInitialized(_this));
      _this.XFormFetchAllFromDataSource = _this.XFormFetchAllFromDataSource.bind(_assertThisInitialized(_this));
      _this.XFormFetchFromDataSource = _this.XFormFetchFromDataSource.bind(_assertThisInitialized(_this));
      _this.wrappedInstance = /*#__PURE__*/_react["default"].createRef();
      _this.state = {
        locale: props.locale
      };
      return _this;
    }

    _createClass(_class, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.locale !== this.props.locale) {
          this.setState({
            locale: nextProps.locale
          });
        }
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        return this.wrappedInstance.current;
      }
    }, {
      key: "XFormSubmit",
      value: function XFormSubmit() {
        this.getWrappedInstance().XFormSubmit();
      }
    }, {
      key: "XFormInitFormData",
      value: function XFormInitFormData() {
        return this.getWrappedInstance().XFormInitFormData();
      }
    }, {
      key: "XFormReset",
      value: function XFormReset() {
        this.getWrappedInstance().XFormReset();
      }
    }, {
      key: "XFormSetFormData",
      value: function XFormSetFormData() {
        var _this$getWrappedInsta;

        (_this$getWrappedInsta = this.getWrappedInstance()).XFormSetFormData.apply(_this$getWrappedInsta, arguments);
      }
    }, {
      key: "XFormCurrentFormData",
      value: function XFormCurrentFormData() {
        return this.getWrappedInstance().XFormCurrentFormData();
      }
    }, {
      key: "XFormBizData",
      value: function XFormBizData() {
        return this.getWrappedInstance().XFormBizData();
      }
    }, {
      key: "XFormValidate",
      value: function XFormValidate() {
        var _this$getWrappedInsta2;

        (_this$getWrappedInsta2 = this.getWrappedInstance()).XFormValidate.apply(_this$getWrappedInsta2, arguments);
      }
    }, {
      key: "XFormValidateSync",
      value: function XFormValidateSync() {
        return this.getWrappedInstance().XFormValidateSync();
      }
    }, {
      key: "XFormFetchAllFromDataSource",
      value: function XFormFetchAllFromDataSource() {
        this.getWrappedInstance().XFormFetchAllFromDataSource();
      }
    }, {
      key: "XFormFetchFromDataSource",
      value: function XFormFetchFromDataSource() {
        var _this$getWrappedInsta3;

        (_this$getWrappedInsta3 = this.getWrappedInstance()).XFormFetchFromDataSource.apply(_this$getWrappedInsta3, arguments);
      }
    }, {
      key: "render",
      value: function render() {
        var locale = this.state.locale;
        return /*#__PURE__*/_react["default"].createElement(YComponent, _extends({
          ref: this.wrappedInstance,
          messages: _localeMessages.messages[locale] || _localeMessages.messages['en-us']
        }, this.props));
      }
    }]);

    return _class;
  }(_react.Component), _defineProperty(_class, "propTypes", {
    locale: _propTypes["default"].string
  }), _defineProperty(_class, "defaultProps", {
    locale: navigator.language.toLocaleLowerCase()
  }), _temp;
}