"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PlatformPopover;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _localeMessages = require("../../i18n/localeMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 编辑器顶部操作栏：切换当前配置的端浮层组件
 * @props: visible（popover是否显示） platform（当前选中的端，laptop：PC端；mobile：手机端；both：两者通用） platformChangeHandler（端切换处理回调方法） platformVisibleChangeHandler（popover的onVisibleChange处理器）
 */
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
})("18a460fae019620a3b5d8a704afb5380", ".app-xform-builder-platform-change-popover{z-index:1000!important}.app-xform-builder-platform-change-popover .platform-change-popover .platform-line{display:block;height:30px;line-height:30px}.app-xform-builder-platform-change-popover .platform-change-popover .platform-line .platform-icon{font-size:14px;color:rgba(0,0,0,.65);margin-right:5px;vertical-align:middle}.app-xform-builder-platform-change-popover .platform-change-popover .platform-line .platform-name{font-size:14px;color:rgba(0,0,0,.65)}");

var RadioGroup = _antd.Radio.Group;

function PlatformPopover(props) {
  var visible = props.visible,
      platform = props.platform,
      platformChangeHandler = props.platformChangeHandler,
      platformVisibleChangeHandler = props.platformVisibleChangeHandler,
      children = props.children,
      messages = props.messages,
      popupContainer = props.popupContainer;
  return /*#__PURE__*/_react["default"].createElement(_antd.Popover, {
    title: "",
    content: /*#__PURE__*/_react["default"].createElement("div", {
      className: "platform-change-wrapper"
    }, /*#__PURE__*/_react["default"].createElement(RadioGroup, {
      value: platform,
      onChange: function onChange(event) {
        var value = event.target.value;
        platformChangeHandler(value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
      className: "platform-line",
      value: "laptop"
    }, /*#__PURE__*/_react["default"].createElement("i", {
      className: "xform-iconfont platform-icon"
    }, "\uE842"), /*#__PURE__*/_react["default"].createElement("span", {
      className: "platform-name"
    }, messages[(0, _localeMessages.getMessageId)('xformChangePlatformPCName')])), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
      className: "platform-line",
      value: "mobile"
    }, /*#__PURE__*/_react["default"].createElement("i", {
      className: "xform-iconfont platform-icon"
    }, "\uE7B2"), /*#__PURE__*/_react["default"].createElement("span", {
      className: "platform-name"
    }, messages[(0, _localeMessages.getMessageId)('xformChangePlatformMobileName')])), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
      className: "platform-line",
      value: "both"
    }, /*#__PURE__*/_react["default"].createElement("i", {
      className: "xform-iconfont platform-icon"
    }, "\uE683"), /*#__PURE__*/_react["default"].createElement("span", {
      className: "platform-name"
    }, messages[(0, _localeMessages.getMessageId)('xformChangePlatformBothName')])))),
    visible: visible,
    onVisibleChange: platformVisibleChangeHandler,
    trigger: "click",
    placement: "bottomLeft",
    overlayClassName: "app-xform-builder-platform-change-popover",
    getPopupContainer: popupContainer
  }, children);
}

PlatformPopover.propTypes = {
  messages: _propTypes["default"].object.isRequired,
  children: _propTypes["default"].element.isRequired,
  visible: _propTypes["default"].bool.isRequired,
  platform: _propTypes["default"].oneOf(['laptop', 'mobile', 'both']).isRequired,
  platformChangeHandler: _propTypes["default"].func.isRequired,
  platformVisibleChangeHandler: _propTypes["default"].func.isRequired,
  popupContainer: _propTypes["default"].func.isRequired
};