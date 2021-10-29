"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antdMobile = require("antd-mobile");

var _classnames = _interopRequireDefault(require("classnames"));

var _treeSelector = _interopRequireDefault(require("../components/treeSelector"));

var _cascader = _interopRequireDefault(require("../components/cascader"));

var _util = _interopRequireDefault(require("../util"));

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
})("3d6b6f12ad7171d06c11c04c00614fde", ".xform-custom-cascader .am-list-line .am-list-content{width:100px;max-width:100px;margin-right:10px}.xform-custom-cascader .am-list-line .am-list-extra{flex:1;-webkit-flex:1}@-webkit-keyframes slide-in-from-bottom1{0%{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes slide-in-from-bottom1{0%{transform:translateY(100%)}to{transform:translateY(0)}}@-webkit-keyframes slide-out-to-bottom1{0%{transform:translateY(0)}to{transform:translateY(100%)}}@keyframes slide-out-to-bottom1{0%{transform:translateY(0)}to{transform:translateY(100%)}}.xform-custom-cascader .selector-holder{height:24px;line-height:24px;font-size:17px;color:#999}.xform-custom-cascader .option-wrapper{height:80%;overflow:auto}.xform-custom-cascader .option-item{height:45px;text-align:left;line-height:45px;font-size:16px;color:#000;cursor:pointer;padding-left:20px}.xform-custom-cascader .option-item.selected{color:#0e80d2}.xform-custom-cascader .popup-wrapper{position:absolute;background-color:transparent;z-index:3}.xform-custom-cascader .popup-wrapper .popup-mask{top:0;bottom:0;left:0;right:0;margin:0;padding:0;width:100%;background-color:rgba(0,0,0,.4);overflow:hidden;position:fixed;transition:all .2s}.xform-custom-cascader .popup-wrapper .popup-content{position:absolute;background:#fff;left:0;right:0;bottom:0;top:50%;transform:translate3d(0,100%,0);transition:all .2s ease-in-out;opacity:0;border-radius:0}.xform-custom-cascader .popup-wrapper .popup-content .popup-content-header{height:42px;border-bottom:1px solid #d9d9d9;position:relative;text-align:center}.xform-custom-cascader .popup-wrapper .popup-content .popup-content-header .popup-content-header-left{font-size:17px;height:42px;line-height:42px;float:left;margin-left:20px;color:#0e80d2}.xform-custom-cascader .popup-wrapper .popup-content .popup-content-header .popup-content-header-right{height:42px;line-height:42px;float:right;margin-right:20px;font-size:17px;cursor:pointer;color:#0e80d2}.xform-custom-cascader .popup-wrapper .popup-content .popup-content-header .popup-content-header-center{text-align:center;display:inline-block;height:42px;line-height:42px;font-size:15px;color:#333}.xform-custom-cascader .popup-wrapper .slideUp{opacity:1;transform:translateZ(0)}.xform-custom-cascader .popup-wrapper .slide-in-from-bottom{opacity:1;-webkit-animation:slide-in-from-bottom1 .2s ease-in both;animation:slide-in-from-bottom1 .2s ease-in both}.xform-custom-cascader .popup-wrapper .slide-out-to-bottom{-webkit-animation:slide-out-to-bottom1 .2s ease-in both;animation:slide-out-to-bottom1 .2s ease-in both}.xform-custom-cascader.disabled .am-list-content,.xform-custom-cascader.disabled .am-list-extra{color:#bbb}");

var ListItem = _antdMobile.List.Item;

var CustomTreeSelect = /*#__PURE__*/function (_Component) {
  _inherits(CustomTreeSelect, _Component);

  var _super = _createSuper(CustomTreeSelect);

  function CustomTreeSelect() {
    _classCallCheck(this, CustomTreeSelect);

    return _super.apply(this, arguments);
  }

  _createClass(CustomTreeSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'tree');
    } // 获取级联深度（这里只考虑最多三级）

  }, {
    key: "getTreeDeep",
    value: function getTreeDeep(data) {
      var maxDeep = 0;
      var child = false;
      var childItems = [];

      if (data.length > 0) {
        maxDeep = 1;
        data.map(function (item) {
          if (item.children && item.children.length > 0) {
            child = true;
            childItems.push(item.children);
          }
        });

        if (child) {
          maxDeep = 2;
          child = false;
          childItems.map(function (childItem) {
            childItem.map(function (item) {
              if (item.children && item.children.length > 0) {
                child = true;
              }
            });
          });

          if (child) {
            maxDeep = 3;
          }
        }
      }

      return maxDeep;
    }
  }, {
    key: "_getValidateMessage",
    value: function _getValidateMessage(errorType, validate) {
      var errorMessage = '';
      validate.map(function (validateItem) {
        if (validateItem.type === errorType) {
          errorMessage = validateItem.message;
          return false;
        }
      });
      return errorMessage;
    }
  }, {
    key: "setTreeDataParent",
    value: function setTreeDataParent(data, parent) {
      var _this = this;

      return data.map(function (e) {
        if (e.children && e.children.length > 0) {
          return _objectSpread(_objectSpread({}, e), {}, {
            parent: parent,
            children: _this.setTreeDataParent(e.children, e.value)
          });
        } else {
          return _objectSpread(_objectSpread({}, e), {}, {
            parent: parent
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var options = _extends({}, this.props.options);

      var schema = this.props.schema;
      var data = schema.treeSelectData || [];
      var label = this.props.label,
          value = this.props.value,
          required = this.props.required,
          disabled = this.props.disabled,
          readonly = this.props.readonly,
          placeholder = this.props.placeholder,
          _onChange = this.props.onChange; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      } //const treeDeep = this.getTreeDeep(data);
      //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过


      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      } //节点添加父节点值


      data = this.setTreeDataParent(data, _util["default"].getTreeRootValue()); // 构造treeData

      var treeData = {
        value: _util["default"].getTreeRootValue(),
        label: '',
        children: data // children: data.map((item) => {
        //     item.parent = utils.getTreeRootValue();
        //     return item;
        // })

      }; // 根据不同的树的深度来决定采用哪种渲染模式

      if (false) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])({
            'xform-custom-widget': true,
            'xform-custom-cascader': true,
            'xform-item-has-error': _errorType !== '',
            disabled: disabled
          })
        }, /*#__PURE__*/_react["default"].createElement(_cascader["default"], _extends({
          tree: treeData,
          deep: treeDeep,
          value: value,
          disabled: disabled,
          onChange: _onChange,
          placeholder: placeholder
        }, options), /*#__PURE__*/_react["default"].createElement(ListItem, {
          arrow: "horizontal",
          wrap: true,
          multipleLine: true
        }, /*#__PURE__*/_react["default"].createElement("label", {
          className: (0, _classnames["default"])({
            required: required
          })
        }, label))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "xform-item-error-explain"
        }, validateMessage));
      } else {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])({
            'xform-custom-widget': true,
            'xform-custom-tree-select': true,
            'xform-item-has-error': _errorType !== '',
            disabled: disabled
          })
        }, /*#__PURE__*/_react["default"].createElement(ListItem, {
          arrow: "horizontal",
          wrap: true,
          multipleLine: true,
          extra: /*#__PURE__*/_react["default"].createElement(_treeSelector["default"], {
            className: "xform-custom-tree-select",
            tree: treeData,
            value: value,
            disabled: disabled,
            editable: !readonly,
            placeholder: placeholder,
            onChange: function onChange(value) {
              _onChange(value);
            }
          }),
          error: _errorType !== ''
        }, /*#__PURE__*/_react["default"].createElement("label", {
          className: (0, _classnames["default"])({
            required: required
          })
        }, label)), /*#__PURE__*/_react["default"].createElement("div", {
          className: "xform-item-error-explain"
        }, validateMessage));
      }
    }
  }]);

  return CustomTreeSelect;
}(_react.Component);

exports["default"] = CustomTreeSelect;

_defineProperty(CustomTreeSelect, "propTypes", {
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  required: _propTypes["default"].bool,
  onChange: _propTypes["default"].func
});