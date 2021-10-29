"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antdMobile = require("antd-mobile");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PopPanel = _interopRequireDefault(require("./PopPanel"));

var _classnames = _interopRequireDefault(require("classnames"));

var _antd = require("antd");

var _util = _interopRequireDefault(require("../../util"));

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
})("deac2aa6e85386d0d9ec0327c53ed886", "@-webkit-keyframes slide-in-from-bottom1{0%{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes slide-in-from-bottom1{0%{transform:translateY(100%)}to{transform:translateY(0)}}@-webkit-keyframes slide-out-to-bottom1{0%{transform:translateY(0)}to{transform:translateY(100%)}}@keyframes slide-out-to-bottom1{0%{transform:translateY(0)}to{transform:translateY(100%)}}.xform-custom-tree-select .selector-holder{height:24px;line-height:24px;font-size:17px;color:#999}.xform-custom-tree-select .option-wrapper{height:80%;overflow:auto}.xform-custom-tree-select .option-item{height:45px;text-align:left;line-height:45px;font-size:16px;color:#000;cursor:pointer;padding-left:20px}.xform-custom-tree-select .option-item.selected{color:#0e80d2}.xform-custom-tree-select .popup-wrapper{position:absolute;background-color:transparent;z-index:3}.xform-custom-tree-select .popup-wrapper .popup-mask{top:0;bottom:0;left:0;right:0;margin:0;padding:0;width:100%;background-color:rgba(0,0,0,.4);overflow:hidden;position:fixed;transition:all .2s}.xform-custom-tree-select .popup-wrapper .popup-content{position:absolute;background:#fff;left:0;right:0;bottom:0;top:50%;transform:translate3d(0,100%,0);transition:all .2s ease-in-out;opacity:0;border-radius:0}.xform-custom-tree-select .popup-wrapper .popup-content .popup-content-header{height:42px;border-bottom:1px solid #d9d9d9;position:relative;text-align:center}.xform-custom-tree-select .popup-wrapper .popup-content .popup-content-header .popup-content-header-left{font-size:17px;height:42px;line-height:42px;float:left;margin-left:20px;color:#0e80d2}.xform-custom-tree-select .popup-wrapper .popup-content .popup-content-header .popup-content-header-right{height:42px;line-height:42px;float:right;margin-right:20px;font-size:17px;cursor:pointer;color:#0e80d2}.xform-custom-tree-select .popup-wrapper .popup-content .popup-content-header .popup-content-header-center{text-align:center;display:inline-block;height:42px;line-height:42px;font-size:15px;color:#333}.xform-custom-tree-select .popup-wrapper .slideUp{opacity:1;transform:translateZ(0)}.xform-custom-tree-select .popup-wrapper .slide-in-from-bottom{opacity:1;-webkit-animation:slide-in-from-bottom1 .2s ease-in both;animation:slide-in-from-bottom1 .2s ease-in both}.xform-custom-tree-select .popup-wrapper .slide-out-to-bottom{-webkit-animation:slide-out-to-bottom1 .2s ease-in both;animation:slide-out-to-bottom1 .2s ease-in both}");

var TreeSelector = /*#__PURE__*/function (_PureComponent) {
  _inherits(TreeSelector, _PureComponent);

  var _super = _createSuper(TreeSelector);

  function TreeSelector(props, context) {
    var _this;

    _classCallCheck(this, TreeSelector);

    _this = _super.call(this, props, context);

    _defineProperty(_assertThisInitialized(_this), "UNSAFE_componentWillReceiveProps", function (nextProps) {
      var shouldUpdateState = false;
      var nextValue = nextProps.value;
      var nextCategoryTree = nextProps.tree || {};
      var nextChildren = nextCategoryTree.children || [];
      var thisCategoryTree = _this.props.tree || {};
      var thisChildren = thisCategoryTree.children || [];

      if (nextValue !== _this.props.value) {
        shouldUpdateState = true;
      }

      if (nextProps.tree && !_this.props.tree) {
        shouldUpdateState = true;
      }

      if (nextChildren.length !== thisChildren.length) {
        shouldUpdateState = true;
      }

      if (shouldUpdateState) {
        var item = _this.getItemFromTree(nextProps.tree, nextProps.value) || null;

        if (item) {
          var selectedValueList = _this.getSelectedValueListFromTree(nextProps.tree, nextProps.value);

          _this.setState({
            //selectedValueList,
            selectedValueList: [],
            selectedLabel: item.label || item.title,
            currentPage: 0 //currentPage: (selectedValueList.length - 1)

          });
        }
      }
    });

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

    _defineProperty(_assertThisInitialized(_this), "getRenderDataFromCategoryTree", function () {
      var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var selectedValueList = _this.state.selectedValueList || [];

      if (selectedValueList.length === 0) {
        return [{
          selectedKey: null,
          selectedLabel: null,
          optionList: tree.children
        }];
      }

      var result = [];
      selectedValueList.forEach(function (selectedValue, index) {
        var selectedItem = _this.getItemFromTree(tree, selectedValue);

        if (selectedItem) {
          var parentItem = _this.getItemFromTree(tree, selectedItem.parent);

          result.push({
            selectedKey: selectedValue,
            selectedLabel: selectedItem.label || selectedItem.title,
            optionList: parentItem.children
          });

          if (selectedItem.children && selectedItem.children.length > 0) {
            if (index === selectedValueList.length - 1) {
              result.push({
                selectedKey: null,
                selectedLabel: null,
                optionList: selectedItem.children
              });
            }
          }
        }
      });
      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "getTabsFromRenderData", function () {
      var renderDataList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var placeholder = _this.props.placeholder;
      return renderDataList.map(function (renderDataItem) {
        return {
          title: renderDataItem.selectedLabel || placeholder,
          selectedKey: renderDataItem.selectedKey || placeholder
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOptionClicked", function (renderDataIndex, optionIndex, option) {
      var selectedValueList = _this.state.selectedValueList || [];

      if (renderDataIndex === selectedValueList.length) {
        selectedValueList = selectedValueList.map(function (item) {
          return item;
        });
        selectedValueList.push(option.value);
      }

      if (renderDataIndex < selectedValueList.length) {
        selectedValueList[renderDataIndex] = option.value;
        var result = [];
        selectedValueList.forEach(function (item, index) {
          if (index <= renderDataIndex) {
            result.push(item);
          }
        });
        selectedValueList = result;
      }

      _this.setState({
        selectedValueList: selectedValueList
      });

      if (option.children && option.children.length > 0) {
        setTimeout(function () {
          _this.setState({
            currentPage: renderDataIndex + 1
          });
        }, 500);
      } else {
        _this.setState({
          currentPage: renderDataIndex
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function () {
      var selectedItem = _this.getItemFromTree(_this.props.tree, _this.state.selectedValueList[_this.state.selectedValueList.length - 1]) || null; //与web保持一致，不能选中包含子节点的父节点

      if (selectedItem && selectedItem.children && selectedItem.children.length > 0) {
        _antd.message.warning('该节点不可选择！');

        return;
      }

      if (selectedItem) {
        _this.setState({
          selectedLabel: selectedItem.label || selectedItem.title
        });
      } else {
        _this.setState({
          selectedLabel: ''
        });
      }

      _this.props.onChange(_this.state.selectedValueList[_this.state.selectedValueList.length - 1]);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.setState({
        showSelect: false
      });
    });

    _this.state = {
      showSelect: false,
      selectedValueList: [],
      currentPage: 0,
      selectedLabel: ''
    };
    return _this;
  }

  _createClass(TreeSelector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value;
      var item = this.getItemFromTree(this.props.tree, value) || null;

      if (item) {
        //const selectedValueList = this.getSelectedValueListFromTree(this.props.tree, value);
        this.setState({
          //selectedValueList,
          selectedValueList: [],
          selectedLabel: item.label || item.title,
          currentPage: 0 //currentPage: (selectedValueList.length - 1)

        });
      }
    }
  }, {
    key: "getSelectedValueListFromTree",
    value: function getSelectedValueListFromTree() {
      var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var value = arguments.length > 1 ? arguments[1] : undefined;
      var result = [];
      var currentValue = value;
      var item = this.getItemFromTree(tree, currentValue);

      if (item) {
        result.unshift(currentValue);

        if (item.parent !== _util["default"].getTreeRootValue()) {
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
      var _this2 = this;

      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          disabled = _this$props.disabled,
          editable = _this$props.editable,
          className = _this$props.className;
      var renderDataList = this.getRenderDataFromCategoryTree(this.props.tree);
      var tabs = this.getTabsFromRenderData(renderDataList);
      var selectedItem = this.getItemFromTree(this.props.tree, this.state.selectedValueList[this.state.selectedValueList.length - 1]) || {
        label: '',
        title: ''
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: className
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: 'selector-holder',
        style: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          fontSize: '14px'
        },
        onClick: function onClick() {
          if (!disabled && editable) {
            _this2.setState({
              showSelect: true
            });
          }
        }
      }, this.state.selectedLabel || placeholder), /*#__PURE__*/_react["default"].createElement(_PopPanel["default"], {
        show: this.state.showSelect,
        title: selectedItem.label || selectedItem.title,
        onSubmit: this.handleSubmit,
        onClose: this.handleCancel
      }, /*#__PURE__*/_react["default"].createElement(_antdMobile.Tabs, {
        tabs: tabs,
        page: this.state.currentPage,
        renderTab: function renderTab(props) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }
          }, props.title);
        },
        onChange: function onChange(tab, index) {
          _this2.setState({
            currentPage: index
          });
        }
      }, renderDataList.map(function (renderData, renderDataIndex) {
        var optionList = renderData.optionList || [];
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: 'option-wrapper',
          key: renderDataIndex
        }, optionList.map(function (option, optionIndex) {
          var selected = null;

          if (_this2.state.selectedValueList.length >= renderDataIndex + 1) {
            selected = _this2.state.selectedValueList[renderDataIndex];
          }

          return /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'option-item': true,
              'selected': option.value === selected
            }),
            key: optionIndex,
            onClick: function onClick() {
              _this2.handleOptionClicked(renderDataIndex, optionIndex, option);
            }
          }, option.label || option.title);
        }));
      }))));
    }
  }]);

  return TreeSelector;
}(_react.PureComponent);

_defineProperty(TreeSelector, "propTypes", {
  tree: _propTypes["default"].array,
  value: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  placeholder: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  editable: _propTypes["default"].bool,
  className: _propTypes["default"].string
});

_defineProperty(TreeSelector, "defaultProps", {
  placeholder: '请选择',
  disabled: false,
  editable: true,
  className: ''
});

var _default = TreeSelector;
exports["default"] = _default;