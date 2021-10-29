"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _antdMobile = require("antd-mobile");

var _pinyin = _interopRequireDefault(require("../../../../../../utils/pinyin"));

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

var pinyin = new _pinyin["default"]();

var StampModal = /*#__PURE__*/function (_Component) {
  _inherits(StampModal, _Component);

  var _super = _createSuper(StampModal);

  function StampModal(props) {
    var _this;

    _classCallCheck(this, StampModal);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (data, e) {
      e.preventDefault();
      console.log(data.value);

      _this.props.onValueChange(data.value);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearch", function (e) {
      var value = e.target.value;
      var data = _this.props.data;
      var rslt = [];
      data.map(function (item) {
        if (item.name.indexOf(value) != -1 || pinyin.getCamelChars(item.name).toLowerCase().indexOf(value.toLowerCase()) != -1 || pinyin.getFullChars(item.name).toLowerCase().indexOf(value.toLowerCase()) != -1) {
          rslt.push(item);
        }
      });

      _this.setState({
        filterList: rslt
      });
    });

    _this.state = {
      filterList: props.data
    };
    return _this;
  }

  _createClass(StampModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          onValueChange = _this$props.onValueChange,
          value = _this$props.value,
          data = _this$props.data,
          bodyHeight = _this$props.bodyHeight,
          clientWidth = _this$props.clientWidth,
          onCancel = _this$props.onCancel,
          onOk = _this$props.onOk;
      var filterList = this.state.filterList; // const redioInnerWidth = clientWidth - 53;

      var contentHeaderHight = 44;
      var contentbodyHeight = bodyHeight - contentHeaderHight;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          background: '#EBEFF5'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-stamp-mobile-header-search",
        style: {
          height: contentHeaderHight
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        placeholder: "\u8F93\u5165\u5370\u7AE0\u540D\u79F0",
        onChange: this.handleSearch
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "search-icon"
      }, /*#__PURE__*/_react["default"].createElement(_antdMobile.Icon, {
        type: "search",
        size: "sm"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-stamp-mobile",
        style: {
          height: contentbodyHeight
        }
      }, filterList ? filterList.map(function (data) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "mobile-stamp-item",
          onClick: function onClick(e) {
            return _this2.handleClick(data, e);
          }
        }, data.imgURL ? /*#__PURE__*/_react["default"].createElement("div", {
          className: "img"
        }, /*#__PURE__*/_react["default"].createElement("img", {
          style: {
            width: '100%'
          },
          src: data.imgURL
        })) : /*#__PURE__*/_react["default"].createElement("div", {
          className: "img"
        }, "\u6682\u65E0\u5370\u7AE0\u56FE\u7247"), /*#__PURE__*/_react["default"].createElement("span", {
          className: "item-title"
        }, data.name), /*#__PURE__*/_react["default"].createElement("span", {
          className: "item-icon"
        }, /*#__PURE__*/_react["default"].createElement(_antdMobile.Icon, {
          type: "right",
          size: "xs"
        })));
      }) : /*#__PURE__*/_react["default"].createElement("div", null, "\u6682\u65E0\u5370\u7AE0\u53EF\u4EE5\u9009\u62E9")));
    }
  }]);

  return StampModal;
}(_react.Component);

exports["default"] = StampModal;