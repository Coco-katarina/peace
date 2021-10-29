"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../../scalable-form-antd/index"));

var _reactDnd = require("react-dnd");

var _util = require("../../common/util");

var _localeMessages = require("../../i18n/localeMessages");

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

var ItemType = CONST.DragDropItemTypes.option;
var optionDragSource = {
  beginDrag: function beginDrag(props) {
    return {
      index: props.index
    };
  }
};

var optionDragConnect = function optionDragConnect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

var optionDropTarget = {
  drop: function drop(props, monitor, component) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index; // 未拖拽出自身区域不做处理

    if (dragIndex === hoverIndex) {
      return;
    } // 获取拖拽的component的高，只有当向上（向下）拖拽超出50%时，才触发hover位置的改变


    var hoverBoundingRect = _reactDom["default"].findDOMNode(component).getBoundingClientRect();

    var hoverMiddleY = hoverBoundingRect.height / 2;
    var initialClientOffset = monitor.getInitialClientOffset();
    var clientOffset = monitor.getClientOffset();
    var hoverClientY = clientOffset.y - initialClientOffset.y;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    } // Dragging upwards


    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    } // 触发


    props.itemMoveHandler(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

var optionDropConnect = function optionDropConnect(connect, monitor) {
  return {
    isOver: monitor.isOver(),
    connectDropTarget: connect.dropTarget()
  };
};

var FieldOptionListOption = /*#__PURE__*/function (_PureComponent) {
  _inherits(FieldOptionListOption, _PureComponent);

  var _super = _createSuper(FieldOptionListOption);

  function FieldOptionListOption() {
    _classCallCheck(this, FieldOptionListOption);

    return _super.apply(this, arguments);
  }

  _createClass(FieldOptionListOption, [{
    key: "render",
    value: function render() {
      var item = this.props.itemData;
      var _this$props = this.props,
          globalConfig = _this$props.globalConfig,
          messages = _this$props.messages,
          unfoldIndex = _this$props.unfoldIndex,
          customInterfaces = _this$props.customInterfaces,
          customGateway = _this$props.customGateway,
          customUploadRequest = _this$props.customUploadRequest,
          onImagePreview = _this$props.onImagePreview,
          locale = _this$props.locale,
          index = _this$props.index,
          xformOptionBizData = _this$props.xformOptionBizData,
          deleteListItemHandler = _this$props.deleteListItemHandler,
          listItemUpdateHandler = _this$props.listItemUpdateHandler,
          itemListFoldChangeHandler = _this$props.itemListFoldChangeHandler,
          isDragging = _this$props.isDragging,
          isOver = _this$props.isOver,
          connectDragSource = _this$props.connectDragSource,
          connectDropTarget = _this$props.connectDropTarget,
          registerWidgets = _this$props.registerWidgets;
      var opacity = isDragging || isOver ? 0.2 : 1;
      var marginTop = isOver ? 10 : 0;

      var xformCustomWidgets = _util.util.getXFormCustomWidgets(registerWidgets); // 选项业务属性配置的schema


      var optionBizDataJsonSchema,
          optionBizDataUISchema,
          optionBizDataCodes = [];
      xformOptionBizData.map(function (item) {
        optionBizDataCodes.push(item.code);
        optionBizDataJsonSchema = Object.assign({}, optionBizDataJsonSchema, item.jsonSchema);
        optionBizDataUISchema = Object.assign({}, optionBizDataUISchema, item.uiSchema);
      });
      var codeUiSchema = {
        'ui:options': {
          placeholder: messages[(0, _localeMessages.getMessageId)('optionListCodePlaceholder')],
          validate: [{
            type: 'empty',
            message: messages[(0, _localeMessages.getMessageId)('optionListCodeRequire')]
          }]
        }
      }; // 配置了Code模式才能展示编码字段

      if (!globalConfig.codeEditable) {
        codeUiSchema['ui:widget'] = 'hidden';
      }

      return connectDragSource(connectDropTarget( /*#__PURE__*/_react["default"].createElement("li", {
        style: {
          opacity: opacity,
          marginTop: marginTop
        },
        "data-code": item.code,
        className: (0, _classnames["default"])({
          'field-option-list-item': true,
          fold: unfoldIndex !== index
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "list-item-header-bar"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "xform-iconfont sort-icon"
      }, "\uE786"), /*#__PURE__*/_react["default"].createElement("span", {
        className: "item-title"
      }, messages[(0, _localeMessages.getMessageId)('optionNameLabel')] + (index + 1)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "icon-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "xform-iconfont delete-icon",
        "data-index": index,
        onClick: deleteListItemHandler
      }, "\uE7C3"), /*#__PURE__*/_react["default"].createElement("i", {
        className: "xform-iconfont fold-icon",
        "data-index": index,
        onClick: itemListFoldChangeHandler
      }, "\uE610"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "list-item-wrapper"
      }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
        customInterfaces: customInterfaces,
        customGateway: customGateway,
        customUploadRequest: customUploadRequest,
        onImagePreview: onImagePreview,
        locale: locale,
        labelType: "vertical",
        alignType: "vertical",
        registerWidgets: xformCustomWidgets,
        jsonSchema: {
          title: '',
          type: 'object',
          required: ['name', 'code'],
          properties: Object.assign({}, optionBizDataJsonSchema, {
            name: {
              type: 'string',
              title: messages[(0, _localeMessages.getMessageId)('optionListNameLabel')],
              maxLength: 200
            },
            code: {
              type: 'string',
              title: messages[(0, _localeMessages.getMessageId)('optionListCodeLabel')]
            }
          })
        },
        uiSchema: Object.assign({}, optionBizDataUISchema, {
          name: {
            'ui:options': {
              placeholder: messages[(0, _localeMessages.getMessageId)('optionListNamePlaceholder')],
              validate: [{
                type: 'empty',
                message: messages[(0, _localeMessages.getMessageId)('optionListNameRequire')]
              }]
            }
          },
          code: codeUiSchema
        }),
        formData: item,
        bizData: {
          index: index
        },
        sequence: ['name', 'code'].concat(optionBizDataCodes),
        onChange: function onChange(formData, bizData) {
          listItemUpdateHandler(formData, bizData);
        }
      })))));
    }
  }]);

  return FieldOptionListOption;
}(_react.PureComponent);

_defineProperty(FieldOptionListOption, "propTypes", {
  globalConfig: _propTypes["default"].shape({
    codeEditable: _propTypes["default"].bool.isRequired,
    fieldPreviewable: _propTypes["default"].bool.isRequired
  }).isRequired,
  messages: _propTypes["default"].object.isRequired,
  itemData: _propTypes["default"].object.isRequired,
  index: _propTypes["default"].number.isRequired,
  isDragging: _propTypes["default"].bool.isRequired,
  isOver: _propTypes["default"].bool.isRequired,
  unfoldIndex: _propTypes["default"].number.isRequired,
  xformOptionBizData: _propTypes["default"].array.isRequired,
  deleteListItemHandler: _propTypes["default"].func.isRequired,
  listItemUpdateHandler: _propTypes["default"].func.isRequired,
  itemListFoldChangeHandler: _propTypes["default"].func.isRequired,
  itemMoveHandler: _propTypes["default"].func.isRequired
});

var _default = (0, _reactDnd.DropTarget)(ItemType, optionDropTarget, optionDropConnect)((0, _reactDnd.DragSource)(ItemType, optionDragSource, optionDragConnect)(FieldOptionListOption));

exports["default"] = _default;