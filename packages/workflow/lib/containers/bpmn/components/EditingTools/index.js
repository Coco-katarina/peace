"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

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
})("3b3f5cd00bfa54a70402a029b632db0d", ".editingTools{position:absolute;left:174px;top:20px}.controlList{display:inline-block;padding:0;margin-left:10px;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.3);border-radius:2px}.control{position:relative;display:inline-block;padding:6px 8px;list-style-type:none}.control button{padding:0;outline:none;cursor:pointer;font-size:22px;line-height:26px;color:#555;background:none;border:none}.control .openFile{display:none}.control.line:after{content:\"\";position:absolute;top:50%;right:0;transform:translateY(-50%);height:16px;border-right:1px solid #ddd}.control button i{display:inline-block;width:16px;height:16px;vertical-align:middle;font-style:none}");

var EditingTools = /*#__PURE__*/function (_Component) {
  _inherits(EditingTools, _Component);

  var _super = _createSuper(EditingTools);

  function EditingTools(props) {
    var _this;

    _classCallCheck(this, EditingTools);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleOpen", function () {
      _this.fileRef.current.click();
    });

    _this.fileRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  _createClass(EditingTools, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onOpenFIle = _this$props.onOpenFIle,
          onZoomIn = _this$props.onZoomIn,
          onZoomOut = _this$props.onZoomOut,
          onZoomReset = _this$props.onZoomReset,
          onUndo = _this$props.onUndo,
          onRedo = _this$props.onRedo,
          onSave = _this$props.onSave,
          onDownloadXml = _this$props.onDownloadXml,
          onDownloadSvg = _this$props.onDownloadSvg;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "editingTools"
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "controlList"
      }, /*#__PURE__*/_react["default"].createElement("li", {
        className: "control line"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        ref: this.fileRef,
        className: "openFile",
        type: "file",
        onChange: onOpenFIle
      }), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        title: "\u6253\u5F00",
        onClick: this.handleOpen
      }, /*#__PURE__*/_react["default"].createElement(_icons.FolderOpenOutlined, null))), /*#__PURE__*/_react["default"].createElement("li", {
        className: "control"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        title: "\u64A4\u9500",
        onClick: onUndo
      }, /*#__PURE__*/_react["default"].createElement(_icons.UndoOutlined, null))), /*#__PURE__*/_react["default"].createElement("li", {
        className: "control line"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        title: "\u6062\u590D",
        onClick: onRedo
      }, /*#__PURE__*/_react["default"].createElement(_icons.RedoOutlined, null))), /*#__PURE__*/_react["default"].createElement("li", {
        className: "control"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        title: "\u91CD\u7F6E\u653E\u5927/\u7F29\u5C0F",
        onClick: onZoomReset
      }, /*#__PURE__*/_react["default"].createElement(_icons.SearchOutlined, null))), /*#__PURE__*/_react["default"].createElement("li", {
        className: "control"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        title: "\u653E\u5927",
        onClick: onZoomIn
      }, /*#__PURE__*/_react["default"].createElement(_icons.ZoomInOutlined, null))), /*#__PURE__*/_react["default"].createElement("li", {
        className: "control line"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        title: "\u7F29\u5C0F",
        onClick: onZoomOut
      }, /*#__PURE__*/_react["default"].createElement(_icons.ZoomOutOutlined, null))), /*#__PURE__*/_react["default"].createElement("li", {
        className: "control"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        title: "\u4FDD\u5B58",
        onClick: onSave
      }, /*#__PURE__*/_react["default"].createElement(_icons.SaveOutlined, null))), /*#__PURE__*/_react["default"].createElement("li", {
        className: "control"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        title: "\u4E0B\u8F7D\u8BBE\u8BA1\u56FE",
        onClick: onDownloadXml
      }, /*#__PURE__*/_react["default"].createElement(_icons.DownloadOutlined, null))), /*#__PURE__*/_react["default"].createElement("li", {
        className: "control"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        title: "\u4E0B\u8F7D\u4E3Asvg\u56FE\u7247",
        onClick: onDownloadSvg
      }, /*#__PURE__*/_react["default"].createElement(_icons.FileImageOutlined, null)))));
    }
  }]);

  return EditingTools;
}(_react.Component);

var _default = EditingTools;
exports["default"] = _default;