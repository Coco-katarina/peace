"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MoreFunctionPopover;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _index = _interopRequireDefault(require("../../scalable-form-antd/index"));

var _localeMessages = require("../../i18n/localeMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
})("a78f8af87b6d3116648ce43192afe3d4", ".app-xform-builder-more-function-popover{z-index:1000!important}.app-xform-builder-more-function-popover .more-function-wrapper{padding:8px 4px;min-width:300px}.app-xform-builder-more-function-popover .view-schema-button{margin-left:72px}");

function MoreFunctionPopover(props) {
  var messages = props.messages,
      children = props.children,
      visible = props.visible,
      formDataSourceList = props.formDataSourceList,
      customUploadRequest = props.customUploadRequest,
      formData = props.formData,
      formDataChangeHandler = props.formDataChangeHandler,
      moreFunctionVisibleChangeHandler = props.moreFunctionVisibleChangeHandler,
      viewSchemaClickHandler = props.viewSchemaClickHandler,
      onDetectSuccess = props.onDetectSuccess,
      componentRecognize = props.componentRecognize,
      popupContainer = props.popupContainer;

  var uploadRequest = function uploadRequest(file, onSuccess, onError) {
    if (customUploadRequest) {
      customUploadRequest(file, function (url) {
        if (url && componentRecognize && componentRecognize.enable && componentRecognize.recognize) {
          componentRecognize.recognize(url).then(function (schema) {
            console.warn('recognize success and get schema, ', schema);
            onSuccess(url);
            onDetectSuccess(schema);
          });
        } else {
          onSuccess(url);
        }
      }, onError);
    }
  };

  var jsonSchema = {
    type: 'object',
    title: '',
    properties: {
      codeEditable: {
        title: messages[(0, _localeMessages.getMessageId)('xformMoreFunctionCodeView')],
        type: 'boolean',
        "default": true
      },
      fieldPreviewable: {
        title: messages[(0, _localeMessages.getMessageId)('xformMoreFunctionFieldPreview')],
        type: 'boolean',
        "default": false
      },
      formDataSourceCode: {
        title: messages[(0, _localeMessages.getMessageId)('xformMoreFunctionFormDataSource')],
        type: 'string',
        "default": '',
        data: formDataSourceList
      }
    }
  };
  var uiSchema = {
    formDataSourceCode: {
      'ui:widget': 'select',
      'ui:help': messages[(0, _localeMessages.getMessageId)('xformMoreFunctionFormDataSourceHelp')],
      'ui:placeholder': messages[(0, _localeMessages.getMessageId)('configSchemaDataSourcePlaceholder')]
    }
  };

  if (componentRecognize && componentRecognize.enable) {
    jsonSchema.properties.crDetect = {
      type: "array",
      title: "智能识别",
      "default": [],
      maxFileSize: 10,
      maxFileNum: 10,
      items: {
        "type": "string",
        "format": "data-url"
      },
      uniqueItems: true
    };
    uiSchema.crDetect = {
      'ui:options': {
        "label": "图片上传",
        "listType": "picture",
        "vertical": true,
        "accept": "image/*"
      },
      "ui:help": "<p>上传截图，生成可用的XForm表单</p>",
      "ui:disabled": false
    };
  }

  return /*#__PURE__*/_react["default"].createElement(_antd.Popover, {
    title: "",
    content: /*#__PURE__*/_react["default"].createElement("div", {
      className: "more-function-wrapper"
    }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
      formItemLayout: {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
        }
      },
      alignType: "vertical",
      onChange: function onChange(formData) {
        formDataChangeHandler(formData);
      },
      customUploadRequest: uploadRequest,
      jsonSchema: jsonSchema,
      uiSchema: uiSchema,
      formData: _objectSpread({}, formData),
      popupContainer: popupContainer
    }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
      className: "view-schema-button",
      type: "default",
      onClick: viewSchemaClickHandler
    }, messages[(0, _localeMessages.getMessageId)('xformSchemaViewButton')])),
    visible: visible,
    onVisibleChange: moreFunctionVisibleChangeHandler,
    trigger: "click",
    placement: "bottomLeft",
    overlayClassName: "app-xform-builder-more-function-popover",
    getPopupContainer: popupContainer
  }, children);
}

MoreFunctionPopover.propTypes = {
  messages: _propTypes["default"].object.isRequired,
  children: _propTypes["default"].element.isRequired,
  visible: _propTypes["default"].bool.isRequired,
  formData: _propTypes["default"].shape({
    codeEditable: _propTypes["default"].bool.isRequired,
    fieldPreviewable: _propTypes["default"].bool.isRequired
  }).isRequired,
  formDataChangeHandler: _propTypes["default"].func.isRequired,
  moreFunctionVisibleChangeHandler: _propTypes["default"].func.isRequired,
  viewSchemaClickHandler: _propTypes["default"].func.isRequired,
  customUploadRequest: _propTypes["default"].func.isRequired,
  componentRecognize: _propTypes["default"].shape({
    enable: _propTypes["default"].bool,
    recognize: _propTypes["default"].func
  }),
  onDetectSuccess: _propTypes["default"].func.isRequired,
  popupContainer: _propTypes["default"].func.isRequired
};