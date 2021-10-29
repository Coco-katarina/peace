"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _localeMessages = require("./i18n/localeMessages");

var _util = require("./common/util");

var CONST = _interopRequireWildcard(require("./common/const"));

var _actionCreator = _interopRequireWildcard(require("./actionCreator"));

var _request = require("./common/request");

var _index = _interopRequireDefault(require("./configSchema/index"));

var _fieldPicker = _interopRequireDefault(require("./component/fieldPicker"));

var _fieldList = _interopRequireDefault(require("./component/fieldList"));

var _fieldConfig = _interopRequireDefault(require("./component/fieldConfig"));

var _platform = _interopRequireDefault(require("./popover/platform"));

var _baseConfig = _interopRequireDefault(require("./popover/baseConfig"));

var _langConfig = _interopRequireDefault(require("./popover/langConfig"));

var _moreFunction = _interopRequireDefault(require("./popover/moreFunction"));

var _viewSchema = _interopRequireDefault(require("./popover/viewSchema"));

var _preview = _interopRequireDefault(require("./popover/preview"));

var _fields = require("./common/fields");

var _logger = _interopRequireDefault(require("./logger"));

var _index2 = require("../../actions/workflowProcessForm/index");

var _index3 = require("../../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
 * xform-builder app
 * @props: width（指定组件容器宽度） 
 * height（指定组件容器高度） 
 * platformConfigSupport（是否支持适配端切换，如果设置为true，则顶部工具栏中才会有适配端切换入口） 
 * platform（指定表单配置的适配端，对于设置了该属性的情形，会默认采用当前适配端，不允许用户修改） 
 * env（指定xform组件当前运行的环境，dev表示开发环境、daily表示日常环境、pre表示预发环境、prod表示生产环境；默认值为生产环境） 
 * emptyPlaceholder（配置区域初始空状态占位图，允许自定义风格的占位图） 
 * popupContainer（指定浮层渲染容器） 
 * bizCode（xform对应的业务场景code） 
 * formCode（之前保存的formCode，用来还原表单配置） 
 * formType（表单类型 1:模板 2:表单 3:业务字段 4:业务属性） 
 * onSubmit（xform配置提交时执行的方法，该方法中会注入提交后返回的formCode） 
 * beforeSubmit（xform配置提交前执行的方法，该方法要返回一个boolean类型，如果return false则不执行配置提交） 
 * systemFieldEditable（系统字段是否可编辑，默认不能编辑） 
 * filterSystemFields（是否过滤系统字段，默认不过滤） 
 * commonFieldSupport（是否开启通用字段支持，默认不开启） 
 * bizDataSupport（是否开启字段业务属性配置支持，默认不开启） 
 * langConfigSupport（是否支持表单多语言配置，默认不开启。开启该特性，需要服务端能够支持多语言配置） 
 * supportFieldList（支持的自定义字段配置列表，允许配置自己想要的自定义字段，默认全部支持） 
 * supportConfigList（支持的字段配置项列表，允许配置自己想要的字段配置项，默认全部支持） 
 * overwriteSchema（用来决定“保存”动作是新增schema还是更新schema，为true表示每次提交都是更新schema，为false表示每次提交都是新增schema） 
 * defaultActionButtons（是否使用默认的动作按钮，默认的动作按钮包括预览和保存，可以设置为在一些需要扩展的场景不使用默认内置的动作按钮，默认是启用默认动作按钮）
 * renderActionButtons(自定义渲染组件的动作按钮，适用于在组件下方自定义一些动作按钮的情形) 
 * getInstance（暴露的获取组件实例的方法，通过这种方法可以绕开使用React的ref获取实例的方法） 
 * registerWidgets（高级用法，相当于二次开发。注册自定义字段，允许通过该方法注册自己业务所需的自定义字段，registerWidgets的数据格式为
 * {
 *      code: 'widget code',    // 自定义字段在XForm里面的注册code值
 *      component: {React Component},
 *      icon: 'xform icon type',
 *      label: 'field label',
 *      schema: {
 *          jsonSchema: {}  // 生成自定义字段的jsonSchema（只需要写properties里面的内容即可）
 *          uiSchema: {}    // 生成自定义字段的uiSchema
 *          formData: {}    // 生成自定义字段的formData
 *      },
 *      configFields: [config field code],  // name和code为默认必带的字段配置项
 *      customConfigFields: [{
 *          code: '',           // 该字段的自定义配置项的code值
 *          schema: {
 *              jsonSchema: {}, // 该字段的自定义配置项的jsonSchema（只需要写properties里面的内容即可）
 *              uiSchema: {},   // 该字段的自定义配置项的uiSchema
 *              formData: {}    // 该字段的自定义配置项的formData
 *          },
 *          configToSchemaConverter: () => {},  // 该配置项的值到自定义字段schema变动的转换方法
 *          schemaToConfigConverter: () => {}   // 从自定义字段的schema中获取该配置项的值的方法
 *      }]
 * }）
 * @states: formSchemaModalVisible（表单Schema预览，给开发者使用） 
 * formPreviewModalVisible（表单预览浮层是否可见） 
 * formBaseConfigModalVisible（表单属性配置浮层是否可见） 
 * formTitle（表单title） 
 * formDescription（表单description）
 * bpmnNodes 流程节点 数组 [{id,name}]
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
})("ce2de0dfa2e7ef44dbc8c0c61abd1f10", "::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{width:8px;height:8px;background:rgba(0,0,0,.2);border-radius:10px}::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.4)}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-track:hover{background:rgba(0,0,0,.1)}@font-face{font-family:xform-iconfont;src:url(//at.alicdn.com/t/font_925216_38qjb5af05b.eot);src:url(//at.alicdn.com/t/font_925216_38qjb5af05b.eot#iefix) format(\"embedded-opentype\"),url(//at.alicdn.com/t/font_925216_38qjb5af05b.woff2) format(\"woff2\"),url(//at.alicdn.com/t/font_925216_38qjb5af05b.woff) format(\"woff\"),url(//at.alicdn.com/t/font_925216_38qjb5af05b.ttf) format(\"truetype\"),url(//at.alicdn.com/t/font_925216_38qjb5af05b.svg#iconfont) format(\"svg\")}.xform-iconfont{font-family:xform-iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale}.app-xform-builder{height:100%;min-width:1000px}.app-xform-builder .height100{height:100%}.app-xform-builder .app-xform-builder-header{border:1px solid #eee;height:48px;position:relative}.app-xform-builder .app-xform-builder-header .opt-front-list .opt-item,.app-xform-builder .app-xform-builder-header .opt-rear-list .opt-item{display:inline-block;padding:14px;font-size:14px;color:rgba(0,0,0,.65);cursor:pointer}.app-xform-builder .app-xform-builder-header .opt-front-list .opt-item .opt-icon,.app-xform-builder .app-xform-builder-header .opt-rear-list .opt-item .opt-icon{margin-right:5px;vertical-align:middle}.app-xform-builder .app-xform-builder-header .opt-front-list .opt-item:hover,.app-xform-builder .app-xform-builder-header .opt-rear-list .opt-item:hover{color:#1890ff}.app-xform-builder .app-xform-builder-header .opt-rear-list{position:absolute;top:0;right:0}.app-xform-builder .app-xform-builder-panel{border:1px solid #eee;display:flex}.app-xform-builder .app-xform-builder-panel .field-picker-panel{margin-top:-1px;width:200px;background:#fff;display:inline-block;overflow:auto}.app-xform-builder .app-xform-builder-panel .field-list-panel{flex:1;background:#f0f0f0;overflow:auto}.app-xform-builder .app-xform-builder-panel .field-config-drawer-panel{display:inline-block;width:0;transition:width .5s;background:#fff;border-radius:2px;margin-top:1px;position:relative;overflow:auto}.app-xform-builder .app-xform-builder-panel .field-config-drawer-panel .close-icon{font-size:14px;color:rgba(0,0,0,.85);cursor:pointer;position:absolute;top:10px;right:20px}.app-xform-builder .app-xform-builder-panel .app-xform-builder-field-picker-wrapper .field-search-box{padding:8px 13px}.app-xform-builder .app-xform-builder-action{text-align:right;margin-top:15px}.app-xform-builder.fullscreen{position:fixed;top:0;left:0;overflow:auto;background:#fff;z-index:999}");

var AppForm = /*#__PURE__*/function (_PureComponent) {
  _inherits(AppForm, _PureComponent);

  var _super = _createSuper(AppForm);

  function AppForm(props) {
    var _this;

    _classCallCheck(this, AppForm);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_systemFieldSupport", function (dispatch, namespace, data) {
      if (data && data.systemTemplate && data.systemTemplate.fields) {
        dispatch({
          type: CONST.XFORM_BUILDER_UPDATE_SYSTEM_FIELDS,
          data: data.systemTemplate.fields,
          namespace: namespace
        });
      } else {
        console.warn('[xform-editor]getInitConfig接口缺少systemTemplate字段');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_commonFieldSupport", function (dispatch, namespace, data) {
      if (data && data.commonTemplate && data.commonTemplate.fields) {
        dispatch({
          type: CONST.XFORM_BUILDER_UPDATE_COMMON_FIELDS,
          data: data.commonTemplate.fields,
          namespace: namespace
        });
      } else {
        console.warn('[xform-editor]getInitConfig接口缺少commonTemplate字段');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_bizDataSupport", function (dispatch, namespace, data) {
      if (data && data.attributeTemplate && data.attributeTemplate.fields) {
        dispatch({
          type: CONST.XFORM_BUILDER_UPDATE_BIZ,
          data: data.attributeTemplate.fields,
          namespace: namespace
        });
      } else {
        console.warn('[xform-editor]getInitConfig接口缺少attributeTemplate字段');
      }

      if (data && data.optionTemplate && data.optionTemplate.fields) {
        dispatch({
          type: CONST.XFORM_BUILDER_UPDATE_OPTION_BIZ,
          data: data.optionTemplate.fields,
          namespace: namespace
        });
      } else {
        console.warn('[xform-editor]]getInitConfig接口缺少optionTemplate字段');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_langConfigSupport", function (dispatch, namespace, data) {
      // 多语言配置版本
      if (data && data.langs && data.defaultLang) {
        dispatch({
          type: CONST.XFORM_BUILDER_UPDATE_LANGS,
          data: {
            langs: data.langs,
            defaultLang: data.defaultLang,
            currentLang: data.defaultLang
          },
          namespace: namespace
        });
      } else {
        console.warn('[xform-editor]getInitConfig接口缺少字段langs和defaultLang字段');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDetectSuccess", function (schema) {
      console.warn('success in detect, get schema: ', schema);
      var _this$props = _this.props,
          systemFieldSupport = _this$props.systemFieldSupport,
          filterSystemFields = _this$props.filterSystemFields,
          namespace = _this$props.namespace,
          xformBuilderData = _this$props.xformBuilderData,
          bpmnNodes = _this$props.bpmnNodes;
      var data = (0, _fields.getFieldsBySchema)(schema, bpmnNodes);

      if (data && data.fields) {
        var originFieldsData = xformBuilderData && xformBuilderData.fields || []; // 获得原始system字段

        var originSystemFieldsData = originFieldsData.filter(function (originField) {
          return originField.fieldType === 'system';
        }); // 合并识别结果和系统system字段

        var fields = [].concat(_toConsumableArray(originSystemFieldsData), _toConsumableArray(data.fields));

        if (!systemFieldSupport || filterSystemFields) {
          fields = fields.filter(function (field) {
            return field.fieldType !== 'system';
          });
        }

        _this.props.dispatch({
          type: CONST.XFORM_BUILDER_INIT_FIELDS,
          data: fields,
          namespace: namespace
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handle", function () {
      var _this$props2 = _this.props,
          dispatch = _this$props2.dispatch,
          processId = _this$props2.processId,
          _this$props2$jsonSche = _this$props2.jsonSchema,
          jsonSchema = _this$props2$jsonSche === void 0 ? {} : _this$props2$jsonSche,
          _this$props2$uiSchema = _this$props2.uiSchema,
          uiSchema = _this$props2$uiSchema === void 0 ? {} : _this$props2$uiSchema,
          _this$props2$formData = _this$props2.formData,
          formData = _this$props2$formData === void 0 ? {} : _this$props2$formData,
          _this$props2$bizData = _this$props2.bizData,
          bizData = _this$props2$bizData === void 0 ? {} : _this$props2$bizData,
          _this$props2$sequence = _this$props2.sequence,
          sequence = _this$props2$sequence === void 0 ? [] : _this$props2$sequence;
      var formTitle = _this.state.formTitle;

      var formSchemaData = _this.handleFormSchemaView('save'); //let processId = window.location.search.split('=')[1]
      //console.log(formSchemaData);
      //console.log(jsonSchema,uiSchema,formData,bizData,sequence);


      var isSequence = JSON.stringify(formSchemaData.sequence) == JSON.stringify(sequence);
      var isJsonSchema = JSON.stringify(formSchemaData.jsonSchema) == JSON.stringify(jsonSchema);
      var isUiSchema = JSON.stringify(formSchemaData.uiSchema) == JSON.stringify(uiSchema);
      var isFormData = JSON.stringify(formSchemaData.formData) == JSON.stringify(formData);
      var isBizData = JSON.stringify(formSchemaData.bizData) == JSON.stringify(bizData);

      if (formSchemaData.sequence.length > 0) {
        if (isSequence && isJsonSchema && isUiSchema && isFormData && isBizData) {
          _antd.message.warn("表单无任何更改,无需保存");
        } else {
          var params = {
            name: formTitle,
            current: true,
            formSchema: formSchemaData,
            processId: processId
          };
          dispatch((0, _index2.addWorkflowProcessForm)(params)).then(function (res) {
            if (res.success) {
              dispatch((0, _index3.getProcessById)(processId)); //this.setState({ repeatData: formSchemaData.sequence })
            }
          });
        }
      } else {
        _antd.message.warn("请选择表单控件！");
      }
    });

    var _this$props3 = _this.props,
        formCode = _this$props3.formCode,
        platform = _this$props3.platform;
    _this.handleFormSave = _this.handleFormSave.bind(_assertThisInitialized(_this));
    _this.fetchInitConfig = _this.fetchInitConfig.bind(_assertThisInitialized(_this));
    _this.refetchLangConfig = _this.refetchLangConfig.bind(_assertThisInitialized(_this));
    _this.fetchSelectedFieldData = _this.fetchSelectedFieldData.bind(_assertThisInitialized(_this));
    _this.fetchFieldDataSourceList = _this.fetchFieldDataSourceList.bind(_assertThisInitialized(_this));
    _this.fetchFormDataSourceList = _this.fetchFormDataSourceList.bind(_assertThisInitialized(_this));
    _this.fetchServerCodeList = _this.fetchServerCodeList.bind(_assertThisInitialized(_this));
    _this.updateLangConfigHandler = _this.updateLangConfigHandler.bind(_assertThisInitialized(_this));
    _this.updateFieldsHandler = _this.updateFieldsHandler.bind(_assertThisInitialized(_this));
    _this.addFieldHandler = _this.addFieldHandler.bind(_assertThisInitialized(_this));
    _this.addFieldDataWithIndex = _this.addFieldDataWithIndex.bind(_assertThisInitialized(_this));
    _this.changeEditFieldHandler = _this.changeEditFieldHandler.bind(_assertThisInitialized(_this));
    _this.deleteEditFieldHandler = _this.deleteEditFieldHandler.bind(_assertThisInitialized(_this));
    _this.updateFieldItemHandler = _this.updateFieldItemHandler.bind(_assertThisInitialized(_this));
    _this.updateFieldDataHandler = _this.updateFieldDataHandler.bind(_assertThisInitialized(_this));
    _this.handleFormSchemaView = _this.handleFormSchemaView.bind(_assertThisInitialized(_this));
    _this.handleViewSchemaModalClose = _this.handleViewSchemaModalClose.bind(_assertThisInitialized(_this));
    _this.handlePlatformVisibleChange = _this.handlePlatformVisibleChange.bind(_assertThisInitialized(_this));
    _this.handlePlatformChange = _this.handlePlatformChange.bind(_assertThisInitialized(_this));
    _this.handleFormBaseVisibleChange = _this.handleFormBaseVisibleChange.bind(_assertThisInitialized(_this));
    _this.handleLangConfigChange = _this.handleLangConfigChange.bind(_assertThisInitialized(_this));
    _this.handleLangConfigVisibleChange = _this.handleLangConfigVisibleChange.bind(_assertThisInitialized(_this));
    _this.handleFormBaseChange = _this.handleFormBaseChange.bind(_assertThisInitialized(_this));
    _this.handleGlobalConfigChange = _this.handleGlobalConfigChange.bind(_assertThisInitialized(_this));
    _this.handleGlobalConfigVisibleChange = _this.handleGlobalConfigVisibleChange.bind(_assertThisInitialized(_this));
    _this.handleFormPreview = _this.handleFormPreview.bind(_assertThisInitialized(_this));
    _this.handleFormPreviewVisibleChange = _this.handleFormPreviewVisibleChange.bind(_assertThisInitialized(_this));
    _this.toggleFullScreen = _this.toggleFullScreen.bind(_assertThisInitialized(_this));
    _this.handleCloseFieldConfigPanel = _this.handleCloseFieldConfigPanel.bind(_assertThisInitialized(_this));
    _this.renderDefaultActionButtons = _this.renderDefaultActionButtons.bind(_assertThisInitialized(_this));
    _this.state = {
      fullscreen: false,

      /* 全屏模式 */
      fieldConfigDrawerVisible: false,
      formCode: formCode,
      formSchemaModalVisible: false,
      platform: _this._isValidPlatform(platform) ? platform : 'laptop',
      platformPopoverVisible: false,
      baseConfigPopoverVisible: false,
      langConfigPopoverVisible: false,
      moreFunctionPopoverVisible: false,
      previewPopoverVisible: false,
      formTitle: '',
      formDescription: '',
      formDataSourceCode: undefined,
      formSchema: {},
      deleteFieldCode: null //repeatData: [],

    };
    _this.instance = {
      handleFormSave: _this.handleFormSave
    };

    var logEvent = props.logEvent || function () {};

    _this.logger = new _logger["default"](logEvent);
    (0, _actionCreator.setLogger)(_this.logger); //this.getGroupBoxs = props.actions.setting.getGroupBoxs
    //this.insertOrUpdateGroupBox = props.actions.setting.insertOrUpdateGroupBox
    //this.delGroupBox = props.actions.setting.delGroupBox

    return _this;
  }

  _createClass(AppForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var namespace = this.props.namespace; // systemFieldSupport为一个开关属性，用来设置builder是否载入“系统字段”模块

      var systemFieldSupport = this.props.systemFieldSupport; // commonFieldSupport为一个开关属性，用来设置builder是否载入“通用字段”模块

      var commonFieldSupport = this.props.commonFieldSupport; // bizDataSupport为一个开关属性，用来设置builder是否载入字段“业务属性”配置模块

      var bizDataSupport = this.props.bizDataSupport; // langConfigSupport为一个开关属性，用来设置builder是否载入多语言配置的特性

      var langConfigSupport = this.props.langConfigSupport;
      var formCode = this.state.formCode;
      this.logger.logPageView();
      this.props.getInstance(this.instance);
      this.props.onCurrentRef(this); //回传this 供父组件调用
      // 获取builder的initConfig（包括systemTemplate系统字段、commonTemplate通用模板、attributeTemplate业务属性、optionTemplate选项业务属性）

      this.fetchInitConfig().then(function (data) {
        // 从localStorage中获取globalConfig（只需要初始获取一次）
        var globalConfig = _util.util.getXFormLocalStorage() !== null ? _util.util.getXFormLocalStorage() : {
          codeEditable: true,
          fieldPreviewable: false
        };

        _this2.updateGlobalConfigHandler(globalConfig);

        if (!systemFieldSupport) {
          // 清空系统字段数据
          _this2.props.dispatch(_actionCreator["default"].clearSystemFieldData(namespace));
        }

        if (!commonFieldSupport) {
          // 清空通用字段数据
          _this2.props.dispatch(_actionCreator["default"].clearCommonFieldData(namespace));
        }

        if (!bizDataSupport) {
          // 清空业务属性
          _this2.props.dispatch(_actionCreator["default"].clearBizData(namespace));

          _this2.props.dispatch(_actionCreator["default"].clearOptionBizData(namespace));
        }

        if (!langConfigSupport) {
          // 清空多语言配置数据
          _this2.props.dispatch(_actionCreator["default"].clearLangConfig(namespace));

          _this2.fetchSelectedFieldData();
        } else {
          // 支持多语言的场景要传入获取到的defaultLang，获取默认语言版本的表单数据
          _this2.fetchSelectedFieldData({
            lang: data.defaultLang
          });
        } // 获取配置数据源列表数据


        _this2.fetchFieldDataSourceList(); // 获取表单配置数据源列表数据


        _this2.fetchFormDataSourceList(); // 获取动态校验器列表数据


        _this2.fetchServerCodeList(); // 存取表单基础配置


        var _this2$props = _this2.props,
            platform = _this2$props.platform,
            jsonSchema = _this2$props.jsonSchema;
        var editFormTitle = Object.keys(jsonSchema).length > 0 && jsonSchema.title ? jsonSchema.title : data.formTitle || '';
        var editFormDesc = Object.keys(jsonSchema).length > 0 && jsonSchema.description ? jsonSchema.description : data.formDescription || '';

        if (platform) {
          if (data.platform !== platform) {
            console.warn('[xform-editor]当前编辑的表单所属的适配端和设置的platform属性不匹配，已强制使用设置的platform属性');
          }

          _this2.setState({
            formTitle: editFormTitle,
            formDescription: editFormDesc,
            formDataSourceCode: data.formDataSourceCode
          });
        } else {
          _this2.setState({
            platform: data.platform || 'laptop',
            formTitle: editFormTitle,
            formDescription: editFormDesc,
            formDataSourceCode: data.formDataSourceCode
          });
        } // 清除正在编辑的字段数据，置editFieldData为null


        _this2.props.dispatch(_actionCreator["default"].updateEditFieldData(null, namespace));
      });
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var namespace = nextProps.namespace; // systemFieldSupport为一个开关属性，用来设置builder是否载入“系统字段”模块

      var systemFieldSupport = nextProps.systemFieldSupport; // commonFieldSupport为一个开关属性，用来设置builder是否载入“通用字段”模块

      var commonFieldSupport = nextProps.commonFieldSupport; // bizDataSupport为一个开关属性，用来设置builder是否载入字段“业务属性”配置模块

      var bizDataSupport = nextProps.bizDataSupport; // langConfigSupport为一个开关属性，用来设置builder是否载入多语言配置的特性

      var langConfigSupport = nextProps.langConfigSupport;
      var bizCode = this.props.bizCode,
          nextBizCode = nextProps.bizCode;
      var formCode = this.props.formCode,
          nextFormCode = nextProps.formCode;
      var formType = this.props.formType,
          nextFormType = nextProps.formType;
      var locale = this.props.locale,
          nextLocale = nextProps.locale;
      var supportLangList = this.props.supportLangList,
          nextSupportLangList = nextProps.supportLangList;
      var systemTemplate = this.props.systemTemplate,
          nextSystemTemplate = nextProps.systemTemplate;
      var commonTemplate = this.props.commonTemplate,
          nextCommonTemplate = nextProps.commonTemplate;
      var attributeTemplate = this.props.attributeTemplate,
          nextAttributeTemplate = nextProps.attributeTemplate;
      var optionTemplate = this.props.optionTemplate,
          nextOptionTemplate = nextProps.optionTemplate;

      if (bizCode !== nextBizCode || formCode !== nextFormCode || formType !== nextFormType || locale !== nextLocale || JSON.stringify(supportLangList) !== JSON.stringify(nextSupportLangList) || systemTemplate !== nextSystemTemplate || commonTemplate !== nextCommonTemplate || attributeTemplate !== nextAttributeTemplate || optionTemplate !== nextOptionTemplate) {
        var newParams = {
          bizCode: nextBizCode,
          formCode: nextFormCode,
          formType: nextFormType,
          locale: nextLocale,
          supportLangList: nextSupportLangList,
          systemTemplate: nextSystemTemplate,
          commonTemplate: nextCommonTemplate,
          attributeTemplate: nextAttributeTemplate,
          optionTemplate: nextOptionTemplate
        };
        this.setState({
          formCode: nextFormCode
        }, function () {
          _this3.fetchInitConfig(newParams).then(function (data) {
            if (systemFieldSupport !== _this3.props.systemFieldSupport && !systemFieldSupport) {
              // 清空系统字段
              _this3.props.dispatch(_actionCreator["default"].clearSystemFieldData(namespace));
            }

            if (bizDataSupport !== _this3.props.bizDataSupport && !bizDataSupport) {
              // 清空业务属性
              _this3.props.dispatch(_actionCreator["default"].clearBizData(namespace));

              _this3.props.dispatch(_actionCreator["default"].clearOptionBizData(namespace));
            }

            if (commonFieldSupport !== _this3.props.commonFieldSupport && !commonFieldSupport) {
              // 清空通用字段数据
              _this3.props.dispatch(_actionCreator["default"].clearCommonFieldData(namespace));
            }

            if (langConfigSupport !== _this3.props.langConfigSupport && !langConfigSupport) {
              // 清空多语言配置数据
              _this3.props.dispatch(_actionCreator["default"].clearLangConfig(namespace));
            }

            if (!langConfigSupport) {
              // 清除生效字段fields
              _this3.props.dispatch(_actionCreator["default"].updateFields([], namespace));

              _this3.fetchSelectedFieldData(newParams);
            } else {
              // 支持多语言的场景要传入获取到的defaultLang，获取默认语言版本的表单数据
              _this3.props.dispatch(_actionCreator["default"].updateFields([], namespace));

              _this3.fetchSelectedFieldData(Object.assign({}, newParams, {
                lang: data.defaultLang
              }));
            } // 获取字段配置数据源列表数据


            _this3.fetchFieldDataSourceList(); // 获取表单配置数据源列表数据


            _this3.fetchFormDataSourceList(); // 获取动态校验器列表数据


            _this3.fetchServerCodeList(); // 存取表单基础配置


            var platform = nextProps.platform;

            if (platform) {
              if (data.platform !== platform) {
                console.warn('[xform-editor]当前编辑的表单所属的适配端和设置的platform属性不匹配，已强制使用设置的platform属性');
              }

              _this3.setState({
                formTitle: data.formTitle || '',
                formDescription: data.formDescription || '',
                formDataSourceCode: data.formDataSourceCode
              });
            } else {
              _this3.setState({
                platform: data.platform || 'laptop',
                formTitle: data.formTitle || '',
                formDescription: data.formDescription || '',
                formDataSourceCode: data.formDataSourceCode
              });
            } // 清除正在编辑的字段数据，置editFieldData为null


            _this3.props.dispatch(_actionCreator["default"].updateEditFieldData(null, namespace));
          });
        });
      }
    } // static getDerivedStateFromProps(nextProps, state) {
    //     const formCode = state.formCode,
    //         nextFormCode = nextProps.formCode;
    //     if (formCode !== nextFormCode ) {  
    //         return {
    //             formCode: nextFormCode
    //         }
    //     }
    //     return null;
    // }
    // componentDidUpdate(prevProps, prevState) {
    //    
    //     const { namespace, systemFieldSupport, commonFieldSupport, bizDataSupport, langConfigSupport} = this.props;
    //     const bizCode = this.props.bizCode,
    //         prevBizCode = prevProps.bizCode;
    //     const formCode = this.props.formCode,
    //         prevFormCode = prevProps.formCode;
    //     const formType = this.props.formType,
    //         prevFormType = prevProps.formType;
    //     const locale = this.props.locale,
    //         prevLocale = prevProps.locale;
    //     const supportLangList = this.props.supportLangList,
    //         prevSupportLangList = prevProps.supportLangList;
    //     const systemTemplate = this.props.systemTemplate,
    //         prevSystemTemplate = prevProps.systemTemplate;
    //     const commonTemplate = this.props.commonTemplate,
    //         prevCommonTemplate = prevProps.commonTemplate;
    //     const attributeTemplate = this.props.attributeTemplate,
    //         prevAttributeTemplate = prevProps.attributeTemplate;
    //     const optionTemplate = this.props.optionTemplate,
    //         prevOptionTemplate = prevProps.optionTemplate;
    //         const newParams = {
    //             bizCode: bizCode,
    //             formCode: formCode,
    //             formType: formType,
    //             locale: locale,
    //             supportLangList: supportLangList,
    //             systemTemplate: systemTemplate,
    //             commonTemplate: commonTemplate,
    //             attributeTemplate: attributeTemplate,
    //             optionTemplate: optionTemplate
    //         };
    //         if (bizCode !== prevBizCode ||
    //             formCode !== prevFormCode ||
    //             formType !== prevFormType ||
    //             locale !== prevLocale ||
    //             JSON.stringify(supportLangList) !== JSON.stringify(prevSupportLangList) ||
    //             systemTemplate !== prevSystemTemplate ||
    //             commonTemplate !== prevCommonTemplate ||
    //             attributeTemplate !== prevAttributeTemplate ||
    //             optionTemplate !== prevOptionTemplate
    //         ) {
    //         this.fetchInitConfig(newParams).then((data) => {
    //             if ((systemFieldSupport !== this.props.systemFieldSupport) && !systemFieldSupport) {
    //                 // 清空系统字段
    //                 this.props.dispatch(actionCreators.clearSystemFieldData(namespace));
    //             }
    //             if ((bizDataSupport !== this.props.bizDataSupport) && !bizDataSupport) {
    //                 // 清空业务属性
    //                 this.props.dispatch(actionCreators.clearBizData(namespace));
    //                 this.props.dispatch(actionCreators.clearOptionBizData(namespace));
    //             }
    //             if ((commonFieldSupport !== this.props.commonFieldSupport) && !commonFieldSupport) {
    //                 // 清空通用字段数据
    //                 this.props.dispatch(actionCreators.clearCommonFieldData(namespace));
    //             }
    //             if ((langConfigSupport !== this.props.langConfigSupport) && !langConfigSupport) {
    //                 // 清空多语言配置数据
    //                 this.props.dispatch(actionCreators.clearLangConfig(namespace));
    //             }
    //             if (!langConfigSupport) {
    //                 // 清除生效字段fields
    //                 this.props.dispatch(actionCreators.updateFields([], namespace));
    //                 this.fetchSelectedFieldData(newParams);
    //             } else {
    //                 // 支持多语言的场景要传入获取到的defaultLang，获取默认语言版本的表单数据
    //                 this.props.dispatch(actionCreators.updateFields([], namespace));
    //                 this.fetchSelectedFieldData(Object.assign({}, newParams, {
    //                     lang: data.defaultLang
    //                 }));
    //             }
    //             // 获取字段配置数据源列表数据
    //             this.fetchFieldDataSourceList();
    //             // 获取表单配置数据源列表数据
    //             this.fetchFormDataSourceList();
    //             // 获取动态校验器列表数据
    //             this.fetchServerCodeList();
    //             // 存取表单基础配置
    //             const {platform} = this.props;
    //             if (platform) {
    //                 if (data.platform !== platform) {
    //                     console.warn('[xform-editor]当前编辑的表单所属的适配端和设置的platform属性不匹配，已强制使用设置的platform属性');
    //                 }
    //                 this.setState({
    //                     formTitle: data.formTitle || '',
    //                     formDescription: data.formDescription || '',
    //                     formDataSourceCode: data.formDataSourceCode
    //                 });
    //             } else {
    //                 this.setState({
    //                     platform: data.platform || 'laptop',
    //                     formTitle: data.formTitle || '',
    //                     formDescription: data.formDescription || '',
    //                     formDataSourceCode: data.formDataSourceCode
    //                 });
    //             }
    //             // 清除正在编辑的字段数据，置editFieldData为null
    //             this.props.dispatch(actionCreators.updateEditFieldData(null, namespace));
    //         });
    //     }
    // }

  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var onError = this.props.onError;

      if (typeof onError === 'function') {
        onError(error, info);
      }

      console.error('[xform-builder] error', error);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.getInstance(null);
    } // 表单“schema预览”操作

  }, {
    key: "handleFormSchemaView",
    value: function handleFormSchemaView(type) {
      var _this$state = this.state,
          formTitle = _this$state.formTitle,
          formDescription = _this$state.formDescription;
      var xformBuilderData = this.props.xformBuilderData;
      var jsonSchema = {},
          uiSchema = {},
          formData = {},
          bizData = {},
          sequence = [];
      var formSchema = {};
      var requiredField = [];
      var fieldsData = xformBuilderData && xformBuilderData.fields || []; // add 2020-06-08 如果存在分组，把分组下的控件push到分组children

      var newFieldsData = [];
      var hasGroupFields = fieldsData.filter(function (item) {
        return item.type !== 'group' && item.hasgroup;
      });
      fieldsData.forEach(function (item) {
        if (item.type === 'group' || item.type === 'Table') {
          var groupFields = hasGroupFields.filter(function (v) {
            return v.hasgroup === item.code;
          });

          var field = _objectSpread(_objectSpread({}, item), {}, {
            children: groupFields
          });

          newFieldsData.push(field);
        } else {
          if (!item.hasgroup) {
            newFieldsData.push(item);
          }
        }
      }); // 解析xformBuilderData，提取预览xform数据

      newFieldsData.map(function (field) {
        var fieldBizData = field.bizData; //configPlatform = configSchema[field.type].platform || [];
        // 判断当前字段是否支持当前平台
        // if (field.fieldType !== 'system' && !util._isInConfigPlatform(configPlatform, platform)) {
        //     hasUnsupportedField = true;
        // }

        fieldBizData[field.code].type = field.type;
        fieldBizData[field.code].fieldType = field.fieldType;

        if (field.required) {
          requiredField.push(field.code);
        }

        sequence.push(field.code); //add 2020-06-08 判断group 

        if ((field.type === 'group' || field.type === 'Table') && Array.isArray(field.children)) {
          var childrenJsonSchema = {},
              childrenUiSchema = {},
              childFormData = {},
              childrenRequiredField = []; //let uiOptions = field.uiSchema[field.code]['ui:options'];

          field.children.map(function (c) {
            sequence.push({
              code: c.code,
              group: field.code
            });
            var childFieldBizData = c.bizData;
            childFieldBizData[c.code].type = c.type;
            childFieldBizData[c.code].fieldType = c.fieldType;

            if (c.required) {
              childrenRequiredField.push(c.code);
            }

            childrenJsonSchema = Object.assign({}, childrenJsonSchema, c.jsonSchema);
            childrenUiSchema = Object.assign({}, childrenUiSchema, c.uiSchema);
            childFormData = Object.assign({}, childFormData, c.formData);
            fieldBizData = Object.assign({}, fieldBizData, childFieldBizData); //debugger;
          });

          if (field.jsonSchema[field.code].type === 'array') {
            //field.jsonSchema[field.code].title =   field.uiSchema[field.code].items['ui:options'].groupName
            field.jsonSchema[field.code].items.properties = childrenJsonSchema;
            field.jsonSchema[field.code].items.required = childrenRequiredField;
            field.uiSchema[field.code].items = Object.assign({}, field.uiSchema[field.code].items, childrenUiSchema);
            field.formData[field.code] = [childFormData];
          } else {
            field.jsonSchema[field.code].properties = childrenJsonSchema;
            field.jsonSchema[field.code].required = childrenRequiredField;
            field.uiSchema[field.code] = Object.assign({}, field.uiSchema[field.code], childrenUiSchema); //field.uiSchema[field.code]['ui:options'] = uiOptions;

            field.formData[field.code] = childFormData;
          } //  debugger;

        }

        jsonSchema = Object.assign({}, jsonSchema, field.jsonSchema);
        uiSchema = Object.assign({}, uiSchema, field.uiSchema);
        formData = Object.assign({}, formData, field.formData);
        bizData = Object.assign({}, bizData, fieldBizData);
      });
      jsonSchema = {
        title: formTitle,
        description: formDescription,
        type: 'object',
        required: requiredField,
        properties: jsonSchema
      };
      formSchema = {
        jsonSchema: jsonSchema,
        uiSchema: uiSchema,
        formData: formData,
        bizData: bizData,
        sequence: sequence
      };

      if (type == 'save') {
        return formSchema;
      } else {
        this.setState({
          formSchemaModalVisible: true,
          formSchema: formSchema
        });
      }
    }
  }, {
    key: "handleViewSchemaModalClose",
    value: function handleViewSchemaModalClose() {
      this.setState({
        formSchemaModalVisible: false
      });
    } //add 2020-06-15 配置保存 ，父组件调用 返回保存数据

  }, {
    key: "handleJsonSchemaFormSave",
    value: function handleJsonSchemaFormSave() {
      var _this$props4 = this.props,
          env = _this$props4.env,
          messages = _this$props4.messages,
          registerWidgets = _this$props4.registerWidgets,
          supportFieldList = _this$props4.supportFieldList,
          langConfigSupport = _this$props4.langConfigSupport,
          customGateway = _this$props4.customGateway,
          customInterfaces = _this$props4.customInterfaces,
          beforeSubmit = _this$props4.beforeSubmit,
          onSubmit = _this$props4.onSubmit,
          xformBuilderData = _this$props4.xformBuilderData,
          bizCode = _this$props4.bizCode,
          formType = _this$props4.formType,
          overwriteSchema = _this$props4.overwriteSchema;
      var _this$state2 = this.state,
          formTitle = _this$state2.formTitle,
          formDescription = _this$state2.formDescription,
          formDataSourceCode = _this$state2.formDataSourceCode,
          platform = _this$state2.platform,
          formCode = _this$state2.formCode;
      var fieldsData = xformBuilderData && xformBuilderData.fields || [];
      var langs = xformBuilderData && xformBuilderData.langs || {};
      var jsonSchema = {},
          uiSchema = {},
          formData = {},
          bizData = {};
      var sequence = [];
      var requiredField = [];
      var submitParams = {};

      var configSchema = _index["default"].getDefaultConfig(messages, registerWidgets, supportFieldList);

      var configPlatform;
      var hasUnsupportedField = false; // add 2020-06-08 如果存在分组，把分组下的控件push到分组children

      var newFieldsData = [];
      var hasGroupFields = fieldsData.filter(function (item) {
        return item.type !== 'group' && item.hasgroup;
      });
      fieldsData.forEach(function (item) {
        if (item.type === 'group' || item.type === 'Table') {
          var groupFields = hasGroupFields.filter(function (v) {
            return v.hasgroup === item.code;
          });

          var field = _objectSpread(_objectSpread({}, item), {}, {
            children: groupFields
          });

          newFieldsData.push(field);
        } else {
          if (!item.hasgroup) {
            newFieldsData.push(item);
          }
        }
      }); // 解析xformBuilderData，提取预览xform数据

      newFieldsData.map(function (field) {
        var fieldBizData = field.bizData;
        configPlatform = configSchema[field.type].platform || []; // 判断当前字段是否支持当前平台

        if (field.fieldType !== 'system' && !_util.util._isInConfigPlatform(configPlatform, platform)) {
          hasUnsupportedField = true;
        }

        fieldBizData[field.code].type = field.type; // 根据formType，需要对fields中的fieldType进行修正。formType = 1（配置系统字段，fieldType = system） formType = 3（配置通用字段，fieldType = common）,formType为其他值时不修正fieldType

        if (formType === 1) {
          fieldBizData[field.code].fieldType = 'system';
        } else if (formType === 3) {
          fieldBizData[field.code].fieldType = 'common';
        } else {
          fieldBizData[field.code].fieldType = field.fieldType;
        }

        if (field.required) {
          requiredField.push(field.code);
        }

        sequence.push(field.code); //add 2020-06-08 判断group 

        if ((field.type === 'group' || item.type === 'Table') && Array.isArray(field.children)) {
          var childrenJsonSchema = {},
              childrenUiSchema = {},
              childFormData = {},
              childrenRequiredField = [],
              childrenConfigPlatform; //let uiOptions = field.uiSchema[field.code]['ui:options'];

          field.children.map(function (c) {
            sequence.push({
              code: c.code,
              group: field.code
            });
            var childFieldBizData = c.bizData;
            childFieldBizData[c.code].type = c.type;
            childFieldBizData[c.code].fieldType = c.fieldType;
            childrenConfigPlatform = configSchema[c.type].platform || []; //判断子字段是否支持当前平台

            if (c.fieldType !== 'system' && !_util.util._isInConfigPlatform(childrenConfigPlatform, platform)) {
              hasUnsupportedField = true;
            }

            if (c.required) {
              childrenRequiredField.push(c.code);
            }

            childrenJsonSchema = Object.assign({}, childrenJsonSchema, c.jsonSchema);
            childrenUiSchema = Object.assign({}, childrenUiSchema, c.uiSchema);
            childFormData = Object.assign({}, childFormData, c.formData);
            fieldBizData = Object.assign({}, fieldBizData, childFieldBizData);
          });

          if (field.jsonSchema[field.code].type === 'array') {
            //field.jsonSchema[field.code].title =   field.uiSchema[field.code].items['ui:options'].groupName
            field.jsonSchema[field.code].items.properties = childrenJsonSchema;
            field.jsonSchema[field.code].items.required = childrenRequiredField;
            field.uiSchema[field.code].items = Object.assign({}, field.uiSchema[field.code].items, childrenUiSchema);
            field.formData[field.code] = [childFormData];
          } else {
            field.jsonSchema[field.code].properties = childrenJsonSchema;
            field.jsonSchema[field.code].required = childrenRequiredField;
            field.uiSchema[field.code] = Object.assign({}, field.uiSchema[field.code], childrenUiSchema); //field.uiSchema[field.code]['ui:options'] = uiOptions;

            field.formData[field.code] = childFormData;
          }
        }

        jsonSchema = Object.assign({}, jsonSchema, field.jsonSchema);
        uiSchema = Object.assign({}, uiSchema, field.uiSchema);
        formData = Object.assign({}, formData, field.formData);
        bizData = Object.assign({}, bizData, fieldBizData);
      });
      jsonSchema = {
        title: formTitle,
        description: formDescription,
        type: 'object',
        required: requiredField,
        properties: jsonSchema
      }; // 判断是否存在当前端不支持的字段，如果存在不允许提交

      if (hasUnsupportedField) {
        if (platform === 'laptop') {
          _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformHasLaptopNotSupportFieldTip')]);
        } else if (platform === 'mobile') {
          _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformHasMobileNotSupportFieldTip')]);
        }

        return false;
      } // 执行beforeSubmit，判断下是否提交到服务端


      if (typeof beforeSubmit === 'function' && !beforeSubmit({
        jsonSchema: jsonSchema,
        uiSchema: uiSchema,
        formData: formData,
        bizData: bizData,
        sequence: sequence
      })) {
        return false;
      }

      return {
        jsonSchema: jsonSchema,
        uiSchema: uiSchema,
        formData: formData,
        bizData: bizData,
        sequence: sequence
      };
    } // 表单配置“预览”操作

  }, {
    key: "handleFormPreview",
    value: function handleFormPreview() {
      var _this4 = this;

      var _this$props5 = this.props,
          env = _this$props5.env,
          customGateway = _this$props5.customGateway,
          customInterfaces = _this$props5.customInterfaces,
          messages = _this$props5.messages,
          registerWidgets = _this$props5.registerWidgets,
          supportFieldList = _this$props5.supportFieldList;
      var _this$state3 = this.state,
          formTitle = _this$state3.formTitle,
          formDescription = _this$state3.formDescription,
          platform = _this$state3.platform,
          formDataSourceCode = _this$state3.formDataSourceCode;
      var xformBuilderData = this.props.xformBuilderData;
      var fieldsData = xformBuilderData && xformBuilderData.fields || [];
      var jsonSchema = {},
          uiSchema = {},
          formData = {},
          bizData = {},
          sequence = [];
      var formSchema = {},
          formDataFromDataSource = {};
      var requiredField = [];

      var configSchema = _index["default"].getDefaultConfig(messages, registerWidgets, supportFieldList);

      var configPlatform;
      var hasUnsupportedField = false; // add 2020-06-08 如果存在分组，把分组下的控件push到分组children

      var newFieldsData = [];
      var hasGroupFields = fieldsData.filter(function (item) {
        return item.type !== 'group' && item.hasgroup;
      });
      fieldsData.forEach(function (item) {
        if (item.type === 'group' || item.type === 'Table') {
          var groupFields = hasGroupFields.filter(function (v) {
            return v.hasgroup === item.code;
          });

          var field = _objectSpread(_objectSpread({}, item), {}, {
            children: groupFields
          });

          newFieldsData.push(field);
        } else {
          if (!item.hasgroup) {
            newFieldsData.push(item);
          }
        }
      }); // 解析xformBuilderData，提取预览xform数据

      newFieldsData.map(function (field) {
        var fieldBizData = field.bizData;
        configPlatform = configSchema[field.type].platform || []; // 判断当前字段是否支持当前平台

        if (field.fieldType !== 'system' && !_util.util._isInConfigPlatform(configPlatform, platform)) {
          hasUnsupportedField = true;
        }

        fieldBizData[field.code].type = field.type;
        fieldBizData[field.code].fieldType = field.fieldType;

        if (field.required) {
          requiredField.push(field.code);
        }

        sequence.push(field.code); //add 2020-06-08 判断group 

        if ((field.type === 'group' || field.type === 'Table') && Array.isArray(field.children)) {
          var childrenJsonSchema = {},
              childrenUiSchema = {},
              childFormData = {},
              childrenRequiredField = [],
              childrenConfigPlatform; //let uiOptions = field.uiSchema[field.code]['ui:options'];

          field.children.map(function (c) {
            sequence.push({
              code: c.code,
              group: field.code
            });
            var childFieldBizData = c.bizData;
            childFieldBizData[c.code].type = c.type;
            childFieldBizData[c.code].fieldType = c.fieldType;
            childrenConfigPlatform = configSchema[c.type].platform || []; //判断子字段是否支持当前平台

            if (c.fieldType !== 'system' && !_util.util._isInConfigPlatform(childrenConfigPlatform, platform)) {
              hasUnsupportedField = true;
            }

            if (c.required) {
              childrenRequiredField.push(c.code);
            }

            childrenJsonSchema = Object.assign({}, childrenJsonSchema, c.jsonSchema);
            childrenUiSchema = Object.assign({}, childrenUiSchema, c.uiSchema);
            childFormData = Object.assign({}, childFormData, c.formData);
            fieldBizData = Object.assign({}, fieldBizData, childFieldBizData);
          });

          if (field.jsonSchema[field.code].type === 'array') {
            //field.jsonSchema[field.code].title =   field.uiSchema[field.code].items['ui:options'].groupName
            field.jsonSchema[field.code].items.properties = childrenJsonSchema;
            field.jsonSchema[field.code].items.required = childrenRequiredField;
            field.uiSchema[field.code].items = Object.assign({}, field.uiSchema[field.code].items, childrenUiSchema);
            field.formData[field.code] = [childFormData];
          } else {
            field.jsonSchema[field.code].properties = childrenJsonSchema;
            field.jsonSchema[field.code].required = childrenRequiredField;
            field.uiSchema[field.code] = Object.assign({}, field.uiSchema[field.code], childrenUiSchema); //field.uiSchema[field.code]['ui:options'] = uiOptions;

            field.formData[field.code] = childFormData;
          }
        }

        jsonSchema = Object.assign({}, jsonSchema, field.jsonSchema);
        uiSchema = Object.assign({}, uiSchema, field.uiSchema);
        formData = Object.assign({}, formData, field.formData);
        bizData = Object.assign({}, bizData, fieldBizData);
      });
      jsonSchema = {
        title: formTitle,
        description: formDescription,
        type: 'object',
        required: requiredField,
        properties: jsonSchema
      };
      formSchema = {
        jsonSchema: jsonSchema,
        uiSchema: uiSchema,
        formData: formData,
        bizData: bizData,
        sequence: sequence
      };

      if (hasUnsupportedField) {
        switch (platform) {
          case 'laptop':
            _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformHasLaptopNotSupportFieldTip')]);

            break;

          case 'mobile':
            _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformHasMobileNotSupportFieldTip')]);

            break;

          case 'both':
            _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformHasBothNotSupportFieldTip')]);

            break;
        }
      } // 如果表单配置了表单数据源，则在预览时，要请求数据源接口，并将数据源返回数据填充到预览表单中。如果表单没有配置formDataSourceCode，则服务端会返回null


      if (!!formDataSourceCode && typeof formDataSourceCode !== 'undefined' && formDataSourceCode !== null) {
        fetch('http://rest.apizza.net/mock/ed27f575082bc8b08597a0476ea1a8f5/' + formDataSourceCode).then(function (res) {
          return res.json();
        }).then(function (data) {
          if (data && _typeof(data) === 'object') {
            formSchema = data;
          }

          _this4.setState({
            previewPopoverVisible: true,
            formSchema: formSchema
          });
        });
        return;

        _request.request.fetch(_request.request.getInterface('dataSourceServerUrl', customInterfaces, env), {
          sourceCode: formDataSourceCode,
          params: Object.assign({}, formData),
          stringifyParams: JSON.stringify(Object.assign({}, formData))
        }, customGateway, env).then(function (data) {
          if (data && data.data && _typeof(data.data.formDataMap) === 'object') {
            formDataFromDataSource = data.data.formDataMap;
            formSchema.formData = _objectSpread(_objectSpread({}, formData), formDataFromDataSource);
          }

          _this4.setState({
            previewPopoverVisible: true,
            formSchema: formSchema
          });
        })["catch"](function (data) {
          _this4.logger.logException('xformBuilder.dataSourceServerUrl', true);

          _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformGetFormDataSourceErrorTip')] + data.message);

          _this4.setState({
            previewPopoverVisible: true,
            formSchema: formSchema
          });
        });
      } else {
        this.setState({
          previewPopoverVisible: true,
          formSchema: formSchema
        });
      }
    }
  }, {
    key: "handleFormPreviewVisibleChange",
    value: function handleFormPreviewVisibleChange(visible) {
      if (visible) {
        this.handleFormPreview();
      } else {
        this.setState({
          previewPopoverVisible: false
        });
      }
    } // 表单配置“保存”操作

  }, {
    key: "handleFormSave",
    value: function handleFormSave() {
      var _this5 = this;

      var _this$props6 = this.props,
          env = _this$props6.env,
          messages = _this$props6.messages,
          registerWidgets = _this$props6.registerWidgets,
          supportFieldList = _this$props6.supportFieldList,
          langConfigSupport = _this$props6.langConfigSupport,
          customGateway = _this$props6.customGateway,
          customInterfaces = _this$props6.customInterfaces,
          beforeSubmit = _this$props6.beforeSubmit,
          onSubmit = _this$props6.onSubmit,
          xformBuilderData = _this$props6.xformBuilderData,
          bizCode = _this$props6.bizCode,
          formType = _this$props6.formType,
          overwriteSchema = _this$props6.overwriteSchema;
      var _this$state4 = this.state,
          formTitle = _this$state4.formTitle,
          formDescription = _this$state4.formDescription,
          formDataSourceCode = _this$state4.formDataSourceCode,
          platform = _this$state4.platform,
          formCode = _this$state4.formCode;
      var fieldsData = xformBuilderData && xformBuilderData.fields || [];
      var langs = xformBuilderData && xformBuilderData.langs || {};
      var jsonSchema = {},
          uiSchema = {},
          formData = {},
          bizData = {};
      var sequence = [];
      var requiredField = [];
      var submitParams = {};

      var configSchema = _index["default"].getDefaultConfig(messages, registerWidgets, supportFieldList);

      var configPlatform;
      var hasUnsupportedField = false; // 解析xformBuilderData，提取预览xform数据

      fieldsData.map(function (field) {
        sequence.push(field.code);
        var fieldBizData = field.bizData;
        configPlatform = configSchema[field.type].platform || []; // 判断当前字段是否支持当前平台

        if (field.fieldType !== 'system' && !_util.util._isInConfigPlatform(configPlatform, platform)) {
          hasUnsupportedField = true;
        }

        fieldBizData[field.code].type = field.type; // 根据formType，需要对fields中的fieldType进行修正。formType = 1（配置系统字段，fieldType = system） formType = 3（配置通用字段，fieldType = common）,formType为其他值时不修正fieldType

        if (formType === 1) {
          fieldBizData[field.code].fieldType = 'system';
        } else if (formType === 3) {
          fieldBizData[field.code].fieldType = 'common';
        } else {
          fieldBizData[field.code].fieldType = field.fieldType;
        }

        if (field.required) {
          requiredField.push(field.code);
        }

        jsonSchema = Object.assign({}, jsonSchema, field.jsonSchema);
        uiSchema = Object.assign({}, uiSchema, field.uiSchema);
        formData = Object.assign({}, formData, field.formData);
        bizData = Object.assign({}, bizData, fieldBizData);
      });
      jsonSchema = {
        title: formTitle,
        description: formDescription,
        type: 'object',
        required: requiredField,
        properties: jsonSchema
      }; // 判断是否存在当前端不支持的字段，如果存在不允许提交

      if (hasUnsupportedField) {
        if (platform === 'laptop') {
          _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformHasLaptopNotSupportFieldTip')]);
        } else if (platform === 'mobile') {
          _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformHasMobileNotSupportFieldTip')]);
        }

        return;
      } // 执行beforeSubmit，判断下是否提交到服务端


      if (typeof beforeSubmit === 'function' && !beforeSubmit({
        jsonSchema: jsonSchema,
        uiSchema: uiSchema,
        formData: formData,
        bizData: bizData,
        sequence: sequence
      })) {
        return;
      }

      if (overwriteSchema && typeof formCode === 'string' && formCode !== '') {
        // 编辑保存
        if (langConfigSupport) {
          submitParams = {
            langConfig: JSON.stringify(langs.langs),
            configVersion: 'v2',
            platform: platform,
            formDataSourceCode: formDataSourceCode,
            formCode: formCode,
            schemaContent: JSON.stringify({
              jsonSchema: jsonSchema,
              uiSchema: uiSchema,
              formData: formData,
              bizData: bizData,
              sequence: sequence
            })
          };
        } else {
          submitParams = {
            platform: platform,
            formDataSourceCode: formDataSourceCode,
            formCode: formCode,
            schemaContent: JSON.stringify({
              jsonSchema: jsonSchema,
              uiSchema: uiSchema,
              formData: formData,
              bizData: bizData,
              sequence: sequence
            })
          };
        }

        _request.request.fetch(_request.request.getInterface('updateFieldsData', customInterfaces, env), submitParams, customGateway, env, {
          type: 'POST'
        }).then(function (data) {
          _this5.setState({
            formCode: data.formCode
          }, function () {
            // 重新获取多语言配置
            _this5.refetchLangConfig({
              formCode: data.formCode
            });
          });

          if (typeof onSubmit === 'function') {
            onSubmit(data.formCode, {
              jsonSchema: jsonSchema,
              uiSchema: uiSchema,
              formData: formData,
              bizData: bizData,
              sequence: sequence
            });
          }
        })["catch"](function (data) {
          _this5.logger.logException('xformBuilder.updateForm', true);

          _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformUpdateSchemaErrorTip')] + data.message);
        });
      } else {
        // 新建保存
        if (langConfigSupport) {
          submitParams = {
            langConfig: JSON.stringify(langs.langs),
            configVersion: 'v2',
            fromFormCode: formCode,
            platform: platform,
            formDataSourceCode: formDataSourceCode,
            bizCode: bizCode,
            formType: formType,
            schemaContent: JSON.stringify({
              jsonSchema: jsonSchema,
              uiSchema: uiSchema,
              formData: formData,
              bizData: bizData,
              sequence: sequence
            })
          };
        } else {
          submitParams = {
            platform: platform,
            formDataSourceCode: formDataSourceCode,
            bizCode: bizCode,
            formType: formType,
            schemaContent: JSON.stringify({
              jsonSchema: jsonSchema,
              uiSchema: uiSchema,
              formData: formData,
              bizData: bizData,
              sequence: sequence
            })
          };
        }

        var saveFieldsData = function saveFieldsData() {
          return new Promise(function (resolve, reject) {
            if (env === 'dev') {
              resolve({
                "formCode": "DEV_NEW"
              });
            } else {
              _request.request.fetch(_request.request.getInterface('saveFieldsData', customInterfaces, env), submitParams, customGateway, env, {
                type: 'POST'
              }).then(resolve)["catch"](reject);
            }
          });
        };

        saveFieldsData().then(function (data) {
          // 新建表单，需要将formCode更新为当前创建的formCode
          if (data.formCode !== 'DEV_NEW') {
            _this5.setState({
              formCode: data.formCode
            }, function () {
              _this5.refetchLangConfig({
                formCode: data.formCode
              });
            });
          }

          if (typeof onSubmit === 'function') {
            onSubmit(data.formCode, {
              jsonSchema: jsonSchema,
              uiSchema: uiSchema,
              formData: formData,
              bizData: bizData,
              sequence: sequence
            });
          }
        })["catch"](function (data) {
          _this5.logger.logException('xformBuilder.saveForm', true);

          _antd.message.error(messages[(0, _localeMessages.getMessageId)('xformSaveSchemaErrorTip')] + data.message);
        });
      }
    }
  }, {
    key: "fetchInitConfig",
    value: function fetchInitConfig(code) {
      var _this6 = this;

      var _this$props7 = this.props,
          messages = _this$props7.messages,
          bizCode = _this$props7.bizCode,
          locale = _this$props7.locale,
          supportLangList = _this$props7.supportLangList,
          systemTemplate = _this$props7.systemTemplate,
          commonTemplate = _this$props7.commonTemplate,
          attributeTemplate = _this$props7.attributeTemplate,
          optionTemplate = _this$props7.optionTemplate,
          env = _this$props7.env,
          customInterfaces = _this$props7.customInterfaces,
          customGateway = _this$props7.customGateway,
          formCode = _this$props7.formCode,
          platform = _this$props7.platform,
          systemFieldSupport = _this$props7.systemFieldSupport,
          commonFieldSupport = _this$props7.commonFieldSupport,
          bizDataSupport = _this$props7.bizDataSupport,
          langConfigSupport = _this$props7.langConfigSupport,
          namespace = _this$props7.namespace,
          dispatch = _this$props7.dispatch,
          user = _this$props7.user,
          businessTypeName = _this$props7.businessTypeName,
          processId = _this$props7.processId;

      if (code && code != '') {
        this.setState({
          deleteFieldCode: code
        }, function () {
          _this6.setState({
            fieldConfigDrawerVisible: false
          });
        });
      } // return new Promise((resolve, reject) => {
      //     this.props.dispatch(actionCreators.fetchInitConfig(Object.assign({}, params, combineParams), messages, resolve, reject));
      // });


      return new Promise(function (resolve, reject) {
        dispatch((0, _index2.getProcessFormSystemFields)(processId)).then(function (_data) {
          var data = _data.payload.data;
          systemFieldSupport ? _this6._systemFieldSupport(dispatch, namespace, data) : '';
          commonFieldSupport ? _this6._commonFieldSupport(dispatch, namespace, data) : '';
          bizDataSupport ? _this6._bizDataSupport(dispatch, namespace, data) : '';
          langConfigSupport ? _this6._langConfigSupport(dispatch, namespace, data) : '';
          resolve(data);
        })["catch"](function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: "refetchLangConfig",
    value: // 更新多语言的langs配置
    function refetchLangConfig() {
      var combineParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props8 = this.props,
          messages = _this$props8.messages,
          bizCode = _this$props8.bizCode,
          locale = _this$props8.locale,
          systemFieldSupport = _this$props8.systemFieldSupport,
          commonFieldSupport = _this$props8.commonFieldSupport,
          bizDataSupport = _this$props8.bizDataSupport,
          langConfigSupport = _this$props8.langConfigSupport,
          supportLangList = _this$props8.supportLangList,
          systemTemplate = _this$props8.systemTemplate,
          commonTemplate = _this$props8.commonTemplate,
          attributeTemplate = _this$props8.attributeTemplate,
          optionTemplate = _this$props8.optionTemplate,
          env = _this$props8.env,
          namespace = _this$props8.namespace,
          customInterfaces = _this$props8.customInterfaces,
          customGateway = _this$props8.customGateway,
          formCode = _this$props8.formCode,
          xformBuilderData = _this$props8.xformBuilderData;
      var currentLang = xformBuilderData.langs.currentLang;
      var params = {
        env: env,
        namespace: namespace,
        bizCode: bizCode,
        locale: locale,
        formCode: formCode,
        systemFieldSupport: systemFieldSupport,
        commonFieldSupport: commonFieldSupport,
        bizDataSupport: bizDataSupport,
        langConfigSupport: langConfigSupport,
        supportLangList: supportLangList,
        systemTemplate: systemTemplate,
        commonTemplate: commonTemplate,
        attributeTemplate: attributeTemplate,
        optionTemplate: optionTemplate,
        customInterfaces: customInterfaces,
        customGateway: customGateway
      };
      this.props.dispatch(_actionCreator["default"].refetchLangConfig(Object.assign({}, params, combineParams), messages, currentLang));
    } // 获取生效字段初始field数据

  }, {
    key: "fetchSelectedFieldData",
    value: function fetchSelectedFieldData() {
      var combineParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props9 = this.props,
          messages = _this$props9.messages,
          bizCode = _this$props9.bizCode,
          formType = _this$props9.formType,
          systemFieldSupport = _this$props9.systemFieldSupport,
          filterSystemFields = _this$props9.filterSystemFields,
          langConfigSupport = _this$props9.langConfigSupport,
          customInterfaces = _this$props9.customInterfaces,
          customGateway = _this$props9.customGateway,
          namespace = _this$props9.namespace,
          env = _this$props9.env,
          bpmnNodes = _this$props9.bpmnNodes;
      var formCode = this.state.formCode;
      var params = {
        env: env,
        namespace: namespace,
        bizCode: bizCode,
        formCode: formCode,
        formType: formType,
        customInterfaces: customInterfaces,
        customGateway: customGateway,
        langConfigSupport: langConfigSupport,
        systemFieldSupport: systemFieldSupport,
        jsonSchema: this.props.jsonSchema || null,
        uiSchema: this.props.uiSchema || null,
        formData: this.props.formData || null,
        bizData: this.props.bizData || null,
        sequence: this.props.sequence || null,
        bpmnNodes: bpmnNodes
      };
      this.props.dispatch(_actionCreator["default"].fetchSelectedFieldData(Object.assign({}, params, combineParams), filterSystemFields, messages));
    } // 获取配置数据源列表（字段级别的数据源列表）

  }, {
    key: "fetchFieldDataSourceList",
    value: function fetchFieldDataSourceList() {
      var messages = this.props.messages;
      var _this$props10 = this.props,
          customInterfaces = _this$props10.customInterfaces,
          customGateway = _this$props10.customGateway,
          namespace = _this$props10.namespace,
          env = _this$props10.env;
      this.props.dispatch(_actionCreator["default"].fetchFieldDataSourceList({
        customInterfaces: customInterfaces,
        customGateway: customGateway,
        namespace: namespace,
        env: env
      }, messages, namespace));
    } // 获取配置数据源列表（表单级别的数据源列表）

  }, {
    key: "fetchFormDataSourceList",
    value: function fetchFormDataSourceList() {
      var messages = this.props.messages;
      var _this$props11 = this.props,
          customInterfaces = _this$props11.customInterfaces,
          customGateway = _this$props11.customGateway,
          namespace = _this$props11.namespace,
          env = _this$props11.env;
      this.props.dispatch(_actionCreator["default"].fetchFormDataSourceList({
        customInterfaces: customInterfaces,
        customGateway: customGateway,
        namespace: namespace,
        env: env
      }, messages, namespace));
    } // 获取动态校验器列表

  }, {
    key: "fetchServerCodeList",
    value: function fetchServerCodeList() {
      var messages = this.props.messages;
      var _this$props12 = this.props,
          customInterfaces = _this$props12.customInterfaces,
          customGateway = _this$props12.customGateway,
          namespace = _this$props12.namespace,
          env = _this$props12.env;
      this.props.dispatch(_actionCreator["default"].fetchServerCodeList({
        customInterfaces: customInterfaces,
        customGateway: customGateway,
        namespace: namespace,
        env: env
      }, messages));
    }
  }, {
    key: "updateGlobalConfigHandler",
    value: function updateGlobalConfigHandler(globalConfig) {
      var namespace = this.props.namespace;
      this.props.dispatch(_actionCreator["default"].updateGlobalConfig(globalConfig, namespace));
    }
  }, {
    key: "updateLangConfigHandler",
    value: function updateLangConfigHandler(langConfig) {
      var namespace = this.props.namespace;
      this.props.dispatch(_actionCreator["default"].updateLangConfig(langConfig, namespace));
    } // 更新整个fields数据（这里面的逻辑要慎重！！）

  }, {
    key: "updateFieldsHandler",
    value: function updateFieldsHandler(fields) {
      var namespace = this.props.namespace;
      this.props.dispatch(_actionCreator["default"].updateFields(fields, namespace));
    } // 点击字段选择中的“通用模板”或“自定义类型”添加生效字段

  }, {
    key: "addFieldHandler",
    value: function addFieldHandler(fieldData) {
      //const namespace = this.props.namespace;
      //add group 2020-06-05 delete
      var _this$props13 = this.props,
          namespace = _this$props13.namespace,
          xformBuilderData = _this$props13.xformBuilderData; // if(typeof xformBuilderData.editFieldData === 'object'){
      //     const isGroup = xformBuilderData.editFieldData && xformBuilderData.editFieldData.type === 'group';
      //     if(isGroup){
      //         fieldData.hasgroup = xformBuilderData.editFieldData.code
      //     }
      // }
      // if(fieldData.type === 'group'){
      //     fieldData.children = [];
      // }

      this.props.dispatch(_actionCreator["default"].addSelectedFieldData(fieldData, namespace));
    } // 在生效字段中索引为index的位置增加“通用模板”或“自定义类型”字段

  }, {
    key: "addFieldDataWithIndex",
    value: function addFieldDataWithIndex(fieldData, index) {
      var namespace = this.props.namespace;
      this.props.dispatch(_actionCreator["default"].addFieldDataWithIndex(fieldData, index, namespace));
    } // 点击“生效字段”handler

  }, {
    key: "changeEditFieldHandler",
    value: function changeEditFieldHandler(fieldData) {
      var namespace = this.props.namespace;
      var fullscreen = this.state.fullscreen;

      if (!fullscreen) {
        this.setState({
          fieldConfigDrawerVisible: true
        });
      }

      this.props.dispatch(_actionCreator["default"].updateEditFieldData(fieldData, namespace));
    } // 删除“生效字段”handler

  }, {
    key: "deleteEditFieldHandler",
    value: function deleteEditFieldHandler(code) {
      var namespace = this.props.namespace;
      this.props.dispatch(_actionCreator["default"].deleteSelectedFieldData(code, namespace));
    } // 更新“生效字段”中某一个字段的数据（不更新编辑中的字段数据）

  }, {
    key: "updateFieldItemHandler",
    value: function updateFieldItemHandler(code, fieldData) {
      var namespace = this.props.namespace;
      this.props.dispatch(_actionCreator["default"].updateSelectedFieldItemData(code, fieldData, namespace));
    } // 更新“生效字段”handler

  }, {
    key: "updateFieldDataHandler",
    value: function updateFieldDataHandler(code, fieldData) {
      var namespace = this.props.namespace;
      this.props.dispatch(_actionCreator["default"].updateEditFieldData(fieldData, namespace));
      this.props.dispatch(_actionCreator["default"].updateSelectedFieldItemData(code, fieldData, namespace));
    } // 切换表单适应端（PC、移动端或两者）

  }, {
    key: "handlePlatformChange",
    value: function handlePlatformChange(platform) {
      this.setState({
        platformPopoverVisible: false,
        platform: platform
      });
    }
  }, {
    key: "handlePlatformVisibleChange",
    value: function handlePlatformVisibleChange(visible) {
      this.setState({
        platformPopoverVisible: visible
      });
    } // 输入“标题设置”浮层

  }, {
    key: "handleFormBaseChange",
    value: function handleFormBaseChange(formData) {
      this.setState({
        formTitle: formData.formTitle,
        formDescription: formData.formDesc
      });
    }
  }, {
    key: "handleFormBaseVisibleChange",
    value: function handleFormBaseVisibleChange(visible) {
      this.setState({
        baseConfigPopoverVisible: visible
      });
    } // “更多功能”浮层

  }, {
    key: "handleGlobalConfigChange",
    value: function handleGlobalConfigChange(formData) {
      // 更新globalConfig的localStorage
      var globalConfigData = {
        codeEditable: formData.codeEditable,
        fieldPreviewable: formData.fieldPreviewable
      };

      _util.util.setXFormLocalStorage(globalConfigData);

      this.updateGlobalConfigHandler(globalConfigData);
      this.setState({
        formDataSourceCode: formData.formDataSourceCode
      });
    }
  }, {
    key: "handleGlobalConfigVisibleChange",
    value: function handleGlobalConfigVisibleChange(visible) {
      this.setState({
        moreFunctionPopoverVisible: visible
      });
    } // 切换多语言配置

  }, {
    key: "handleLangConfigChange",
    value: function handleLangConfigChange(langConfig) {
      var isSwitchCurrentLang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var namespace = this.props.namespace;
      this.updateLangConfigHandler(langConfig);

      if (isSwitchCurrentLang) {
        // 切换当前配置的语言，需要重新获取新语言下的表单字段
        this.fetchSelectedFieldData({
          lang: langConfig.currentLang
        }); // 切换语言后要清除正在编辑的字段数据，置editFieldData为null

        this.props.dispatch(_actionCreator["default"].updateEditFieldData(null, namespace));
      }
    }
  }, {
    key: "handleLangConfigVisibleChange",
    value: function handleLangConfigVisibleChange(visible) {
      this.setState({
        langConfigPopoverVisible: visible
      });
    }
  }, {
    key: "renderDefaultActionButtons",
    value: function renderDefaultActionButtons() {
      var messages = this.props.messages;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "app-xform-builder-action"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        onClick: this.handleFormSave
      }, messages[(0, _localeMessages.getMessageId)('xformSaveButton')]));
    }
  }, {
    key: "toggleFullScreen",
    value: function toggleFullScreen() {
      var fullscreen = this.state.fullscreen;
      this.setState({
        fullscreen: !fullscreen
      });
    }
  }, {
    key: "handleCloseFieldConfigPanel",
    value: function handleCloseFieldConfigPanel(event) {
      event.stopPropagation();
      this.setState({
        fieldConfigDrawerVisible: false
      });
    }
  }, {
    key: "_getLangNameFromLocale",
    value: function _getLangNameFromLocale(langs, locale) {
      var result = '';
      langs.map(function (lang) {
        if (lang.locale === locale) {
          result = lang.name;
        }
      });
      return result;
    } // 初始校验用户传入的platform属性是否合法

  }, {
    key: "_isValidPlatform",
    value: function _isValidPlatform(platform) {
      var platforms = ['laptop', 'mobile', 'both'];

      if (platforms.indexOf(platform) > -1) {
        return true;
      } else {
        if (typeof platform !== 'undefined') {
          console.warn('[xform-editor]传入的platform属性不合法，必须为laptop、mobile或both');
        }

        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$state5 = this.state,
          fullscreen = _this$state5.fullscreen,
          platform = _this$state5.platform,
          platformPopoverVisible = _this$state5.platformPopoverVisible,
          langConfigPopoverVisible = _this$state5.langConfigPopoverVisible,
          baseConfigPopoverVisible = _this$state5.baseConfigPopoverVisible,
          moreFunctionPopoverVisible = _this$state5.moreFunctionPopoverVisible,
          formSchemaModalVisible = _this$state5.formSchemaModalVisible,
          previewPopoverVisible = _this$state5.previewPopoverVisible,
          formSchema = _this$state5.formSchema,
          formTitle = _this$state5.formTitle,
          formDescription = _this$state5.formDescription,
          formDataSourceCode = _this$state5.formDataSourceCode,
          fieldConfigDrawerVisible = _this$state5.fieldConfigDrawerVisible,
          deleteFieldCode = _this$state5.deleteFieldCode;
      var _this$props14 = this.props,
          width = _this$props14.width,
          height = _this$props14.height,
          platformConfigSupport = _this$props14.platformConfigSupport,
          xformBuilderData = _this$props14.xformBuilderData,
          registerWidgets = _this$props14.registerWidgets,
          locale = _this$props14.locale,
          messages = _this$props14.messages,
          emptyPlaceholder = _this$props14.emptyPlaceholder,
          popupContainer = _this$props14.popupContainer,
          supportFieldList = _this$props14.supportFieldList,
          supportConfigList = _this$props14.supportConfigList,
          langConfigSupport = _this$props14.langConfigSupport,
          customInterfaces = _this$props14.customInterfaces,
          customGateway = _this$props14.customGateway,
          customUploadRequest = _this$props14.customUploadRequest,
          onImagePreview = _this$props14.onImagePreview,
          defaultActionButtons = _this$props14.defaultActionButtons,
          renderActionButtons = _this$props14.renderActionButtons,
          bpmnNodes = _this$props14.bpmnNodes,
          dispatch = _this$props14.dispatch,
          user = _this$props14.user;
      var systemFieldEditable = this.props.systemFieldEditable;
      var langs = xformBuilderData && xformBuilderData.langs || {};
      var globalConfig = xformBuilderData && xformBuilderData.globalConfig || {};
      var formDataSourceList = xformBuilderData && xformBuilderData.formDataSource || [];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'app-xform-builder': true,
          fullscreen: fullscreen
        }),
        style: {
          width: fullscreen ? '100%' : width !== 'auto' ? width : '100%',
          height: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "app-xform-builder-header"
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "opt-front-list"
      }, platformConfigSupport && /*#__PURE__*/_react["default"].createElement(_platform["default"], {
        messages: messages,
        popupContainer: popupContainer,
        visible: platformPopoverVisible,
        platform: platform,
        platformChangeHandler: this.handlePlatformChange,
        platformVisibleChangeHandler: this.handlePlatformVisibleChange
      }, function () {
        switch (platform) {
          case 'laptop':
            return /*#__PURE__*/_react["default"].createElement("li", {
              className: "opt-item",
              onClick: function onClick() {
                _this7.handlePlatformVisibleChange(true);
              }
            }, /*#__PURE__*/_react["default"].createElement("i", {
              className: "opt-icon xform-iconfont"
            }, "\uE842"), /*#__PURE__*/_react["default"].createElement("span", {
              className: "opt-name"
            }, messages[(0, _localeMessages.getMessageId)('xformChangePlatformPCName')]));

          case 'mobile':
            return /*#__PURE__*/_react["default"].createElement("li", {
              className: "opt-item",
              onClick: function onClick() {
                _this7.handlePlatformVisibleChange(true);
              }
            }, /*#__PURE__*/_react["default"].createElement("i", {
              className: "opt-icon xform-iconfont"
            }, "\uE7B2"), /*#__PURE__*/_react["default"].createElement("span", {
              className: "opt-name"
            }, messages[(0, _localeMessages.getMessageId)('xformChangePlatformMobileName')]));

          case 'both':
            return /*#__PURE__*/_react["default"].createElement("li", {
              className: "opt-item",
              onClick: function onClick() {
                _this7.handlePlatformVisibleChange(true);
              }
            }, /*#__PURE__*/_react["default"].createElement("i", {
              className: "opt-icon xform-iconfont"
            }, "\uE683"), /*#__PURE__*/_react["default"].createElement("span", {
              className: "opt-name"
            }, messages[(0, _localeMessages.getMessageId)('xformChangePlatformBothName')]));

          default:
            return /*#__PURE__*/_react["default"].createElement("li", {
              className: "opt-item",
              onClick: function onClick() {
                _this7.handlePlatformVisibleChange(true);
              }
            }, /*#__PURE__*/_react["default"].createElement("i", {
              className: "opt-icon xform-iconfont"
            }, "\uE842"), /*#__PURE__*/_react["default"].createElement("span", {
              className: "opt-name"
            }, messages[(0, _localeMessages.getMessageId)('xformChangePlatformOptName')]));
        }
      }()), langConfigSupport && /*#__PURE__*/_react["default"].createElement(_langConfig["default"], {
        messages: messages,
        popupContainer: popupContainer,
        visible: langConfigPopoverVisible,
        langConfig: xformBuilderData.langs,
        langConfigChangeHandler: this.handleLangConfigChange,
        langConfigVisibleChangeHandler: this.handleLangConfigVisibleChange
      }, /*#__PURE__*/_react["default"].createElement("li", {
        className: "opt-item"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "opt-icon xform-iconfont"
      }, "\uE781"), function () {
        if (langs.currentLang !== '') {
          return /*#__PURE__*/_react["default"].createElement("span", {
            className: "opt-name"
          }, _this7._getLangNameFromLocale(langs.langs, langs.currentLang));
        } else {
          return /*#__PURE__*/_react["default"].createElement("span", {
            className: "opt-name"
          }, messages[(0, _localeMessages.getMessageId)('xformChangeLangOptName')]);
        }
      }())), /*#__PURE__*/_react["default"].createElement(_baseConfig["default"], {
        messages: messages,
        popupContainer: popupContainer,
        visible: baseConfigPopoverVisible,
        formData: {
          formTitle: formTitle,
          formDesc: formDescription
        },
        visibleChangeHandler: this.handleFormBaseVisibleChange,
        formDataChangeHandler: this.handleFormBaseChange
      }, /*#__PURE__*/_react["default"].createElement("li", {
        className: "opt-item"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "opt-icon xform-iconfont"
      }, "\uE7F4"), /*#__PURE__*/_react["default"].createElement("span", {
        className: "opt-name"
      }, messages[(0, _localeMessages.getMessageId)('xformSaveFormTitleOptName')]))), /*#__PURE__*/_react["default"].createElement(_moreFunction["default"], {
        messages: messages,
        popupContainer: popupContainer,
        visible: moreFunctionPopoverVisible,
        formDataSourceList: formDataSourceList,
        formData: _objectSpread(_objectSpread({}, globalConfig), {}, {
          formDataSourceCode: formDataSourceCode
        }),
        formDataChangeHandler: this.handleGlobalConfigChange,
        moreFunctionVisibleChangeHandler: this.handleGlobalConfigVisibleChange,
        viewSchemaClickHandler: function viewSchemaClickHandler() {
          _this7.setState({
            moreFunctionPopoverVisible: false
          });

          _this7.handleFormSchemaView();
        },
        componentRecognize: this.props.componentRecognize,
        onDetectSuccess: this.handleDetectSuccess,
        customUploadRequest: customUploadRequest
      }, /*#__PURE__*/_react["default"].createElement("li", {
        className: "opt-item"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "opt-icon xform-iconfont"
      }, "\uE7FC"), /*#__PURE__*/_react["default"].createElement("span", {
        className: "opt-name"
      }, messages[(0, _localeMessages.getMessageId)('xformMoreOptName')])))), /*#__PURE__*/_react["default"].createElement("ul", {
        className: "opt-rear-list"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "text",
        onClick: function onClick() {
          return _this7.handle();
        }
      }, messages[(0, _localeMessages.getMessageId)('xformSaveOptName')]), /*#__PURE__*/_react["default"].createElement(_preview["default"], _extends({}, this.props, {
        messages: messages,
        popupContainer: popupContainer,
        visible: previewPopoverVisible,
        visibleChangeHandler: this.handleFormPreviewVisibleChange,
        platform: platform,
        formSchema: formSchema,
        registerWidgets: registerWidgets,
        bpmnNodes: bpmnNodes
      }), /*#__PURE__*/_react["default"].createElement("li", {
        className: "opt-item"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "opt-icon xform-iconfont"
      }, "\uE78F"), /*#__PURE__*/_react["default"].createElement("span", {
        className: "opt-name"
      }, messages[(0, _localeMessages.getMessageId)('xformPreviewOptName')]))), /*#__PURE__*/_react["default"].createElement("li", {
        className: "opt-item",
        onClick: this.toggleFullScreen
      }, function () {
        if (fullscreen) {
          return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("i", {
            className: "opt-icon xform-iconfont"
          }, "\uE67C"), /*#__PURE__*/_react["default"].createElement("span", {
            className: "opt-name"
          }, messages[(0, _localeMessages.getMessageId)('xformNoFullScreenOptName')]));
        } else {
          return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("i", {
            className: "opt-icon xform-iconfont"
          }, "\uE67B"), /*#__PURE__*/_react["default"].createElement("span", {
            className: "opt-name"
          }, messages[(0, _localeMessages.getMessageId)('xformFullScreenOptName')]));
        }
      }()))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "app-xform-builder-panel"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "field-picker-panel",
        style: {
          height: !fullscreen && typeof height === 'number' ? height : 'auto'
        }
      }, /*#__PURE__*/_react["default"].createElement(_fieldPicker["default"], {
        platform: platform,
        messages: messages,
        popupContainer: popupContainer,
        registerWidgets: registerWidgets,
        locale: locale,
        customInterfaces: customInterfaces,
        customGateway: customGateway,
        customUploadRequest: customUploadRequest,
        onImagePreview: onImagePreview,
        supportFieldList: supportFieldList,
        supportConfigList: supportConfigList,
        emptyPlaceholder: emptyPlaceholder,
        commonFields: xformBuilderData.commonFields // 业务控件
        ,
        systemFields: xformBuilderData.systemFields //系统字段控件
        ,
        fields: xformBuilderData.fields,
        xformBizData: xformBuilderData.xformBizData,
        xformOptionBizData: xformBuilderData.xformOptionBizData,
        addFieldHandler: this.addFieldHandler
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "field-list-panel",
        style: {
          height: !fullscreen && typeof height === 'number' ? height : 'auto'
        }
      }, /*#__PURE__*/_react["default"].createElement(_fieldList["default"], {
        globalConfig: globalConfig,
        platform: platform,
        messages: messages,
        popupContainer: popupContainer,
        registerWidgets: registerWidgets,
        locale: locale,
        customInterfaces: customInterfaces,
        customGateway: customGateway,
        customUploadRequest: customUploadRequest,
        onImagePreview: onImagePreview,
        systemFieldEditable: systemFieldEditable,
        editFieldData: xformBuilderData.editFieldData,
        supportFieldList: supportFieldList,
        supportConfigList: supportConfigList,
        emptyPlaceholder: emptyPlaceholder,
        fields: JSON.parse(JSON.stringify(xformBuilderData.fields)),
        changeEditFieldHandler: this.changeEditFieldHandler,
        deleteEditFieldHandler: this.deleteEditFieldHandler,
        addFieldsHandler: this.addFieldDataWithIndex,
        updateFieldsHandler: this.updateFieldsHandler,
        updateFieldItemHandler: this.updateFieldItemHandler,
        deleteFieldCode: deleteFieldCode
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "field-config-drawer-panel",
        style: {
          width: fullscreen || fieldConfigDrawerVisible ? 380 : 0,
          height: !fullscreen && typeof height === 'number' ? height : 'auto',
          display: fullscreen || fieldConfigDrawerVisible ? 'block' : 'none'
        }
      }, /*#__PURE__*/_react["default"].createElement(_fieldConfig["default"], {
        globalConfig: globalConfig,
        messages: messages,
        popupContainer: popupContainer,
        registerWidgets: registerWidgets,
        locale: locale,
        customInterfaces: customInterfaces,
        customGateway: customGateway,
        customUploadRequest: customUploadRequest,
        onImagePreview: onImagePreview,
        systemFieldEditable: systemFieldEditable,
        supportFieldList: supportFieldList,
        supportConfigList: supportConfigList,
        emptyPlaceholder: emptyPlaceholder,
        dataSource: xformBuilderData.dataSource,
        serverCode: xformBuilderData.serverCode,
        fields: xformBuilderData.fields,
        editFieldData: xformBuilderData.editFieldData,
        xformBizData: xformBuilderData.xformBizData,
        xformOptionBizData: xformBuilderData.xformOptionBizData,
        updateFieldDataHandler: this.updateFieldDataHandler,
        updateFieldItemHandler: this.updateFieldItemHandler,
        bpmnNodes: bpmnNodes,
        dispatch: dispatch,
        operateDBGroup: {
          insertOrUpdate: this.insertOrUpdateGroupBox,
          del: this.delGroupBox
        },
        user: user,
        updateFieldsApp: function updateFieldsApp(code) {
          return _this7.fetchInitConfig(code);
        },
        commonFields: xformBuilderData.commonFields
      }), !fullscreen && /*#__PURE__*/_react["default"].createElement("i", {
        className: "xform-iconfont close-icon",
        onClick: this.handleCloseFieldConfigPanel
      }, "\uE600"))), function () {
        if (defaultActionButtons && renderActionButtons === null) {// return this.renderDefaultActionButtons();
        } else {
          if (typeof renderActionButtons === 'function') {
            return renderActionButtons(_this7.handleFormSave);
          } else {
            return null;
          }
        }
      }(), formSchemaModalVisible && /*#__PURE__*/_react["default"].createElement(_viewSchema["default"], {
        messages: messages,
        popupContainer: popupContainer,
        visible: formSchemaModalVisible,
        formSchema: formSchema,
        modalCloseHandler: this.handleViewSchemaModalClose
      }));
    }
  }]);

  return AppForm;
}(_react.PureComponent);

_defineProperty(AppForm, "propTypes", {
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  platformConfigSupport: _propTypes["default"].bool,
  platform: _propTypes["default"].oneOf(['laptop', 'mobile', 'both']),
  env: _propTypes["default"].oneOf(['dev', 'prod']),
  previewDomain: _propTypes["default"].string,
  emptyPlaceholder: _propTypes["default"].element,
  popupContainer: _propTypes["default"].func,
  bizCode: _propTypes["default"].string,
  formCode: _propTypes["default"].string,
  formType: _propTypes["default"].oneOf([1, 2, 3, 4]),
  namespace: _propTypes["default"].string.isRequired,
  messages: _propTypes["default"].object.isRequired,
  locale: _propTypes["default"].string.isRequired,
  xformBuilderData: _propTypes["default"].object.isRequired,
  dispatch: _propTypes["default"].func,
  filterSystemFields: _propTypes["default"].bool,
  systemFieldSupport: _propTypes["default"].bool,
  commonFieldSupport: _propTypes["default"].bool,
  bizDataSupport: _propTypes["default"].bool,
  langConfigSupport: _propTypes["default"].bool,
  overwriteSchema: _propTypes["default"].bool,
  supportFieldList: _propTypes["default"].array,
  supportConfigList: _propTypes["default"].array,
  supportLangList: _propTypes["default"].array,
  registerWidgets: _propTypes["default"].array,
  systemTemplate: _propTypes["default"].string,
  commonTemplate: _propTypes["default"].string,
  attributeTemplate: _propTypes["default"].string,
  optionTemplate: _propTypes["default"].string,
  onError: _propTypes["default"].func,
  defaultActionButtons: _propTypes["default"].bool,
  renderActionButtons: _propTypes["default"].func,
  getInstance: _propTypes["default"].func,
  jsonSchema: _propTypes["default"].object,
  uiSchema: _propTypes["default"].object,
  formData: _propTypes["default"].object,
  bizData: _propTypes["default"].object,
  sequence: _propTypes["default"].array,
  bpmnNodes: _propTypes["default"].array,
  businessTypeName: _propTypes["default"].string,
  componentRecognize: _propTypes["default"].shape({
    enable: _propTypes["default"].bool,
    recognize: _propTypes["default"].func
  })
});

_defineProperty(AppForm, "defaultProps", {
  width: 'auto',
  height: 'auto',
  platformConfigSupport: false,
  env: 'prod',
  previewDomain: 'h5.m.taobao.com',
  popupContainer: function popupContainer() {
    return document.body;
  },
  bizCode: 'common',
  formType: 2,
  filterSystemFields: false,
  systemFieldSupport: false,
  commonFieldSupport: false,
  bizDataSupport: false,
  langConfigSupport: false,
  overwriteSchema: true,
  supportFieldList: [],
  supportConfigList: CONST.CONFIGUEABLE_FIELD_CONFIG_CODE,
  registerWidgets: [],
  defaultActionButtons: true,
  renderActionButtons: null,
  getInstance: function getInstance() {},
  componentRecognize: {
    enable: false
  }
});

var _default = AppForm;
exports["default"] = _default;