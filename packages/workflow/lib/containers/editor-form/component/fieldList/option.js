"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reactIf = require("react-if");

var _index = _interopRequireDefault(require("../../scalable-form-antd/index"));

var _antd = require("antd");

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

var ItemTypeField = CONST.DragDropItemTypes.field;
var ItemTypePicker = CONST.DragDropItemTypes.picker;
var fieldDragSource = {
  beginDrag: function beginDrag(props) {
    return {
      index: props.index
    };
  },
  canDrag: function canDrag(props) {
    return props.draggable;
  }
};

var fieldDragConnect = function fieldDragConnect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

var fieldDropTarget = {
  drop: function drop(props, monitor, component) {
    var dragType = monitor.getItemType();
    var hoverIndex = props.index;

    switch (dragType) {
      case ItemTypeField:
        // 字段自身拖拽排序
        var dragIndex = monitor.getItem().index; // 未拖拽出自身区域不做处理

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


        props.fieldMoveHandler(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
        break;

      case ItemTypePicker:
        // 拖拽添加新的字段
        var field = monitor.getItem().field;
        props.addFieldHandler(field, hoverIndex);
        break;

      default:
        console.warn('fieldListOption的dropTarget发现不能识别的dragSource ItemType');
    }
  },
  canDrop: function canDrop(props, monitor) {
    // 只有非系统字段才能drop
    return props.fieldData.fieldType !== 'system';
  }
};

var fieldDropConnect = function fieldDropConnect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

var FieldListOption = /*#__PURE__*/function (_PureComponent) {
  _inherits(FieldListOption, _PureComponent);

  var _super = _createSuper(FieldListOption);

  function FieldListOption() {
    _classCallCheck(this, FieldListOption);

    return _super.apply(this, arguments);
  }

  _createClass(FieldListOption, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          index = _this$props.index,
          globalConfig = _this$props.globalConfig,
          platformSupport = _this$props.platformSupport,
          fieldTypeLabel = _this$props.fieldTypeLabel,
          messages = _this$props.messages,
          systemFieldEditable = _this$props.systemFieldEditable,
          fieldData = _this$props.fieldData,
          editFieldCode = _this$props.editFieldCode,
          customInterfaces = _this$props.customInterfaces,
          customGateway = _this$props.customGateway,
          customUploadRequest = _this$props.customUploadRequest,
          onImagePreview = _this$props.onImagePreview,
          locale = _this$props.locale,
          fieldListClickHandler = _this$props.fieldListClickHandler,
          deleteFieldHandler = _this$props.deleteFieldHandler,
          isDragging = _this$props.isDragging,
          isOver = _this$props.isOver,
          connectDragSource = _this$props.connectDragSource,
          connectDropTarget = _this$props.connectDropTarget,
          registerWidgets = _this$props.registerWidgets;
      var opacity = isDragging || isOver ? 0.2 : 1;
      var marginTop = isOver ? 10 : 0;

      var xformCustomWidgets = _util.util.getXFormCustomWidgets(registerWidgets);

      var listItem = '';
      var jsonSchema = {
        title: '',
        type: 'object',
        properties: fieldData.jsonSchema
      };
      var labelName = fieldData.label || '';

      if (fieldData.type == 'button') {
        labelName = fieldData.formData && fieldData.formData[fieldData.code] ? fieldData.formData[fieldData.code] : fieldTypeLabel;
      }

      switch (fieldData.fieldType) {
        case 'system':
          listItem = /*#__PURE__*/_react["default"].createElement("li", {
            style: {
              opacity: 1,
              marginTop: 0
            },
            key: fieldData.code,
            "data-code": fieldData.code,
            className: (0, _classnames3["default"])(_defineProperty({
              'preview-list-item': true,
              current: fieldData.code === editFieldCode
            }, fieldData.fieldType, true)),
            onClick: fieldListClickHandler
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "list-item-wrapper"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "list-item-header"
          }, /*#__PURE__*/_react["default"].createElement("span", {
            className: "field-type-label"
          }, fieldTypeLabel), /*#__PURE__*/_react["default"].createElement("span", {
            className: "field-label"
          }, labelName)), function () {
            if (globalConfig.fieldPreviewable && fieldData.code === editFieldCode) {
              if (platformSupport) {
                return /*#__PURE__*/_react["default"].createElement("div", {
                  className: "field-preview"
                }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
                  customInterfaces: customInterfaces,
                  customGateway: customGateway,
                  customUploadRequest: customUploadRequest,
                  onImagePreview: onImagePreview,
                  locale: locale,
                  alignType: "inline",
                  itemNumberInRow: 2,
                  noLabel: true,
                  registerWidgets: xformCustomWidgets,
                  formItemLayout: {
                    labelCol: {
                      span: 0
                    },
                    wrapperCol: {
                      span: 24
                    }
                  },
                  jsonSchema: jsonSchema,
                  uiSchema: fieldData.uiSchema,
                  formData: fieldData.formData,
                  bizData: fieldData.bizData,
                  isFieldList: true
                }));
              } else {
                return /*#__PURE__*/_react["default"].createElement("div", {
                  className: "not-support-tip"
                }, /*#__PURE__*/_react["default"].createElement(_antd.Tag, {
                  color: "#f50"
                }, messages[(0, _localeMessages.getMessageId)('fieldNotSupportTip')]));
              }
            } else {
              return null;
            }
          }(), systemFieldEditable && /*#__PURE__*/_react["default"].createElement("i", {
            type: "delete",
            className: "xform-icon delete-icon",
            "data-code": fieldData.code,
            onClick: deleteFieldHandler
          }, "\uE600")));
          break;

        case 'common':
        case 'custom':
          listItem = /*#__PURE__*/_react["default"].createElement("li", {
            style: {
              opacity: opacity,
              marginTop: marginTop
            },
            key: fieldData.code,
            "data-code": fieldData.code,
            className: (0, _classnames3["default"])(_defineProperty({
              'preview-list-item': true,
              current: fieldData.code === editFieldCode
            }, fieldData.fieldType, true)),
            onClick: fieldListClickHandler
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "list-item-wrapper"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "field-index-number"
          }, index + 1), /*#__PURE__*/_react["default"].createElement("div", {
            className: "list-item-header"
          }, /*#__PURE__*/_react["default"].createElement("span", {
            className: "field-type-label"
          }, fieldTypeLabel), /*#__PURE__*/_react["default"].createElement("span", {
            className: "field-label"
          }, labelName)), function () {
            if (globalConfig.fieldPreviewable && fieldData.code === editFieldCode) {
              if (platformSupport) {
                return /*#__PURE__*/_react["default"].createElement("div", {
                  className: "field-preview"
                }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
                  customInterfaces: customInterfaces,
                  customGateway: customGateway,
                  customUploadRequest: customUploadRequest,
                  onImagePreview: onImagePreview,
                  locale: locale,
                  alignType: "inline",
                  itemNumberInRow: 2,
                  noLabel: true,
                  registerWidgets: xformCustomWidgets,
                  formItemLayout: {
                    labelCol: {
                      span: 0
                    },
                    wrapperCol: {
                      span: 24
                    }
                  },
                  jsonSchema: jsonSchema,
                  uiSchema: fieldData.uiSchema,
                  formData: fieldData.formData,
                  bizData: fieldData.bizData,
                  isFieldList: true
                }));
              } else {
                return /*#__PURE__*/_react["default"].createElement("div", {
                  className: "not-support-tip"
                }, /*#__PURE__*/_react["default"].createElement(_antd.Tag, {
                  color: "#f50"
                }, messages[(0, _localeMessages.getMessageId)('fieldNotSupportTip')]));
              }
            } else {
              return null;
            }
          }(), /*#__PURE__*/_react["default"].createElement("i", {
            type: "delete",
            "data-code": fieldData.code,
            className: "xform-iconfont delete-icon",
            onClick: deleteFieldHandler
          }, "\uE600")));
          break;

        default:
          console.warn('接口返回了一种不能识别的字段类型');
      }

      return connectDragSource(connectDropTarget(listItem));
    }
  }]);

  return FieldListOption;
}(_react.PureComponent);

_defineProperty(FieldListOption, "propTypes", {
  globalConfig: _propTypes["default"].shape({
    codeEditable: _propTypes["default"].bool.isRequired,
    fieldPreviewable: _propTypes["default"].bool.isRequired
  }).isRequired,
  draggable: _propTypes["default"].bool.isRequired,
  platformSupport: _propTypes["default"].bool.isRequired,
  fieldTypeLabel: _propTypes["default"].string.isRequired,
  messages: _propTypes["default"].object.isRequired,
  systemFieldEditable: _propTypes["default"].bool.isRequired,
  connectDragSource: _propTypes["default"].func.isRequired,
  connectDropTarget: _propTypes["default"].func.isRequired,
  isDragging: _propTypes["default"].bool.isRequired,
  isOver: _propTypes["default"].bool.isRequired,
  index: _propTypes["default"].number.isRequired,
  fieldListClickHandler: _propTypes["default"].func.isRequired,
  deleteFieldHandler: _propTypes["default"].func.isRequired,
  fieldData: _propTypes["default"].object.isRequired,
  fieldMoveHandler: _propTypes["default"].func.isRequired,
  addFieldHandler: _propTypes["default"].func.isRequired
});

var _default = (0, _reactDnd.DropTarget)([ItemTypeField, ItemTypePicker], fieldDropTarget, fieldDropConnect)((0, _reactDnd.DragSource)(ItemTypeField, fieldDragSource, fieldDragConnect)(FieldListOption));

exports["default"] = _default;