"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ViewSchemaModal;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _reactCopyToClipboard = _interopRequireDefault(require("react-copy-to-clipboard"));

var _localeMessages = require("../../i18n/localeMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 查看Schema浮层组件
 * @props: visible(浮层是否可见) modalCloseHandler(关闭浮层回调方法) formSchema（浮层内的schema数据）
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
})("8421c4ed3d83072376df4a55a98e1a08", ".app-xform-builder-view-schema-modal{z-index:1000!important}");

var TextArea = _antd.Input.TextArea;

function ViewSchemaModal(props) {
  var messages = props.messages,
      visible = props.visible,
      modalCloseHandler = props.modalCloseHandler,
      formSchema = props.formSchema,
      popupContainer = props.popupContainer;
  return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
    visible: visible,
    title: messages[(0, _localeMessages.getMessageId)('xformSchemaModalTitle')],
    width: 600,
    wrapClassName: "app-xform-builder-view-schema-modal",
    onCancel: function onCancel() {
      modalCloseHandler();
    },
    footer: [/*#__PURE__*/_react["default"].createElement(_reactCopyToClipboard["default"], {
      text: JSON.stringify(formSchema, undefined, 4),
      onCopy: function onCopy() {
        _antd.message.success(messages[(0, _localeMessages.getMessageId)('xformSchemaModalCopySuccessTip')]);
      }
    }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
      type: "default"
    }, messages[(0, _localeMessages.getMessageId)('xformSchemaModalCopy')])), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
      type: "default",
      onClick: function onClick() {
        modalCloseHandler();
      }
    }, messages[(0, _localeMessages.getMessageId)('xformSchemaModalCancel')])],
    getContainer: popupContainer
  }, /*#__PURE__*/_react["default"].createElement(TextArea, {
    rows: 10,
    disabled: true,
    value: JSON.stringify(formSchema, undefined, 4)
  }));
}

ViewSchemaModal.propTypes = {
  messages: _propTypes["default"].object.isRequired,
  visible: _propTypes["default"].bool.isRequired,
  modalCloseHandler: _propTypes["default"].func.isRequired,
  formSchema: _propTypes["default"].object.isRequired,
  popupContainer: _propTypes["default"].func.isRequired
};