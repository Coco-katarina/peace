"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icons = require("@ant-design/icons");

var _localeMessages = require("../../i18n/localeMessages");

var _option = _interopRequireDefault(require("./option"));

var _util = require("../../common/util");

var CONST = _interopRequireWildcard(require("../../common/const"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 字段选项配置列表
 * @props: editFieldData（编辑中的字段数据） 
 * xformOptionBizData（字段业务属性配置数据） 
 * updateFieldDataHandler（更新编辑过的editFieldData处理器）
 * @states: unfoldIndex（展开的选项）
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
})("f568afa0f926eeea5be9a45001322893", ".list-item-config .list-item-config-panel .field-option-list-item{height:auto;overflow:hidden;background-color:rgba(0,0,0,.02);border:1px solid rgba(0,0,0,.09);border-radius:4px;padding:10px 20px;position:relative;cursor:move;margin-bottom:10px}.list-item-config .list-item-config-panel .field-option-list-item .list-item-header-bar{position:relative}.list-item-config .list-item-config-panel .field-option-list-item .list-item-header-bar .sort-icon{font-size:14px;margin-right:10px;color:rgba(0,0,0,.65)}.list-item-config .list-item-config-panel .field-option-list-item .list-item-header-bar .item-title{font-size:14px}.list-item-config .list-item-config-panel .field-option-list-item .list-item-header-bar .icon-wrapper{position:absolute;top:0;right:0;font-size:14px;color:rgba(0,0,0,.45)}.list-item-config .list-item-config-panel .field-option-list-item .list-item-header-bar .icon-wrapper .delete-icon{cursor:pointer;display:inline-block}.list-item-config .list-item-config-panel .field-option-list-item .list-item-header-bar .icon-wrapper .fold-icon{cursor:pointer;margin-left:10px;display:inline-block}.list-item-config .list-item-config-panel .field-option-list-item .list-item-wrapper{margin-top:10px}.list-item-config .list-item-config-panel .field-option-list-item.fold{height:44px}.list-item-config .list-item-config-panel .field-option-list-item.fold .fold-icon{transform:rotate(180deg)}.list-item-config .list-item-config-panel .field-option-list-item:hover .delete-icon{display:inline-block}.list-item-config .list-item-config-bar{margin-top:5px}.list-item-config .list-item-config-bar .add-list-item{line-height:18px;font-size:14px;color:#1890ff}.list-item-config .list-item-config-bar .add-list-item .link-icon{margin-left:3px}");

var FieldOptionList = /*#__PURE__*/function (_PureComponent) {
  _inherits(FieldOptionList, _PureComponent);

  var _super = _createSuper(FieldOptionList);

  function FieldOptionList() {
    var _this;

    _classCallCheck(this, FieldOptionList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleAddListItem = _this.handleAddListItem.bind(_assertThisInitialized(_this));
    _this.handleDeleteListItem = _this.handleDeleteListItem.bind(_assertThisInitialized(_this));
    _this.handleListItemUpdate = _this.handleListItemUpdate.bind(_assertThisInitialized(_this));
    _this.handleItemListFoldChange = _this.handleItemListFoldChange.bind(_assertThisInitialized(_this));
    _this.handleItemMove = _this.handleItemMove.bind(_assertThisInitialized(_this));
    _this.state = {
      unfoldIndex: 0
    };
    return _this;
  }

  _createClass(FieldOptionList, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log('index component unmount');
    } // 下拉框添加选项操作，并默认展开新添加的选项

  }, {
    key: "handleAddListItem",
    value: function handleAddListItem() {
      var xformOptionBizData = this.props.xformOptionBizData;
      var messages = this.props.messages;
      var editFieldData = this.props.editFieldData;
      var code = editFieldData.code;
      var fieldData = Object.assign({}, editFieldData);
      var index,
          optionBizData = {};

      var optionFieldCode = _util.util.getRandomString(9);

      if (fieldData.jsonSchema[code].type === 'array') {
        index = fieldData.jsonSchema[code].items["enum"].length;
        fieldData.jsonSchema[code].items["enum"].push(optionFieldCode);
        fieldData.jsonSchema[code].items.enumNames.push(messages[(0, _localeMessages.getMessageId)('optionListCommonEnumName')]);
      } else {
        index = fieldData.jsonSchema[code]["enum"].length;
        fieldData.jsonSchema[code]["enum"].push(optionFieldCode);
        fieldData.jsonSchema[code].enumNames.push(messages[(0, _localeMessages.getMessageId)('optionListCommonEnumName')]);
      }

      this.setState({
        unfoldIndex: index
      });
      xformOptionBizData.map(function (item) {
        optionBizData = Object.assign({}, optionBizData, item.formData);
      }); // 添加选项的业务属性

      if (typeof fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] !== 'undefined') {
        fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][optionFieldCode] = optionBizData;
      } else {
        fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] = {};
        fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][optionFieldCode] = optionBizData;
      }

      this.props.updateFieldDataHandler(code, fieldData);
    } // 下拉框删除选项操作

  }, {
    key: "handleDeleteListItem",
    value: function handleDeleteListItem(event) {
      var editFieldData = this.props.editFieldData;
      var code = editFieldData.code;
      var fieldData = Object.assign({}, editFieldData);
      var index = event.currentTarget.getAttribute('data-index');
      var deletedOptionFieldCode;

      if (fieldData.jsonSchema[code].type === 'array') {
        deletedOptionFieldCode = fieldData.jsonSchema[code].items["enum"][index];
        fieldData.jsonSchema[code].items["enum"].splice(index, 1);
        fieldData.jsonSchema[code].items.enumNames.splice(index, 1);
      } else {
        deletedOptionFieldCode = fieldData.jsonSchema[code]["enum"][index];
        fieldData.jsonSchema[code]["enum"].splice(index, 1);
        fieldData.jsonSchema[code].enumNames.splice(index, 1);
      } // 更新fieldData中的选项业务属性（删除掉删除了的选项code值对应的业务属性）


      if (typeof fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] !== 'undefined') {
        delete fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][deletedOptionFieldCode];
      }

      this.props.updateFieldDataHandler(code, fieldData);
    } // 下拉框名称、编码更新操作

  }, {
    key: "handleListItemUpdate",
    value: function handleListItemUpdate(formData, bizData) {
      var editFieldData = this.props.editFieldData;
      var code = editFieldData.code;
      var fieldData = Object.assign({}, editFieldData);
      var index = bizData.index;
      var originalOptionFieldCode; // 替换enum和enumNames中的相应项为formData中的数据

      if (fieldData.jsonSchema[code].type === 'array') {
        originalOptionFieldCode = fieldData.jsonSchema[code].items["enum"][index];
        fieldData.jsonSchema[code].items["enum"].splice(index, 1, formData.code);
        fieldData.jsonSchema[code].items.enumNames.splice(index, 1, formData.name);
      } else {
        originalOptionFieldCode = fieldData.jsonSchema[code]["enum"][index];
        fieldData.jsonSchema[code]["enum"].splice(index, 1, formData.code);
        fieldData.jsonSchema[code].enumNames.splice(index, 1, formData.name);
      } // 更新fieldData中的选项业务属性(如果字段属性code变化，还要删除掉对应code的业务属性并重新添加)


      if (typeof fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] !== 'undefined') {
        delete fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][originalOptionFieldCode];
        fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME][formData.code] = formData;
        this.props.updateFieldDataHandler(code, fieldData);
      } else {
        fieldData.bizData[code][CONST.XFORM_OPTION_BIZ_NAME] = _defineProperty({}, formData.code, formData);
        this.props.updateFieldDataHandler(code, fieldData);
      }
    } // 下拉框选项设置展开

  }, {
    key: "handleItemListFoldChange",
    value: function handleItemListFoldChange(event) {
      var index = parseInt(event.currentTarget.getAttribute('data-index'), 10);
      var currentIndex = this.state.unfoldIndex;
      var unfoldIndex;

      if (currentIndex === index) {
        unfoldIndex = -1;
      } else {
        unfoldIndex = index;
      }

      this.setState({
        unfoldIndex: unfoldIndex
      });
    } // 下拉框选项拖拽移动处理器

  }, {
    key: "handleItemMove",
    value: function handleItemMove(dragIndex, hoverIndex) {
      var editFieldData = this.props.editFieldData;
      var code = editFieldData.code;
      var fieldData = Object.assign({}, editFieldData);
      var editFieldJsonSchema;
      var movedEnum, movedEnumName; // 注意array类型的jsonSchema数据格式多一层"items"

      if (fieldData.jsonSchema[fieldData.code].type === 'array') {
        editFieldJsonSchema = fieldData.jsonSchema[fieldData.code].items;
      } else {
        editFieldJsonSchema = fieldData.jsonSchema[fieldData.code];
      }

      movedEnum = editFieldJsonSchema["enum"][dragIndex];
      movedEnumName = editFieldJsonSchema.enumNames[dragIndex];
      editFieldJsonSchema["enum"].splice(dragIndex, 1);
      editFieldJsonSchema["enum"].splice(hoverIndex, 0, movedEnum);
      editFieldJsonSchema.enumNames.splice(dragIndex, 1);
      editFieldJsonSchema.enumNames.splice(hoverIndex, 0, movedEnumName);
      this.props.updateFieldDataHandler(code, fieldData);
      this.setState({
        unfoldIndex: hoverIndex
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          globalConfig = _this$props.globalConfig,
          editFieldData = _this$props.editFieldData,
          customInterfaces = _this$props.customInterfaces,
          customGateway = _this$props.customGateway,
          customUploadRequest = _this$props.customUploadRequest,
          onImagePreview = _this$props.onImagePreview,
          locale = _this$props.locale,
          messages = _this$props.messages,
          xformOptionBizData = _this$props.xformOptionBizData,
          registerWidgets = _this$props.registerWidgets;
      var unfoldIndex = this.state.unfoldIndex;
      var listItemData = [];
      var fieldEnumsData = [],
          fieldEnumNamesData = [];
      var index;
      var editFieldJsonSchema, optionBizData; // 注意array类型的jsonSchema数据格式多一层"items"

      if (editFieldData.jsonSchema[editFieldData.code].type === 'array') {
        editFieldJsonSchema = editFieldData.jsonSchema[editFieldData.code].items;
      } else {
        editFieldJsonSchema = editFieldData.jsonSchema[editFieldData.code];
      }

      if (typeof editFieldJsonSchema["enum"] !== 'undefined' && typeof editFieldJsonSchema.enumNames !== 'undefined') {
        fieldEnumsData = editFieldJsonSchema["enum"];
        fieldEnumNamesData = editFieldJsonSchema.enumNames;
      }

      optionBizData = editFieldData.bizData[editFieldData.code][CONST.XFORM_OPTION_BIZ_NAME];

      for (index = 0; index < fieldEnumsData.length; index++) {
        // 对于旧的schema数据，bizData里面没有options这个字段，则不处理optionBizData数据
        if (typeof optionBizData !== 'undefined') {
          listItemData.push(Object.assign({}, optionBizData[fieldEnumsData[index]], {
            name: fieldEnumNamesData[index],
            code: fieldEnumsData[index]
          }));
        } else {
          listItemData.push({
            name: fieldEnumNamesData[index],
            code: fieldEnumsData[index]
          });
        }
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "list-item-config"
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "list-item-config-panel"
      }, listItemData.map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: "option-".concat(index)
        }, /*#__PURE__*/_react["default"].createElement(_option["default"], {
          globalConfig: globalConfig,
          messages: messages,
          registerWidgets: registerWidgets,
          itemData: item,
          index: index,
          unfoldIndex: unfoldIndex,
          customInterfaces: customInterfaces,
          customGateway: customGateway,
          customUploadRequest: customUploadRequest,
          onImagePreview: onImagePreview,
          locale: locale,
          xformOptionBizData: xformOptionBizData,
          deleteListItemHandler: _this2.handleDeleteListItem,
          listItemUpdateHandler: _this2.handleListItemUpdate,
          itemListFoldChangeHandler: _this2.handleItemListFoldChange,
          itemMoveHandler: _this2.handleItemMove
        }));
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "list-item-config-bar"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "add-list-item",
        href: "#",
        onClick: this.handleAddListItem
      }, /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, {
        className: "link-icon"
      }), messages[(0, _localeMessages.getMessageId)('optionListAddButton')])));
    }
  }]);

  return FieldOptionList;
}(_react.PureComponent);

_defineProperty(FieldOptionList, "propTypes", {
  globalConfig: _propTypes["default"].shape({
    codeEditable: _propTypes["default"].bool.isRequired,
    fieldPreviewable: _propTypes["default"].bool.isRequired
  }).isRequired,
  messages: _propTypes["default"].object.isRequired,
  editFieldData: _propTypes["default"].object.isRequired,
  xformOptionBizData: _propTypes["default"].array.isRequired,
  updateFieldDataHandler: _propTypes["default"].func.isRequired
});

var _default = FieldOptionList;
exports["default"] = _default;