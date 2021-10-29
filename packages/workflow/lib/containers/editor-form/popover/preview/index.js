"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _index = _interopRequireDefault(require("../../scalable-form-antd/index"));

var _localeMessages = require("../../i18n/localeMessages");

var _util = require("../../common/util");

var _$utils = require("$utils");

var _utils = require("@peace/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
})("423137a291cb7fae5a17e0e3ff056582", ".app-xform-builder-preview-popover{z-index:1000!important;width:80%}.app-xform-builder-preview-popover .preview-wrapper{min-width:700px;max-height:600px;overflow:auto}.app-xform-builder-preview-popover .preview-wrapper .mobile-preview-demo-wrapper{margin:0 auto;width:478px;height:963px;background:url(//gtms03.alicdn.com/tps/i3/TB1n05NGFXXXXbeXFXX7XyaQpXX-478-963.png) no-repeat}.app-xform-builder-preview-popover .preview-wrapper .mobile-preview-demo-wrapper .iframe{margin-left:33px;margin-top:193px;width:414px;height:652px;background:#fff}");

var TabPane = _antd.Tabs.TabPane;

var PreviewModal = /*#__PURE__*/function (_PureComponent) {
  _inherits(PreviewModal, _PureComponent);

  var _super = _createSuper(PreviewModal);

  function PreviewModal(props) {
    var _this;

    _classCallCheck(this, PreviewModal);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_onClickCallBack", function (rslt) {
      console.log(rslt);
    });

    _this.handleTabChange = _this.handleTabChange.bind(_assertThisInitialized(_this));
    _this.renderPopoverContent = _this.renderPopoverContent.bind(_assertThisInitialized(_this));
    _this.renderLaptopPreviewContent = _this.renderLaptopPreviewContent.bind(_assertThisInitialized(_this));
    _this.renderMobilePreviewContent = _this.renderMobilePreviewContent.bind(_assertThisInitialized(_this));
    _this.handleNodeChange = _this.handleNodeChange.bind(_assertThisInitialized(_this));
    var initialPlatform = 'laptop';

    if (props.platform === 'mobile') {
      initialPlatform = 'mobile';
    }

    _this.state = {
      current: initialPlatform,
      // 当前预览的端的类型
      formSchema: null,
      currentNode: null,
      tapkey: 'all'
    };
    return _this;
  }

  _createClass(PreviewModal, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      //将props中的schema同步到state中, 并用移步获取数据源url数据替换
      if (JSON.stringify(this.propsFormSchema) != JSON.stringify(this.props.formSchema) && this.props.visible) {
        (0, _$utils.buildFormSchemaByDataSourceUrl)(this.props.formSchema, _utils.RouteRequest).then(function (formSchema) {
          _this2.propsFormSchema = _this2.deepCloneObject(_this2.props.formSchema); //缓存起来,以便下次做diff

          _this2.setState({
            formSchema: formSchema
          });
        })["catch"](function (err) {
          console.error('数据源表单获取失败表单');
        });
      }
    } //深拷贝

  }, {
    key: "deepCloneObject",
    value: function deepCloneObject(obj) {
      if (_typeof(obj) !== 'object') {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj.concat();
      } else {
        return JSON.parse(JSON.stringify(obj));
      }
    }
  }, {
    key: "handleTabChange",
    value: function handleTabChange(activeKey) {
      this.setState({
        current: activeKey
      });
    }
  }, {
    key: "handleNodeChange",
    value: function handleNodeChange(e) {
      this.setState({
        currentNode: e == 'all' ? null : e,
        tapkey: e
      });
    }
  }, {
    key: "renderPopoverContent",
    value: function renderPopoverContent() {
      var _this3 = this;

      var _this$props = this.props,
          messages = _this$props.messages,
          platform = _this$props.platform,
          bpmnNodes = _this$props.bpmnNodes;
      var _this$state = this.state,
          current = _this$state.current,
          tapkey = _this$state.tapkey;

      switch (platform) {
        case 'laptop':
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "preview-wrapper"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Tabs, {
            activeKey: tapkey,
            onChange: this.handleNodeChange
          }, /*#__PURE__*/_react["default"].createElement(TabPane, {
            tab: '全部',
            key: "all"
          }, this.renderLaptopPreviewContent()), Array.isArray(bpmnNodes) && bpmnNodes.map(function (node) {
            return /*#__PURE__*/_react["default"].createElement(TabPane, {
              tab: node.name,
              key: node.id
            }, _this3.renderLaptopPreviewContent());
          })));

        case 'mobile':
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "preview-wrapper"
          }, this.renderMobilePreviewContent());

        case 'both':
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "preview-wrapper"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Tabs, {
            activeKey: current,
            onChange: this.handleTabChange
          }, /*#__PURE__*/_react["default"].createElement(TabPane, {
            tab: messages[(0, _localeMessages.getMessageId)('xformChangePlatformPCName')],
            key: "laptop"
          }, this.renderLaptopPreviewContent()), /*#__PURE__*/_react["default"].createElement(TabPane, {
            tab: messages[(0, _localeMessages.getMessageId)('xformChangePlatformMobileName')],
            key: "mobile"
          }, this.renderMobilePreviewContent())));

        default:
          console.error('[xform-editor]platform属性值必须是laptop,mobile,both枚举值');
          return null;
      }
    } // 验证一个字段是否有配置数据源URL

  }, {
    key: "_fieldHasDataSource",
    value: function _fieldHasDataSource(fieldName, jsonSchema) {
      var jsonSchemaProperties = jsonSchema.properties;
      var jsonSchemaContent = jsonSchemaProperties[fieldName];
      return _typeof(jsonSchemaContent) === 'object' && typeof jsonSchemaContent.dataSourceUrl === 'string' && jsonSchemaContent.dataSourceUrl !== '';
    }
  }, {
    key: "renderLaptopPreviewContent",
    value: function renderLaptopPreviewContent() {
      var _this$props2 = this.props,
          messages = _this$props2.messages,
          customInterfaces = _this$props2.customInterfaces,
          customGateway = _this$props2.customGateway,
          customUploadRequest = _this$props2.customUploadRequest,
          onImagePreview = _this$props2.onImagePreview,
          registerWidgets = _this$props2.registerWidgets,
          locale = _this$props2.locale,
          popupContainer = _this$props2.popupContainer;
      var _this$state2 = this.state,
          formSchema = _this$state2.formSchema,
          currentNode = _this$state2.currentNode;

      if (!formSchema) {
        return;
      } // const form = formSchema || this.props.formSchema


      var xformCustomWidgets = _util.util.getXFormCustomWidgets(registerWidgets);

      return /*#__PURE__*/_react["default"].createElement(_index["default"], {
        customInterfaces: customInterfaces,
        customGateway: customGateway,
        customUploadRequest: customUploadRequest,
        onImagePreview: onImagePreview,
        alignType: "inline",
        formItemLayout: {
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 20
          }
        } //itemNumberInRow={2}
        ,
        popupContainer: popupContainer,
        registerWidgets: xformCustomWidgets,
        locale: locale,
        jsonSchema: formSchema.jsonSchema,
        uiSchema: formSchema.uiSchema,
        formData: formSchema.formData,
        bizData: formSchema.bizData,
        sequence: formSchema.sequence,
        formContext: {
          onClickCallBack: this._onClickCallBack,
          currentNode: currentNode
        },
        onChange: function onChange(formData, bizData) {
          console.log('预览表单的formData:', formData);
          console.log('预览表单的bizData:', bizData);
        },
        onSubmit: function onSubmit(formData, bizData) {
          console.log('提交表单的formData:', formData);
          console.log('提交表单的bizData:', bizData);
        }
      });
    }
  }, {
    key: "renderMobilePreviewContent",
    value: function renderMobilePreviewContent() {
      var _this$props3 = this.props,
          namespace = _this$props3.namespace,
          previewDomain = _this$props3.previewDomain,
          formSchema = _this$props3.formSchema;
      var iframeId = "J_xform_preview_frame_".concat(namespace);

      if (document.getElementById(iframeId)) {
        // 将schema通过postMessage发送给移动端预览页
        document.getElementById(iframeId).contentWindow.postMessage({
          type: 'update-xform-schema',
          schema: {
            jsonSchema: formSchema.jsonSchema,
            uiSchema: formSchema.uiSchema,
            formData: formSchema.formData,
            bizData: formSchema.bizData
          }
        }, '*');
      } else {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "mobile-preview-demo-wrapper"
        }, /*#__PURE__*/_react["default"].createElement("iframe", {
          src: "//".concat(previewDomain, "/clientform/editor-preview.html"),
          frameBorder: 0,
          className: "iframe",
          id: iframeId,
          onLoad: function onLoad() {
            // 将schema通过postMessage发送给移动端预览页
            document.getElementById(iframeId).contentWindow.postMessage({
              type: 'update-xform-schema',
              schema: {
                jsonSchema: formSchema.jsonSchema,
                uiSchema: formSchema.uiSchema,
                formData: formSchema.formData,
                bizData: formSchema.bizData
              }
            }, '*');
          }
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          visible = _this$props4.visible,
          visibleChangeHandler = _this$props4.visibleChangeHandler,
          popupContainer = _this$props4.popupContainer,
          children = _this$props4.children;
      return /*#__PURE__*/_react["default"].createElement(_antd.Popover, {
        title: "",
        content: this.renderPopoverContent(),
        visible: visible,
        onVisibleChange: visibleChangeHandler,
        trigger: "click",
        placement: "leftTop",
        overlayClassName: "app-xform-builder-preview-popover",
        getPopupContainer: popupContainer
      }, children);
    }
  }]);

  return PreviewModal;
}(_react.PureComponent);

exports["default"] = PreviewModal;

_defineProperty(PreviewModal, "propTypes", {
  previewDomain: _propTypes["default"].string.isRequired,
  namespace: _propTypes["default"].string.isRequired,
  visible: _propTypes["default"].bool.isRequired,
  visibleChangeHandler: _propTypes["default"].func.isRequired,
  formSchema: _propTypes["default"].object.isRequired,
  platform: _propTypes["default"].oneOf(['laptop', 'mobile', 'both']).isRequired,
  messages: _propTypes["default"].object.isRequired,
  children: _propTypes["default"].element.isRequired,
  popupContainer: _propTypes["default"].func.isRequired
});