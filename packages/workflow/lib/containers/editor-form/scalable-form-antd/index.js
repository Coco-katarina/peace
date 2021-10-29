"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _classnames2 = _interopRequireDefault(require("classnames"));

var _scalableFormCore = _interopRequireDefault(require("../scalable-form-core"));

var _localeHOC = _interopRequireDefault(require("./localeHOC"));

var _localeMessages = require("./i18n/localeMessages");

var _xformTreeSelectWidget = _interopRequireDefault(require("./xformTreeSelectWidget"));

var _xformMultiTreeSelectWidget = _interopRequireDefault(require("./xformMultiTreeSelectWidget"));

var _xformButtonWidget = _interopRequireDefault(require("./xformButtonWidget"));

var _xformSelectWidget = _interopRequireDefault(require("./xformSelectWidget"));

var _xformMultiSelectWidget = _interopRequireDefault(require("./xformMultiSelectWidget"));

var _xformSuggestSelectWidget = _interopRequireDefault(require("./xformSuggestSelectWidget"));

var _xformInputWidget = _interopRequireDefault(require("./xformInputWidget"));

var _xformTextareaWidget = _interopRequireDefault(require("./xformTextareaWidget"));

var _xformNumberWidget = _interopRequireDefault(require("./xformNumberWidget"));

var _xformDatePickerWidget = _interopRequireDefault(require("./xformDatePickerWidget"));

var _xformDateTimePickerWidget = _interopRequireDefault(require("./xformDateTimePickerWidget"));

var _xformDateRangePickerWidget = _interopRequireDefault(require("./xformDateRangePickerWidget"));

var _xformRichTextWidget = _interopRequireDefault(require("./xformRichTextWidget"));

var _xformRadioWidget = _interopRequireDefault(require("./xformRadioWidget"));

var _xformCheckboxWidget = _interopRequireDefault(require("./xformCheckboxWidget"));

var _xformBooleanCheckboxWidget = _interopRequireDefault(require("./xformBooleanCheckboxWidget"));

var _xformSwitchWidget = _interopRequireDefault(require("./xformSwitchWidget"));

var _xformUploadWidget = _interopRequireDefault(require("./xformUploadWidget"));

var _xformTagWidget = _interopRequireDefault(require("./xformTagWidget"));

var _xformLabelWidget = _interopRequireDefault(require("./xformLabelWidget"));

var _xformGroupWidget = _interopRequireDefault(require("./xformGroupWidget"));

var _xformRateWidget = _interopRequireDefault(require("./xformRateWidget"));

var _xformSliderWidget = _interopRequireDefault(require("./xformSliderWidget"));

var _xformSliderRangeWidget = _interopRequireDefault(require("./xformSliderRangeWidget"));

var _xformCascaderWidget = _interopRequireDefault(require("./xformCascaderWidget"));

var _customFieldTemplate = _interopRequireDefault(require("./templates/customFieldTemplate"));

var _customArrayFieldTemplate = _interopRequireDefault(require("./templates/customArrayFieldTemplate"));

var _customObjectFieldTeplate = _interopRequireDefault(require("./templates/customObjectFieldTeplate"));

var _xformCalculateWidget = _interopRequireDefault(require("./xformCalculateWidget"));

var _xformLinkWidget = _interopRequireDefault(require("./xformLinkWidget"));

var _logger = _interopRequireDefault(require("./logger"));

var _xformAmapInputWidget = _interopRequireDefault(require("./xformAmapInputWidget"));

var _xformTransferWidget = _interopRequireDefault(require("./xformTransferWidget"));

var _xformStampInputWidget = _interopRequireDefault(require("./xformStampInputWidget"));

var _xformTableSelectWidget = _interopRequireDefault(require("./xformTableSelectWidget"));

var _xformTableWidget = _interopRequireDefault(require("./xformTableWidget"));

var _utils = require("@peace/utils");

var _$utils = require("$utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/**
 * 使用json-schema的表单组件xform
 * @props: env（指定xform组件当前运行的环境，dev表示开发环境、daily表示日常环境、pre表示预发环境、prod表示生产环境；默认值为生产环境） 
 * formContext（表单上下文属性，传入的属性自定义字段可以通过this.props.formContext获取到） 
 * popupContainer（xform组件内部使用的popup渲染的根节点，默认为xform组件的Root Element） 
 * formItemLayout（表单field的layout设置） 
 * labelType（表单的label与表单元素的排列方式，默认为并排排列） 
 * labelAlign（表单的label对齐方式，默认右对齐） 
 * defaultSubmitButton（表单是否使用默认的提交操作按钮，在将xform作为某业务表单中的一部分的场景下设置为false，如果直接使用默认提交设置为true） 
 * alignType（表单对齐方式：vertical表示垂直对齐，inline表示水平对齐） 
 * itemNumberInRow（在inline的对齐方式下，可以设置一行放几个field） 
 * noLabel（表单不包含label） 
 * disabled（是否设置表单各项为禁用状态） 
 * readonly（是否设置表单各项为只读态） 
 * validation（表单校验的方法，允许传入一个自定义校验方法，组件不会中断标单提交，需要业务自行实现） 
 * beforeDataSourceFetch（在数据源请求执行之前注入的方法，会传入数据源code，当前的formData和bizData作为参数） 
 * formCode（表单的formCode，根据formCode可以自动获取表单相应的信息渲染出来表单） 
 * customGateway（自定义网关） 
 * customInterfaces（自定义服务端请求配置） 
 * mockInterfaces(自定义接口mock数据的配置) 
 * customUploadRequest（自定义上传方法，指定后则不会走默认的xform的OSS上传） 
 * jsonSchema（描述表单的jsonSchema） 
 * uiSchema（描述表单的uiSchema） 
 * formData（描述表单初始数据的formData） 
 * bizData（描述表单的业务属性，这部分数据组件不做处理，只做传递，任何与表单的字段相关的业务属性均存储在这里，不能放置到jsonSchema中，防止污染） 
 * sequence（form的字段顺序设置，如果不设定该属性则按schema object的顺序） 
 * className（表单的自定义class值） 
 * onImagePreview（表单中图片预览处理器，默认是新窗口打开图片url地址的处理方式） 
 * onload（表单onload处理器，会传入初始的formData和bizData作为参数） 
 * onError（将组件catch的错误上报） 
 * onChange（表单change处理器，会传入formData和bizData作为参数） 
 * onSubmit（表单submit处理器，会传入formData和bizData作为参数）
 * @states: bizCode（xform使用场景的bizCode，图片上传等场景用来区分上传到的图片域） 
 * sequence（form的字段顺序设置，如果不设定该属性则按schema object的顺序）
 *  jsonSchema（描述表单的jsonSchema） 
 * uiSchema（uiSchema中的ui:options字段里面会包含表单的校验状态，联动状态，数据源状态等） 
 * formData（描述表单初始数据的formData） 
 * bizData（描述表单字段的业务属性） 
 * customInterfacesParams（自定义服务端请求配置自定义参数，会merge到对应的customInterfaces接口中）
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
})("4be65e1c26376e1f2cbeb2b5c0360466", ".xform-antd-wrapper.xform-action-hidden .xform-submit-button,.xform-antd-wrapper .xform-hidden,.xform-antd-wrapper.xform-title-hidden label.control-label{display:none!important}.xform-antd-wrapper.xform-action-hidden .xform-cancle-button{display:none}.xform-antd-wrapper legend{display:block;width:100%;padding:0;margin-bottom:20px;font-size:21px;line-height:inherit;color:#333;border:0;border-bottom:1px solid #e5e5e5}.xform-antd-wrapper .field-description{margin:0 0 10px;font-size:14px}.xform-antd-wrapper fieldset{border:0!important}.xform-antd-wrapper .xform-item{margin-bottom:18px}.xform-antd-wrapper label.control-label:after{content:\":\";margin:0 8px 0 2px}.xform-antd-wrapper label.control-label.required:before{display:inline-block;margin-right:4px;font-family:SimSun;content:\"*\";line-height:1;font-size:12px;color:#f04134}.xform-antd-wrapper .ant-form-item-control.xform-custom-richtext{line-height:normal}.xform-antd-wrapper .ant-cascader-picker,.xform-antd-wrapper .ant-select{width:100%}.xform-antd-wrapper img{max-width:100%}.xform-antd-wrapper .xform-array-field .xform-array-field-item{margin-bottom:5px;padding-bottom:5px}.xform-antd-wrapper .xform-array-field .xform-array-field-item .xform-array-buttons{margin-top:5px;text-align:right}.xform-antd-wrapper .xform-array-field .xform-array-field-item .xform-array-buttons button{margin-left:5px}.xform-antd-wrapper .xform-array-field .xform-array-bottom{text-align:right}.xform-antd-wrapper .ant-form-explain{color:#ff4d4f;min-height:auto}");

var customWidgets = {
  treeSelect: _xformTreeSelectWidget["default"],
  multiTreeSelect: _xformMultiTreeSelectWidget["default"],
  SelectWidget: _xformSelectWidget["default"],
  multiSelect: _xformMultiSelectWidget["default"],
  suggestSelect: _xformSuggestSelectWidget["default"],
  TextWidget: _xformInputWidget["default"],
  TextareaWidget: _xformTextareaWidget["default"],
  UpDownWidget: _xformNumberWidget["default"],
  DateWidget: _xformDatePickerWidget["default"],
  DateTimeWidget: _xformDateTimePickerWidget["default"],
  dateRange: _xformDateRangePickerWidget["default"],
  RadioWidget: _xformRadioWidget["default"],
  CheckboxesWidget: _xformCheckboxWidget["default"],
  CheckboxWidget: _xformBooleanCheckboxWidget["default"],
  FileWidget: _xformUploadWidget["default"],
  cascader: _xformCascaderWidget["default"],
  slider: _xformSliderWidget["default"],
  sliderRange: _xformSliderRangeWidget["default"],
  "switch": _xformSwitchWidget["default"],
  tag: _xformTagWidget["default"],
  label: _xformLabelWidget["default"],
  group: _xformGroupWidget["default"],
  rate: _xformRateWidget["default"],
  richtext: _xformRichTextWidget["default"],
  amapInput: _xformAmapInputWidget["default"],
  button: _xformButtonWidget["default"],
  Transfer: _xformTransferWidget["default"],
  Stamp: _xformStampInputWidget["default"],
  TableSelect: _xformTableSelectWidget["default"],
  Table: _xformTableWidget["default"],
  Calculate: _xformCalculateWidget["default"],
  Link: _xformLinkWidget["default"]
};
var customFields = {};

var XForm = /*#__PURE__*/function (_Component) {
  _inherits(XForm, _Component);

  var _super = _createSuper(XForm);

  function XForm(props) {
    var _this;

    _classCallCheck(this, XForm);

    _this = _super.call(this, props);
    _this.getWrappedInstance = _this.getWrappedInstance.bind(_assertThisInitialized(_this));
    _this.XFormSubmit = _this.XFormSubmit.bind(_assertThisInitialized(_this));
    _this.XFormInitFormData = _this.XFormInitFormData.bind(_assertThisInitialized(_this));
    _this.XFormReset = _this.XFormReset.bind(_assertThisInitialized(_this));
    _this.XFormSetFormData = _this.XFormSetFormData.bind(_assertThisInitialized(_this));
    _this.XFormCurrentFormData = _this.XFormCurrentFormData.bind(_assertThisInitialized(_this));
    _this.XFormBizData = _this.XFormBizData.bind(_assertThisInitialized(_this));
    _this.XFormValidate = _this.XFormValidate.bind(_assertThisInitialized(_this));
    _this.XFormValidateSync = _this.XFormValidateSync.bind(_assertThisInitialized(_this));
    _this.XFormFetchAllFromDataSource = _this.XFormFetchAllFromDataSource.bind(_assertThisInitialized(_this));
    _this.XFormFetchFromDataSource = _this.XFormFetchFromDataSource.bind(_assertThisInitialized(_this));
    _this.xform = /*#__PURE__*/_react["default"].createRef();

    var logEvent = props.logEvent || function () {};

    _this.logger = new _logger["default"](logEvent);
    return _this;
  }

  _createClass(XForm, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var onError = this.props.onError;

      if (typeof onError === 'function') {
        onError(error, info);
      }

      console.error('[xform] error', error);
    }
  }, {
    key: "getWrappedInstance",
    value: function getWrappedInstance() {
      return this.xform.current;
    }
  }, {
    key: "XFormSubmit",
    value: function XFormSubmit() {
      this.getWrappedInstance().XFormSubmit();
    }
  }, {
    key: "XFormInitFormData",
    value: function XFormInitFormData() {
      return this.getWrappedInstance().XFormInitFormData();
    }
  }, {
    key: "XFormReset",
    value: function XFormReset() {
      this.getWrappedInstance().XFormReset();
    }
  }, {
    key: "XFormSetFormData",
    value: function XFormSetFormData() {
      var _this$getWrappedInsta;

      (_this$getWrappedInsta = this.getWrappedInstance()).XFormSetFormData.apply(_this$getWrappedInsta, arguments);
    }
  }, {
    key: "XFormCurrentFormData",
    value: function XFormCurrentFormData() {
      return this.getWrappedInstance().XFormCurrentFormData();
    }
  }, {
    key: "XFormBizData",
    value: function XFormBizData() {
      return this.getWrappedInstance().XFormBizData();
    }
  }, {
    key: "XFormValidate",
    value: function XFormValidate() {
      var _this$getWrappedInsta2;

      (_this$getWrappedInsta2 = this.getWrappedInstance()).XFormValidate.apply(_this$getWrappedInsta2, arguments);
    }
  }, {
    key: "XFormValidateSync",
    value: function XFormValidateSync() {
      return this.getWrappedInstance().XFormValidateSync();
    }
  }, {
    key: "XFormFetchAllFromDataSource",
    value: function XFormFetchAllFromDataSource() {
      this.getWrappedInstance().XFormFetchAllFromDataSource();
    }
  }, {
    key: "XFormFetchFromDataSource",
    value: function XFormFetchFromDataSource() {
      var _this$getWrappedInsta3;

      (_this$getWrappedInsta3 = this.getWrappedInstance()).XFormFetchFromDataSource.apply(_this$getWrappedInsta3, arguments);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          env = _this$props.env,
          messages = _this$props.messages,
          formContext = _this$props.formContext,
          registerWidgets = _this$props.registerWidgets,
          registerFields = _this$props.registerFields,
          registerFieldTemplate = _this$props.registerFieldTemplate,
          registerArrayFieldTemplate = _this$props.registerArrayFieldTemplate,
          registerObjectFieldTemplate = _this$props.registerObjectFieldTemplate,
          formItemLayout = _this$props.formItemLayout,
          bizCode = _this$props.bizCode,
          customGateway = _this$props.customGateway,
          customInterfaces = _this$props.customInterfaces,
          mockInterfaces = _this$props.mockInterfaces,
          customInterfacesParams = _this$props.customInterfacesParams,
          customUploadRequest = _this$props.customUploadRequest,
          alignType = _this$props.alignType,
          labelType = _this$props.labelType,
          labelAlign = _this$props.labelAlign,
          itemNumberInRow = _this$props.itemNumberInRow,
          className = _this$props.className,
          _validation = _this$props.validation,
          onImagePreview = _this$props.onImagePreview,
          noLabel = _this$props.noLabel,
          defaultSubmitButton = _this$props.defaultSubmitButton,
          isFieldList = _this$props.isFieldList;
      var defaultSubmitBtn = [// <Button
        //     className="xform-submit-button"
        //     type="primary"
        //     htmlType="submit"
        // >{messages[getMessageId('xformDefaultSubmitButtonLabel')]}</Button>,
        // <Button
        //     className='xform-cancle-button'
        //     >
        //     取消
        // </Button>
      ];
      return /*#__PURE__*/_react["default"].createElement(_scalableFormCore["default"], _extends({}, this.props, {
        ref: this.xform,
        validation: function validation(formData, bizData) {
          // 在提交校验前增加对图片/文件上传状态的强制校验，如果图片上传中或图片上传失败，提示[图片上传中，请稍后提交]
          var uploadFields = [],
              imageUploadFields = [];
          var fieldName, fieldFormData, fieldBizData;

          var pass = _validation(formData, bizData);

          for (fieldName in formData) {
            if (formData.hasOwnProperty(fieldName)) {
              fieldFormData = formData[fieldName];
              fieldBizData = bizData[fieldName];

              if (fieldBizData && (fieldBizData.type === 'file' || fieldBizData.type === 'upload')) {
                uploadFields.push(fieldFormData);
              }

              if (fieldBizData && fieldBizData.type === 'upload') {
                imageUploadFields.push(fieldFormData);
              }
            }
          } // 检测是否有“上传中”的图片或文件，如果有不让上传


          uploadFields.map(function (uploadField) {
            uploadField.map(function (uploadFieldItem) {
              var blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
              var ext = uploadFieldItem.name.slice(uploadFieldItem.name.lastIndexOf('.') + 1).toLowerCase();
              var project = [".txt", ".dwg", ".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg", ".svg"];

              if (project.indexOf('.' + ext) < 0) {
                _antd.message.error("文件格式无效");

                pass = false;
              } // 判断上传文件的扩展名是否在黑名单中


              if (blacklistExts.indexOf(ext) > -1) {
                _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformUploaderFileCheckMessage')], 10);

                pass = false;
              }

              if (uploadFieldItem.status === 'uploading') {
                _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformUploaderUploadingStatusCheckMessage')], 10);

                pass = false;
              } else if (uploadFieldItem.status === 'error') {
                _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformUploaderErrorStatusCheckMessage')], 10);

                pass = false;
              }
            });
          }); // 检测是否有上传的不是图片类型的文件（根据文件后缀判断）

          imageUploadFields.map(function (uploadField) {
            uploadField.map(function (uploadFieldItem) {
              var imageExts = ['bmp', 'jpg', 'jpeg', 'png', 'tif', 'tiff', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp', 'jfif'];
              var ext = uploadFieldItem.name.slice(uploadFieldItem.name.lastIndexOf('.') + 1).toLowerCase();

              if (imageExts.indexOf(ext) <= -1) {
                _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformUploaderImageFileCheckMessage')], 10);

                pass = false;
              }
            });
          });
          return pass;
        },
        xtrackerCode: "xform",
        defaultSubmitButtonComponent: defaultSubmitBtn,
        widgets: Object.assign({}, customWidgets, registerWidgets),
        fields: Object.assign({}, customFields, registerFields),
        fieldTemplate: registerFieldTemplate !== null ? registerFieldTemplate : _customFieldTemplate["default"],
        arrayFieldTemplate: registerArrayFieldTemplate !== null ? registerArrayFieldTemplate : _customArrayFieldTemplate["default"],
        objectFieldTemplate: registerObjectFieldTemplate !== null ? registerObjectFieldTemplate : _customObjectFieldTeplate["default"],
        formContext: _objectSpread(_objectSpread(_objectSpread({}, formContext), formItemLayout), {}, {
          env: env,
          messages: messages,
          bizCode: bizCode,
          customGateway: customGateway,
          customInterfaces: customInterfaces,
          mockInterfaces: mockInterfaces,
          customInterfacesParams: customInterfacesParams,
          customUploadRequest: customUploadRequest,
          alignType: alignType,
          labelType: labelType,
          labelAlign: labelAlign,
          itemNumberInRow: itemNumberInRow,
          onImagePreview: onImagePreview,
          logger: this.logger,
          isFieldList: isFieldList
        }),
        className: (0, _classnames2["default"])(_defineProperty({
          'xform-wrapper': true,
          'xform-antd-wrapper': true,
          'xform-action-hidden':
          /* !defaultSubmitButton */
          true,
          'xform-vertical': alignType === 'vertical',
          'xform-inline': alignType === 'inline',
          'xform-title-hidden': noLabel
        }, className, true))
      }), this.props.children);
    }
  }]);

  return XForm;
}(_react.Component);

_defineProperty(XForm, "propTypes", {
  env: _propTypes["default"].oneOf(['dev', 'prod']),
  messages: _propTypes["default"].object.isRequired,
  formContext: _propTypes["default"].object,
  popupContainer: _propTypes["default"].func,
  formCode: _propTypes["default"].string,
  customGateway: _propTypes["default"].object,
  mockInterfaces: _propTypes["default"].shape({
    dataSourceServerUrl: _propTypes["default"].any,
    getSchemaByCode: _propTypes["default"].any,
    serverCheck: _propTypes["default"].any
  }),
  customInterfaces: _propTypes["default"].shape({
    dataSourceServerUrl: _propTypes["default"].any,
    getSchemaByCode: _propTypes["default"].any,
    serverCheck: _propTypes["default"].any
  }),
  customInterfacesParams: _propTypes["default"].shape({
    dataSourceServerUrl: _propTypes["default"].object,
    getSchemaByCode: _propTypes["default"].object,
    serverCheck: _propTypes["default"].object
  }),
  customUploadRequest: _propTypes["default"].func,
  jsonSchema: _propTypes["default"].object,
  uiSchema: _propTypes["default"].object,
  formData: _propTypes["default"].object,
  bizData: _propTypes["default"].object,
  formItemLayout: _propTypes["default"].shape({
    labelCol: _propTypes["default"].shape({
      span: _propTypes["default"].number
    }),
    wrapperCol: _propTypes["default"].shape({
      span: _propTypes["default"].number
    })
  }),
  className: _propTypes["default"].string,
  noLabel: _propTypes["default"].bool,
  defaultSubmitButton: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  readonly: _propTypes["default"].bool,
  labelType: _propTypes["default"].oneOf(['vertical', 'inline']),
  labelAlign: _propTypes["default"].oneOf(['left', 'right']),
  alignType: _propTypes["default"].oneOf(['vertical', 'inline']),
  itemNumberInRow: _propTypes["default"].number,
  sequence: _propTypes["default"].array,
  beforeSchemaFetch: _propTypes["default"].func,
  beforeDataSourceFetch: _propTypes["default"].func,
  beforeServerCheck: _propTypes["default"].func,
  registerWidgets: _propTypes["default"].object,
  registerFields: _propTypes["default"].object,
  registerFieldTemplate: _propTypes["default"].element,
  registerArrayFieldTemplate: _propTypes["default"].element,
  registerObjectFieldTemplate: _propTypes["default"].element,
  validation: _propTypes["default"].func,
  onImagePreview: _propTypes["default"].func,
  onload: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onSubmit: _propTypes["default"].func
});

_defineProperty(XForm, "defaultProps", {
  env: 'prod',
  formContext: {},
  formCode: '',
  formItemLayout: {
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 21
    }
  },
  className: '',
  noLabel: false,
  defaultSubmitButton: false,
  disabled: false,
  readonly: false,
  labelType: 'inline',
  labelAlign: 'right',
  alignType: 'vertical',
  itemNumberInRow: 2,
  beforeSchemaFetch: function beforeSchemaFetch() {
    return {};
  },
  beforeDataSourceFetch: function beforeDataSourceFetch() {
    return {};
  },
  beforeServerCheck: function beforeServerCheck() {
    return {};
  },
  registerWidgets: {},
  registerFields: {},
  registerFieldTemplate: null,
  registerArrayFieldTemplate: null,
  registerObjectFieldTemplate: null,
  validation: function validation() {
    return true;
  },
  onImagePreview: function onImagePreview(url) {
    var RouteTable = _$utils.WebAPI.RouteTable;

    _utils.RouteRequest.post(RouteTable.fileExist, {
      url: url
    }).then(function (res) {
      if (res && res.isExist) {
        window.open(url);
      } else {
        _antd.message.error('文件不存在或已被移除！');
      }
    });
  },
  onload: function onload() {},
  onChange: function onChange() {},
  onSubmit: function onSubmit() {}
});

var _default = (0, _localeHOC["default"])(XForm);

exports["default"] = _default;