"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _antd = require("antd");

var _reactQuill = _interopRequireWildcard(require("react-quill"));

var _localeMessages = require("../i18n/localeMessages");

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
})("5f1cc9c78bc8198c373a876c5dcb832c", ".xform-custom-richtext .ql-container{box-sizing:border-box;font-family:Helvetica,Arial,sans-serif;font-size:13px;height:100%;margin:0;position:relative}.xform-custom-richtext .ql-container.ql-disabled .ql-tooltip{visibility:hidden}.xform-custom-richtext .ql-container.ql-disabled .ql-editor ul[data-checked]>li:before{pointer-events:none}.xform-custom-richtext .ql-clipboard{left:-100000px;height:1px;overflow-y:hidden;position:absolute;top:50%}.xform-custom-richtext .ql-clipboard p{margin:0;padding:0}.xform-custom-richtext .ql-editor{box-sizing:border-box;line-height:1.42;height:100%;outline:none;overflow-y:auto;padding:12px 15px;-o-tab-size:4;tab-size:4;-moz-tab-size:4;text-align:left;white-space:pre-wrap;word-wrap:break-word}.xform-custom-richtext .ql-editor>*{cursor:text}.xform-custom-richtext .ql-editor blockquote,.xform-custom-richtext .ql-editor h1,.xform-custom-richtext .ql-editor h2,.xform-custom-richtext .ql-editor h3,.xform-custom-richtext .ql-editor h4,.xform-custom-richtext .ql-editor h5,.xform-custom-richtext .ql-editor h6,.xform-custom-richtext .ql-editor ol,.xform-custom-richtext .ql-editor p,.xform-custom-richtext .ql-editor pre,.xform-custom-richtext .ql-editor ul{margin:0;padding:0;counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9}.xform-custom-richtext .ql-editor ol .ql-editor ul{padding-left:1.5em}.xform-custom-richtext .ql-editor ol>li .ql-editor ul>li{list-style-type:none}.xform-custom-richtext .ql-editor ul>li:before{content:\"\"}.xform-custom-richtext .ql-editor ul[data-checked=false],.xform-custom-richtext .ql-editor ul[data-checked=true]{pointer-events:none}.xform-custom-richtext .ql-editor ul[data-checked=false]>li *,.xform-custom-richtext .ql-editor ul[data-checked=true]>li *{pointer-events:all}.xform-custom-richtext .ql-editor ul[data-checked=false]>li:before,.xform-custom-richtext .ql-editor ul[data-checked=true]>li:before{color:#777;cursor:pointer;pointer-events:all}.xform-custom-richtext .ql-editor ul[data-checked=false]>li:before,.xform-custom-richtext .ql-editor ul[data-checked=true]>li:before{content:\"\"}.xform-custom-richtext .ql-editor li:before{display:inline-block;white-space:nowrap;width:1.2em}.xform-custom-richtext .ql-editor li:not(.ql-direction-rtl):before{margin-left:-1.5em;margin-right:.3em;text-align:right}.xform-custom-richtext .ql-editor li.ql-direction-rtl:before{margin-left:.3em;margin-right:-1.5em}.xform-custom-richtext .ql-editor ol li:not(.ql-direction-rtl),.xform-custom-richtext .ql-editor ul li:not(.ql-direction-rtl){padding-left:1.5em}.xform-custom-richtext .ql-editor ol li.ql-direction-rtl,.xform-custom-richtext .ql-editor ul li.ql-direction-rtl{padding-right:1.5em}.xform-custom-richtext .ql-editor ol li{counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment:list-0}.xform-custom-richtext .ql-editor ol li:before{content:counter(list-0,decimal) \". \"}.xform-custom-richtext .ql-editor ol li.ql-indent-1{counter-increment:list-1}.xform-custom-richtext .ql-editor ol li.ql-indent-1:before{content:counter(list-1,lower-alpha) \". \"}.xform-custom-richtext .ql-editor ol li.ql-indent-1{counter-reset:list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9}.xform-custom-richtext .ql-editor ol li.ql-indent-2{counter-increment:list-2}.xform-custom-richtext .ql-editor ol li.ql-indent-2:before{content:counter(list-2,lower-roman) \". \"}.xform-custom-richtext .ql-editor ol li.ql-indent-2{counter-reset:list-3 list-4 list-5 list-6 list-7 list-8 list-9}.xform-custom-richtext .ql-editor ol li.ql-indent-3{counter-increment:list-3}.xform-custom-richtext .ql-editor ol li.ql-indent-3:before{content:counter(list-3,decimal) \". \"}.xform-custom-richtext .ql-editor ol li.ql-indent-3{counter-reset:list-4 list-5 list-6 list-7 list-8 list-9}.xform-custom-richtext .ql-editor ol li.ql-indent-4{counter-increment:list-4}.xform-custom-richtext .ql-editor ol li.ql-indent-4:before{content:counter(list-4,lower-alpha) \". \"}.xform-custom-richtext .ql-editor ol li.ql-indent-4{counter-reset:list-5 list-6 list-7 list-8 list-9}.xform-custom-richtext .ql-editor ol li.ql-indent-5{counter-increment:list-5}.xform-custom-richtext .ql-editor ol li.ql-indent-5:before{content:counter(list-5,lower-roman) \". \"}.xform-custom-richtext .ql-editor ol li.ql-indent-5{counter-reset:list-6 list-7 list-8 list-9}.xform-custom-richtext .ql-editor ol li.ql-indent-6{counter-increment:list-6}.xform-custom-richtext .ql-editor ol li.ql-indent-6:before{content:counter(list-6,decimal) \". \"}.xform-custom-richtext .ql-editor ol li.ql-indent-6{counter-reset:list-7 list-8 list-9}.xform-custom-richtext .ql-editor ol li.ql-indent-7{counter-increment:list-7}.xform-custom-richtext .ql-editor ol li.ql-indent-7:before{content:counter(list-7,lower-alpha) \". \"}.xform-custom-richtext .ql-editor ol li.ql-indent-7{counter-reset:list-8 list-9}.xform-custom-richtext .ql-editor ol li.ql-indent-8{counter-increment:list-8}.xform-custom-richtext .ql-editor ol li.ql-indent-8:before{content:counter(list-8,lower-roman) \". \"}.xform-custom-richtext .ql-editor ol li.ql-indent-8{counter-reset:list-9}.xform-custom-richtext .ql-editor ol li.ql-indent-9{counter-increment:list-9}.xform-custom-richtext .ql-editor ol li.ql-indent-9:before{content:counter(list-9,decimal) \". \"}.xform-custom-richtext .ql-editor .ql-indent-1:not(.ql-direction-rtl){padding-left:3em}.xform-custom-richtext .ql-editor li.ql-indent-1:not(.ql-direction-rtl){padding-left:4.5em}.xform-custom-richtext .ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right{padding-right:3em}.xform-custom-richtext .ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right{padding-right:4.5em}.xform-custom-richtext .ql-editor .ql-indent-2:not(.ql-direction-rtl){padding-left:6em}.xform-custom-richtext .ql-editor li.ql-indent-2:not(.ql-direction-rtl){padding-left:7.5em}.xform-custom-richtext .ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right{padding-right:6em}.xform-custom-richtext .ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right{padding-right:7.5em}.xform-custom-richtext .ql-editor .ql-indent-3:not(.ql-direction-rtl){padding-left:9em}.xform-custom-richtext .ql-editor li.ql-indent-3:not(.ql-direction-rtl){padding-left:10.5em}.xform-custom-richtext .ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right{padding-right:9em}.xform-custom-richtext .ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right{padding-right:10.5em}.xform-custom-richtext .ql-editor .ql-indent-4:not(.ql-direction-rtl){padding-left:12em}.xform-custom-richtext .ql-editor li.ql-indent-4:not(.ql-direction-rtl){padding-left:13.5em}.xform-custom-richtext .ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right{padding-right:12em}.xform-custom-richtext .ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right{padding-right:13.5em}.xform-custom-richtext .ql-editor .ql-indent-5:not(.ql-direction-rtl){padding-left:15em}.xform-custom-richtext .ql-editor li.ql-indent-5:not(.ql-direction-rtl){padding-left:16.5em}.xform-custom-richtext .ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right{padding-right:15em}.xform-custom-richtext .ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right{padding-right:16.5em}.xform-custom-richtext .ql-editor .ql-indent-6:not(.ql-direction-rtl){padding-left:18em}.xform-custom-richtext .ql-editor li.ql-indent-6:not(.ql-direction-rtl){padding-left:19.5em}.xform-custom-richtext .ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right{padding-right:18em}.xform-custom-richtext .ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right{padding-right:19.5em}.xform-custom-richtext .ql-editor .ql-indent-7:not(.ql-direction-rtl){padding-left:21em}.xform-custom-richtext .ql-editor li.ql-indent-7:not(.ql-direction-rtl){padding-left:22.5em}.xform-custom-richtext .ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right{padding-right:21em}.xform-custom-richtext .ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right{padding-right:22.5em}.xform-custom-richtext .ql-editor .ql-indent-8:not(.ql-direction-rtl){padding-left:24em}.xform-custom-richtext .ql-editor li.ql-indent-8:not(.ql-direction-rtl){padding-left:25.5em}.xform-custom-richtext .ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right{padding-right:24em}.xform-custom-richtext .ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right{padding-right:25.5em}.xform-custom-richtext .ql-editor .ql-indent-9:not(.ql-direction-rtl){padding-left:27em}.xform-custom-richtext .ql-editor li.ql-indent-9:not(.ql-direction-rtl){padding-left:28.5em}.xform-custom-richtext .ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right{padding-right:27em}.xform-custom-richtext .ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right{padding-right:28.5em}.xform-custom-richtext .ql-editor .ql-video{display:block;max-width:100%}.xform-custom-richtext .ql-editor .ql-video.ql-align-center{margin:0 auto}.xform-custom-richtext .ql-editor .ql-video.ql-align-right{margin:0 0 0 auto}.xform-custom-richtext .ql-editor .ql-bg-black{background-color:#000}.xform-custom-richtext .ql-editor .ql-bg-red{background-color:#e60000}.xform-custom-richtext .ql-editor .ql-bg-orange{background-color:#f90}.xform-custom-richtext .ql-editor .ql-bg-yellow{background-color:#ff0}.xform-custom-richtext .ql-editor .ql-bg-green{background-color:#008a00}.xform-custom-richtext .ql-editor .ql-bg-blue{background-color:#06c}.xform-custom-richtext .ql-editor .ql-bg-purple{background-color:#93f}.xform-custom-richtext .ql-editor .ql-color-white{color:#fff}.xform-custom-richtext .ql-editor .ql-color-red{color:#e60000}.xform-custom-richtext .ql-editor .ql-color-orange{color:#f90}.xform-custom-richtext .ql-editor .ql-color-yellow{color:#ff0}.xform-custom-richtext .ql-editor .ql-color-green{color:#008a00}.xform-custom-richtext .ql-editor .ql-color-blue{color:#06c}.xform-custom-richtext .ql-editor .ql-color-purple{color:#93f}.xform-custom-richtext .ql-editor .ql-font-serif{font-family:Georgia,Times New Roman,serif}.xform-custom-richtext .ql-editor .ql-font-monospace{font-family:Monaco,Courier New,monospace}.xform-custom-richtext .ql-editor .ql-size-small{font-size:.75em}.xform-custom-richtext .ql-editor .ql-size-large{font-size:1.5em}.xform-custom-richtext .ql-editor .ql-size-huge{font-size:2.5em}.xform-custom-richtext .ql-editor .ql-direction-rtl{direction:rtl;text-align:inherit}.xform-custom-richtext .ql-editor .ql-align-center{text-align:center}.xform-custom-richtext .ql-editor .ql-align-justify{text-align:justify}.xform-custom-richtext .ql-editor .ql-align-right{text-align:right}.xform-custom-richtext .ql-editor.ql-blank:before{color:rgba(0,0,0,.6);content:attr(data-placeholder);font-style:italic;left:15px;pointer-events:none;position:absolute;right:15px}.xform-custom-richtext .ql-snow.ql-toolbar:after,.xform-custom-richtext .ql-snow .ql-toolbar:after{clear:both;content:\"\";display:table}.xform-custom-richtext .ql-snow.ql-toolbar button,.xform-custom-richtext .ql-snow .ql-toolbar button{background:none;border:none;cursor:pointer;display:inline-block;float:left;height:24px;padding:3px 5px;width:28px}.xform-custom-richtext .ql-snow.ql-toolbar button svg,.xform-custom-richtext .ql-snow .ql-toolbar button svg{float:left;height:100%}.xform-custom-richtext .ql-snow.ql-toolbar button:active:hover,.xform-custom-richtext .ql-snow .ql-toolbar button:active:hover{outline:none}.xform-custom-richtext .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill{fill:#444}.xform-custom-richtext .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,.xform-custom-richtext .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,.xform-custom-richtext .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,.xform-custom-richtext .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter{stroke:#444}.xform-custom-richtext .ql-snow.ql-toolbar input.ql-image[type=file],.xform-custom-richtext .ql-snow .ql-toolbar input.ql-image[type=file]{display:none}.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item.ql-selected,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item.ql-selected,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item:hover,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item:hover,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label.ql-active,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label.ql-active,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label:hover,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label:hover,.xform-custom-richtext .ql-snow.ql-toolbar button.ql-active,.xform-custom-richtext .ql-snow .ql-toolbar button.ql-active,.xform-custom-richtext .ql-snow.ql-toolbar button:focus,.xform-custom-richtext .ql-snow .ql-toolbar button:focus,.xform-custom-richtext .ql-snow.ql-toolbar button:hover,.xform-custom-richtext .ql-snow .ql-toolbar button:hover{color:#06c}.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar button.ql-active .ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar button.ql-active .ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar button:focus .ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar button:focus .ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar button:hover .ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar button:hover .ql-fill,.xform-custom-richtext .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,.xform-custom-richtext .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill{fill:#06c}.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,.xform-custom-richtext .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.xform-custom-richtext .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,.xform-custom-richtext .ql-snow.ql-toolbar button.ql-active .ql-stroke,.xform-custom-richtext .ql-snow .ql-toolbar button.ql-active .ql-stroke,.xform-custom-richtext .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,.xform-custom-richtext .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,.xform-custom-richtext .ql-snow.ql-toolbar button:focus .ql-stroke,.xform-custom-richtext .ql-snow .ql-toolbar button:focus .ql-stroke,.xform-custom-richtext .ql-snow.ql-toolbar button:focus .ql-stroke-miter,.xform-custom-richtext .ql-snow .ql-toolbar button:focus .ql-stroke-miter,.xform-custom-richtext .ql-snow.ql-toolbar button:hover .ql-stroke,.xform-custom-richtext .ql-snow .ql-toolbar button:hover .ql-stroke,.xform-custom-richtext .ql-snow.ql-toolbar button:hover .ql-stroke-miter,.xform-custom-richtext .ql-snow .ql-toolbar button:hover .ql-stroke-miter{stroke:#06c}@media (pointer:coarse){.xform-custom-richtext{button:hover;color:#444}}.xform-custom-richtext .ql-snow,.xform-custom-richtext .ql-snow *{box-sizing:border-box}.xform-custom-richtext .ql-snow .ql-hidden{display:none}.xform-custom-richtext .ql-snow .ql-out-bottom,.xform-custom-richtext .ql-snow .ql-out-top{visibility:hidden}.xform-custom-richtext .ql-snow .ql-tooltip{position:absolute;transform:translateY(10px)}.xform-custom-richtext .ql-snow .ql-tooltip a{cursor:pointer;text-decoration:none}.xform-custom-richtext .ql-snow .ql-tooltip a.ql-preview{display:inline-block;max-width:200px;overflow-x:hidden;text-overflow:ellipsis;vertical-align:top}.xform-custom-richtext .ql-snow .ql-tooltip a.ql-action:after{border-right:1px solid #ccc;content:\"Edit\";margin-left:16px;padding-right:8px}.xform-custom-richtext .ql-snow .ql-tooltip a.ql-remove:before{content:\"Remove\";margin-left:8px}.xform-custom-richtext .ql-snow .ql-tooltip.ql-flip{transform:translateY(-10px)}.xform-custom-richtext .ql-snow .ql-tooltip:before{content:\"Visit URL\";line-height:26px;margin-right:8px}.xform-custom-richtext .ql-snow .ql-tooltip input[type=text]{display:none;border:1px solid #ccc;font-size:13px;height:26px;margin:0;padding:3px 5px;width:170px}.xform-custom-richtext .ql-snow .ql-tooltip a{line-height:26px}.xform-custom-richtext .ql-snow .ql-tooltip.ql-editing a.ql-preview,.xform-custom-richtext .ql-snow .ql-tooltip.ql-editing a.ql-remove{display:none}.xform-custom-richtext .ql-snow .ql-tooltip.ql-editing input[type=text]{display:inline-block}.xform-custom-richtext .ql-snow .ql-tooltip.ql-editing a.ql-action:after{border-right:0;content:\"Save\";padding-right:0}.xform-custom-richtext .ql-snow .ql-tooltip[data-mode=link]:before{content:\"Enter link\"}.xform-custom-richtext .ql-snow .ql-tooltip[data-mode=formula]:before{content:\"Enter formula\"}.xform-custom-richtext .ql-snow .ql-tooltip[data-mode=video]:before{content:\"Enter video\"}.xform-custom-richtext .ql-snow .ql-formats{display:inline-block;vertical-align:middle}.xform-custom-richtext .ql-snow .ql-formats:after{clear:both;content:\"\";display:table}.xform-custom-richtext .ql-snow .ql-stroke{fill:none;stroke:#444;stroke-linecap:round;stroke-linejoin:round;stroke-width:2}.xform-custom-richtext .ql-snow .ql-stroke-miter{fill:none;stroke:#444;stroke-miterlimit:10;stroke-width:2}.xform-custom-richtext .ql-snow .ql-fill,.xform-custom-richtext .ql-snow .ql-stroke.ql-fill{fill:#444}.xform-custom-richtext .ql-snow .ql-empty{fill:none}.xform-custom-richtext .ql-snow .ql-even{fill-rule:evenodd}.xform-custom-richtext .ql-snow .ql-stroke.ql-thin,.xform-custom-richtext .ql-snow .ql-thin{stroke-width:1}.xform-custom-richtext .ql-snow .ql-transparent{opacity:.4}.xform-custom-richtext .ql-snow .ql-direction svg:last-child{display:none}.xform-custom-richtext .ql-snow .ql-direction.ql-active svg:last-child{display:inline}.xform-custom-richtext .ql-snow .ql-direction.ql-active svg:first-child{display:none}.xform-custom-richtext .ql-snow .ql-editor h1{font-size:2em}.xform-custom-richtext .ql-snow .ql-editor h2{font-size:1.5em}.xform-custom-richtext .ql-snow .ql-editor h3{font-size:1.17em}.xform-custom-richtext .ql-snow .ql-editor h4{font-size:1em}.xform-custom-richtext .ql-snow .ql-editor h5{font-size:.83em}.xform-custom-richtext .ql-snow .ql-editor h6{font-size:.67em}.xform-custom-richtext .ql-snow .ql-editor a{text-decoration:underline}.xform-custom-richtext .ql-snow .ql-editor blockquote{border-left:4px solid #ccc;margin-bottom:5px;margin-top:5px;padding-left:16px}.xform-custom-richtext .ql-snow .ql-editor code,.xform-custom-richtext .ql-snow .ql-editor pre{background-color:#f0f0f0;border-radius:3px}.xform-custom-richtext .ql-snow .ql-editor pre{white-space:pre-wrap;margin-bottom:5px;margin-top:5px;padding:5px 10px}.xform-custom-richtext .ql-snow .ql-editor pre.ql-syntax{background-color:#23241f;color:#f8f8f2;overflow:visible}.xform-custom-richtext .ql-snow .ql-editor code{font-size:85%;padding:2px 4px}.xform-custom-richtext .ql-snow .ql-editor img{max-width:100%}.xform-custom-richtext .ql-snow .ql-picker{color:#444;display:inline-block;float:left;font-size:14px;font-weight:500;height:24px;position:relative;vertical-align:middle}.xform-custom-richtext .ql-snow .ql-picker-label{cursor:pointer;display:inline-block;height:100%;padding-left:8px;padding-right:2px;position:relative;width:100%}.xform-custom-richtext .ql-snow .ql-picker-label:before{display:inline-block;line-height:22px}.xform-custom-richtext .ql-snow .ql-picker-options{background-color:#fff;display:none;min-width:100%;padding:4px 8px;position:absolute;white-space:nowrap}.xform-custom-richtext .ql-snow .ql-picker-options .ql-picker-item{cursor:pointer;display:block;padding-bottom:5px;padding-top:5px}.xform-custom-richtext .ql-snow .ql-picker.ql-expanded .ql-picker-label{color:#ccc;z-index:2}.xform-custom-richtext .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill{fill:#ccc}.xform-custom-richtext .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke{stroke:#ccc}.xform-custom-richtext .ql-snow .ql-picker.ql-expanded .ql-picker-options{display:block;margin-top:-1px;top:100%;z-index:1}.xform-custom-richtext .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg{position:absolute;margin-top:-9px;right:0;top:50%;width:18px}.xform-custom-richtext .ql-snow .ql-picker.ql-header{width:98px}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item:before,.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-label:before{content:\"Normal\"}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"1\"]:before{content:\"Heading 1\"}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"2\"]:before{content:\"Heading 2\"}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"3\"]:before{content:\"Heading 3\"}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"4\"]:before{content:\"Heading 4\"}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"5\"]:before{content:\"Heading 5\"}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"6\"]:before{content:\"Heading 6\"}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]:before{font-size:2em}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]:before{font-size:1.5em}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]:before{font-size:1.17em}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]:before{font-size:1em}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]:before{font-size:.83em}.xform-custom-richtext .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]:before{font-size:.67em}.xform-custom-richtext .ql-snow .ql-picker.ql-font{width:108px}.xform-custom-richtext .ql-snow .ql-picker.ql-font .ql-picker-item:before,.xform-custom-richtext .ql-snow .ql-picker.ql-font .ql-picker-label:before{content:\"Sans Serif\"}.xform-custom-richtext .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]:before{content:\"Serif\"}.xform-custom-richtext .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]:before{content:\"Monospace\"}.xform-custom-richtext .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]:before{font-family:Georgia,Times New Roman,serif}.xform-custom-richtext .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]:before{font-family:Monaco,Courier New,monospace}.xform-custom-richtext .ql-snow .ql-picker.ql-size{width:98px}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label:before{content:\"Normal\"}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]:before{content:\"Small\"}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]:before{content:\"Large\"}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]:before{content:\"Huge\"}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]:before{font-size:10px}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]:before{font-size:18px}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]:before{font-size:32px}.xform-custom-richtext .ql-snow .ql-color-picker,.xform-custom-richtext .ql-snow .ql-icon-picker{width:28px}.xform-custom-richtext .ql-snow .ql-color-picker .ql-picker-label,.xform-custom-richtext .ql-snow .ql-icon-picker .ql-picker-label{padding:2px 4px}.xform-custom-richtext .ql-snow .ql-color-picker .ql-picker-label svg,.xform-custom-richtext .ql-snow .ql-icon-picker .ql-picker-label svg{right:4px}.xform-custom-richtext .ql-snow .ql-icon-picker .ql-picker-options{padding:4px 0}.xform-custom-richtext .ql-snow .ql-icon-picker .ql-picker-item{height:24px;width:24px;padding:2px 4px}.xform-custom-richtext .ql-snow .ql-color-picker .ql-picker-options{padding:3px 5px;width:152px}.xform-custom-richtext .ql-snow .ql-color-picker .ql-picker-item{border:1px solid transparent;float:left;height:16px;margin:2px;padding:0;width:16px}.xform-custom-richtext .ql-snow .ql-color-picker.ql-background .ql-picker-item{background-color:#fff}.xform-custom-richtext .ql-snow .ql-color-picker.ql-color .ql-picker-item{background-color:#000}.xform-custom-richtext .ql-snow .ql-tooltip{background-color:#fff;border:1px solid #ccc;box-shadow:0 0 5px #ddd;color:#444;padding:5px 12px;white-space:nowrap}.xform-custom-richtext .ql-snow a{color:#06c}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=\"\"]):before{content:attr(data-label)}.xform-custom-richtext .ql-toolbar.ql-snow{border:1px solid #ccc;box-sizing:border-box;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;padding:8px}.xform-custom-richtext .ql-toolbar.ql-snow .ql-formats{margin-right:15px}.xform-custom-richtext .ql-toolbar.ql-snow .ql-picker-label{border:1px solid transparent}.xform-custom-richtext .ql-toolbar.ql-snow .ql-picker-options{border:1px solid transparent;box-shadow:0 2px 8px rgba(0,0,0,.2)}.xform-custom-richtext .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label,.xform-custom-richtext .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options{border-color:#ccc}.xform-custom-richtext .ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,.xform-custom-richtext .ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover{border-color:#000}.xform-custom-richtext .ql-toolbar.ql-snow+.ql-container.ql-snow{border-top:0}.xform-custom-richtext .ql-container.ql-snow{border:1px solid #ccc}.xform-custom-richtext .ql-container{height:200px;max-height:400px;overflow:auto}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=\"10px\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=\"10px\"]:before{content:\"10px\";font-size:10px}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=\"12px\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=\"12px\"]:before{content:\"12px\";font-size:12px}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=\"14px\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=\"14px\"]:before{content:\"14px\";font-size:14px}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=\"16px\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=\"16px\"]:before{content:\"16px\";font-size:16px}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=\"18px\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=\"18px\"]:before{content:\"18px\";font-size:18px}.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=\"20px\"]:before,.xform-custom-richtext .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=\"20px\"]:before{content:\"20px\";font-size:20px}");

var CustomRichText = /*#__PURE__*/function (_Component) {
  _inherits(CustomRichText, _Component);

  var _super = _createSuper(CustomRichText);

  function CustomRichText(props) {
    var _this;

    _classCallCheck(this, CustomRichText);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "attachQuillRefs", function () {
      if (typeof _this.editorRef.current.getEditor !== 'function') return;
      _this.editor = _this.editorRef.current.getEditor();
    });

    _this.editor = null;
    _this.editorRef = /*#__PURE__*/_react["default"].createRef();
    _this.attachQuillRefs = _this.attachQuillRefs.bind(_assertThisInitialized(_this));
    _this.handleEditorChange = _this.handleEditorChange.bind(_assertThisInitialized(_this));
    _this.uploadImage = _this.uploadImage.bind(_assertThisInitialized(_this));
    _this.insertToEditor = _this.insertToEditor.bind(_assertThisInitialized(_this));
    _this.state = {
      htmlValue: props.value
    };
    return _this;
  }

  _createClass(CustomRichText, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'richtext');
      this.attachQuillRefs(); // 为编辑器toolbar植入handler

      this.editor.getModule('toolbar').addHandler('image', function () {
        _this2.uploadImage();
      });
    } // static getDerivedStateFromProps(nextProps, state) {
    //     if (nextProps.value !== state.htmlValue) {
    //         return {
    //             htmlValue: nextProps.value
    //         };
    //     }
    //     return null;
    // }

  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          htmlValue: nextProps.value
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.attachQuillRefs();
    }
  }, {
    key: "handleEditorChange",
    value: function handleEditorChange(value) {
      var _this$props = this.props,
          onChange = _this$props.onChange,
          formContext = _this$props.formContext;
      var customUploadRequest = formContext.customUploadRequest;
      var temp1 = this.getUrlGroup(value) || [];
      var temp2 = this.getUrlGroup(this.state.htmlValue) || [];
      temp2.length > 0 && temp2.map(function (item1) {
        if (!temp1.find(function (item2) {
          return item2 == item1;
        })) {
          var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          var url = item1.match(srcReg)[1];
          customUploadRequest({
            url: url
          }, 'delete');
        }
      });
      this.setState({
        htmlValue: value
      });
      onChange(value);
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
    key: "getUrlGroup",
    value: function getUrlGroup(htmlStr) {
      var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
      return htmlStr.match(reg);
      ;
    }
  }, {
    key: "uploadImage",
    value: function uploadImage() {
      var _this3 = this;

      var formContext = this.props.formContext;
      var customUploadRequest = formContext.customUploadRequest,
          messages = formContext.messages;
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click(); // Listen upload local image and save to server

      input.onchange = function () {
        var file = input.files[0]; // file type is only image.

        if (/^image\//.test(file.type)) {
          customUploadRequest(file, 'upload', 'picture', function (url) {
            _this3.insertToEditor(url);
          }, function (e) {
            _antd.message.error(file.name + messages[(0, _localeMessages.getMessageId)('xformUploadErrorTip')]);

            console.error(e);
          });
        } else {
          console.warn('You could only upload images.');
        }
      };
    }
    /**
     * insert image url to rich editor.
     *
     * @param {string} url
     */

  }, {
    key: "insertToEditor",
    value: function insertToEditor(url) {
      // push image url to rich editor.
      var range = this.editor.getSelection();
      this.editor.insertEmbed(range.index, 'image', url);
    }
  }, {
    key: "render",
    value: function render() {
      var options = this.props.options,
          disabled = this.props.disabled,
          readonly = this.props.readonly,
          placeholder = this.props.placeholder; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      }

      var htmlValue = this.state.htmlValue; // 为编辑器设置内联样式的html模式

      var SizeStyle = _reactQuill.Quill["import"]('attributors/style/size');

      SizeStyle.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];

      _reactQuill.Quill.register(SizeStyle, true); // const height = options.height || 200;
      // const maxHeight = options.maxHeight || 400;


      var toolbars;

      if (typeof options.toolbars !== 'undefined') {
        toolbars = [[{
          size: SizeStyle.whitelist
        }]].concat(options.toolbars);
      } else {
        toolbars = [[{
          size: SizeStyle.whitelist
        }], [{
          align: []
        }, 'direction'], ['bold', 'italic', 'underline', 'strike'], [{
          color: []
        }, {
          background: []
        }], [{
          script: 'super'
        }, {
          script: 'sub'
        }], ['blockquote', 'code-block'], [{
          list: 'ordered'
        }, {
          list: 'bullet'
        }, {
          indent: '-1'
        }, {
          indent: '+1'
        }], ['link', 'image'], ['clean']];
      }

      var modules = {
        toolbar: toolbars
      }; //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过

      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-richtext': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement(_reactQuill["default"], {
        ref: this.editorRef,
        theme: "snow",
        value: htmlValue,
        readOnly: readonly || disabled,
        placeholder: placeholder,
        modules: modules,
        onChange: this.handleEditorChange
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage));
    }
  }]);

  return CustomRichText;
}(_react.Component);

exports["default"] = CustomRichText;