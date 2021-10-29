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

var _stampModal = _interopRequireDefault(require("./stampModal"));

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
})("ef1e9f847eef230576782a03e7f3d3b8", ".xform-stamp-mobile{height:420px;overflow-y:auto;overflow-x:hidden;background:#ebeff5}.xform-stamp-mobile .mobile-stamp-item{height:72px;width:100%;margin-bottom:15.5px;background:#fff;padding:12px 16px;border-radius:4px;position:relative}.xform-stamp-mobile .title-border{width:100%;margin:2px 0}.xform-stamp-mobile .item-title{font-size:16px;color:#383a3b;position:absolute;margin:9px 18px}.xform-stamp-mobile .item-icon{position:relative;float:right;margin:12px 0}.xform-stamp-mobile .ant-radio-wrapper{border-radius:5px;padding:5px 10px;background:#fff;margin:15.5px 0}.xform-stamp-mobile .in-stock{background-color:rgba(17,202,17,.2196078431372549)}.xform-stamp-mobile .in-stock,.xform-stamp-mobile .lend-out{position:absolute;top:5px;right:5px;color:rgba(0,0,0,.4);padding:4px;border-radius:5px}.xform-stamp-mobile .lend-out{background-color:hsla(0,0%,50.2%,.2784313725490196)}.xform-stamp-mobile .img{display:inline-block;text-align:center;width:48px;line-height:0;min-height:48px;height:auto;border:1px solid #a7a7a7;border-radius:8px}.xform-stamp-mobile .radio-body{display:flex;justify-content:space-between;margin-bottom:-10px}.xform-stamp-mobile .radio-body .detail{display:inline-block;width:52%}.xform-stamp-mobile .radio-body .detail .detail-txt{width:100%;white-space:normal;word-break:break-all}.xform-stamp-mobile-header-search{width:100%;padding:6px;background:#fff;margin-bottom:6px;position:relative}.xform-stamp-mobile-header-search .search-icon{position:absolute;top:12px;right:12px}.xform-mobile-stamp-outer-page{background:#fff;position:absolute;z-index:99;top:0}.xform-mobile-stamp-outer-page .xform-mobile-stamp-header{background:#2d69ff;width:100%}.am-list-item-mobile{padding:13px 20px}.mobile-stamp .ant-input{height:38px;border-radius:0;border-color:#eaeaea}.mobile-stamp .ant-input[disabled]{border-color:#eaeaea;background-color:transparent!important}.label-text{width:100px;color:#000;font-size:14px}");

var onComposition = false; // cited from: https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); // const tempData = [ //测试数据
//     {
//         id: 2,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "1水电费",
//         label: "财务章",
//         name: "XX公章2XX公章",
//         state: 1,
//         value: 2
//     }, {
//         id: 12,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "超级管理员",
//         label: "区域公章",
//         name: "XX公章4",
//         state: 1,
//         value: 12
//     }, {
//         id: 11,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "超级管理员",
//         label: "区域公章",
//         name: "XX公章4",
//         state: 1,
//         value: 11
//     }, {
//         id: 13,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "超级管理员",
//         label: "区域公章",
//         name: "XX公章4",
//         state: 1,
//         value: 13
//     }, {
//         id: 14,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "超级管理员",
//         label: "区域公章",
//         name: "XX公章4",
//         state: 1,
//         value: 14
//     }
// ]

var CustomStampInput = /*#__PURE__*/function (_Component) {
  _inherits(CustomStampInput, _Component);

  var _super = _createSuper(CustomStampInput);

  function CustomStampInput(props) {
    var _this;

    _classCallCheck(this, CustomStampInput);

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
      // show mask
      window.ReactNativeWebView.postMessage('isclose');

      _this.setState({
        visible: true
      }); // enable parent div scroll


      var parentDom = document.getElementById("xform-root-process");

      if (parentDom) {
        parentDom.style.height = document.body.clientHeight + 'px';
        parentDom.style.overflow = 'hidden';
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOk", function (e) {
      var data = _this.props.schema.stampData;

      if (data) {
        // console.log(e);
        _this.value = _this.state.value;

        _this.setState({
          visible: false,
          value: _this.state.value,
          valueName: data.find(function (item) {
            return item.value == _this.state.value;
          }) ? data.find(function (item) {
            return item.value == _this.state.value;
          }).name : null
        }, function () {
          _this.setDOMVisible();
        });

        if (!onComposition) {
          if (_this.timer !== null) {
            window.clearTimeout(_this.timer);
            _this.timer = window.setTimeout(function () {
              _this._handleFieldValueChange(_this.state.value);
            }, 100);
          } else {
            _this.timer = window.setTimeout(function () {
              _this._handleFieldValueChange(_this.state.value);
            }, 100);
          }
        }
      } else {
        _this.setState({
          visible: false
        }, function () {
          _this.setDOMVisible();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (e) {
      _this.setState({
        visible: false
      }, function () {
        _this.setDOMVisible();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onValueChange", function (value) {
      var data = _this.props.schema.stampData;

      if (data) {
        _this.setState({
          visible: false,
          value: value,
          valueName: data.find(function (item) {
            return item.value == value;
          }) ? data.find(function (item) {
            return item.value == value;
          }).name : null
        }, function () {
          _this.setDOMVisible();
        });

        if (!onComposition) {
          if (_this.timer !== null) {
            window.clearTimeout(_this.timer);
            _this.timer = window.setTimeout(function () {
              _this._handleFieldValueChange(value);
            }, 100);
          } else {
            _this.timer = window.setTimeout(function () {
              _this._handleFieldValueChange(value);
            }, 100);
          }
        }
      } else {
        _this.setState({
          visible: false
        }, function () {
          _this.setDOMVisible();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "backClick", function (e) {
      // e.preventDefault();
      _this.setState({
        visible: false
      });

      _this.setDOMVisible();
    });

    _defineProperty(_assertThisInitialized(_this), "setDOMVisible", function () {
      window.ReactNativeWebView.postMessage('isgoback');
      var parentDom = document.getElementById("xform-root-process");

      if (parentDom) {
        parentDom.style.height = 'auto';
        parentDom.style.overflow = null;
      }
    });

    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleComposition = _this.handleComposition.bind(_assertThisInitialized(_this));
    _this._handleFieldValueChange = _this._handleFieldValueChange.bind(_assertThisInitialized(_this));
    _this.timer = null;
    _this.value = props.value;
    var stampData = props.schema.stampData;
    var valueName = stampData && props.value ? stampData.find(function (v) {
      return v.value == props.value;
    }) : null;
    _this.state = {
      value: props.value,
      valueName: valueName ? valueName.name : null,
      visible: false
    };
    return _this;
  }

  _createClass(CustomStampInput, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var this_ = this;
      window.document.addEventListener('message', function (e) {
        var message = e.data; // if(JSON.parse(message) == 'close'){

        this_.backClick(); // }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'input');
      this.setState({
        visible: false
      });
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var stampData = this.props.schema.stampData;

      if (nextProps.value !== this.props.value) {
        this.value = nextProps.value;
        this.setState({
          value: nextProps.value,
          valueName: stampData.find(function (v) {
            return v.value == nextProps.value;
          }) ? stampData.find(function (v) {
            return v.value == nextProps.value;
          }).name : null
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
      var _this2 = this;

      var value = event.currentTarget.value;
      console.log(event);
      this.value = value;
      this.setState({
        value: value
      });

      if (!onComposition) {
        if (this.timer !== null) {
          window.clearTimeout(this.timer);
          this.timer = window.setTimeout(function () {
            _this2._handleFieldValueChange(_this2.value);
          }, 100);
        } else {
          this.timer = window.setTimeout(function () {
            _this2._handleFieldValueChange(_this2.value);
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
      var _this3 = this;

      var _this$props = this.props,
          label = _this$props.label,
          required = _this$props.required;
      var clientWidth = document.body.clientWidth,
          clientHeight = document.body.clientHeight,
          headerHeight = 0.0541 * clientHeight,
          bodyHeight = clientHeight - 0.0541 * clientHeight;
      var schema = this.props.schema;
      var options = this.props.options;
      var readonly = this.props.readonly,
          autofocus = this.props.autofocus,
          disabled = this.props.disabled,
          placeholder = this.props.placeholder,
          value = this.state.value,
          valueName = this.state.valueName,
          stampData = schema.stampData; //判断节点禁用属性

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
          'xform-item-has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "am-list-item am-list-item-middle am-list-item-mobile"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "am-list-line am-list-line-multiple am-list-line-wrap mobile-stamp"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: (0, _classnames["default"])({
          'label-text': true,
          required: required
        })
      }, label), /*#__PURE__*/_react["default"].createElement(_antd.Input, _extends({
        type: "text",
        maxLength: maxLength || Infinity,
        minLength: minLength || 0,
        placeholder: placeholder,
        value: valueName,
        readOnly: readonly,
        disabled: disabled,
        autoFocus: autofocus,
        onChange: this.handleChange,
        onCompositionStart: this.handleComposition,
        onCompositionUpdate: this.handleComposition,
        onCompositionEnd: this.handleComposition
      }, otherOptions, {
        onClick: function onClick(e) {
          return _this3.showModal(e);
        }
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-item-error-explain"
      }, validateMessage), this.state.visible ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-mobile-stamp-outer-page",
        style: {
          width: clientWidth,
          height: clientHeight
        }
      }, /*#__PURE__*/_react["default"].createElement(_stampModal["default"], {
        bodyHeight: bodyHeight,
        clientWidth: clientWidth,
        onValueChange: this.onValueChange,
        value: value,
        data: stampData,
        onOk: this.handleOk,
        onCancel: this.handleCancel
      })) : '');
    }
  }]);

  return CustomStampInput;
}(_react.Component);

exports["default"] = CustomStampInput;