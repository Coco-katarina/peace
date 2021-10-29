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

var _reactIf = require("react-if");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var CustomTagWidget = /*#__PURE__*/function (_Component) {
  _inherits(CustomTagWidget, _Component);

  var _super = _createSuper(CustomTagWidget);

  function CustomTagWidget(props) {
    var _this;

    _classCallCheck(this, CustomTagWidget);

    _this = _super.call(this, props);
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
    _this.showInput = _this.showInput.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleInputConfirm = _this.handleInputConfirm.bind(_assertThisInitialized(_this));
    _this.tagInput = /*#__PURE__*/_react["default"].createRef();
    _this.state = {
      tags: [],
      inputVisible: false,
      inputValue: ''
    };
    return _this;
  }

  _createClass(CustomTagWidget, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var schema = this.props.schema;
      var values = this.props.value;

      if (typeof schema.data !== 'undefined') {
        var tags = schema.data;
        this.setState({
          tags: tags
        });
      } else {
        // 如果没有数据源，则通过value来还原tags
        var _tags = [];
        values.map(function (value) {
          _tags.push({
            label: value,
            value: value,
            removable: true
          });
        });
        this.setState({
          tags: _tags
        });
      }

      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'tag');
    }
  }, {
    key: "handleClose",
    value: function handleClose(removedTag) {
      var onChange = this.props.onChange;
      var tags = this.state.tags.filter(function (tag) {
        return tag.value !== removedTag.value;
      });
      var values = [];
      tags.map(function (tag) {
        values.push(tag.value);
      });
      this.setState({
        tags: tags
      });
      onChange(values);
    }
  }, {
    key: "showInput",
    value: function showInput() {
      var _this2 = this;

      this.setState({
        inputVisible: true
      }, function () {
        // 兼容测试文件无法找到focus函数
        _this2.tagInput.current.focus ? _this2.tagInput.current.focus() : function () {};
      });
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(e) {
      this.setState({
        inputValue: e.target.value
      });
    }
  }, {
    key: "handleInputConfirm",
    value: function handleInputConfirm() {
      var state = this.state;
      var inputValue = state.inputValue;
      var onChange = this.props.onChange;
      var tags = state.tags;
      var values = [];
      tags.map(function (tag) {
        values.push(tag.value);
      });

      if (inputValue && values.indexOf(inputValue) === -1) {
        tags = [].concat(_toConsumableArray(tags), [{
          label: inputValue,
          value: inputValue,
          removable: true
        }]);
        values = [].concat(_toConsumableArray(values), [inputValue]);
      }

      this.setState({
        tags: tags,
        inputVisible: false,
        inputValue: ''
      });
      onChange(values);
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
    key: "render",
    value: function render() {
      var _this3 = this;

      var options = this.props.options;
      var tagEditable = options.addTag || false;
      var _this$state = this.state,
          tags = _this$state.tags,
          inputVisible = _this$state.inputVisible,
          inputValue = _this$state.inputValue;
      var disabled = this.props.disabled;
      var readonly = this.props.readonly; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      } //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过


      var validateMessage = '';

      var _errorType = options._errorType || '';

      if (_errorType !== '' && typeof options.validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, options.validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-tag': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.If, {
        condition: tagEditable && !disabled && !readonly
      }, /*#__PURE__*/_react["default"].createElement(_reactIf.Then, null, /*#__PURE__*/_react["default"].createElement("div", null, tags.map(function (tag, index) {
        var value = tag.value;
        var closable = tag.removable;
        var isLongTag = value.length > 20;

        var tagElem = /*#__PURE__*/_react["default"].createElement(_antd.Tag, {
          key: index,
          closable: closable,
          afterClose: function afterClose() {
            return _this3.handleClose(tag);
          }
        }, isLongTag ? value.slice(0, 20) + '...' : value);

        return isLongTag ? /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
          title: value
        }, tagElem) : tagElem;
      }), inputVisible && /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        style: {
          width: 100
        },
        ref: this.tagInput,
        type: "text",
        size: "small",
        value: inputValue,
        onChange: this.handleInputChange,
        onBlur: this.handleInputConfirm,
        onPressEnter: this.handleInputConfirm
      }), !inputVisible && /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        size: "small",
        type: "dashed",
        onClick: this.showInput
      }, "\u6DFB\u52A0\u6807\u7B7E"))), /*#__PURE__*/_react["default"].createElement(_reactIf.Else, null, function () {
        return /*#__PURE__*/_react["default"].createElement("div", null, tags.map(function (tag, index) {
          var value = tag.value; // 只读或禁用模式下都不能删除

          var closable = false;
          var isLongTag = value.length > 20;

          var tagElem = /*#__PURE__*/_react["default"].createElement(_antd.Tag, {
            key: index,
            closable: closable,
            afterClose: function afterClose() {
              return _this3.handleClose(tag);
            }
          }, isLongTag ? value.slice(0, 20) + '...' : value);

          return isLongTag ? /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
            title: value
          }, tagElem) : tagElem;
        }));
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage));
    }
  }]);

  return CustomTagWidget;
}(_react.Component);

exports["default"] = CustomTagWidget;