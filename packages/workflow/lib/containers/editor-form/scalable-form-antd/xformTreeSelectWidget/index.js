"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var CustomTreeSelect = /*#__PURE__*/function (_Component) {
  _inherits(CustomTreeSelect, _Component);

  var _super = _createSuper(CustomTreeSelect);

  function CustomTreeSelect(props) {
    var _this;

    _classCallCheck(this, CustomTreeSelect);

    _this = _super.call(this, props);
    _this.handleFilterTreeNode = _this.handleFilterTreeNode.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomTreeSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'tree');
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
    key: "_setTreeNodeSelectable",
    value: function _setTreeNodeSelectable(rootNode) {
      var _this2 = this;

      if (typeof rootNode.children !== 'undefined' && rootNode.children !== null && rootNode.children.length > 0) {
        rootNode.selectable = false;
        rootNode.children.map(function (childNode) {
          _this2._setTreeNodeSelectable(childNode);
        });
      } else {
        rootNode.selectable = true;
      }
    }
  }, {
    key: "handleFilterTreeNode",
    value: function handleFilterTreeNode(keyword, treeNode) {
      // 是否只能选择叶子节点项
      var options = _extends({}, this.props.options);

      var selectLeafOnly = false;

      if (typeof options.selectLeafOnly === 'boolean') {
        selectLeafOnly = options.selectLeafOnly;
      }

      var _treeNode$props = treeNode.props,
          title = _treeNode$props.title,
          selectable = _treeNode$props.selectable;

      if (selectLeafOnly) {
        return selectable && title.indexOf(keyword) > -1;
      } else {
        return title.indexOf(keyword) > -1;
      }
    } // 兼容antd的treeData数据格式

  }, {
    key: "formatTreeData",
    value: function formatTreeData(data) {
      var _this3 = this;

      data.map(function (treeNode) {
        treeNode.title = treeNode.label;

        if (treeNode.children && treeNode.children.length > 0) {
          _this3.formatTreeData(treeNode.children);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var popupContainer = this.props.formContext && this.props.formContext.popupContainer;
      var _this$props = this.props,
          required = _this$props.required,
          schema = _this$props.schema,
          options = _this$props.options,
          disabled = _this$props.disabled,
          readonly = _this$props.readonly,
          placeholder = _this$props.placeholder,
          _onChange = _this$props.onChange; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      } // 兼容没有配置数据源的情形


      var data = schema.treeSelectData || []; // 对于value值为空字符串的情况，value的值传入undefined，这样才能显示组件的placeholder

      var value = this.props.value;

      if (value === '') {
        value = undefined;
      } // 是否只能选择叶子节点项


      var selectLeafOnly = false;

      if (typeof options.selectLeafOnly === 'boolean') {
        selectLeafOnly = options.selectLeafOnly;
      }

      if (selectLeafOnly && data && data.length > 0) {
        // 为treeData添加selectable属性
        data.map(function (node) {
          _this4._setTreeNodeSelectable(node);
        });
      } // 对treeData做格式化处理
      //this.formatTreeData(data);
      //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过


      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-tree-select': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement(_antd.TreeSelect, {
        showSearch: true,
        allowClear: true,
        value: value,
        treeData: data,
        disabled: disabled,
        readOnly: readonly,
        required: required,
        filterTreeNode: this.handleFilterTreeNode,
        getPopupContainer: popupContainer,
        onChange: function onChange(value) {
          _onChange(value);
        },
        placeholder: placeholder //{...options}

      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage));
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