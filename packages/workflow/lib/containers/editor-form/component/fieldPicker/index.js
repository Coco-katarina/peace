"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _classnames = _interopRequireDefault(require("classnames"));

var _localeMessages = require("../../i18n/localeMessages");

var CONST = _interopRequireWildcard(require("../../common/const"));

var _index = _interopRequireDefault(require("../../configSchema/index"));

var _index2 = _interopRequireDefault(require("../../customFieldSchema/index"));

var _util = require("../../common/util");

var _commonFieldOption = _interopRequireDefault(require("./commonFieldOption"));

var _customFieldOption = _interopRequireDefault(require("./customFieldOption"));

var _systemFieldOption = _interopRequireDefault(require("./systemFieldOption"));

var _excluded = ["children"],
    _excluded2 = ["children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
 * xform-builder左侧“字段选择”
 * @props: platform（选中的平台，laptop表示PC端、mobile表示移动端） 
 * commonFields（通用field数据） 
 * fields（生效field数据，主要用于做添加字段code重复判断） 
 * xformBizData（字段业务属性配置数据，主要用于构造自定义字段的fieldData）
 * xformOptionBizData（字段选项业务属性配置数据）  
 * addFieldHandler（添加生效字段处理器）
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
})("bb840b3e3031890b9d99ded5909fa73a", ".app-xform-builder-field-picker-wrapper{padding:8px}.app-xform-builder-field-picker-wrapper .field-search-box{padding:8px 13px}.app-xform-builder-field-picker-wrapper .field-search-box .ant-input-suffix{right:20px}.app-xform-builder-field-picker-wrapper .common-field-template,.app-xform-builder-field-picker-wrapper .custom-field-template{border-bottom:1px solid #eee}.app-xform-builder-field-picker-wrapper .common-field-template .field-panel,.app-xform-builder-field-picker-wrapper .custom-field-template .field-panel{height:40px;padding:10px 16px;color:rgba(0,0,0,.85);cursor:pointer}.app-xform-builder-field-picker-wrapper .common-field-template .field-panel .icon,.app-xform-builder-field-picker-wrapper .custom-field-template .field-panel .icon{font-size:12px;margin-right:10px;display:inline-block}.app-xform-builder-field-picker-wrapper .common-field-template .field-panel .template-title,.app-xform-builder-field-picker-wrapper .custom-field-template .field-panel .template-title{line-height:20px;margin-bottom:12px;font-size:14px;font-weight:500}.app-xform-builder-field-picker-wrapper .common-field-template .field-panel.fold .icon,.app-xform-builder-field-picker-wrapper .custom-field-template .field-panel.fold .icon{transform:rotate(270deg)}.app-xform-builder-field-picker-wrapper .common-field-template .template-list li,.app-xform-builder-field-picker-wrapper .custom-field-template .template-list li{color:rgba(0,0,0,.65);height:40px;cursor:pointer}.app-xform-builder-field-picker-wrapper .common-field-template .template-list li .list-item,.app-xform-builder-field-picker-wrapper .custom-field-template .template-list li .list-item{padding:10px 0;white-space:nowrap;border-bottom:1px solid #eee;text-overflow:ellipsis;font-size:13px;line-height:20px;height:40px}.app-xform-builder-field-picker-wrapper .common-field-template .template-list li .list-item .template-icon,.app-xform-builder-field-picker-wrapper .custom-field-template .template-list li .list-item .template-icon{margin-right:10px;font-size:13px;vertical-align:middle}.app-xform-builder-field-picker-wrapper .common-field-template .template-list li:last-child .list-item,.app-xform-builder-field-picker-wrapper .custom-field-template .template-list li:last-child .list-item{border-bottom:none}.app-xform-builder-field-picker-wrapper .common-field-template .template-list li:hover,.app-xform-builder-field-picker-wrapper .custom-field-template .template-list li:hover{background:#f0faff}.app-xform-builder-field-picker-wrapper .empty-box{text-align:center;margin-top:50%;color:rgba(0,0,0,.45);padding:10px 0}.app-xform-builder-field-picker-wrapper .empty-box .empty-icon{font-size:20px;margin-right:10px;vertical-align:middle}.app-xform-builder-field-picker-wrapper .empty-box .empty-tip{font-size:12px}");

var Search = _antd.Input.Search;

var FieldPicker = /*#__PURE__*/function (_PureComponent) {
  _inherits(FieldPicker, _PureComponent);

  var _super = _createSuper(FieldPicker);

  function FieldPicker() {
    var _this;

    _classCallCheck(this, FieldPicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleKeywordSearch = _this.handleKeywordSearch.bind(_assertThisInitialized(_this));
    _this.handleKeywordInputChange = _this.handleKeywordInputChange.bind(_assertThisInitialized(_this));
    _this.handleSystemFieldsFoldChange = _this.handleSystemFieldsFoldChange.bind(_assertThisInitialized(_this));
    _this.handleCommonFieldsFoldChange = _this.handleCommonFieldsFoldChange.bind(_assertThisInitialized(_this));
    _this.handleCustomFieldsFoldChange = _this.handleCustomFieldsFoldChange.bind(_assertThisInitialized(_this));
    _this.handleAddSystemField = _this.handleAddSystemField.bind(_assertThisInitialized(_this));
    _this.handleAddCommonField = _this.handleAddCommonField.bind(_assertThisInitialized(_this));
    _this.generateFieldDataFormSystemType = _this.generateFieldDataFormSystemType.bind(_assertThisInitialized(_this));
    _this.generateFieldDataFormCommonType = _this.generateFieldDataFormCommonType.bind(_assertThisInitialized(_this));
    _this.generateFieldDataFromCustomType = _this.generateFieldDataFromCustomType.bind(_assertThisInitialized(_this));
    _this.handleAddCustomField = _this.handleAddCustomField.bind(_assertThisInitialized(_this));
    _this.state = {
      keyword: '',
      // 可用字段搜索关键词
      searchKeyword: '',
      // 用于搜索的关键词
      commonPanelFold: false,
      // 业务字段是否折叠
      customPanelFold: false,
      // 自定义字段是否折叠
      systemPanelFold: false //系统字段是否折叠

    };
    return _this;
  } // 搜索可用字段


  _createClass(FieldPicker, [{
    key: "handleKeywordSearch",
    value: function handleKeywordSearch(keyword) {
      this.setState({
        searchKeyword: keyword
      });
    }
  }, {
    key: "handleKeywordInputChange",
    value: function handleKeywordInputChange(event) {
      var value = event.currentTarget.value;
      this.setState({
        keyword: value
      });
    } // 业务字段、自定义字段区域折叠状态变化

  }, {
    key: "handleSystemFieldsFoldChange",
    value: function handleSystemFieldsFoldChange() {
      var systemPanelFold = this.state.systemPanelFold;
      this.setState({
        systemPanelFold: !systemPanelFold
      });
    }
  }, {
    key: "handleCommonFieldsFoldChange",
    value: function handleCommonFieldsFoldChange() {
      var commonPanelFold = this.state.commonPanelFold;
      this.setState({
        commonPanelFold: !commonPanelFold
      });
    }
  }, {
    key: "handleCustomFieldsFoldChange",
    value: function handleCustomFieldsFoldChange() {
      var customPanelFold = this.state.customPanelFold;
      this.setState({
        customPanelFold: !customPanelFold
      });
    } // 添加“通用模板”字段

  }, {
    key: "handleAddCommonField",
    value: function handleAddCommonField(event) {
      var code = event.currentTarget.getAttribute('data-code');
      var fieldData = this.generateFieldDataFormCommonType(code);

      if (fieldData !== null) {
        this.props.addFieldHandler(fieldData);
      }
    }
  }, {
    key: "handleAddSystemField",
    value: function handleAddSystemField(event) {
      var code = event.currentTarget.getAttribute('data-code');
      var fieldData = this.generateFieldDataFormSystemType(code);

      if (fieldData !== null) {
        this.props.addFieldHandler(fieldData);
      }
    } // 添加“系统字段”

  }, {
    key: "generateFieldDataFormSystemType",
    value: function generateFieldDataFormSystemType(code) {
      var messages = this.props.messages;
      var isDuplicateCode = false;
      this.props.fields.map(function (field) {
        if (field.code === code) {
          isDuplicateCode = true;
        }
      });

      if (isDuplicateCode) {
        _antd.message.error(messages[(0, _localeMessages.getMessageId)('fieldPickerDeplicateCodeErrorTip')] + code);

        return null;
      }

      var fieldData = {};
      this.props.systemFields.map(function (systemField) {
        if (systemField.code === code) {
          fieldData = systemField;
        }
      }); //处理 分组拆分

      var newFielData = null;

      if ((fieldData.type === 'group' || fieldData.type === 'Table') && fieldData.children && Array.isArray(fieldData.children)) {
        var _fieldData = fieldData,
            children = _fieldData.children,
            other = _objectWithoutProperties(_fieldData, _excluded);

        newFielData = [];
        newFielData.push(other);
        children.map(function (field) {
          newFielData.push(field);
        });
      } else {
        newFielData = fieldData;
      }

      return newFielData;
    } // 添加“通用字段”

  }, {
    key: "generateFieldDataFormCommonType",
    value: function generateFieldDataFormCommonType(code) {
      var messages = this.props.messages;
      var isDuplicateCode = false;
      this.props.fields.map(function (field) {
        if (field.code === code) {
          isDuplicateCode = true;
        }
      });

      if (isDuplicateCode) {
        _antd.message.error(messages[(0, _localeMessages.getMessageId)('fieldPickerDeplicateCodeErrorTip')] + code);

        return null;
      }

      var fieldData = {};
      this.props.commonFields.map(function (commonField) {
        if (commonField.code === code) {
          fieldData = commonField;
        }
      }); //处理 通用模板 分组拆分

      var newFielData = null;

      if ((fieldData.type === 'group' || fieldData.type === 'Table') && fieldData.children && Array.isArray(fieldData.children)) {
        var _fieldData2 = fieldData,
            children = _fieldData2.children,
            other = _objectWithoutProperties(_fieldData2, _excluded2);

        newFielData = [];
        newFielData.push(other);
        children.map(function (field) {
          newFielData.push(field);
        }); // //不可自增
        // if(jsonSchema[code] && jsonSchema[code].type === 'object'){
        //     if(jsonSchema[code].properties && typeof jsonSchema[code].properties ==='object'){
        //     }
        // }
        // //如果是可自增的array
        // if(jsonSchema[code] && jsonSchema[code].type === 'array'){
        // }
      } else {
        newFielData = fieldData;
      }

      return newFielData;
    } // 添加“自定义字段”，需要随机生成code

  }, {
    key: "generateFieldDataFromCustomType",
    value: function generateFieldDataFromCustomType(type) {
      var messages = this.props.messages;
      var supportFieldList = this.props.supportFieldList;
      var registerWidgets = this.props.registerWidgets;
      var code;
      var isDuplicateCode = true;
      var fieldData;

      var schema = _index2["default"].getSchema(messages, registerWidgets, supportFieldList);

      code = _util.util.getRandomString(10);
      isDuplicateCode = false;
      this.props.fields.map(function (field) {
        if (field.code === code) {
          isDuplicateCode = true;
        }
      });

      if (isDuplicateCode) {
        _antd.message.error(messages[(0, _localeMessages.getMessageId)('fieldPickerDeplicateCodeErrorTip')] + code);
      } else {
        fieldData = this._fieldDataGenerator(schema[type], code);
        return fieldData;
      }
    } // 在字段最后一项添加

  }, {
    key: "handleAddCustomField",
    value: function handleAddCustomField(event) {
      var type = event.currentTarget.getAttribute('data-type');
      var fieldData = this.generateFieldDataFromCustomType(type);
      this.props.addFieldHandler(fieldData);
    } // 根据随机生成的code、xformBizData从customFieldSchema生成生效字段的fieldData

  }, {
    key: "_fieldDataGenerator",
    value: function _fieldDataGenerator(fieldData, code) {
      var xformBizData = this.props.xformBizData;
      var xformOptionBizData = this.props.xformOptionBizData; // 这里要注意对customFieldSchema做clone，否则会出现修改schema配置本身

      var resultData = Object.assign({}, fieldData);
      var bizData = {},
          optionBizData = {};
      var resultBizData, index;
      xformBizData.map(function (item) {
        bizData = Object.assign({}, bizData, item.formData);
      });
      xformOptionBizData.map(function (item) {
        optionBizData = Object.assign({}, optionBizData, item.formData);
      });

      if (fieldData.jsonSchema["enum"] && fieldData.jsonSchema["enum"].length >= 0 && fieldData.jsonSchema.enumNames && fieldData.jsonSchema.enumNames.length >= 0) {
        var enums = fieldData.jsonSchema["enum"];
        var enumNames = fieldData.jsonSchema.enumNames;
        resultBizData = Object.assign({}, bizData, _defineProperty({}, CONST.XFORM_OPTION_BIZ_NAME, {}));

        for (index = 0; index < enums.length; index++) {
          resultBizData[CONST.XFORM_OPTION_BIZ_NAME][enums[index]] = Object.assign({}, optionBizData, {
            name: enumNames[index],
            code: enums[index]
          });
        }
      } else {
        resultBizData = bizData;
      }

      resultData.code = code;
      resultData.jsonSchema = _defineProperty({}, code, fieldData.jsonSchema);
      resultData.uiSchema = _defineProperty({}, code, fieldData.uiSchema);
      resultData.formData = _defineProperty({}, code, fieldData.formData);
      resultData.bizData = _defineProperty({}, code, resultBizData);
      return resultData;
    } // 根据字段的label值与关键词的前端匹配来筛选配置列表

  }, {
    key: "_filterListItemByLabel",
    value: function _filterListItemByLabel(list, keyword) {
      return list.filter(function (listItem) {
        return listItem.label.indexOf(keyword) > -1;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          messages = _this$props.messages,
          platform = _this$props.platform,
          supportFieldList = _this$props.supportFieldList,
          registerWidgets = _this$props.registerWidgets,
          emptyPlaceholder = _this$props.emptyPlaceholder,
          systemFields = _this$props.systemFields,
          commonFields = _this$props.commonFields;
      var _this$state = this.state,
          keyword = _this$state.keyword,
          searchKeyword = _this$state.searchKeyword,
          commonPanelFold = _this$state.commonPanelFold,
          customPanelFold = _this$state.customPanelFold,
          systemPanelFold = _this$state.systemPanelFold;
      var configFields = [];
      var configValue, configPlatform; // 遍历configSchema

      var configSchema = _index["default"].getDefaultConfig(messages, registerWidgets, supportFieldList);

      Object.keys(configSchema).map(function (key) {
        configValue = configSchema[key];
        configPlatform = configValue.platform || []; // 根据当前用户选择的配置端来过滤出来支持的配置字段类型

        if (_util.util._isInConfigPlatform(configPlatform, platform)) {
          configFields.push({
            icon: configValue.icon,
            label: configValue.label,
            type: key
          });
        }
      }); // 根据关键词进行列表选项过滤

      var filterSystemFields = this._filterListItemByLabel(systemFields, searchKeyword);

      var filterCommonFields = this._filterListItemByLabel(commonFields, searchKeyword);

      var filterCustomFields = this._filterListItemByLabel(configFields, searchKeyword);

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "app-xform-builder-field-picker-wrapper"
      }, /*#__PURE__*/_react["default"].createElement(Search, {
        className: "field-search-box",
        placeholder: messages[(0, _localeMessages.getMessageId)('fieldPickerKeywordSearchPlaceholder')],
        onSearch: this.handleKeywordSearch,
        value: keyword,
        onChange: this.handleKeywordInputChange
      }), function () {
        if (filterSystemFields.length <= 0 && filterCommonFields.length <= 0 && filterCustomFields.length <= 0) {
          return emptyPlaceholder || /*#__PURE__*/_react["default"].createElement("div", {
            className: "empty-box"
          }, /*#__PURE__*/_react["default"].createElement(_icons.InboxOutlined, {
            className: "empty-icon"
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "empty-tip"
          }, messages[(0, _localeMessages.getMessageId)('fieldConfigEmptyTip')]));
        } else {
          return /*#__PURE__*/_react["default"].createElement("div", null, filterSystemFields.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
            className: "common-field-template"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'field-panel': true,
              fold: systemPanelFold
            }),
            onClick: _this2.handleSystemFieldsFoldChange
          }, /*#__PURE__*/_react["default"].createElement("i", {
            className: "xform-iconfont icon"
          }, "\uE8EC"), /*#__PURE__*/_react["default"].createElement("span", {
            className: "template-title"
          }, messages[(0, _localeMessages.getMessageId)('fieldPickerSystemTitle')])), !systemPanelFold && /*#__PURE__*/_react["default"].createElement("ul", {
            className: "template-list"
          }, filterSystemFields.map(function (field, index) {
            return /*#__PURE__*/_react["default"].createElement("li", {
              key: field.code,
              className: "common-type"
            }, /*#__PURE__*/_react["default"].createElement(_systemFieldOption["default"], {
              index: index,
              field: field,
              addSystemFieldHandler: _this2.handleAddSystemField,
              generateFieldData: _this2.generateFieldDataFormSystemType
            }));
          }))), filterCommonFields.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
            className: "common-field-template"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'field-panel': true,
              fold: commonPanelFold
            }),
            onClick: _this2.handleCommonFieldsFoldChange
          }, /*#__PURE__*/_react["default"].createElement("i", {
            className: "xform-iconfont icon"
          }, "\uE8EC"), /*#__PURE__*/_react["default"].createElement("span", {
            className: "template-title"
          }, messages[(0, _localeMessages.getMessageId)('fieldPickerCommonTitle')])), !commonPanelFold && /*#__PURE__*/_react["default"].createElement("ul", {
            className: "template-list"
          }, filterCommonFields.map(function (field, index) {
            return /*#__PURE__*/_react["default"].createElement("li", {
              key: field.code,
              className: "common-type"
            }, /*#__PURE__*/_react["default"].createElement(_commonFieldOption["default"], {
              index: index,
              field: field,
              addCommonFieldHandler: _this2.handleAddCommonField,
              generateFieldData: _this2.generateFieldDataFormCommonType
            }));
          }))), filterCustomFields.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
            className: "custom-field-template"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'field-panel': true,
              fold: customPanelFold
            }),
            onClick: _this2.handleCustomFieldsFoldChange
          }, /*#__PURE__*/_react["default"].createElement("i", {
            className: "xform-iconfont icon"
          }, "\uE8EC"), /*#__PURE__*/_react["default"].createElement("span", {
            className: "template-title"
          }, messages[(0, _localeMessages.getMessageId)('fieldPickerCustomTitle')])), !customPanelFold && /*#__PURE__*/_react["default"].createElement("ul", {
            className: "template-list"
          }, filterCustomFields.map(function (field, index) {
            return /*#__PURE__*/_react["default"].createElement("li", {
              key: field.type,
              className: "template-type"
            }, /*#__PURE__*/_react["default"].createElement(_customFieldOption["default"], {
              index: index,
              field: field,
              addCustomFieldHandler: _this2.handleAddCustomField,
              generateFieldData: _this2.generateFieldDataFromCustomType
            }));
          }))));
        }
      }());
    }
  }]);

  return FieldPicker;
}(_react.PureComponent);

_defineProperty(FieldPicker, "propTypes", {
  platform: _propTypes["default"].oneOf(['laptop', 'mobile', 'both']).isRequired,
  messages: _propTypes["default"].object.isRequired,
  commonFields: _propTypes["default"].array.isRequired,
  fields: _propTypes["default"].array.isRequired,
  xformBizData: _propTypes["default"].array.isRequired,
  xformOptionBizData: _propTypes["default"].array.isRequired,
  addFieldHandler: _propTypes["default"].func.isRequired,
  emptyPlaceholder: _propTypes["default"].element
});

var _default = FieldPicker;
exports["default"] = _default;