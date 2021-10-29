"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactIf = require("react-if");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var CONST = _interopRequireWildcard(require("../../common/const"));

var _util = require("../../common/util");

var _localeMessages = require("../../i18n/localeMessages");

var _fieldOptionList = _interopRequireDefault(require("../fieldOptionList"));

var _index = _interopRequireDefault(require("../../configSchema/index"));

var _index2 = _interopRequireDefault(require("../../customFieldSchema/index"));

var _index3 = _interopRequireDefault(require("../../scalable-form-antd/index"));

var _group = _interopRequireDefault(require("../fieldOptionList/group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * xform-builder右侧“字段属性设置”
 * @props: xformBizData（业务属性配置数据）
 * xformOptionBizData（字段业务属性配置数据） 
 * editFieldData（编辑状态field数据） 
 * fields（生效字段field数据，用于进行code非重复校验） 
 * updateFieldDataHandler（更新编辑过的editFieldData处理器） 
 * updateFieldItemHandler（更新某个code对应的字段数据，但是不更新editFieldData） 
 * systemFieldEditable（系统字段是否可编辑，默认不能编辑）
 * @states: unfoldIndex（下拉框设置里面展开的项，默认展开第一项，-1表示没有展开的项） 
 * fieldShowConfig（字段级联配置， 
 * fieldShowConfig的数据格式为{beneathFields: [], showConfig: [{name: '选项一', code: 'option1', show: [fieldCode1, fieldCode2]}]}，其中beneathFields中存储的是当前编辑的field下面的字段数据，因为字段级联配置只会选择编辑字段下面的字段关联） 
 * showConfigModalVisible（字段级联配置浮层是否可见） 
 * currentEditShowOptionCode（字段级联配置中当前编辑态的字段选项code） 
 * updateConfigModalVisible（数据源级联配置浮层是否可见） 
 * dataSourceFieldList（当前编辑字段后面的配置了数据源的字段列表） 
 * fieldUpdateDataSourceConfig（当前字段的级联数据源配置数据）
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
})("dfe8381a331d58d8b68d706248d10573", ".app-xform-builder-field-config-wrapper .xform-item{margin-bottom:10px!important}.app-xform-builder-field-config-wrapper .field-config-block{position:relative}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item{border-bottom:1px solid #eee;padding:0 20px}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item .field-config-block-header{height:40px;line-height:40px;color:rgba(0,0,0,.85);font-size:14px;font-weight:500;cursor:pointer}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item .field-config-block-header .expand-icon{margin-right:10px;display:inline-block;font-size:12px}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item .field-config-block-content{margin-bottom:20px}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item .field-config-block-content .cascade-config .cascade-config-panel{padding-top:20px;padding-left:15px}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item .field-config-block-content .cascade-config .cascade-config-panel .panel-label{text-align:right}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item .field-config-block-content .cascade-config .cascade-config-panel .panel-label label{line-height:42px}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item .field-config-block-content .cascade-config .cascade-config-panel .panel-label label:after{content:\":\";margin:0 8px 0 2px}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item .field-config-block-content .cascade-config .cascade-config-panel button{margin-right:10px}.app-xform-builder-field-config-wrapper .field-config-block .field-config-block-item.fold .expand-icon{transform:rotate(270deg)}.app-xform-builder-field-config-wrapper .empty-box{text-align:center;margin-top:50%;color:rgba(0,0,0,.45);padding:10px 0}.app-xform-builder-field-config-wrapper .empty-box .empty-icon{font-size:20px;margin-right:10px;vertical-align:middle}.app-xform-builder-field-config-wrapper .empty-box .empty-tip{font-size:12px}.app-xform-builder-show-config-modal{padding:8px;z-index:1000}.app-xform-builder-show-config-modal .show-config-title{font-size:14px;line-height:28px;color:rgba(0,0,0,.85)}.app-xform-builder-show-config-modal .show-config-option-list{min-height:360px;border:1px solid #eee;width:100%}.app-xform-builder-show-config-modal .show-config-option-list .show-config-option-item{line-height:32px;font-size:14px;padding:0 5px;color:rgba(0,0,0,.85);cursor:pointer}.app-xform-builder-show-config-modal .show-config-option-list .show-config-option-item.current{background-color:#108ee9;color:#fff}.app-xform-builder-show-config-modal .show-field-list{min-height:360px;border:1px solid #eee;width:100%}.app-xform-builder-show-config-modal .show-field-list .show-field-item{line-height:32px;font-size:14px;padding:0 5px;color:rgba(0,0,0,.85);cursor:pointer;position:relative}.app-xform-builder-show-config-modal .show-field-list .show-field-item:hover{background-color:#f0f0f0}.app-xform-builder-show-config-modal .show-field-list .show-field-item label{cursor:pointer}.app-xform-builder-show-config-modal .show-field-list .show-field-item .checkbox{position:absolute;top:1px;right:10px}.app-xform-builder-show-config-modal .show-field-list .empty{text-align:center;font-size:14px;color:rgba(0,0,0,.45);margin-top:140px}.app-xform-builder-update-dataSource-config-modal{padding:8px;z-index:1000}.app-xform-builder-update-dataSource-config-modal .update-dataSource-config-title{font-size:14px;line-height:28px;color:rgba(0,0,0,.85)}.app-xform-builder-update-dataSource-config-modal .update-dataSource-list{min-height:360px;border:1px solid #eee;width:100%}.app-xform-builder-update-dataSource-config-modal .update-dataSource-list .update-dataSource-item{line-height:32px;font-size:14px;padding:0 5px;color:rgba(0,0,0,.85);cursor:pointer;position:relative}.app-xform-builder-update-dataSource-config-modal .update-dataSource-list .update-dataSource-item:hover{background-color:#f0f0f0}.app-xform-builder-update-dataSource-config-modal .update-dataSource-list .update-dataSource-item label{cursor:pointer}.app-xform-builder-update-dataSource-config-modal .update-dataSource-list .update-dataSource-item .checkbox{position:absolute;top:1px;right:10px}.app-xform-builder-update-dataSource-config-modal .update-dataSource-list .empty{text-align:center;font-size:14px;color:rgba(0,0,0,.45);margin-top:140px}");

var FieldConfig = /*#__PURE__*/function (_Component) {
  _inherits(FieldConfig, _Component);

  var _super = _createSuper(FieldConfig);

  function FieldConfig() {
    var _this;

    _classCallCheck(this, FieldConfig);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.toggleBlockFoldChange = _this.toggleBlockFoldChange.bind(_assertThisInitialized(_this));
    _this.schema2ConfigFormDataConverter = _this.schema2ConfigFormDataConverter.bind(_assertThisInitialized(_this));
    _this.configFormData2schemaConvertor = _this.configFormData2schemaConvertor.bind(_assertThisInitialized(_this));
    _this.handleUpdateFieldSchemaData = _this.handleUpdateFieldSchemaData.bind(_assertThisInitialized(_this));
    _this.handleUpdateBizData = _this.handleUpdateBizData.bind(_assertThisInitialized(_this));
    _this.handleFieldShowConfigModalOpen = _this.handleFieldShowConfigModalOpen.bind(_assertThisInitialized(_this));
    _this.generateFieldShowConfig = _this.generateFieldShowConfig.bind(_assertThisInitialized(_this));
    _this.handleEditOptionChange = _this.handleEditOptionChange.bind(_assertThisInitialized(_this));
    _this.judgeCheckStatus = _this.judgeCheckStatus.bind(_assertThisInitialized(_this));
    _this.toggleShowFieldChange = _this.toggleShowFieldChange.bind(_assertThisInitialized(_this));
    _this.handleShowConfigModalConfirm = _this.handleShowConfigModalConfirm.bind(_assertThisInitialized(_this));
    _this.handleFieldUpdateModalOpen = _this.handleFieldUpdateModalOpen.bind(_assertThisInitialized(_this));
    _this.generateFieldsWithDataSource = _this.generateFieldsWithDataSource.bind(_assertThisInitialized(_this));
    _this.judgeUpdateDataSourceCheckStatus = _this.judgeUpdateDataSourceCheckStatus.bind(_assertThisInitialized(_this));
    _this.toggleUpdateDataSourceChange = _this.toggleUpdateDataSourceChange.bind(_assertThisInitialized(_this));
    _this.updateDataSourceConfigConfirm = _this.updateDataSourceConfigConfirm.bind(_assertThisInitialized(_this));
    _this._clearFieldShow = _this._clearFieldShow.bind(_assertThisInitialized(_this));
    _this.handleClearFieldShow = _this.handleClearFieldShow.bind(_assertThisInitialized(_this));
    _this._clearFieldUpdate = _this._clearFieldUpdate.bind(_assertThisInitialized(_this));
    _this.handleClearFieldUpdate = _this.handleClearFieldUpdate.bind(_assertThisInitialized(_this));
    _this.handleClearAll = _this.handleClearAll.bind(_assertThisInitialized(_this));
    _this.state = {
      basicBlockFold: false,
      advancedBlockFold: false,
      optionBlockFold: false,
      cascadeBlockFold: false,
      relevanceBlockFold: false,
      dboperateBlockFold: false,
      fieldShowConfig: {
        beneathFields: [],
        showConfig: []
      },
      showConfigModalVisible: false,
      currentEditShowOptionCode: '',
      updateConfigModalVisible: false,
      updateConfigType: null,
      fieldUpdateDataSourceConfig: [],
      dataSourceFieldList: []
    };
    return _this;
  }

  _createClass(FieldConfig, [{
    key: "toggleBlockFoldChange",
    value: function toggleBlockFoldChange(block) {
      var _this$state = this.state,
          basicBlockFold = _this$state.basicBlockFold,
          advancedBlockFold = _this$state.advancedBlockFold,
          optionBlockFold = _this$state.optionBlockFold,
          cascadeBlockFold = _this$state.cascadeBlockFold,
          relevanceBlockFold = _this$state.relevanceBlockFold,
          dboperateBlockFold = _this$state.dboperateBlockFold;

      switch (block) {
        case 'basic':
          this.setState({
            basicBlockFold: !basicBlockFold
          });
          break;

        case 'advance':
          this.setState({
            advancedBlockFold: !advancedBlockFold
          });
          break;

        case 'option':
          this.setState({
            optionBlockFold: !optionBlockFold
          });
          break;

        case 'cascade':
          this.setState({
            cascadeBlockFold: !cascadeBlockFold
          });
          break;

        case 'relevance':
          this.setState({
            relevanceBlockFold: !relevanceBlockFold
          });

        case 'dboperate':
          this.setState({
            dboperateBlockFold: !dboperateBlockFold
          });
          break;

        default:
          console.warn('[xform-editor]不能识别的字段配置block类型', block);
      }
    } // 从field schema中提取“字段属性设置”

  }, {
    key: "schema2ConfigFormDataConverter",
    value: function schema2ConfigFormDataConverter(editFieldData, formData) {
      var registerWidgets = this.props.registerWidgets;
      var resultData = {};
      var jsonSchemaContent = editFieldData.jsonSchema[editFieldData.code];
      var uiSchemaContent = editFieldData.uiSchema[editFieldData.code]; // 判断uniqueItems为boolean类型用来兼容uploader和file类型数据uniqueItems未设置的旧数据

      if (jsonSchemaContent.type === 'array' && typeof jsonSchemaContent.uniqueItems === 'boolean' && !jsonSchemaContent.uniqueItems) {
        jsonSchemaContent = jsonSchemaContent.items;
        uiSchemaContent = uiSchemaContent.items;
      } //判断如果还有items 


      if (jsonSchemaContent.type === 'array' && jsonSchemaContent.hasOwnProperty('items') && uiSchemaContent.hasOwnProperty('items')) {
        jsonSchemaContent = jsonSchemaContent.items;
        uiSchemaContent = uiSchemaContent.items;
      }

      var formDataValue = editFieldData.formData[editFieldData.code];
      var bizDataContent = editFieldData.bizData[editFieldData.code]; //console.log(jsonSchemaContent,uiSchemaContent);

      Object.keys(formData).map(function (key) {
        var validators; // 根据不同的key，从editFieldData中提取相应的值

        switch (key) {
          case 'code':
            resultData[key] = editFieldData.code;
            break;

          case 'name':
            resultData[key] = editFieldData.label;
            break;

          case 'placeholder':
            if (typeof uiSchemaContent['ui:placeholder'] !== 'undefined') {
              resultData[key] = uiSchemaContent['ui:placeholder'];
            } else {
              resultData[key] = '';
            }

            break;

          case 'value':
            resultData[key] = editFieldData.formData[editFieldData.code];
            break;

          case 'description':
            if (typeof uiSchemaContent['ui:help'] !== 'undefined') {
              resultData[key] = uiSchemaContent['ui:help'];
            } else {
              resultData[key] = '';
            }

            break;

          case 'dataSource':
            if (typeof jsonSchemaContent.dataSource !== 'undefined') {
              resultData[key] = jsonSchemaContent.dataSource;
            } else {
              resultData[key] = '';
            }

            break;

          case 'dataSourceUrl':
            if (typeof jsonSchemaContent.dataSourceUrl !== 'undefined') {
              resultData[key] = jsonSchemaContent.dataSourceUrl;
            } else {
              resultData[key] = '';
            }

            break;

          case 'server':
            // 动态校验器
            validators = [];
            var validateCode = '';

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                validators = uiSchemaContent['ui:options'].validate;
                validators.map(function (validator) {
                  if (validator.type === 'server') {
                    validateCode = validator.validateCode;
                  }
                });
                resultData[key] = validateCode;
              } else {
                resultData[key] = '';
              }
            } else {
              resultData[key] = '';
            }

            break;

          case 'validate':
            // 校验器
            validators = [];
            var validatorType = '';

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                validators = uiSchemaContent['ui:options'].validate;
                validators.map(function (validator) {
                  if (validator.type !== 'empty' && validator.type !== 'server') {
                    validatorType = validator.type;
                  }
                });
                resultData[key] = validatorType;
              } else {
                resultData[key] = '';
              }
            } else {
              resultData[key] = '';
            }

            break;

          case 'maxLength':
            if (typeof jsonSchemaContent.maxLength !== 'undefined') {
              resultData[key] = jsonSchemaContent.maxLength;
            } else {
              resultData[key] = 10000;
            }

            break;

          case 'maximum':
            if (typeof jsonSchemaContent.maximum !== 'undefined') {
              resultData[key] = jsonSchemaContent.maximum;
            } else {
              resultData[key] = '';
            }

            break;

          case 'minimum':
            if (typeof jsonSchemaContent.minimum !== 'undefined') {
              resultData[key] = jsonSchemaContent.minimum;
            } else {
              resultData[key] = '';
            }

            break;

          case 'groupName':
            // if (jsonSchemaContent.type === 'array') {
            //     if (typeof uiSchemaContent.items['ui:options'] !== 'undefined') {
            //         if (typeof uiSchemaContent.items['ui:options'].groupName !== 'undefined') {
            //             resultData[key] = uiSchemaContent.items['ui:options'].groupName;
            //         } else {
            //             resultData[key] = '';
            //         }
            //     } else {
            //         resultData[key] = '';
            //     }
            // } else {
            // }
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].groupName !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].groupName;
              } else {
                resultData[key] = '';
              }
            } else {
              resultData[key] = '';
            }

            break;

          case 'uploadType':
            // 图片上传组件配置（picture或picture-inline或picture-card）
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].uploadType !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].uploadType;
              } else {
                resultData[key] = 'picture';
              }
            } else {
              resultData[key] = 'picture';
            }

            break;

          case 'maxFileSize':
            if (typeof jsonSchemaContent.maxFileSize !== 'undefined') {
              resultData[key] = jsonSchemaContent.maxFileSize;
            } else {
              resultData[key] = 0;
            }

            break;

          case 'maxFileNum':
            if (typeof jsonSchemaContent.maxFileNum !== 'undefined') {
              resultData[key] = jsonSchemaContent.maxFileNum;
            } else {
              resultData[key] = 0;
            }

            break;

          case 'templateFileUrl':
            // 模板文件上传
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].templateFileUrl !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].templateFileUrl;
              } else {
                resultData[key] = [];
              }
            } else {
              resultData[key] = [];
            }

            break;

          case 'exampleImageUrl':
            // 示例图片上传
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].exampleImageUrl !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].exampleImageUrl;
              } else {
                resultData[key] = [];
              }
            } else {
              resultData[key] = [];
            }

            break;

          case 'selectLeafOnly':
            // 树选择器是否允许选择父节点
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].selectLeafOnly !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].selectLeafOnly;
              } else {
                resultData[key] = false;
              }
            } else {
              resultData[key] = false;
            }

            break;

          case 'treeCheckStrictly':
            // 多选树选择器父子节点选择是否关联
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].treeCheckStrictly !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].treeCheckStrictly;
              } else {
                resultData[key] = false;
              }
            } else {
              resultData[key] = false;
            }

            break;

          case 'initRange':
            // 日期范围组件默认值配置
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].initRange !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].initRange;
              } else {
                resultData[key] = undefined;
              }
            } else {
              resultData[key] = undefined;
            }

            break;

          case 'cascade':
            jsonSchemaContent = editFieldData.jsonSchema[editFieldData.code]; // 字段层叠配置（如果是对字段设置了字段层叠，则jsonSchema一定是array类型）

            resultData[key] = jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems;
            break;

          case 'require':
            resultData[key] = editFieldData.required;
            break;

          case 'hidden':
            resultData[key] = uiSchemaContent['ui:widget'] === 'hidden';
            break;

          case 'disabled':
            if (typeof uiSchemaContent['ui:disabled'] !== 'undefined') {
              resultData[key] = uiSchemaContent['ui:disabled'];
            } else {
              resultData[key] = false;
            }

            break;
          // add nodes 2020-06-02

          case 'shownodes':
            //判断有无item属性
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].shownodes !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].shownodes;
              } else {
                resultData[key] = [];
              }
            } else {
              resultData[key] = [];
            }

            break;

          case 'disnodes':
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].disnodes !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].disnodes;
              } else {
                resultData[key] = [];
              }
            } else {
              resultData[key] = [];
            }

            break;
          // add item width 2020-06-03

          case 'itemwidth':
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].itemwidth !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].itemwidth;
              } else {
                resultData[key] = 100;
              }
            } else {
              resultData[key] = 100;
            }

            break;
          // case 'transferType':
          //     resultData[key] = editFieldData[key] ? editFieldData[key] : '';
          //     break;
          // case 'transferData':
          //     resultData[key] = uiSchemaContent['ui:transferData'] ? uiSchemaContent['ui:transferData'] : '';
          //     break;
          // case 'transferSelectedData':
          //     resultData[key] = uiSchemaContent['ui:transferSelectedData'] ? uiSchemaContent['ui:transferSelectedData'] : '';
          //     break;
          // case 'leftColumns':
          //     resultData[key] = uiSchemaContent['ui:leftColumns'] ? uiSchemaContent['ui:leftColumns'] : '';
          //     break;
          // case 'rightColumns':
          //     resultData[key] = uiSchemaContent['ui:rightColumns'] ? uiSchemaContent['ui:rightColumns'] : '';
          //     break;

          case 'checkType':
            if (editFieldData[key]) {
              resultData[key] = editFieldData[key];
            } else {
              resultData[key] = uiSchemaContent['ui:checkType'] ? uiSchemaContent['ui:checkType'] : '';
            }

            break;

          case 'leftTitle':
            if (editFieldData[key]) {
              resultData[key] = editFieldData[key];
            } else {
              resultData[key] = uiSchemaContent['ui:leftTitle'] ? uiSchemaContent['ui:leftTitle'] : '';
            }

            break;

          case 'rightTitle':
            if (editFieldData[key]) {
              resultData[key] = editFieldData[key];
            } else {
              resultData[key] = uiSchemaContent['ui:rightTitle'] ? uiSchemaContent['ui:rightTitle'] : '';
            }

            break;

          case 'marginLeft':
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].marginLeft !== 'undefined') {
                resultData[key] = uiSchemaContent['ui:options'].marginLeft;
              } else {
                resultData[key] = '';
              }
            } else {
              resultData[key] = '';
            }

            break;

          case 'behavior':
          case 'popCode':
          case 'behaviorUrl':
          case 'showGroupTitle':
            if (editFieldData[key]) {
              resultData[key] = editFieldData[key];
            } else {
              resultData[key] = editFieldData.uiSchema && editFieldData.uiSchema[editFieldData.code] && editFieldData.uiSchema[editFieldData.code]['ui:options'] && editFieldData.uiSchema[editFieldData.code]['ui:options'][key] ? editFieldData.uiSchema[editFieldData.code]['ui:options'][key] : '';
            }

            break;

          case 'algorithm':
            if (editFieldData[key]) {
              resultData[key] = editFieldData[key];
            } else {
              resultData[key] = uiSchemaContent['ui:algorithm'] ? uiSchemaContent['ui:algorithm'] : '';
            }

            break;

          default:
            console.log('configSchema中获取到不能识别的字段设置，请注意是否传入了自定义配置项的处理方法');
        } // 插入自定义配置项处理


        registerWidgets.map(function (widget) {
          if (widget.customConfigFields && widget.customConfigFields.length > 0) {
            widget.customConfigFields.map(function (fieldObject) {
              if (fieldObject.code === key) {
                resultData[key] = fieldObject.schemaToConfigConverter(editFieldData);
              }
            });
          }
        });
      });
      return resultData;
    }
  }, {
    key: "configFormData2schemaConvertor",
    value: function configFormData2schemaConvertor(editFieldData, formData) {
      var _this2 = this;

      var messages = this.props.messages;
      var supportFieldList = this.props.supportFieldList;
      var registerWidgets = this.props.registerWidgets;
      var hasServerValidator, hasEmptyValidator;
      var ValidateMessage = {
        empty: messages[(0, _localeMessages.getMessageId)('fieldConfigEmptyValidateTip')],
        email: messages[(0, _localeMessages.getMessageId)('fieldConfigEmailValidateTip')],
        url: messages[(0, _localeMessages.getMessageId)('fieldConfigUrlValidateTip')],
        telephone: messages[(0, _localeMessages.getMessageId)('fieldConfigTelValidateTip')],
        id: messages[(0, _localeMessages.getMessageId)('fieldConfigIdValidateTip')],
        digit: messages[(0, _localeMessages.getMessageId)('fieldConfigDigitValidateTip')],
        money: messages[(0, _localeMessages.getMessageId)('fieldConfigMoneyValidateTip')],
        server: messages[(0, _localeMessages.getMessageId)('fieldConfigServerValidateTip')]
      };
      var bpmnNodes = this.props.bpmnNodes;
      var resultData = Object.assign({}, editFieldData);

      var schema = _index2["default"].getSchema(messages, registerWidgets, supportFieldList);

      Object.keys(formData).map(function (key) {
        var validators;
        var jsonSchemaContent = resultData.jsonSchema[resultData.code];
        var uiSchemaContent = resultData.uiSchema[resultData.code];
        var fieldType = jsonSchemaContent.type,
            fieldUniqueItems = jsonSchemaContent.uniqueItems;

        if (fieldType === 'array' && !fieldUniqueItems) {
          jsonSchemaContent = jsonSchemaContent.items;
          uiSchemaContent = uiSchemaContent.items;
        }

        var formDataValue = resultData.formData[resultData.code];
        var bizDataContent = resultData.bizData[resultData.code];

        switch (key) {
          case 'code':
            var newCode = formData.code;
            jsonSchemaContent = resultData.jsonSchema[resultData.code];
            uiSchemaContent = resultData.uiSchema[resultData.code];

            if (resultData.code === newCode) {
              break;
            }

            var isDuplicate = false;

            _this2.props.fields.map(function (field) {
              if (field.code === newCode) {
                isDuplicate = true;
              }
            });

            if (isDuplicate) {
              _antd.message.error(messages[(0, _localeMessages.getMessageId)('fieldConfigDuplicateCodeErrorTip')]);
            } else {
              // 更新editFieldData中的code相关字段
              resultData.code = newCode;
              resultData.jsonSchema = _defineProperty({}, newCode, jsonSchemaContent);
              resultData.uiSchema = _defineProperty({}, newCode, uiSchemaContent);
              resultData.formData = _defineProperty({}, newCode, formDataValue);
              resultData.bizData = _defineProperty({}, newCode, bizDataContent);
            }

            break;

          case 'name':
            var newLabel = formData.name;

            if (resultData.label === newLabel) {
              break;
            }

            resultData.label = newLabel; // 这里数据格式有冗余了，可以不定义这个title的，因为title和label是相同的

            resultData.jsonSchema[resultData.code].title = newLabel;
            break;

          case 'placeholder':
            if (uiSchemaContent['ui:placeholder'] === formData.placeholder) {
              break;
            }

            uiSchemaContent['ui:placeholder'] = formData.placeholder;

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'value':
            if (formDataValue === formData.value) {
              break;
            } // 默认值如果被设置为undefined（单选并且点击右侧“清除”的叉号的场景，要设置为空字符串；多选场景依旧设置为空数组）


            if (typeof formData.value !== 'undefined') {
              if (fieldType === 'array' && !fieldUniqueItems) {
                resultData.formData[resultData.code] = [formData.value];
              } else {
                resultData.formData[resultData.code] = formData.value;
              }
            } else {
              resultData.formData[resultData.code] = '';
            }

            break;

          case 'description':
            if (uiSchemaContent['ui:help'] === formData.description) {
              break;
            }

            uiSchemaContent['ui:help'] = formData.description;

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'dataSource':
            if (jsonSchemaContent.dataSource === formData.dataSource) {
              break;
            }

            if (formData.dataSource !== '') {
              jsonSchemaContent.dataSource = formData.dataSource;
            } else {
              // 配置数据源后点击预览，以引用的方式传入XForm组件的jsonSchema被组件内部修改加入了data。由于线上老数据中很多都含有data，故这个逻辑先保留
              delete jsonSchemaContent.data;
              delete jsonSchemaContent.dataSource;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'dataSourceUrl':
            if (jsonSchemaContent.dataSourceUrl === formData.dataSourceUrl) {
              break;
            }

            if (typeof formData.dataSourceUrl !== 'undefined') {
              jsonSchemaContent.dataSourceUrl = formData.dataSourceUrl;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'server':
            var validateCode = '';
            var serverValidatorIndex = 0;
            validators = [];
            hasServerValidator = false; // 对于校验类的配置，设置为层叠配置的字段也仍旧是对字段整体进行校验配置，而不是对被层叠的字段本身做校验

            uiSchemaContent = resultData.uiSchema[resultData.code];

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                validators = uiSchemaContent['ui:options'].validate;
                validators.map(function (validate, index) {
                  if (validate.type === 'server') {
                    validateCode = validate.validateCode;
                    hasServerValidator = true;
                    serverValidatorIndex = index;
                  }
                });
              }
            }

            if (validateCode === formData.server) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                validate: [{
                  type: 'server',
                  validateCode: validateCode,
                  message: ValidateMessage.server
                }]
              };
            } else {
              if (formData.server !== '') {
                if (hasServerValidator) {
                  uiSchemaContent['ui:options'].validate[serverValidatorIndex].validateCode = formData.server;
                } else {
                  if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                    uiSchemaContent['ui:options'].validate.push({
                      type: 'server',
                      validateCode: formData.server,
                      message: ValidateMessage.server
                    });
                  } else {
                    uiSchemaContent['ui:options'].validate = [{
                      type: 'server',
                      validateCode: formData.server,
                      message: ValidateMessage.server
                    }];
                  }
                }
              } else {
                // 清除server validator
                if (hasServerValidator) {
                  uiSchemaContent['ui:options'].validate.splice(serverValidatorIndex, 1);

                  if (uiSchemaContent['ui:options'].validate.length <= 0) {
                    delete uiSchemaContent['ui:options'].validate;
                  }
                }
              }
            }

            resultData.uiSchema[resultData.code] = uiSchemaContent;
            break;

          case 'validate':
            var validatorType = '';
            var serverValidator;
            var emptyValidator; // 对于校验类的配置，设置为层叠配置的字段也仍旧是对字段整体进行校验配置，而不是对被层叠的字段本身做校验

            uiSchemaContent = resultData.uiSchema[resultData.code];
            validators = [];
            hasEmptyValidator = false;
            hasServerValidator = false;

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].validate !== 'undefined') {
                validators = uiSchemaContent['ui:options'].validate;
                validators.map(function (validate) {
                  if (validate.type === 'empty') {
                    hasEmptyValidator = true;
                    emptyValidator = validate;
                  } else if (validate.type === 'server') {
                    hasServerValidator = true;
                    serverValidator = validate;
                  } else {
                    validatorType = validate.type;
                  }
                });
              }
            }

            if (validatorType === formData.validate) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                validate: [{
                  type: formData.validate,
                  message: ValidateMessage[formData.validate]
                }]
              };
            } else {
              var updatedValidators = [];

              if (formData.validate !== '') {
                if (hasEmptyValidator && typeof emptyValidator !== 'undefined') {
                  updatedValidators.push(emptyValidator);
                }

                if (hasServerValidator && typeof serverValidator !== 'undefined') {
                  updatedValidators.push(serverValidator);
                }

                updatedValidators.push({
                  type: formData.validate,
                  message: ValidateMessage[formData.validate]
                });
              } else {
                // 清除校验器
                if (hasEmptyValidator && typeof emptyValidator !== 'undefined') {
                  updatedValidators.push(emptyValidator);
                }

                if (hasServerValidator && typeof serverValidator !== 'undefined') {
                  updatedValidators.push(serverValidator);
                }
              }

              uiSchemaContent['ui:options'].validate = updatedValidators;

              if (updatedValidators.length <= 0) {
                delete uiSchemaContent['ui:options'].validate;
              }
            }

            resultData.uiSchema[resultData.code] = uiSchemaContent;
            break;

          case 'maxLength':
            if (jsonSchemaContent.maxLength === formData.maxLength) {
              break;
            }

            jsonSchemaContent.maxLength = formData.maxLength;

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
            } else {
              resultData.jsonSchema[resultData.code] = jsonSchemaContent;
            }

            break;

          case 'maximum':
            if (jsonSchemaContent.maximum === formData.maximum) {
              break;
            }

            jsonSchemaContent.maximum = formData.maximum;

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
            } else {
              resultData.jsonSchema[resultData.code] = jsonSchemaContent;
            }

            break;

          case 'minimum':
            if (jsonSchemaContent.minimum === formData.minimum) {
              break;
            }

            jsonSchemaContent.minimum = formData.minimum;

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
            } else {
              resultData.jsonSchema[resultData.code] = jsonSchemaContent;
            }

            break;

          case 'groupName':
            var groupName;

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].groupName !== 'undefined') {
                groupName = uiSchemaContent['ui:options'].groupName;
              }
            }

            if (groupName === formData.groupName) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                groupName: formData.groupName
              };
            } else {
              uiSchemaContent['ui:options'].groupName = formData.groupName;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'uploadType':
            // 图片上传方式配置
            var uploadType;

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].uploadType !== 'undefined') {
                uploadType = uiSchemaContent['ui:options'].uploadType;
              }
            }

            if (uploadType === formData.uploadType) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                uploadType: formData.uploadType
              };
            } else {
              uiSchemaContent['ui:options'].uploadType = formData.uploadType;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'maxFileSize':
            if (jsonSchemaContent.maxFileSize === formData.maxFileSize) {
              break;
            }

            jsonSchemaContent.maxFileSize = formData.maxFileSize;

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
            } else {
              resultData.jsonSchema[resultData.code] = jsonSchemaContent;
            }

            break;

          case 'marginLeft':
            var marginLeft = 0;

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].marginLeft !== 'undefined') {
                marginLeft = uiSchemaContent['ui:options'].marginLeft;
              }
            }

            if (marginLeft === formData.marginLeft) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                marginLeft: formData.marginLeft
              };
            } else {
              uiSchemaContent['ui:options'].marginLeft = formData.marginLeft;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'maxFileNum':
            if (jsonSchemaContent.maxFileNum === formData.maxFileNum) {
              break;
            }

            jsonSchemaContent.maxFileNum = formData.maxFileNum;

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.jsonSchema[resultData.code].items = jsonSchemaContent;
            } else {
              resultData.jsonSchema[resultData.code] = jsonSchemaContent;
            }

            break;

          case 'templateFileUrl':
            // 模板文件配置
            var templateFileUrl = [];

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].templateFileUrl !== 'undefined') {
                templateFileUrl = uiSchemaContent['ui:options'].templateFileUrl;
              }
            }

            if (JSON.stringify(templateFileUrl) === JSON.stringify(formData.templateFileUrl)) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                templateFileUrl: formData.templateFileUrl
              };
            } else {
              uiSchemaContent['ui:options'].templateFileUrl = formData.templateFileUrl;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'exampleImageUrl':
            // 示例图片配置
            var exampleImageUrl = [];

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].exampleImageUrl !== 'undefined') {
                exampleImageUrl = uiSchemaContent['ui:options'].exampleImageUrl;
              }
            }

            if (JSON.stringify(exampleImageUrl) === JSON.stringify(formData.exampleImageUrl)) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                exampleImageUrl: formData.exampleImageUrl
              };
            } else {
              uiSchemaContent['ui:options'].exampleImageUrl = formData.exampleImageUrl;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'selectLeafOnly':
            // 树选择器是否允许选择父节点
            var selectLeafOnly = false;

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].selectLeafOnly !== 'undefined') {
                selectLeafOnly = uiSchemaContent['ui:options'].selectLeafOnly;
              }
            }

            if (selectLeafOnly === formData.selectLeafOnly) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                selectLeafOnly: formData.selectLeafOnly
              };
            } else {
              uiSchemaContent['ui:options'].selectLeafOnly = formData.selectLeafOnly;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'treeCheckStrictly':
            // 多选树选择器父子节点选择是否关联
            var treeCheckStrictly = false;

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].treeCheckStrictly !== 'undefined') {
                treeCheckStrictly = uiSchemaContent['ui:options'].treeCheckStrictly;
              }
            }

            if (treeCheckStrictly === formData.treeCheckStrictly) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                treeCheckStrictly: formData.treeCheckStrictly
              };
            } else {
              uiSchemaContent['ui:options'].treeCheckStrictly = formData.treeCheckStrictly;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'initRange':
            // 日期范围选择器默认值配置
            var initRange;

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].initRange !== 'undefined') {
                initRange = uiSchemaContent['ui:options'].initRange;
              }
            }

            if (initRange === formData.initRange) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                initRange: formData.initRange
              };
            } else {
              uiSchemaContent['ui:options'].initRange = formData.initRange;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'cascade':
            var cascade = false;
            jsonSchemaContent = resultData.jsonSchema[resultData.code];
            uiSchemaContent = resultData.uiSchema[resultData.code];

            if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
              cascade = true;
            }

            if (cascade === formData.cascade) {
              return;
            }

            if (formData.cascade) {
              jsonSchemaContent = {
                type: 'array',
                title: jsonSchemaContent.title,
                items: Object.assign({}, jsonSchemaContent, {
                  "default": formDataValue
                })
              }; // 要删除掉items中的title字

              delete jsonSchemaContent.items.title;
              uiSchemaContent = {
                items: uiSchemaContent
              };
              resultData.jsonSchema[resultData.code] = jsonSchemaContent;
              resultData.uiSchema[resultData.code] = uiSchemaContent;
              resultData.formData[resultData.code] = formDataValue !== '' ? [formDataValue] : [''];
            } else {
              jsonSchemaContent.items.title = jsonSchemaContent.title;
              jsonSchemaContent = jsonSchemaContent.items;
              uiSchemaContent = uiSchemaContent.items;
              resultData.jsonSchema[resultData.code] = jsonSchemaContent;
              resultData.uiSchema[resultData.code] = uiSchemaContent;
              resultData.formData[resultData.code] = formDataValue.length > 0 ? formDataValue[0] : '';
            }

            break;

          case 'require':
            if (resultData.required === formData.require) {
              break;
            } // 对于校验类的配置，设置为层叠配置的字段也仍旧是对字段整体进行校验配置，而不是对被层叠的字段本身做校验


            uiSchemaContent = resultData.uiSchema[resultData.code];
            resultData.required = formData.require;

            if (formData.require) {
              // 添加必填校验
              if (typeof uiSchemaContent === 'undefined') {
                uiSchemaContent = {
                  'ui:options': {
                    validate: [{
                      type: 'empty',
                      message: ValidateMessage.empty
                    }]
                  }
                };
              } else if (typeof uiSchemaContent['ui:options'] === 'undefined') {
                uiSchemaContent['ui:options'] = {
                  validate: [{
                    type: 'empty',
                    message: ValidateMessage.empty
                  }]
                };
              } else if (typeof uiSchemaContent['ui:options'].validate === 'undefined') {
                uiSchemaContent['ui:options'].validate = [{
                  type: 'empty',
                  message: ValidateMessage.empty
                }];
              } else {
                uiSchemaContent['ui:options'].validate.push({
                  type: 'empty',
                  message: ValidateMessage.empty
                });
              }
            } else {
              // 取消必填校验
              if (uiSchemaContent['ui:options'].validate.length <= 1) {
                delete uiSchemaContent['ui:options'].validate;
              } else {
                uiSchemaContent['ui:options'].validate.map(function (validate, index) {
                  if (validate.type === 'empty') {
                    uiSchemaContent['ui:options'].validate.splice(index, 1);
                  }
                });
              }
            }

            resultData.uiSchema[resultData.code] = uiSchemaContent;
            break;

          case 'hidden':
            var fieldHidden = uiSchemaContent['ui:widget'] === 'hidden';

            if (fieldHidden === formData.hidden) {
              break;
            }

            if (formData.hidden) {
              // 添加字段隐藏
              uiSchemaContent['ui:widget'] = 'hidden';
            } else {
              // 取消字段隐藏
              if (typeof schema[resultData.type].uiSchema['ui:widget'] !== 'undefined') {
                uiSchemaContent['ui:widget'] = schema[resultData.type].uiSchema['ui:widget'];
              } else {
                delete uiSchemaContent['ui:widget'];
              }
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'disabled':
            var fieldDisabled = uiSchemaContent['ui:disabled'];

            if (fieldDisabled === formData.disabled) {
              break;
            }

            uiSchemaContent['ui:disabled'] = formData.disabled;

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;
          //add nodes is show 2020-06-02

          case 'shownodes':
            var selectnodes = [];

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].shownodes !== 'undefined') {
                selectnodes = uiSchemaContent['ui:options'].shownodes;
              }
            }

            if (JSON.stringify(selectnodes) === JSON.stringify(formData.shownodes)) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                shownodes: formData.shownodes
              };
            } else {
              uiSchemaContent['ui:options'].shownodes = formData.shownodes;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;

          case 'disnodes':
            var selectDisNodes = [];

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].disnodes !== 'undefined') {
                selectDisNodes = uiSchemaContent['ui:options'].disnodes;
              }
            }

            if (JSON.stringify(selectDisNodes) === JSON.stringify(formData.disnodes)) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                shownodes: formData.disnodes
              };
            } else {
              uiSchemaContent['ui:options'].disnodes = formData.disnodes;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;
          //add item width 2020-06-03

          case 'itemwidth':
            var widths = 100;

            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
              if (typeof uiSchemaContent['ui:options'].itemwidth !== 'undefined') {
                widths = uiSchemaContent['ui:options'].itemwidth;
              }
            }

            if (widths === formData.itemwidth) {
              break;
            }

            if (typeof uiSchemaContent['ui:options'] === 'undefined') {
              uiSchemaContent['ui:options'] = {
                itemwidth: formData.itemwidth
              };
            } else {
              uiSchemaContent['ui:options'].itemwidth = formData.itemwidth;
            }

            if (fieldType === 'array' && !fieldUniqueItems) {
              resultData.uiSchema[resultData.code].items = uiSchemaContent;
            } else {
              resultData.uiSchema[resultData.code] = uiSchemaContent;
            }

            break;
          // case 'transferType':
          //     const newTransferType = formData[key];
          //     resultData[key] = newTransferType;
          //     uiSchemaContent['ui:options'] = {
          //         TransferType: newTransferType,
          //     }
          //     break;
          // case 'transferData':
          //     const newTransferData = formData[key];
          //     resultData[key] = newTransferData;
          //     uiSchemaContent['ui:options'].transferData = newTransferData;
          //     break;
          // case 'transferSelectedData':
          //     const newTransferSelectedData = formData[key];
          //     resultData[key] = newTransferSelectedData;
          //     uiSchemaContent['ui:options'].transferSelectedData = newTransferSelectedData;
          //     if (typeof newTransferSelectedData !== 'undefined') {
          //         resultData.formData[resultData.transferSelectedData] = newTransferSelectedData;
          //     } else {
          //         resultData.formData[resultData.transferSelectedData] = '';
          //     }
          //     break;
          // case 'leftColumns':
          //     const newTransferLeftColumns = formData[key];
          //     resultData[key] = newTransferLeftColumns;
          //     uiSchemaContent['ui:options'].leftColumns = newTransferLeftColumns;
          //     break;
          // case 'rightColumns':
          //     const newRightColumns = formData[key];
          //     resultData[key] = newRightColumns;
          //     uiSchemaContent['ui:options'].rightColumns = newRightColumns;
          //     break;

          case 'checkType':
            var newCheckType = formData[key];
            resultData[key] = newCheckType;
            uiSchemaContent['ui:checkType'] = newCheckType;
            break;

          case 'leftTitle':
            var newLeftTitle = formData[key];
            resultData[key] = newLeftTitle;
            uiSchemaContent['ui:leftTitle'] = newLeftTitle;
            break;

          case 'rightTitle':
            var newRightTitle = formData[key];
            resultData[key] = newRightTitle;
            uiSchemaContent['ui:rightTitle'] = newRightTitle;
            break;

          case 'behavior':
            var newBehavior = formData[key];
            resultData[key] = newBehavior;
            uiSchemaContent['ui:options'] = {
              behavior: newBehavior
            };
            break;

          case 'popCode':
          case 'behaviorUrl':
          case 'showGroupTitle':
            resultData[key] = formData[key];
            uiSchemaContent['ui:options'][key] = formData[key];
            break;

          case 'algorithm':
            resultData[key] = formData[key];
            uiSchemaContent['ui:algorithm'] = formData[key];
            break;

          default:
            console.log("configSchema\u4E2D\u83B7\u53D6\u5230\u4E0D\u80FD\u8BC6\u522B\u7684\u5B57\u6BB5[".concat(key, "]\u8BBE\u7F6E\uFF0C\u8BF7\u6CE8\u610F\u662F\u5426\u4F20\u5165\u4E86\u76F8\u5E94\u7684\u81EA\u5B9A\u4E49\u5B57\u6BB5\u5904\u7406\u65B9\u6CD5"));
        } // 插入自定义配置项处理


        registerWidgets.map(function (widget) {
          if (widget.customConfigFields && widget.customConfigFields.length > 0) {
            widget.customConfigFields.map(function (fieldObject) {
              if (fieldObject.code === key) {
                resultData = fieldObject.configToSchemaConverter(resultData, formData[fieldObject.code]);
              }
            });
          }
        });
      });
      return resultData;
    } // 更新表单field配置

  }, {
    key: "handleUpdateFieldSchemaData",
    value: function handleUpdateFieldSchemaData(formData) {
      var editFieldData = this.props.editFieldData;
      var code = editFieldData.code;
      var fieldData = this.configFormData2schemaConvertor(editFieldData, formData);
      this.props.updateFieldDataHandler(code, fieldData);
    } // 更新表单field的业务属性配置

  }, {
    key: "handleUpdateBizData",
    value: function handleUpdateBizData(formData) {
      var editFieldData = this.props.editFieldData;
      var code = editFieldData.code;
      var fieldData = Object.assign({}, editFieldData);
      fieldData.bizData[code] = formData;
      this.props.updateFieldDataHandler(code, fieldData);
    } // “字段级联”配置浮层打开

  }, {
    key: "handleFieldShowConfigModalOpen",
    value: function handleFieldShowConfigModalOpen() {
      var config = this.generateFieldShowConfig();
      this.setState({
        fieldShowConfig: config,
        currentEditShowOptionCode: config.showConfig[0].code,
        showConfigModalVisible: true
      });
    } // 获取“字段级联”配置数据并保存在state中

  }, {
    key: "generateFieldShowConfig",
    value: function generateFieldShowConfig() {
      var config = {
        beneathFields: [],
        showConfig: []
      };
      var _this$props = this.props,
          messages = _this$props.messages,
          fields = _this$props.fields,
          editFieldData = _this$props.editFieldData;
      var editFieldCode = editFieldData.code;
      var fieldEnumsData = [],
          fieldEnumNamesData = [];
      var index;
      var editFieldJsonSchema; // 注意array类型的jsonSchema数据格式多一层"items"

      if (editFieldData.jsonSchema[editFieldCode].type === 'array') {
        editFieldJsonSchema = editFieldData.jsonSchema[editFieldCode].items;
      } else {
        editFieldJsonSchema = editFieldData.jsonSchema[editFieldCode];
      }

      if (typeof editFieldJsonSchema["enum"] !== 'undefined' && typeof editFieldJsonSchema.enumNames !== 'undefined') {
        fieldEnumsData = editFieldJsonSchema["enum"];
        fieldEnumNamesData = editFieldJsonSchema.enumNames;
      } else if (editFieldData.type === 'booleanCheckbox' || editFieldData.type === 'booleanSwitch') {
        // 对于“单项复选”、“开关”类型组件也可以进行级联配置，要做一个特殊处理
        fieldEnumsData = [true, false];
        fieldEnumNamesData = [messages[(0, _localeMessages.getMessageId)('booleanCheckboxCheckedStatus')], messages[(0, _localeMessages.getMessageId)('booleanCheckboxUncheckedStatus')]];
      }

      for (index = 0; index < fieldEnumsData.length; index++) {
        config.showConfig.push({
          name: fieldEnumNamesData[index],
          code: fieldEnumsData[index],
          show: []
        });
      }

      fields.map(function (field, fieldIndex) {
        var fieldUiSchemaContent = field.uiSchema[field.code];
        var fieldShowOptions = [];

        if (typeof fieldUiSchemaContent['ui:options'] !== 'undefined') {
          if (typeof fieldUiSchemaContent['ui:options'].show !== 'undefined') {
            fieldShowOptions = fieldUiSchemaContent['ui:options'].show;
          }
        }

        fieldShowOptions.map(function (showOption) {
          if (showOption.field === editFieldCode) {
            showOption.values.map(function (value) {
              config.showConfig.map(function (showOptionConfig, showConfigIndex) {
                if (showOptionConfig.code === value) {
                  config.showConfig[showConfigIndex].show.push(field.code);
                }
              });
            });
          }
        }); // beneathFields中存放的字段不应包括当前编辑的字段

        if (field.code === editFieldCode) {
          config.beneathFields = fields.slice(fieldIndex + 1);
        }
      });
      return config;
    } // 字段级联配置中编辑中的字段选项code变化

  }, {
    key: "handleEditOptionChange",
    value: function handleEditOptionChange(event) {
      var optionCode = event.currentTarget.getAttribute('data-optioncode');
      var currentOptionCode = optionCode;

      if (optionCode === 'true') {
        currentOptionCode = true;
      } else if (optionCode === 'false') {
        currentOptionCode = false;
      } else {
        currentOptionCode = optionCode;
      }

      this.setState({
        currentEditShowOptionCode: currentOptionCode
      });
    } // 字段级联配置中判断选项关联的字段是否选中

  }, {
    key: "judgeCheckStatus",
    value: function judgeCheckStatus(code) {
      var result = false;
      var currentOptionCode = this.state.currentEditShowOptionCode;
      var fieldShowConfig = this.state.fieldShowConfig;
      fieldShowConfig.showConfig.map(function (showConfigItem) {
        if (showConfigItem.code === currentOptionCode) {
          result = showConfigItem.show.indexOf(code) > -1;
        }
      });
      return result;
    } // 字段级联配置中选项关联的字段选中状态变化处理器

  }, {
    key: "toggleShowFieldChange",
    value: function toggleShowFieldChange(event) {
      var fieldCode = event.currentTarget.getAttribute('data-fieldcode');
      var currentOptionCode = this.state.currentEditShowOptionCode;
      var fieldShowConfig = this.state.fieldShowConfig;
      fieldShowConfig.showConfig.map(function (showConfigItem, index) {
        if (showConfigItem.code === currentOptionCode) {
          var fieldCodeIndex = showConfigItem.show.indexOf(fieldCode);

          if (fieldCodeIndex > -1) {
            fieldShowConfig.showConfig[index].show.splice(fieldCodeIndex, 1);
          } else {
            fieldShowConfig.showConfig[index].show.push(fieldCode);
          }
        }
      });
      this.setState({
        fieldShowConfig: fieldShowConfig
      });
    } // 确认字段级联配置（点击字段级联配置浮层上的确认按钮）

  }, {
    key: "handleShowConfigModalConfirm",
    value: function handleShowConfigModalConfirm() {
      var _this3 = this;

      var editFieldData = this.props.editFieldData;
      var fieldShowConfig = this.state.fieldShowConfig;
      var beneathFields = fieldShowConfig.beneathFields;
      var showConfig = fieldShowConfig.showConfig;
      var checkEditCodeResult;
      beneathFields.map(function (field, index) {
        var fieldUiSchemaContent = field.uiSchema[field.code];

        if (typeof fieldUiSchemaContent['ui:options'] !== 'undefined') {
          if (typeof fieldUiSchemaContent['ui:options'].show !== 'undefined') {
            // 如果该字段下已经有级联的关联关系，只清除掉与当前编辑的字段code相关的级联内容
            checkEditCodeResult = _this3._hasEditFieldCode(fieldUiSchemaContent['ui:options'].show, editFieldData.code);

            if (checkEditCodeResult.result) {
              fieldUiSchemaContent['ui:options'].show.splice(checkEditCodeResult.index, 1);
            }
          } else {
            fieldUiSchemaContent['ui:options'].show = [];
          }
        } else {
          fieldUiSchemaContent['ui:options'] = {
            show: []
          };
        }

        showConfig.map(function (showConfigItem) {
          if (showConfigItem.show.indexOf(field.code) > -1) {
            checkEditCodeResult = _this3._hasEditFieldCode(fieldUiSchemaContent['ui:options'].show, editFieldData.code);

            if (checkEditCodeResult.result) {
              fieldUiSchemaContent['ui:options'].show[checkEditCodeResult.index].values.push(showConfigItem.code);
            } else {
              fieldUiSchemaContent['ui:options'].show.push({
                field: editFieldData.code,
                values: [showConfigItem.code]
              });
            }
          }
        }); // 这里在editFieldData字段下面的所有字段都可能会被更新一次，组件可能会被多次刷新

        if (fieldUiSchemaContent['ui:options'].show.length > 0) {
          field.uiSchema[field.code] = fieldUiSchemaContent;

          _this3.props.updateFieldItemHandler(field.code, field);
        } else {
          // 如果当前字段下的show的配置项为空数组，则要清除掉该配置项（否则在级联配置下面的字段因为匹配不到任何选项code值，永远不展示！）
          delete fieldUiSchemaContent['ui:options'].show;

          if (Object.keys(fieldUiSchemaContent['ui:options']).length <= 0) {
            delete fieldUiSchemaContent['ui:options'];
          }

          field.uiSchema[field.code] = fieldUiSchemaContent;

          _this3.props.updateFieldItemHandler(field.code, field);
        }
      });
      this.setState({
        showConfigModalVisible: false
      });
    }
  }, {
    key: "_hasEditFieldCode",
    value: function _hasEditFieldCode(fieldShowOptions, editFieldCode) {
      var result = {
        result: false,
        index: 0
      };
      fieldShowOptions.map(function (option, index) {
        if (option.field === editFieldCode) {
          result = {
            result: true,
            index: index
          };
        }
      });
      return result;
    } // 数据源级联配置浮层展示

  }, {
    key: "handleFieldUpdateModalOpen",
    value: function handleFieldUpdateModalOpen(type) {
      // type: null 级联、 relevance 关联
      var editFieldData = this.props.editFieldData;
      var uiSchemaContent = editFieldData.uiSchema[editFieldData.code];
      var updateFields = [];
      var key = type == 'relevance' ? 'calculateFields' : 'updateFields';

      if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
        if (typeof uiSchemaContent['ui:options'][key] !== 'undefined') {
          updateFields = uiSchemaContent['ui:options'][key];
        }
      } // debugger;


      this.setState({
        dataSourceFieldList: this.generateFieldsWithDataSource(type),
        fieldUpdateDataSourceConfig: updateFields,
        updateConfigModalVisible: true,
        updateConfigType: type
      });
    } // type == null  获取配置了数据源的字段列表，字段必须在当前编辑的字段的后面（数据源联动配置用）
    // type == relevance 关联计算的时候无所谓前后吧

  }, {
    key: "generateFieldsWithDataSource",
    value: function generateFieldsWithDataSource(type) {
      var fields = this.props.fields;
      var editFieldData = this.props.editFieldData;
      var code = editFieldData.code;
      var editFieldIndex = 0;
      var fieldList = [];
      var jsonSchemaContent;

      if (!type) {
        fields.map(function (field, index) {
          if (field.code === code) {
            editFieldIndex = index;
          }
        });
        fields.slice(editFieldIndex + 1).map(function (field) {
          jsonSchemaContent = field.jsonSchema[field.code];

          if (typeof jsonSchemaContent.dataSource !== 'undefined' && jsonSchemaContent.dataSource !== '') {
            fieldList.push(field);
          }
        });
      } else if (type && type == 'relevance') {
        fields.map(function (field) {
          if (field.type == 'number') {
            fieldList.push(field);
          }
        });
      }

      return fieldList;
    } // 数据源级联配置浮层中字段选中状态判断逻辑

  }, {
    key: "judgeUpdateDataSourceCheckStatus",
    value: function judgeUpdateDataSourceCheckStatus(code) {
      var updateFields = this.state.fieldUpdateDataSourceConfig;
      return updateFields.indexOf(code) > -1;
    } // 数据源级联配置变化处理器

  }, {
    key: "toggleUpdateDataSourceChange",
    value: function toggleUpdateDataSourceChange(event) {
      var fieldCode = event.currentTarget.getAttribute('data-fieldcode');
      var updateFields = this.state.fieldUpdateDataSourceConfig;

      if (updateFields.indexOf(fieldCode) > -1) {
        updateFields.splice(updateFields.indexOf(fieldCode), 1);
      } else {
        updateFields.push(fieldCode);
      }

      this.setState({
        fieldUpdateDataSourceConfig: updateFields
      });
    } // 确认数据源级联配置（点击数据源级联配置浮层的“确定”按钮）

  }, {
    key: "updateDataSourceConfigConfirm",
    value: function updateDataSourceConfigConfirm() {
      var updateFields = this.state.fieldUpdateDataSourceConfig;
      var editFieldData = this.props.editFieldData;
      var editFieldCode = editFieldData.code;
      var fieldData = Object.assign({}, editFieldData);
      var uiSchemaContent = fieldData.uiSchema[fieldData.code];
      var key = this.state.updateConfigType == 'relevance' ? 'calculateFields' : 'updateFields';

      if (typeof updateFields !== 'undefined' && updateFields.length > 0) {
        if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
          uiSchemaContent['ui:options'][key] = updateFields;
        } else {
          uiSchemaContent['ui:options'] = _defineProperty({}, key, updateFields);
        }
      } else {
        // 如果取消掉了数据源级联配置，删除掉updateFields
        if (typeof uiSchemaContent['ui:options'] !== 'undefined' && typeof uiSchemaContent['ui:options'][key] !== 'undefined') {
          delete uiSchemaContent['ui:options'][key];
        }
      }

      fieldData.uiSchema[fieldData.code] = uiSchemaContent;
      this.props.updateFieldDataHandler(editFieldCode, fieldData);
      this.setState({
        updateConfigModalVisible: false,
        updateConfigType: null
      });
    } // 清除某个字段的级联配置

  }, {
    key: "_clearFieldShow",
    value: function _clearFieldShow(field) {
      var _this4 = this;

      var fields = this.props.fields;
      var code = field.code;
      fields.map(function (field, index) {
        var uiSchemaContent = field.uiSchema[field.code];

        if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
          if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
            var checkEditCodeIndex = _this4._hasEditFieldCode(uiSchemaContent['ui:options'].show, code);

            if (checkEditCodeIndex.result) {
              uiSchemaContent['ui:options'].show.splice(checkEditCodeIndex.index, 1);

              if (uiSchemaContent['ui:options'].show.length <= 0) {
                delete uiSchemaContent['ui:options'].show;
              }
            }
          }
        }

        field.uiSchema[field.code] = uiSchemaContent;

        _this4.props.updateFieldItemHandler(field.code, field);
      });
    } // 清除当前编辑字段的字段级联配置

  }, {
    key: "handleClearFieldShow",
    value: function handleClearFieldShow() {
      var editFieldData = this.props.editFieldData;

      this._clearFieldShow(editFieldData);
    } // 清除某个字段的数据级联

  }, {
    key: "_clearFieldUpdate",
    value: function _clearFieldUpdate(field) {
      var code = field.code;
      var fieldData = Object.assign({}, field);
      var uiSchemaContent = fieldData.uiSchema[fieldData.code];

      if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
        if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
          delete uiSchemaContent['ui:options'].updateFields;
        }
      }

      fieldData.uiSchema[fieldData.code] = uiSchemaContent;
      this.props.updateFieldItemHandler(code, fieldData);
    } // 清除当前编辑字段的数据级联配置

  }, {
    key: "handleClearFieldUpdate",
    value: function handleClearFieldUpdate() {
      var editFieldData = this.props.editFieldData;

      this._clearFieldUpdate(editFieldData);
    } // 清除表单中全部级联相关的配置（这个功能是为了重置一些联动配置错误的历史数据）

  }, {
    key: "handleClearAll",
    value: function handleClearAll() {
      var _this5 = this;

      var messages = this.props.messages;
      var fields = this.props.fields;
      var uiSchemaContent;
      fields.map(function (field) {
        uiSchemaContent = field.uiSchema[field.code];

        if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
          if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
            delete uiSchemaContent['ui:options'].show;
          }

          if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
            delete uiSchemaContent['ui:options'].updateFields;
          }

          field.uiSchema[field.code] = uiSchemaContent;

          _this5.props.updateFieldItemHandler(field.code, field);
        }
      });

      _antd.message.success(messages[(0, _localeMessages.getMessageId)('fieldConfigClearConfigSuccessTip')]);
    } // 根据basicConfigFields或advanceConfigFields过滤待渲染的配置字段(对于jsonSchema的特殊处理)

  }, {
    key: "_filterJSONSchemaConfigFields",
    value: function _filterJSONSchemaConfigFields(configSchema) {
      var configFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var resultSchema = _objectSpread({}, configSchema);

      resultSchema.properties = {};
      Object.keys(configSchema.properties).map(function (configCode) {
        if (configFields.indexOf(configCode) > -1) {
          resultSchema.properties[configCode] = configSchema.properties[configCode];
        }
      });
      return resultSchema;
    } // 根据basicConfigFields或advanceConfigFields过滤待渲染的配置字段

  }, {
    key: "_filterConfigFields",
    value: function _filterConfigFields(configSchema) {
      var configFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var resultSchema = {};
      Object.keys(configSchema).map(function (configCode) {
        if (configFields.indexOf(configCode) > -1) {
          resultSchema[configCode] = configSchema[configCode];
        }
      });
      return resultSchema;
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props2 = this.props,
          globalConfig = _this$props2.globalConfig,
          customInterfaces = _this$props2.customInterfaces,
          customGateway = _this$props2.customGateway,
          customUploadRequest = _this$props2.customUploadRequest,
          onImagePreview = _this$props2.onImagePreview,
          xformBizData = _this$props2.xformBizData,
          xformOptionBizData = _this$props2.xformOptionBizData,
          editFieldData = _this$props2.editFieldData,
          dataSource = _this$props2.dataSource,
          serverCode = _this$props2.serverCode,
          updateFieldDataHandler = _this$props2.updateFieldDataHandler,
          messages = _this$props2.messages,
          locale = _this$props2.locale,
          supportFieldList = _this$props2.supportFieldList,
          supportConfigList = _this$props2.supportConfigList,
          registerWidgets = _this$props2.registerWidgets,
          emptyPlaceholder = _this$props2.emptyPlaceholder,
          popupContainer = _this$props2.popupContainer,
          bpmnNodes = _this$props2.bpmnNodes,
          dispatch = _this$props2.dispatch,
          fields = _this$props2.fields,
          operateDBGroup = _this$props2.operateDBGroup,
          user = _this$props2.user,
          commonFields = _this$props2.commonFields;
      var basicConfigFields = CONST.XFORM_CONFIG_FIELDS.basic;
      var advanceConfigFields = CONST.XFORM_CONFIG_FIELDS.advance;
      var configSchemaData,
          hasItemSetting,
          hasShowConfigButton,
          fieldShowConfigButton = '';
      var basicConfigXForm = '',
          advanceConfigXForm = '',
          bizConfigXForm = '',
          listItemConfig = '',
          cascadeConfig = '';
      var bizConfigJsonSchema = {},
          bizConfigUiSchema = {},
          bizConfigFormData = {};

      var configSchema = _index["default"].getConfig(dataSource, serverCode, messages, registerWidgets, supportFieldList);

      var xformCustomWidgets = _util.util.getXFormCustomWidgets(registerWidgets);

      var configSchemaJsonSchema, editFieldJsonSchema;
      var hasDBOperateButton = false,
          groupDBOperateView = '';

      if (editFieldData !== null) {
        if (configSchema.hasOwnProperty(editFieldData.type)) {
          configSchemaData = configSchema[editFieldData.type]; //console.log(configSchemaData,editFieldData)

          hasItemSetting = configSchemaData.hasItemSetting;
          hasShowConfigButton = configSchemaData.hasShowConfigButton;
          configSchemaJsonSchema = configSchemaData.jsonSchema;

          if (editFieldData.fieldType == 'custom') {
            hasDBOperateButton = configSchemaData.hasDBOperateButton;
          } //配置节点 add 2020-06-02


          if (configSchemaJsonSchema.properties.shownodes && Array.isArray(bpmnNodes)) {
            configSchemaJsonSchema.properties.shownodes.items["enum"] = bpmnNodes.map(function (i) {
              return i.id;
            });
            configSchemaJsonSchema.properties.shownodes.items.enumNames = bpmnNodes.map(function (i) {
              return i.name;
            });
          }

          if (configSchemaJsonSchema.properties.disnodes && Array.isArray(bpmnNodes)) {
            configSchemaJsonSchema.properties.disnodes.items["enum"] = bpmnNodes.map(function (i) {
              return i.id;
            });
            configSchemaJsonSchema.properties.disnodes.items.enumNames = bpmnNodes.map(function (i) {
              return i.name;
            });
          } // 如果一个配置类型有“下拉框选项设置”，则要把当前已经配置了的选项写入configSchema的默认值的jsonSchema中


          if (hasItemSetting && editFieldData.fieldType !== 'system') {
            try {
              // 注意array类型的jsonSchema数据格式多一层"items"
              if (editFieldData.jsonSchema[editFieldData.code].type === 'array') {
                editFieldJsonSchema = editFieldData.jsonSchema[editFieldData.code].items;
              } else {
                editFieldJsonSchema = editFieldData.jsonSchema[editFieldData.code];
              }

              configSchemaJsonSchema.properties.value["enum"] = editFieldJsonSchema["enum"];
              configSchemaJsonSchema.properties.value.enumNames = editFieldJsonSchema.enumNames;
            } catch (e) {
              console.warn('[xform-editor]配置类型（' + editFieldData.fieldType + '）configSchema中默认值配置类型错误：缺少enum和enumName');
            }
          } // 配置行为


          if (configSchemaJsonSchema.properties.behavior) {
            configSchemaJsonSchema.properties.behavior["enum"] = editFieldData.jsonSchema[editFieldData.code]["enum"];
            configSchemaJsonSchema.properties.behavior.enumNames = editFieldData.jsonSchema[editFieldData.code].enumNames;
          } // 配置穿梭框类型
          // if (configSchemaJsonSchema.properties.transferType) {
          //     configSchemaJsonSchema.properties.transferType.enum = editFieldData.jsonSchema[editFieldData.code].enum;
          //     configSchemaJsonSchema.properties.transferType.enumNames = editFieldData.jsonSchema[editFieldData.code].enumNames;
          // }
          // 根据配置的supportConfigList属性，将没有在supportConfigList中的配置项设置为ui:widget: hidden，这样就隐藏了该配置项(注意：字段“名称”配置项不能被隐藏)


          Object.keys(configSchemaJsonSchema.properties).map(function (configCode) {
            if (CONST.CONFIGUEABLE_FIELD_CONFIG_CODE.indexOf(configCode) > -1 && supportConfigList.indexOf(configCode) <= -1) {
              if (typeof configSchemaData.uiSchema[configCode] !== 'undefined') {
                configSchemaData.uiSchema[configCode]['ui:widget'] = 'hidden';
              } else {
                configSchemaData.uiSchema[configCode] = {
                  'ui:widget': 'hidden'
                };
              }
            } // 如果是业务字段，字段的编码字段不可修改(configSchema里面一定有uiSchema的code字段，可以放心修改)


            if (editFieldData.fieldType === 'common') {
              configSchemaData.uiSchema['code']['ui:disabled'] = true;
            } // 配置了Code模式才能展示编码字段


            if (!globalConfig.codeEditable) {
              configSchemaData.uiSchema['code']['ui:widget'] = 'hidden';
            }
          });
          basicConfigXForm = /*#__PURE__*/_react["default"].createElement(_index3["default"], {
            customInterfaces: customInterfaces,
            customGateway: customGateway,
            customUploadRequest: customUploadRequest,
            onImagePreview: onImagePreview,
            locale: locale,
            labelType: "vertical",
            alignType: "vertical",
            registerWidgets: xformCustomWidgets,
            disabled: !this.props.systemFieldEditable && editFieldData.fieldType === 'system' // “系统”类型字段不能更改配置
            ,
            jsonSchema: this._filterJSONSchemaConfigFields(configSchemaJsonSchema, basicConfigFields),
            uiSchema: this._filterConfigFields(configSchemaData.uiSchema, basicConfigFields),
            formData: this.schema2ConfigFormDataConverter(editFieldData, this._filterConfigFields(configSchemaData.formData, basicConfigFields)),
            onChange: function onChange(formData) {
              _this6.handleUpdateFieldSchemaData(formData);
            }
          });
          advanceConfigXForm = /*#__PURE__*/_react["default"].createElement(_index3["default"], {
            customInterfaces: customInterfaces,
            customGateway: customGateway,
            customUploadRequest: customUploadRequest,
            onImagePreview: onImagePreview,
            locale: locale,
            labelType: "vertical",
            alignType: "vertical",
            registerWidgets: xformCustomWidgets,
            disabled: !this.props.systemFieldEditable && editFieldData.fieldType === 'system' // “系统”类型字段不能更改配置
            ,
            jsonSchema: this._filterJSONSchemaConfigFields(configSchemaJsonSchema, advanceConfigFields),
            uiSchema: this._filterConfigFields(configSchemaData.uiSchema, advanceConfigFields),
            formData: this.schema2ConfigFormDataConverter(editFieldData, this._filterConfigFields(configSchemaData.formData, advanceConfigFields)),
            onChange: function onChange(formData) {
              _this6.handleUpdateFieldSchemaData(formData);
            }
          }); // 获取字段业务属性配置xform

          xformBizData.map(function (field) {
            bizConfigJsonSchema = Object.assign({}, bizConfigJsonSchema, field.jsonSchema);
            bizConfigUiSchema = Object.assign({}, bizConfigUiSchema, field.uiSchema);
            bizConfigFormData = Object.assign({}, bizConfigFormData, field.formData);
          });
          bizConfigJsonSchema = {
            title: '',
            type: 'object',
            properties: bizConfigJsonSchema
          }; // 从当前编辑的field数据中提取出bizData作为bizConfigXForm的formData，如果editFieldData中有些业务属性字段没有，默认使用xformBizData中的默认formData值

          if (typeof editFieldData.bizData !== 'undefined') {
            bizConfigFormData = Object.assign({}, bizConfigFormData, editFieldData.bizData[editFieldData.code]);
          }

          bizConfigXForm = /*#__PURE__*/_react["default"].createElement(_index3["default"], {
            customInterfaces: customInterfaces,
            customGateway: customGateway,
            customUploadRequest: customUploadRequest,
            onImagePreview: onImagePreview,
            locale: locale,
            labelType: "vertical",
            alignType: "vertical",
            registerWidgets: xformCustomWidgets,
            jsonSchema: bizConfigJsonSchema,
            uiSchema: bizConfigUiSchema,
            formData: bizConfigFormData,
            onChange: function onChange(formData) {
              _this6.handleUpdateBizData(formData);
            }
          }); // 获取“高级设置”数据（系统字段类型不展示这部分内容）

          if (editFieldData.fieldType !== 'system') {
            // 只有有选项配置的字段才有“字段级联”按钮
            if (hasShowConfigButton) {
              fieldShowConfigButton = /*#__PURE__*/_react["default"].createElement(_antd.Button, {
                type: "primary",
                onClick: this.handleFieldShowConfigModalOpen
              }, messages[(0, _localeMessages.getMessageId)('fieldConfigShowConfigTitle')]);
            } else {
              fieldShowConfigButton = '';
            }

            cascadeConfig = /*#__PURE__*/_react["default"].createElement("div", {
              className: "cascade-config"
            }, /*#__PURE__*/_react["default"].createElement("div", {
              className: "cascade-config-panel"
            }, fieldShowConfigButton, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
              type: "primary",
              onClick: this.handleFieldUpdateModalOpen
            }, messages[(0, _localeMessages.getMessageId)('fieldConfigUpdateFieldConfigTitle')]), /*#__PURE__*/_react["default"].createElement(_antd.Popconfirm, {
              title: messages[(0, _localeMessages.getMessageId)('fieldConfigClearPopconfirmTitle')],
              onConfirm: this.handleClearAll,
              getPopupContainer: popupContainer
            }, /*#__PURE__*/_react["default"].createElement("a", {
              href: "#"
            }, messages[(0, _localeMessages.getMessageId)('fieldConfigClearConfigTitle')]))));
          } // 获取“下拉框选项设置”数据（系统类型字段不展示这部分内容）


          if (hasItemSetting && editFieldData.fieldType !== 'system') {
            listItemConfig = /*#__PURE__*/_react["default"].createElement(_fieldOptionList["default"], {
              globalConfig: globalConfig,
              messages: messages,
              registerWidgets: registerWidgets,
              updateFieldDataHandler: updateFieldDataHandler,
              editFieldData: editFieldData,
              xformOptionBizData: xformOptionBizData,
              customInterfaces: customInterfaces,
              customGateway: customGateway,
              customUploadRequest: customUploadRequest,
              onImagePreview: onImagePreview,
              locale: locale
            });
          }

          if (hasDBOperateButton) {
            groupDBOperateView = /*#__PURE__*/_react["default"].createElement(_group["default"], {
              fields: fields,
              editFieldData: editFieldData,
              dispatch: dispatch,
              operateDBGroup: operateDBGroup,
              user: user,
              updateFields: function updateFields(code) {
                return _this6.props.updateFieldsApp(code);
              },
              commonFields: commonFields
            });
          }
        } else {
          console.warn('[xform-editor]未在configSchema中找到对应的类型配置');
        }
      }

      var _this$state2 = this.state,
          basicBlockFold = _this$state2.basicBlockFold,
          advancedBlockFold = _this$state2.advancedBlockFold,
          optionBlockFold = _this$state2.optionBlockFold,
          cascadeBlockFold = _this$state2.cascadeBlockFold,
          relevanceBlockFold = _this$state2.relevanceBlockFold,
          dboperateBlockFold = _this$state2.dboperateBlockFold,
          showConfigModalVisible = _this$state2.showConfigModalVisible,
          fieldShowConfig = _this$state2.fieldShowConfig,
          currentEditShowOptionCode = _this$state2.currentEditShowOptionCode,
          updateConfigModalVisible = _this$state2.updateConfigModalVisible,
          updateConfigType = _this$state2.updateConfigType,
          dataSourceFieldList = _this$state2.dataSourceFieldList;
      var beneathFields = fieldShowConfig.beneathFields;
      var showConfig = fieldShowConfig.showConfig;
      var updateFieldConfigModal4Relevance = updateConfigType == 'relevance';
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "app-xform-builder-field-config-wrapper"
      }, function () {
        if (editFieldData !== null) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'field-config-block-item': true,
              fold: basicBlockFold
            })
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-header",
            onClick: function onClick() {
              _this6.toggleBlockFoldChange('basic');
            }
          }, /*#__PURE__*/_react["default"].createElement("i", {
            className: "xform-iconfont expand-icon"
          }, "\uE8EC"), /*#__PURE__*/_react["default"].createElement("span", null, messages[(0, _localeMessages.getMessageId)('fieldConfigBoxBasicTitle')])), !basicBlockFold && /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-content"
          }, " ", basicConfigXForm, " ")), listItemConfig !== '' && /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'field-config-block-item': true,
              fold: optionBlockFold
            })
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-header",
            onClick: function onClick() {
              _this6.toggleBlockFoldChange('option');
            }
          }, /*#__PURE__*/_react["default"].createElement("i", {
            className: "xform-iconfont expand-icon"
          }, "\uE8EC"), /*#__PURE__*/_react["default"].createElement("span", null, messages[(0, _localeMessages.getMessageId)('fieldConfigBoxOptionTitle')])), !optionBlockFold && /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-content"
          }, " ", listItemConfig, " ")), /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'field-config-block-item': true,
              fold: advancedBlockFold
            })
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-header",
            onClick: function onClick() {
              _this6.toggleBlockFoldChange('advance');
            }
          }, /*#__PURE__*/_react["default"].createElement("i", {
            className: "xform-iconfont expand-icon"
          }, "\uE8EC"), /*#__PURE__*/_react["default"].createElement("span", null, messages[(0, _localeMessages.getMessageId)('fieldConfigBoxAdvanceTitle')])), !advancedBlockFold && /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-content"
          }, advanceConfigXForm, bizConfigXForm)), editFieldData.fieldType !== 'system' && /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'field-config-block-item': true,
              fold: cascadeBlockFold
            })
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-header",
            onClick: function onClick() {
              _this6.toggleBlockFoldChange('cascade');
            }
          }, /*#__PURE__*/_react["default"].createElement("i", {
            className: "xform-iconfont expand-icon"
          }, "\uE8EC"), /*#__PURE__*/_react["default"].createElement("span", null, messages[(0, _localeMessages.getMessageId)('fieldConfigBoxCascadeTitle')])), !cascadeBlockFold && /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-content"
          }, " ", cascadeConfig, " ")), editFieldData.type == "Calculate" && /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'field-config-block-item': true,
              fold: relevanceBlockFold
            })
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-header",
            onClick: function onClick() {
              _this6.toggleBlockFoldChange('relevance');
            }
          }, /*#__PURE__*/_react["default"].createElement("i", {
            className: "xform-iconfont expand-icon"
          }, "\uE8EC"), /*#__PURE__*/_react["default"].createElement("span", null, messages[(0, _localeMessages.getMessageId)('fieldConfigBoxRelevanceTitle')])), !relevanceBlockFold && /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-content"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "cascade-config"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "cascade-config-panel"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              return _this6.handleFieldUpdateModalOpen('relevance');
            }
          }, messages[(0, _localeMessages.getMessageId)('fieldConfigControlRelatedTitle')]))))), hasDBOperateButton && /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'field-config-block-item': true,
              fold: dboperateBlockFold
            })
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-header",
            onClick: function onClick() {
              _this6.toggleBlockFoldChange('dboperate');
            }
          }, /*#__PURE__*/_react["default"].createElement("i", {
            className: "xform-iconfont expand-icon"
          }, "\uE8EC"), /*#__PURE__*/_react["default"].createElement("span", null, "\u4E1A\u52A1\u63A7\u4EF6")), !dboperateBlockFold && /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-config-block-content"
          }, " ", groupDBOperateView, " ")));
        } else {
          return emptyPlaceholder || /*#__PURE__*/_react["default"].createElement("div", {
            className: "empty-box"
          }, /*#__PURE__*/_react["default"].createElement(_icons.InboxOutlined, {
            className: "empty-icon"
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "empty-tip"
          }, messages[(0, _localeMessages.getMessageId)('fieldConfigEmptyTip')]));
        }
      }(), /*#__PURE__*/_react["default"].createElement(_reactIf.If, {
        condition: showConfigModalVisible
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.Then, null, /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: messages[(0, _localeMessages.getMessageId)('showConfigModalTitle')],
        visible: showConfigModalVisible,
        onOk: this.handleShowConfigModalConfirm,
        onCancel: function onCancel() {
          _this6.setState({
            showConfigModalVisible: false
          });
        },
        footer: [/*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "primary",
          onClick: this.handleShowConfigModalConfirm
        }, messages[(0, _localeMessages.getMessageId)('showConfigModalConfirm')]), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "ghost",
          onClick: function onClick() {
            _this6.setState({
              showConfigModalVisible: false
            });
          }
        }, messages[(0, _localeMessages.getMessageId)('showConfigModalCancel')]), /*#__PURE__*/_react["default"].createElement(_antd.Popconfirm, {
          title: messages[(0, _localeMessages.getMessageId)('showConfigModalClearConfirmTitle')],
          onConfirm: function onConfirm() {
            _this6.handleClearFieldShow();

            _antd.message.success(messages[(0, _localeMessages.getMessageId)('showConfigModalClearSuccessTip')]);

            _this6.setState({
              showConfigModalVisible: false
            });
          },
          getPopupContainer: popupContainer
        }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "ghost"
        }, messages[(0, _localeMessages.getMessageId)('showConfigModalClear')]))],
        maskClosable: false,
        wrapClassName: "app-xform-builder-show-config-modal",
        getContainer: popupContainer
      }, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
        gutter: 16
      }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
        span: 8
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: "show-config-title"
      }, messages[(0, _localeMessages.getMessageId)('showConfigModalOptionTitle')]), /*#__PURE__*/_react["default"].createElement("div", {
        className: "show-config-option-list"
      }, /*#__PURE__*/_react["default"].createElement("ul", null, showConfig.map(function (showConfigItem, index) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: (0, _classnames["default"])({
            'show-config-option-item': true,
            current: currentEditShowOptionCode === showConfigItem.code
          }),
          "data-optioncode": showConfigItem.code,
          onClick: _this6.handleEditOptionChange,
          key: "option-item-".concat(showConfigItem.code, "-").concat(index)
        }, showConfigItem.name);
      })))), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
        span: 16
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: "show-config-title"
      }, messages[(0, _localeMessages.getMessageId)('showConfigModalShowOptionTitle')]), /*#__PURE__*/_react["default"].createElement("div", {
        className: "show-field-list"
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.If, {
        condition: beneathFields.length > 0
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.Then, null, /*#__PURE__*/_react["default"].createElement("ul", null, beneathFields.map(function (field, index) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: "show-field-item",
          key: "field-item-".concat(field.code, "-").concat(index),
          "data-fieldcode": field.code,
          onClick: _this6.toggleShowFieldChange
        }, /*#__PURE__*/_react["default"].createElement("label", null, field.label), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
          className: "checkbox",
          checked: _this6.judgeCheckStatus(field.code)
        }));
      }))), /*#__PURE__*/_react["default"].createElement(_reactIf.Else, null, function () {
        return /*#__PURE__*/_react["default"].createElement("p", {
          className: "empty"
        }, messages[(0, _localeMessages.getMessageId)('showConfigModalEmptyShowOption')]);
      })))))))), /*#__PURE__*/_react["default"].createElement(_reactIf.If, {
        condition: updateConfigModalVisible
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.Then, null, /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: messages[(0, _localeMessages.getMessageId)(updateFieldConfigModal4Relevance ? 'updateFieldConfigRelevanceModalTitle' : 'updateFieldConfigModalTitle')],
        visible: updateConfigModalVisible,
        maskClosable: false,
        onOk: this.updateDataSourceConfigConfirm,
        onCancel: function onCancel() {
          _this6.setState({
            updateConfigModalVisible: false,
            updateConfigType: null
          });
        },
        footer: [/*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "primary",
          onClick: this.updateDataSourceConfigConfirm
        }, messages[(0, _localeMessages.getMessageId)('updateFieldConfigModalConfirm')]), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "ghost",
          onClick: function onClick() {
            _this6.setState({
              updateConfigModalVisible: false,
              updateConfigType: null
            });
          }
        }, messages[(0, _localeMessages.getMessageId)('updateFieldConfigModalCancel')]), updateFieldConfigModal4Relevance ? /*#__PURE__*/_react["default"].createElement(_antd.Popconfirm, {
          title: messages[(0, _localeMessages.getMessageId)(updateFieldConfigModal4Relevance ? 'updateFieldConfigRelevanceModalClearConfirmTitle' : 'updateFieldConfigModalClearConfirmTitle')],
          onConfirm: function onConfirm() {
            _this6.handleClearFieldUpdate();

            _antd.message.success(messages[(0, _localeMessages.getMessageId)('updateFieldConfigModalClearSuccessTip')]);

            _this6.setState({
              updateConfigModalVisible: false,
              updateConfigType: null
            });
          },
          getPopupContainer: popupContainer
        }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "ghost"
        }, messages[(0, _localeMessages.getMessageId)(updateFieldConfigModal4Relevance ? 'updateFieldConfigRelevanceModalClear' : 'updateFieldConfigModalClear')])) : ''],
        wrapClassName: "app-xform-builder-update-dataSource-config-modal",
        getContainer: popupContainer
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: "update-dataSource-config-title"
      }, messages[(0, _localeMessages.getMessageId)('updateFieldConfigModalOption')]), /*#__PURE__*/_react["default"].createElement("div", {
        className: "update-dataSource-list"
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.If, {
        condition: dataSourceFieldList.length > 0
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.Then, null, /*#__PURE__*/_react["default"].createElement("ul", null, dataSourceFieldList.map(function (field, index) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: "update-dataSource-item",
          key: "update-dataSource-item-".concat(field.code, "-").concat(index),
          "data-fieldcode": field.code,
          onClick: _this6.toggleUpdateDataSourceChange
        }, /*#__PURE__*/_react["default"].createElement("label", null, field.label), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
          className: "checkbox",
          checked: _this6.judgeUpdateDataSourceCheckStatus(field.code)
        }));
      }))), /*#__PURE__*/_react["default"].createElement(_reactIf.Else, null, function () {
        return /*#__PURE__*/_react["default"].createElement("p", {
          className: "empty"
        }, messages[(0, _localeMessages.getMessageId)(updateFieldConfigModal4Relevance ? 'updateFieldConfigRelevanceModalEmptyOption' : 'updateFieldConfigModalEmptyOption')]);
      })))))));
    }
  }]);

  return FieldConfig;
}(_react.Component);

_defineProperty(FieldConfig, "propTypes", {
  globalConfig: _propTypes["default"].shape({
    codeEditable: _propTypes["default"].bool.isRequired,
    fieldPreviewable: _propTypes["default"].bool.isRequired
  }).isRequired,
  messages: _propTypes["default"].object.isRequired,
  popupContainer: _propTypes["default"].func.isRequired,
  xformBizData: _propTypes["default"].array.isRequired,
  xformOptionBizData: _propTypes["default"].array.isRequired,
  fields: _propTypes["default"].array.isRequired,
  emptyPlaceholder: _propTypes["default"].element,
  updateFieldDataHandler: _propTypes["default"].func.isRequired,
  updateFieldItemHandler: _propTypes["default"].func.isRequired,
  systemFieldEditable: _propTypes["default"].bool,
  bpmnNodes: _propTypes["default"].array
});

_defineProperty(FieldConfig, "defaultProps", {
  systemFieldEditable: false
});

var _default = FieldConfig;
exports["default"] = _default;