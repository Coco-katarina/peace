"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antdMobile = require("antd-mobile");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _reactIf = require("react-if");

var _moment = _interopRequireDefault(require("moment"));

var _util = _interopRequireDefault(require("../util"));

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
})("0befc225b669070c35c044d80dfb5a1b", ".xform-custom-datetimepicker.disabled .am-list-content,.xform-custom-datetimepicker.disabled .am-list-extra{color:#bbb}.xform-custom-datetimepicker.nohidden .am-list-extra{overflow:initial}.datepicker{width:-webkit-max-content;width:-moz-max-content;width:max-content;-webkit-backface-visibility:hidden;backface-visibility:hidden;-ms-perspective:1000;perspective:1000}");

var ListItem = _antdMobile.List.Item;

var CustomDateTimePickerWidget = /*#__PURE__*/function (_Component) {
  _inherits(CustomDateTimePickerWidget, _Component);

  var _super = _createSuper(CustomDateTimePickerWidget);

  function CustomDateTimePickerWidget(props) {
    var _this;

    _classCallCheck(this, CustomDateTimePickerWidget);

    _this = _super.call(this, props);
    _this.onDateTimeFocus = _this.onDateTimeFocus.bind(_assertThisInitialized(_this));
    _this.onDateTimeBlur = _this.onDateTimeBlur.bind(_assertThisInitialized(_this));
    _this.state = {
      visible: false,
      isshow: true
    };
    return _this;
  }

  _createClass(CustomDateTimePickerWidget, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'data-time');
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
    key: "onDateTimeFocus",
    value: function onDateTimeFocus() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({
          visible: true
        });
      }, 100);
    }
  }, {
    key: "onDateTimeBlur",
    value: function onDateTimeBlur(reRender) {
      var _this3 = this;

      if (reRender) {
        //重新渲染移除焦点
        this.setState({
          visible: false,
          isshow: false
        }, function () {
          _this3.setState({
            isshow: true
          });
        });
      } else {
        this.setState({
          visible: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          options = _this$props.options,
          label = _this$props.label,
          required = _this$props.required,
          value = _this$props.value,
          _onChange = _this$props.onChange,
          placeholder = _this$props.placeholder,
          readonly = _this$props.readonly;
      var disabled = this.props.disabled;
      var popupContainer = this.props.formContext && this.props.formContext.popupContainer;
      var _this$state = this.state,
          visible = _this$state.visible,
          isshow = _this$state.isshow; //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过

      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      } //判断节点禁用属性


      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'xform-custom-widget': true,
          'xform-custom-datetimepicker': true,
          'xform-item-has-error': _errorType !== '',
          disabled: disabled,
          nohidden: true
        })
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.If, {
        condition: typeof value !== 'undefined' && value !== ''
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.Then, null, /*#__PURE__*/_react["default"].createElement(ListItem, {
        arrow: "horizontal",
        extra: isshow ? /*#__PURE__*/_react["default"].createElement(_antd.DatePicker, {
          className: "datepicker",
          bordered: false,
          popupStyle: {
            transform: 'scale(0.7)',
            display: visible ? 'block' : 'none'
          } //display none控制transform带来的闪烁
          ,
          disabled: disabled || readonly,
          showTime: true,
          onFocus: this.onDateTimeFocus,
          onBlur: function onBlur() {
            return _this4.onDateTimeBlur(true);
          },
          format: "YYYY-MM-DD HH:mm:ss",
          value: (0, _moment["default"])(value, 'YYYY-MM-DD HH:mm:ss'),
          getCalendarContainer: popupContainer,
          onOk: function onOk() {
            _this4.onDateTimeBlur(true);
          },
          onChange: function onChange(date, dateString) {
            _this4.onDateTimeBlur(true);

            _onChange(dateString);
          }
        }) : null
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: (0, _classnames["default"])({
          required: required
        })
      }, label))), /*#__PURE__*/_react["default"].createElement(_reactIf.Else, null, function () {
        return (
          /*#__PURE__*/
          // <DatePicker
          //     mode="datetime"
          //     format="YYYY-MM-DD HH:mm"
          //     disabled={disabled}
          //     onChange={(value) => {
          //         onChange(utils.formatDate(value, 'yyyy-MM-dd hh:mm'));
          //     }}
          //     extra={placeholder}
          //     {...options}
          // >
          //     <ListItem className='content' arrow="horizontal">
          //         <label className={classnames({
          //             required: required
          //         })}>{label}</label>
          //     </ListItem>
          // </DatePicker>
          _react["default"].createElement(ListItem, {
            arrow: "horizontal",
            extra: /*#__PURE__*/_react["default"].createElement(_antd.DatePicker, {
              className: "datepicker",
              bordered: false,
              popupStyle: {
                transform: 'scale(0.7)',
                display: visible ? 'block' : 'none'
              },
              disabled: disabled || readonly,
              showTime: true,
              onFocus: _this4.onDateTimeFocus,
              format: "YYYY-MM-DD HH:mm:ss",
              value: undefined,
              onBlur: _this4.onDateTimeBlur,
              getCalendarContainer: popupContainer,
              onChange: function onChange(date, dateString) {
                _this4.onDateTimeBlur();

                _onChange(dateString);
              }
            })
          }, /*#__PURE__*/_react["default"].createElement("label", {
            className: (0, _classnames["default"])({
              required: required
            })
          }, label))
        );
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage));
    }
  }]);

  return CustomDateTimePickerWidget;
}(_react.Component);

exports["default"] = CustomDateTimePickerWidget;