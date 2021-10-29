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

var _ampModal = _interopRequireDefault(require("./ampModal"));

var _utils = require("@peace/utils");

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

var onComposition = false; // cited from: https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

var CustomAmapInput = /*#__PURE__*/function (_Component) {
  _inherits(CustomAmapInput, _Component);

  var _super = _createSuper(CustomAmapInput);

  function CustomAmapInput(props) {
    var _this;

    _classCallCheck(this, CustomAmapInput);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleComposition", function (event) {
      var value = event.currentTarget.value;

      if (event.type === 'compositionend') {
        console.log('compositionend triggered!');
        onComposition = false; // fixed for Chrome v53+ and detect all Chrome
        // https://chromium.googlesource.com/chromium/src/
        // +/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/

        if (event.target instanceof HTMLInputElement && isChrome) {
          // fire onChange
          _this._handleFieldValueChange(value);
        }
      } else {
        onComposition = true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "showModal", function () {
      _this.setState({
        visible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOk", function (e) {
      //console.log(e);
      _this.value = _this.state.coordinate;

      _this.setState({
        visible: false,
        value: _this.state.coordinate
      });

      if (!onComposition) {
        if (_this.timer !== null) {
          window.clearTimeout(_this.timer);
          _this.timer = window.setTimeout(function () {
            _this._handleFieldValueChange(_this.state.coordinate);
          }, 100);
        } else {
          _this.timer = window.setTimeout(function () {
            _this._handleFieldValueChange(_this.state.coordinate);
          }, 100);
        }
      }

      if (_this.value) {
        var ampAPIUrl = 'https://restapi.amap.com/v3/geocode/regeo';
        var query = {
          key: '15504371e7f2ccc0236a4989ff21bafd',
          location: _this.value
        };

        _utils.Request.getByDirect(ampAPIUrl, query).then(function (res) {
          var _res$regeocode$addres = res.regeocode.addressComponent,
              province = _res$regeocode$addres.province,
              city = _res$regeocode$addres.city,
              district = _res$regeocode$addres.district,
              township = _res$regeocode$addres.township,
              streetNumber = _res$regeocode$addres.streetNumber;

          _this.setState({
            addressValue: province + city + district + township + streetNumber.street + streetNumber.number
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (e) {
      //console.log(e);
      _this.setState({
        visible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getCoordinate", function (Coordinate) {
      _this.setState({
        coordinate: Coordinate
      });
    });

    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleComposition = _this.handleComposition.bind(_assertThisInitialized(_this));
    _this._handleFieldValueChange = _this._handleFieldValueChange.bind(_assertThisInitialized(_this));
    _this.timer = null;
    _this.value = props.value;
    _this.state = {
      value: props.value,
      visible: false,
      coordinate: null,
      addressValue: null
    };
    return _this;
  }

  _createClass(CustomAmapInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'input');

      if (this.value) {
        var ampAPIUrl = 'https://restapi.amap.com/v3/geocode/regeo';
        var query = {
          key: '15504371e7f2ccc0236a4989ff21bafd',
          location: this.value
        };

        _utils.Request.getByDirect(ampAPIUrl, query).then(function (res) {
          var _res$regeocode$addres2 = res.regeocode.addressComponent,
              province = _res$regeocode$addres2.province,
              city = _res$regeocode$addres2.city,
              district = _res$regeocode$addres2.district,
              township = _res$regeocode$addres2.township,
              streetNumber = _res$regeocode$addres2.streetNumber;

          _this2.setState({
            addressValue: province + city + district + township + streetNumber.street + streetNumber.number
          });
        });
      }
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.value = nextProps.value;
        this.setState({
          value: nextProps.value
        });
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
    key: "handleChange",
    value: function handleChange(event) {
      var _this3 = this;

      var value = event.currentTarget.value;
      this.value = value;
      this.setState({
        value: value
      });

      if (!onComposition) {
        if (this.timer !== null) {
          window.clearTimeout(this.timer);
          this.timer = window.setTimeout(function () {
            _this3._handleFieldValueChange(_this3.value);
          }, 100);
        } else {
          this.timer = window.setTimeout(function () {
            _this3._handleFieldValueChange(_this3.value);
          }, 100);
        }
      }
    }
  }, {
    key: "_handleFieldValueChange",
    value: function _handleFieldValueChange(value) {
      var onChange = this.props.onChange;
      this.setState({
        value: value
      }, function () {
        onChange(value);
      });
    } //过滤掉react-json-schema中注入option中的属性，防止这部分属性添加到组件上

  }, {
    key: "_filterSystemOptions",
    value: function _filterSystemOptions(options) {
      var BLACK_LIST = ['enumOptions', 'disabled', 'readonly', 'help', 'emptyValue'];
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
      var _this4 = this;

      var required = this.props.required;
      var schema = this.props.schema;
      var options = this.props.options;
      var readonly = this.props.readonly,
          autofocus = this.props.autofocus,
          disabled = this.props.disabled,
          placeholder = this.props.placeholder,
          value = this.state.value,
          addressValue = this.state.addressValue; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      } //解析schema中的约定maxlength


      var maxLength = schema.maxLength;
      var minLength = schema.minLength; //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过

      var validateMessage = '';

      var _errorType = options._errorType,
          validate = options.validate,
          otherOptions = _objectWithoutProperties(options, _excluded);

      otherOptions = this._filterSystemOptions(otherOptions);
      _errorType = _errorType || '';

      if (_errorType !== '' && typeof validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-input': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "am-list-item am-list-item-middle am-list-item-mobile"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "am-list-line am-list-line-multiple am-list-line-wrap mobile-stamp"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: (0, _classnames["default"])({
          'label-text': true // required: required

        })
      }, "\u5916\u5E26\u5730\u70B9"), /*#__PURE__*/_react["default"].createElement(_antd.Input, _extends({
        type: "text",
        maxLength: maxLength || Infinity,
        minLength: minLength || 0,
        placeholder: placeholder,
        value: addressValue,
        readOnly: readonly,
        disabled: disabled,
        autoFocus: autofocus,
        onChange: this.handleChange,
        onCompositionStart: this.handleComposition,
        onCompositionUpdate: this.handleComposition,
        onCompositionEnd: this.handleComposition
      }, otherOptions, {
        onClick: function onClick(e) {
          return _this4.showModal(e);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage))), /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        width: "800px",
        title: "\u8BF7\u9009\u62E9\u5730\u70B9",
        visible: this.state.visible,
        onOk: this.handleOk,
        onCancel: this.handleCancel,
        destroyOnClose: true
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          paddingBottom: "18px",
          fontSize: "18px"
        }
      }, this.state.coordinate ? '当前选中经纬度为:' + this.state.coordinate : "请点击地图选择经纬度"), /*#__PURE__*/_react["default"].createElement(_ampModal["default"], {
        getCoordinate: this.getCoordinate,
        value: value
      })));
    }
  }]);

  return CustomAmapInput;
}(_react.Component);

exports["default"] = CustomAmapInput;