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
})("5bbc05c34c549a7fb86faf1b9d6e86b5", ".xform-stamp{height:420px;overflow:auto}.xform-stamp .title{font-size:16px}.xform-stamp .ant-radio-wrapper{border:1px solid #3d8af5;border-radius:5px;padding:5px 10px;background:#ecf6fd;margin:15.5px;box-shadow:10px 10px 5px #888}.xform-stamp .in-stock{background-color:rgba(17,202,17,.2196078431372549)}.xform-stamp .in-stock,.xform-stamp .lend-out{position:absolute;top:5px;right:5px;color:rgba(0,0,0,.4);padding:4px;border-radius:5px}.xform-stamp .lend-out{background-color:hsla(0,0%,50.2%,.2784313725490196)}.xform-stamp .img{text-align:center;width:160px;margin:10px;line-height:160px;height:160px;border:1px solid #a7a7a7;border-radius:8px}.xform-stamp .img img{width:148px;max-height:148px}.xform-stamp .detail{width:182px}");

var StampModal = /*#__PURE__*/function (_Component) {
  _inherits(StampModal, _Component);

  var _super = _createSuper(StampModal);

  function StampModal(props) {
    _classCallCheck(this, StampModal);

    return _super.call(this, props);
  }

  _createClass(StampModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onValueChange = _this$props.onValueChange,
          value = _this$props.value,
          data = _this$props.data;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "xform-stamp"
      }, data ? /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, {
        onChange: onValueChange,
        value: value
      }, data.map(function (data) {
        return /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
          value: data.value,
          key: data.id
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "title"
        }, data.name), /*#__PURE__*/_react["default"].createElement("div", {
          className: data.state == 1 ? "in-stock" : "lend-out"
        }, data.state == 1 ? "在库" : "外借"), data.imgURL ? /*#__PURE__*/_react["default"].createElement("div", {
          className: "img"
        }, /*#__PURE__*/_react["default"].createElement("img", {
          src: data.imgURL
        })) : /*#__PURE__*/_react["default"].createElement("div", {
          className: "img"
        }, "\u6682\u65E0\u5370\u7AE0\u56FE\u7247"), /*#__PURE__*/_react["default"].createElement("div", {
          className: "detail"
        }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", null, "\u5370\u7AE0\u7C7B\u578B\uFF1A"), data.label), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", null, "\u4FDD\u7BA1\u4EBA\uFF1A"), data.keeper), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", null, "\u5370\u7AE0\u72B6\u6001\uFF1A"), data.state == 1 ? "印章在库，可以借用" : "印章外借中...", " ")));
      })) : /*#__PURE__*/_react["default"].createElement("div", null, "\u6682\u65E0\u5370\u7AE0\u53EF\u4EE5\u9009\u62E9"));
    }
  }]);

  return StampModal;
}(_react.Component);

exports["default"] = StampModal;