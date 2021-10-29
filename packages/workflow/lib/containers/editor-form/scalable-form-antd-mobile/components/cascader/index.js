"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antdMobile = require("antd-mobile");

var _util = _interopRequireDefault(require("../../util"));

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

var CascaderPicker = /*#__PURE__*/function (_Component) {
  _inherits(CascaderPicker, _Component);

  var _super = _createSuper(CascaderPicker);

  function CascaderPicker(props) {
    var _this;

    _classCallCheck(this, CascaderPicker);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getItemFromTree", function () {
      var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var selectedValue = arguments.length > 1 ? arguments[1] : undefined;

      if (tree.value === selectedValue) {
        return tree;
      } else {
        var children = tree.children || [];

        if (children && children.length > 0) {
          for (var i = 0; i < children.length; i += 1) {
            var item = _this.getItemFromTree(children[i], selectedValue);

            if (item) {
              return item;
            }
          }
        }
      }
    });

    _this.getItemFromTree = _this.getItemFromTree.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CascaderPicker, [{
    key: "getSelectedValueListFromTree",
    value: function getSelectedValueListFromTree() {
      var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var value = arguments.length > 1 ? arguments[1] : undefined;
      var result = [];
      var currentValue = value;
      var item = this.getItemFromTree(tree, currentValue);

      if (item) {
        result.unshift(currentValue);

        while (item.parent !== _util["default"].getTreeRootValue()) {
          currentValue = item.parent;
          item = this.getItemFromTree(tree, currentValue);
          result.unshift(currentValue);
        }

        return result;
      } else {
        return result;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tree = _this$props.tree,
          children = _this$props.children,
          deep = _this$props.deep,
          value = _this$props.value,
          disabled = _this$props.disabled,
          _onChange = _this$props.onChange,
          placeholder = _this$props.placeholder,
          options = _this$props.options;
      var cascaderValue = this.getSelectedValueListFromTree(tree, value);
      return /*#__PURE__*/_react["default"].createElement(_antdMobile.Picker, _extends({
        data: tree.children,
        cols: deep,
        value: cascaderValue,
        format: function format(labels) {
          return labels[labels.length - 1];
        },
        disabled: disabled,
        cascade: true,
        onChange: function onChange(value) {
          _onChange(value[value.length - 1]);
        },
        extra: placeholder
      }, options), children);
    }
  }]);

  return CascaderPicker;
}(_react.Component);

exports["default"] = CascaderPicker;