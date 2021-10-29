"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

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

var largerBorder = ['确定转办', '确认加签', '同意', '拒绝'];

var CustomObjectFieldTemplate = /*#__PURE__*/function (_Component) {
  _inherits(CustomObjectFieldTemplate, _Component);

  var _super = _createSuper(CustomObjectFieldTemplate);

  function CustomObjectFieldTemplate() {
    _classCallCheck(this, CustomObjectFieldTemplate);

    return _super.apply(this, arguments);
  }

  _createClass(CustomObjectFieldTemplate, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          TitleField = _this$props.TitleField,
          properties = _this$props.properties,
          title = _this$props.title,
          description = _this$props.description,
          uiSchema = _this$props.uiSchema,
          _this$props$formConte = _this$props.formContext,
          popView = _this$props$formConte.popView,
          closePopView = _this$props$formConte.closePopView,
          shouldPopCode = _this$props$formConte.shouldPopCode,
          currentNode = _this$props$formConte.currentNode,
          isFieldList = _this$props$formConte.isFieldList;
      var options = uiSchema.hasOwnProperty('items') ? uiSchema.items['ui:options'] || {} : uiSchema['ui:options'] || {};
      var titleName = options.groupName ? options.groupName : title;
      var isGroup = uiSchema && uiSchema['ui:widget'] && (uiSchema['ui:widget'] == 'group' || uiSchema['ui:widget'] == 'Table') ? true : false;
      var showGroupTitle = isGroup && uiSchema['ui:options'].showGroupTitle ? true : false;
      var hasButton = false;
      var hasPopBehavior = false;
      var popObj = [];
      properties.forEach(function (proper) {
        if (proper.content.props.uiSchema['ui:widget'] == 'button') {
          hasButton = true;

          if (proper.content.props.uiSchema['ui:options'] && proper.content.props.uiSchema['ui:options'].behavior == '弹出控件组') {
            hasPopBehavior = true;

            if (proper.content.props.uiSchema['ui:options'].popCode != '') {
              popObj.push(proper.content.props.uiSchema['ui:options'].popCode);
            }
          }
        }
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'object_row_group_wraper': options.groupName ? true : false,
          'object_wraper': true,
          'object_margin': isGroup && !uiSchema.hasOwnProperty('items')
        })
      }, !isGroup ? titleName && /*#__PURE__*/_react["default"].createElement(TitleField, {
        title: titleName
      }) : showGroupTitle ? titleName && /*#__PURE__*/_react["default"].createElement(TitleField, {
        title: titleName
      }) : '', /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'object_row_group_row': options.groupName ? true : false,
          'object_row': true
        })
      }, properties.map(function (prop) {
        var itemNumberInRow = uiSchema[prop.content.key] && uiSchema[prop.content.key]['ui:options'] && uiSchema[prop.content.key]['ui:options'].itemwidth >= 0 ? uiSchema[prop.content.key]['ui:options'].itemwidth : 100;

        if (isFieldList) {
          itemNumberInRow = 100;
        }

        var itemMarginLeft = uiSchema[prop.content.key] && uiSchema[prop.content.key]['ui:options'] && uiSchema[prop.content.key]['ui:options'].marginLeft >= 0 ? uiSchema[prop.content.key]['ui:options'].marginLeft : 0;
        var style = Number(itemNumberInRow) > 0 ? {
          width: itemNumberInRow + '%',
          marginTop: 10,
          marginLeft: itemMarginLeft + '%',
          marginRight: 10
        } : {
          display: 'none'
        };
        if (typeof prop.content.props.formData == 'string') if (largerBorder.some(function (item) {
          return item == prop.content.props.formData;
        })) {
          style = Number(itemNumberInRow) > 0 ? {
            minWidth: itemNumberInRow + '%',
            marginTop: 10,
            marginLeft: itemMarginLeft + '%',
            marginRight: 10
          } : {
            display: 'none'
          };
        }
        var shownodes;

        if (uiSchema[prop.content.key]) {
          if (uiSchema[prop.content.key].items) {
            shownodes = uiSchema[prop.content.key].items['ui:options'] && uiSchema[prop.content.key].items['ui:options'].shownodes ? uiSchema[prop.content.key].items['ui:options'].shownodes : null;
          } else {
            shownodes = uiSchema[prop.content.key]['ui:options'] && uiSchema[prop.content.key]['ui:options'].shownodes ? uiSchema[prop.content.key]['ui:options'].shownodes : null;
          }
        }

        var addClassNames = 'object_content'; //判断节点是否可见   

        if (currentNode) {
          if (Array.isArray(shownodes) && shownodes.length > 0 && shownodes.indexOf(currentNode) === -1) {
            addClassNames = 'object_content xform-hidden';
          }
        }

        if (hasButton && hasPopBehavior && popObj.filter(function (x) {
          return x == prop.content.key;
        }).length > 0) {
          if (prop.content.props.uiSchema['ui:widget'] && prop.content.props.uiSchema['ui:widget'] == 'group' || prop.content.props.uiSchema['items'] && prop.content.props.uiSchema['items']['ui:widget'] == 'group') {
            return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
              centered: true,
              key: prop.content.key,
              width: 800,
              bodyStyle: {
                padding: '34px'
              },
              visible: popView && shouldPopCode == prop.content.key,
              onCancel: function onCancel() {
                return closePopView();
              },
              footer: null,
              getContainer: false
            }, /*#__PURE__*/_react["default"].createElement("div", {
              style: style,
              className: addClassNames
            }, prop.content));
          }
        }

        return /*#__PURE__*/_react["default"].createElement("div", {
          style: style,
          className: addClassNames,
          key: prop.content.key
        }, prop.content);
      })), description);
    }
  }]);

  return CustomObjectFieldTemplate;
}(_react.Component);

exports["default"] = CustomObjectFieldTemplate;