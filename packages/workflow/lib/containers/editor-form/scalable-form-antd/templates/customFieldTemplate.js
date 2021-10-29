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
})("b2e8c2797997aef673002d25eb1e4ae8", ".xform-antd-wrapper .object_wraper{padding:5px}.object_row{display:flex;flex-wrap:wrap}.xform-antd-wrapper .object_row_group_wraper{border:1px solid rgba(104,164,247,.8);border-radius:5px;margin-bottom:10px;position:relative}.xform-antd-wrapper .object_row_group_wraper legend{position:absolute;top:-14px;background-color:#fff;width:auto;margin-left:20px;padding:0 10px;border:none;font-size:18px}");

var CustomFieldTemplate = /*#__PURE__*/function (_Component) {
  _inherits(CustomFieldTemplate, _Component);

  var _super = _createSuper(CustomFieldTemplate);

  function CustomFieldTemplate() {
    _classCallCheck(this, CustomFieldTemplate);

    return _super.apply(this, arguments);
  }

  _createClass(CustomFieldTemplate, [{
    key: "render",
    value: function render() {
      var props = this.props; //formContext中存放着类似formItemLayout = {labelCol: { span: 6 },wrapperCol: { span: 18 }}的配置

      var id = props.id,
          classNames = props.classNames,
          label = props.label,
          required = props.required,
          hidden = props.hidden,
          description = props.description,
          children = props.children,
          rawHelp = props.rawHelp,
          formContext = props.formContext,
          schema = props.schema,
          uiSchema = props.uiSchema;
      var groupMsg = schema.groupMsg; // 这个idPrefix决定所有字段的id的前缀，与react-jsonschema-form组件中的idPrefix属性相同https://github.com/mozilla-services/react-jsonschema-form#id-prefix

      var idPrefix = 'root';
      var showLabel = true;

      if (typeof label === 'string' && label !== undefined && label != '') {
        var idLabel = id.slice(-label.length);

        if (idLabel === label) {
          showLabel = false;
        }
      }

      if (schema.type === 'array' && schema.items && uiSchema.items) {
        if (schema.items.type === 'object' && (uiSchema.items['ui:widget'] === 'group' || uiSchema.items['ui:widget'] === 'Table')) {
          showLabel = false;
        }
      } //上传控件处于禁用且无上传文件，则进行隐藏


      var isHidden = false;

      if (schema.type === 'array' && schema.items && schema.items.format == "data-url") {
        if (formContext.currentNode && Array.isArray(uiSchema['ui:options'].disnodes)) {
          if (uiSchema['ui:options'].disnodes.indexOf(formContext.currentNode) > -1) {
            if (children && children.length > 0 && children[0].props.formData && !(children[0].props.formData.length > 0)) {
              isHidden = true;
            }
          }
        }
      }

      var code = id.slice(idPrefix.length + 1);
      var labelCol = formContext.labelCol.span || 4;
      var wrapperCol = formContext.wrapperCol.span || 20;
      var labelType = formContext.labelType || 'inline';
      var alignType = formContext.alignType || 'vertical';
      var labelAlign = formContext.labelAlign || 'left'; //let itemNumberInRow = formContext.itemNumberInRow || 2;
      //width: (Math.floor(100 / itemNumberInRow) + '%')
      //let itemNumberInRow = (uiSchema['ui:options'] && uiSchema['ui:options'].itemwidth) ? uiSchema['ui:options'].itemwidth : 100;

      var itemWidth = 100;
      var isBooleanCheckbox = schema.type === 'boolean' && typeof uiSchema['ui:widget'] === 'undefined';
      var shownodes;

      if (schema.type === 'array' && uiSchema.items) {
        shownodes = uiSchema.items['ui:options'] && uiSchema.items['ui:options'].shownodes ? uiSchema.items['ui:options'].shownodes : null;
        classNames += uiSchema.items.classNames ? ' ' + uiSchema.items.classNames : '';
        itemWidth = uiSchema.items['ui:options'] && uiSchema.items['ui:options'].itemwidth ? uiSchema.items['ui:options'].itemwidth : 100;
      } else {
        shownodes = uiSchema['ui:options'] && uiSchema['ui:options'].shownodes ? uiSchema['ui:options'].shownodes : null;
        itemWidth = uiSchema['ui:options'] && uiSchema['ui:options'].itemwidth ? uiSchema['ui:options'].itemwidth : 100;
      } //计算 labelCol wrapperCol 目前只处理一行两个 的样式统一问题


      if (itemWidth <= 50 && itemWidth >= 33) {
        labelCol = labelCol * 2;
        wrapperCol = labelCol >= 24 ? 0 : 24 - labelCol;
      } //判断节点是否可见


      var currentNode = formContext.currentNode || null;

      if (currentNode) {
        if (Array.isArray(shownodes) && shownodes.length > 0 && shownodes.indexOf(currentNode) === -1) {
          hidden = true;
        }
      }

      var idArr = id.split('_');
      var isTable = groupMsg && groupMsg.type == 'Table';
      var tableGroupMore = isTable && idArr[2] && idArr[2] > 0; // debugger;

      if (labelType === 'inline') {
        // labelType为inline的场景下才有labelAlign、alignType、itemNumberInRow配置
        if (alignType === 'vertical') {
          if (schema.type === 'object') {
            var rootClassNames = classNames + ' ' + 'xform-root';

            if (hidden) {
              rootClassNames += ' ' + 'xform-hidden';
            }

            return /*#__PURE__*/_react["default"].createElement("div", {
              className: rootClassNames
            }, children);
          } else {
            var calClassNames = classNames + ' ' + 'xform-item';

            if (hidden) {
              calClassNames += ' ' + 'xform-hidden';
            }

            if (typeof label === 'string' && label !== '' && label !== code && showLabel) {
              return /*#__PURE__*/_react["default"].createElement("div", {
                className: calClassNames
              }, !isHidden && /*#__PURE__*/_react["default"].createElement(_antd.Row, {
                type: "flex",
                align: "top"
              }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
                span: labelCol,
                style: {
                  textAlign: labelAlign,
                  visibility: isBooleanCheckbox ? 'hidden' : 'visible',
                  maxHeight: isBooleanCheckbox ? '20px' : 'auto',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }, /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
                title: label
              }, /*#__PURE__*/_react["default"].createElement("label", {
                htmlFor: id,
                className: (0, _classnames["default"])({
                  'control-label': true,
                  'ant-form-item-label': true,
                  'required': required
                })
              }, label))), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
                span: wrapperCol
              }, description, children, /*#__PURE__*/_react["default"].createElement("div", {
                className: "xform-help",
                dangerouslySetInnerHTML: {
                  __html: rawHelp
                }
              }))));
            } else {
              return /*#__PURE__*/_react["default"].createElement("div", {
                className: calClassNames
              }, description, children, /*#__PURE__*/_react["default"].createElement("div", {
                className: "xform-help",
                dangerouslySetInnerHTML: {
                  __html: rawHelp
                }
              }));
            }
          }
        } else if (alignType === 'inline') {
          if (schema.type === 'object') {
            var _rootClassNames = classNames + ' ' + 'xform-root';

            if (hidden) {
              _rootClassNames += ' ' + 'xform-hidden';
            }

            return /*#__PURE__*/_react["default"].createElement("div", {
              className: _rootClassNames
            }, children);
          } else {
            var _calClassNames = classNames + ' ' + (isTable ? '' : 'xform-item');

            if (hidden) {
              _calClassNames += ' ' + 'xform-hidden';
            }

            if (typeof label === 'string' && label !== '' && label !== code && showLabel) {
              // pc ?
              return /*#__PURE__*/_react["default"].createElement("div", {
                className: _calClassNames // style={{
                //     display: 'inline-block',
                //     width: (itemNumberInRow + '%')
                // }}

              }, !isHidden && (!groupMsg || groupMsg && groupMsg.type != 'Table') && /*#__PURE__*/_react["default"].createElement(_antd.Row, {
                type: "flex",
                align: "top"
              }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
                span: labelCol,
                style: {
                  textAlign: labelAlign,
                  visibility: isBooleanCheckbox ? 'hidden' : 'visible',
                  maxHeight: isBooleanCheckbox ? '20px' : 'auto',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }, /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
                title: label
              }, /*#__PURE__*/_react["default"].createElement("label", {
                htmlFor: id,
                className: (0, _classnames["default"])({
                  'ant-form-item-label': true,
                  'control-label': true,
                  'required': required
                })
              }, label))), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
                span: wrapperCol
              }, description, children, /*#__PURE__*/_react["default"].createElement("div", {
                className: "xform-help",
                dangerouslySetInnerHTML: {
                  __html: rawHelp
                }
              }))), isTable ? /*#__PURE__*/_react["default"].createElement("div", {
                style: {
                  display: 'inline-block' // minWidth: 240,

                }
              }, tableGroupMore ? '' : /*#__PURE__*/_react["default"].createElement("div", {
                style: {
                  padding: '8px 0',
                  backgroundColor: '#fafafa',
                  marginBottom: 8
                }
              }, /*#__PURE__*/_react["default"].createElement("label", {
                htmlFor: id,
                className: (0, _classnames["default"])({
                  'ant-form-item-label': true,
                  // 'control-label': true,
                  'required': required
                })
              }, label)), /*#__PURE__*/_react["default"].createElement("div", null, description, children, /*#__PURE__*/_react["default"].createElement("div", {
                className: "xform-help",
                dangerouslySetInnerHTML: {
                  __html: rawHelp
                }
              }))) : '');
            } else {
              return /*#__PURE__*/_react["default"].createElement("div", {
                className: _calClassNames
              }, description, children, /*#__PURE__*/_react["default"].createElement("div", {
                className: "xform-help",
                dangerouslySetInnerHTML: {
                  __html: rawHelp
                }
              }));
            }
          }
        }
      } else {
        if (schema.type === 'object') {
          var _rootClassNames2 = classNames + ' ' + 'xform-root';

          if (hidden) {
            _rootClassNames2 += ' ' + 'xform-hidden';
          }

          return /*#__PURE__*/_react["default"].createElement("div", {
            className: _rootClassNames2
          }, children);
        } else {
          var _calClassNames2 = classNames + ' ' + 'xform-item';

          if (hidden) {
            _calClassNames2 += ' ' + 'xform-hidden';
          }

          if (typeof label === 'string' && label !== '' && label !== code && showLabel) {
            return /*#__PURE__*/_react["default"].createElement("div", {
              className: _calClassNames2
            }, /*#__PURE__*/_react["default"].createElement("label", {
              htmlFor: id,
              className: (0, _classnames["default"])({
                'xform-hidden': isBooleanCheckbox,
                'control-label': true,
                'ant-form-item-label': true,
                'required': required
              })
            }, label), description, children, /*#__PURE__*/_react["default"].createElement("div", {
              className: "xform-help",
              dangerouslySetInnerHTML: {
                __html: rawHelp
              }
            }));
          } else {
            return /*#__PURE__*/_react["default"].createElement("div", {
              className: _calClassNames2
            }, description, children, /*#__PURE__*/_react["default"].createElement("div", {
              className: "xform-help",
              dangerouslySetInnerHTML: {
                __html: rawHelp
              }
            }));
          }
        }
      }
    }
  }]);

  return CustomFieldTemplate;
}(_react.Component);

exports["default"] = CustomFieldTemplate;