"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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
})("3d6b6f12ad7171d06c11c04c00614fde", ".xform-custom-cascader .am-list-line .am-list-content{width:100px;max-width:100px;margin-right:10px}.xform-custom-cascader .am-list-line .am-list-extra{flex:1;-webkit-flex:1}@-webkit-keyframes slide-in-from-bottom1{0%{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes slide-in-from-bottom1{0%{transform:translateY(100%)}to{transform:translateY(0)}}@-webkit-keyframes slide-out-to-bottom1{0%{transform:translateY(0)}to{transform:translateY(100%)}}@keyframes slide-out-to-bottom1{0%{transform:translateY(0)}to{transform:translateY(100%)}}.xform-custom-cascader .selector-holder{height:24px;line-height:24px;font-size:17px;color:#999}.xform-custom-cascader .option-wrapper{height:80%;overflow:auto}.xform-custom-cascader .option-item{height:45px;text-align:left;line-height:45px;font-size:16px;color:#000;cursor:pointer;padding-left:20px}.xform-custom-cascader .option-item.selected{color:#0e80d2}.xform-custom-cascader .popup-wrapper{position:absolute;background-color:transparent;z-index:3}.xform-custom-cascader .popup-wrapper .popup-mask{top:0;bottom:0;left:0;right:0;margin:0;padding:0;width:100%;background-color:rgba(0,0,0,.4);overflow:hidden;position:fixed;transition:all .2s}.xform-custom-cascader .popup-wrapper .popup-content{position:absolute;background:#fff;left:0;right:0;bottom:0;top:50%;transform:translate3d(0,100%,0);transition:all .2s ease-in-out;opacity:0;border-radius:0}.xform-custom-cascader .popup-wrapper .popup-content .popup-content-header{height:42px;border-bottom:1px solid #d9d9d9;position:relative;text-align:center}.xform-custom-cascader .popup-wrapper .popup-content .popup-content-header .popup-content-header-left{font-size:17px;height:42px;line-height:42px;float:left;margin-left:20px;color:#0e80d2}.xform-custom-cascader .popup-wrapper .popup-content .popup-content-header .popup-content-header-right{height:42px;line-height:42px;float:right;margin-right:20px;font-size:17px;cursor:pointer;color:#0e80d2}.xform-custom-cascader .popup-wrapper .popup-content .popup-content-header .popup-content-header-center{text-align:center;display:inline-block;height:42px;line-height:42px;font-size:15px;color:#333}.xform-custom-cascader .popup-wrapper .slideUp{opacity:1;transform:translateZ(0)}.xform-custom-cascader .popup-wrapper .slide-in-from-bottom{opacity:1;-webkit-animation:slide-in-from-bottom1 .2s ease-in both;animation:slide-in-from-bottom1 .2s ease-in both}.xform-custom-cascader .popup-wrapper .slide-out-to-bottom{-webkit-animation:slide-out-to-bottom1 .2s ease-in both;animation:slide-out-to-bottom1 .2s ease-in both}.xform-custom-cascader.disabled .am-list-content,.xform-custom-cascader.disabled .am-list-extra{color:#bbb}");

var PopPanel = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PopPanel, _React$PureComponent);

  var _super = _createSuper(PopPanel);

  function PopPanel(props) {
    var _this;

    _classCallCheck(this, PopPanel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        showHideAnimation: true
      });

      setTimeout(function () {
        _this.props.onClose();

        _this.setState({
          showHideAnimation: false
        });
      }, 200);
    });

    _defineProperty(_assertThisInitialized(_this), "handleContentClicked", function (e) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function () {
      _this.props.onSubmit();

      _this.handleClose();
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.handleClose();
    });

    _this.state = {
      showHideAnimation: false
    };
    return _this;
  }

  _createClass(PopPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.show) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "popup-wrapper"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "popup-mask",
          onClick: this.handleClose
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])({
            'popup-content': true,
            'slideUp': true,
            'slide-in-from-bottom': !this.state.showHideAnimation,
            'slide-out-to-bottom': this.state.showHideAnimation
          }),
          onClick: this.handleContentClicked
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "popup-content-header clearfix"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "popup-content-header-left",
          onClick: this.handleCancel
        }, "\u53D6\u6D88"), /*#__PURE__*/_react["default"].createElement("div", {
          className: "popup-content-header-center"
        }, this.props.title), /*#__PURE__*/_react["default"].createElement("div", {
          className: "popup-content-header-right",
          onClick: this.handleSubmit
        }, "\u786E\u5B9A")), _react["default"].Children.map(this.props.children, function (child) {
          return /*#__PURE__*/_react["default"].cloneElement(child, {
            onClose: _this2.handleClose
          });
        }))));
      } else {
        return null;
      }
    }
  }]);

  return PopPanel;
}(_react["default"].PureComponent);

_defineProperty(PopPanel, "propTypes", {
  show: _propTypes["default"].bool,
  title: _propTypes["default"].string,
  onClose: _propTypes["default"].func,
  onSubmit: _propTypes["default"].func,
  children: _propTypes["default"].any
});

var _default = PopPanel;
exports["default"] = _default;