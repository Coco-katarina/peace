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

var Option = _antd.AutoComplete.Option;

var CustomSuggestSelect = /*#__PURE__*/function (_Component) {
  _inherits(CustomSuggestSelect, _Component);

  var _super = _createSuper(CustomSuggestSelect);

  function CustomSuggestSelect(props) {
    var _this;

    _classCallCheck(this, CustomSuggestSelect);

    _this = _super.call(this, props);
    _this.handleSelectChange = _this.handleSelectChange.bind(_assertThisInitialized(_this));
    _this.handleKeywordChange = _this.handleKeywordChange.bind(_assertThisInitialized(_this));
    _this.timer = null;
    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(CustomSuggestSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'suggest-select');
    } // static getDerivedStateFromProps(nextProps, state) {
    //     if (nextProps.value !== state.value) {
    //         return {
    //             value: nextProps.value
    //         };
    //     }
    //     return null;
    // }

  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: "handleSelectChange",
    value: function handleSelectChange(value) {
      var onChange = this.props.onChange;
      this.setState({
        value: value
      });
      onChange(value);
    }
  }, {
    key: "handleKeywordChange",
    value: function handleKeywordChange(fieldCode, value) {
      var _this$props = this.props,
          schema = _this$props.schema,
          onChange = _this$props.onChange;
      var getFieldDataFromDataSource = this.props.formContext && this.props.formContext.getFieldDataFromDataSource;

      if (this.timer !== null) {
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(function () {
          if (typeof getFieldDataFromDataSource === 'function') {
            // 注意这里必须先调用onChange属性之后才能再去触发数据源更新，否则value的值不会更新
            onChange(value);
            getFieldDataFromDataSource(fieldCode, schema, {
              suggestKeyword: value
            }, false, true);
          }
        }, 200);
      } else {
        this.timer = window.setTimeout(function () {
          if (typeof getFieldDataFromDataSource === 'function') {
            onChange(value);
            getFieldDataFromDataSource(fieldCode, schema, {
              suggestKeyword: value
            }, false, true);
          }
        }, 200);
      }

      this.setState({
        value: value
      });
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
      var _this2 = this;

      var popupContainer = this.props.formContext && this.props.formContext.popupContainer;
      var _this$props2 = this.props,
          schema = _this$props2.schema,
          id = _this$props2.id,
          options = _this$props2.options,
          disabled = _this$props2.disabled,
          readonly = _this$props2.readonly,
          autofocus = _this$props2.autofocus,
          placeholder = _this$props2.placeholder; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      } // 对于value值为空字符串的情况，value的值传入undefined，这样才能显示组件的placeholder


      var value = this.state.value;

      if (value === '') {
        value = undefined;
      } // enumOptions会由react-jsonschema-form注入到组件的options中 https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components note


      var enumOptions = options.enumOptions || [];

      if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
        enumOptions = schema.data;
      } // 这个idPrefix决定所有字段的id的前缀，与react-jsonschema-form组件中的idPrefix属性相同https://github.com/mozilla-services/react-jsonschema-form#id-prefix


      var idPrefix = 'root';
      var fieldCode = id.slice(idPrefix.length + 1); //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过

      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-suggest-select': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement(_antd.AutoComplete, {
        defaultActiveFirstOption: false,
        filterOption: false,
        value: value,
        disabled: disabled,
        readOnly: readonly,
        onSearch: function onSearch(value) {
          _this2.handleKeywordChange(fieldCode, value);
        },
        onSelect: this.handleSelectChange,
        autoFocus: autofocus,
        placeholder: placeholder,
        getPopupContainer: popupContainer //{...options}

      }, enumOptions.map(function (enums) {
        return /*#__PURE__*/_react["default"].createElement(Option, {
          key: enums.value,
          value: enums.value
        }, enums.label);
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage));
    }
  }]);

  return CustomSuggestSelect;
}(_react.Component);

exports["default"] = CustomSuggestSelect;