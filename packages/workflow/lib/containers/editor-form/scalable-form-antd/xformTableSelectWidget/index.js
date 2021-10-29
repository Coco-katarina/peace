"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _$components = require("$components");

var _$utils = require("$utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _excluded = ["_errorType", "validate"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var onComposition = false; // cited from: https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

var CustomTableSelect = /*#__PURE__*/function (_Component) {
  _inherits(CustomTableSelect, _Component);

  var _super = _createSuper(CustomTableSelect);

  function CustomTableSelect(props) {
    var _this;

    _classCallCheck(this, CustomTableSelect);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleComposition", function (event) {
      var value = event.currentTarget.value;

      if (event.type === 'compositionend') {
        console.log('compositionend triggered!');
        onComposition = false; // fixed for Chrome v53+ and detect all Chrome
        // https://chromium.googlesource.com/chromium/src/
        // +/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/

        if (event.target instanceof HTMLInputElement && isChrome) {
          // fire onChange
          _this._handleFieldValueChange(value);
        }
      } else {
        onComposition = true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "showModal", function () {
      _this.setState({
        visible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOk", function (e) {
      var selectRowData = _this.state.selectRowData;
      var schema = _this.props.schema;
      var name = schema.tableData && schema.tableData.selectValue || 'name'; // console.log(e);

      _this.value = selectRowData.map(function (s) {
        return s[name];
      }).toString();

      _this.setState({
        visible: false,
        value: selectRowData.map(function (s) {
          return s[name];
        }).toString()
      });

      var changeValue = selectRowData;

      if (schema.tableData && schema.tableData.selectType == 'radio') {
        changeValue = selectRowData[0];
      }

      if (!onComposition) {
        if (_this.timer !== null) {
          window.clearTimeout(_this.timer);
          _this.timer = window.setTimeout(function () {
            _this._handleFieldValueChange(changeValue);
          }, 100);
        } else {
          _this.timer = window.setTimeout(function () {
            _this._handleFieldValueChange(changeValue);
          }, 100);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (e) {
      // console.log(e);
      _this.setState({
        visible: false,
        data: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectChange", function (selectedRowKeys, selectRow) {
      //console.log(selectedRowKeys,selectRow)
      var schema = _this.props.schema;
      var name = schema.tableData && schema.tableData.selectValue || 'name';

      _this.setState({
        selectedRowKeys: selectedRowKeys,
        selectRowData: selectRow
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchClick", function (_ref) {
      var keywords = _ref.keywords;
      var schema = _this.props.schema;
      var tableData = schema.tableData && schema.tableData.data;
      var name = schema.tableData && schema.tableData.selectValue || 'name';
      var value = keywords ? keywords.toLowerCase() : '';
      var filterData = tableData.filter(function (item) {
        return item[name] && (item[name].includes(value) || _$utils.PinyinHelper.isPinyinMatched(item[name], value));
      });

      _this.setState({
        data: filterData
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderTable", function (_ref2) {
      var columns = _ref2.columns,
          selectType = _ref2.selectType,
          selectValue = _ref2.selectValue,
          data = _ref2.data;
      var _this$state = _this.state,
          selectedRowKeys = _this$state.selectedRowKeys,
          tableData = _this$state.data;
      var rowSelection = {
        type: selectType,
        selectedRowKeys: selectedRowKeys,
        onChange: _this.onSelectChange
      };
      var searchFormLists = [{
        field: 'keywords',
        type: 'INPUT',
        label: '关键字',
        labelSpan: 24
      }];
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_$components.Search, {
        showNumber: 1,
        formList: searchFormLists,
        onSearch: _this.onSearchClick,
        colSpan: {
          label: 16,
          button: 4
        }
      }), /*#__PURE__*/_react["default"].createElement(_antd.Table, {
        rowKey: "id",
        dataSource: tableData ? tableData : data,
        columns: columns,
        rowSelection: rowSelection,
        size: "small"
      }));
    });

    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleComposition = _this.handleComposition.bind(_assertThisInitialized(_this));
    _this._handleFieldValueChange = _this._handleFieldValueChange.bind(_assertThisInitialized(_this));
    _this.timer = null;
    var _schema = props.schema;

    var _name = _schema.tableData && _schema.tableData.selectValue || 'name';

    var newValue = Array.isArray(props.value) ? props.value.map(function (s) {
      return s[_name];
    }).toString() : _typeof(props.value) === 'object' ? props.value[_name] : props.value;
    _this.value = newValue || '';
    _this.state = {
      value: newValue || '',
      valueName: '',
      visible: false,
      selectedRowKeys: [],
      data: null,
      selectRowData: null
    };
    return _this;
  }

  _createClass(CustomTableSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var logger = this.props.formContext.logger;
      logger.logEvent('widget', 'show', 'input'); // this.setState({
      //     visible: false,
      // })
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var schema = this.props.schema;
      var name = schema.tableData && schema.tableData.selectValue || 'name';

      if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
        var newValue = Array.isArray(nextProps.value) ? nextProps.value.map(function (s) {
          return s[name];
        }).toString() : _typeof(nextProps.value) === 'object' ? nextProps.value[name] : nextProps.value;
        this.value = newValue || '';
        this.setState({
          value: newValue || ''
        });
      }
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
    key: "handleChange",
    value: function handleChange(event) {
      var _this2 = this;

      var value = event.currentTarget.value;
      this.value = value;
      this.setState({
        value: value
      });

      if (!onComposition) {
        if (this.timer !== null) {
          window.clearTimeout(this.timer);
          this.timer = window.setTimeout(function () {
            _this2._handleFieldValueChange(_this2.value);
          }, 100);
        } else {
          this.timer = window.setTimeout(function () {
            _this2._handleFieldValueChange(_this2.value);
          }, 100);
        }
      }
    }
  }, {
    key: "_handleFieldValueChange",
    value: function _handleFieldValueChange(value) {
      var onChange = this.props.onChange;
      onChange(value);
    } //过滤掉react-json-schema中注入option中的属性，防止这部分属性添加到组件上

  }, {
    key: "_filterSystemOptions",
    value: function _filterSystemOptions(options) {
      var BLACK_LIST = ['enumOptions', 'disabled', 'readonly', 'help', 'emptyValue'];
      BLACK_LIST.map(function (name) {
        if (options.hasOwnProperty(name)) {
          delete options[name];
        }
      });
      return options;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var schema = this.props.schema;
      var options = this.props.options;
      var readonly = this.props.readonly,
          autofocus = this.props.autofocus,
          disabled = this.props.disabled,
          placeholder = this.props.placeholder,
          value = this.state.value,
          valueName = this.state.valueName,
          tableData = schema.tableData || null; //判断节点禁用属性

      var formContext = this.props.formContext;
      var disnodes = options.disnodes || null;

      if (formContext.currentNode && Array.isArray(disnodes)) {
        if (disnodes.indexOf(formContext.currentNode) > -1) {
          disabled = true;
        }
      } //解析schema中的约定maxlength


      var maxLength = schema.maxLength;
      var minLength = schema.minLength; //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过

      var validateMessage = '';

      var _errorType = options._errorType,
          validate = options.validate,
          otherOptions = _objectWithoutProperties(options, _excluded);

      otherOptions = this._filterSystemOptions(otherOptions);
      _errorType = _errorType || '';

      if (_errorType !== '' && typeof validate !== 'undefined') {
        validateMessage = this._getValidateMessage(_errorType, validate);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          'ant-form-item-control': true,
          'xform-custom-widget': true,
          'xform-custom-input': true,
          'has-error': _errorType !== ''
        })
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, _extends({
        type: "text",
        maxLength: maxLength || Infinity,
        minLength: minLength || 0,
        placeholder: placeholder,
        value: value,
        readOnly: true,
        disabled: disabled,
        autoFocus: autofocus,
        onChange: this.handleChange,
        onCompositionStart: this.handleComposition,
        onCompositionUpdate: this.handleComposition,
        onCompositionEnd: this.handleComposition
      }, otherOptions, {
        onClick: function onClick(e) {
          return _this3.showModal(e);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-form-explain"
      }, validateMessage), /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        centered: true,
        title: placeholder,
        visible: this.state.visible //maskClosable={false}
        ,
        destroyOnClose: true,
        onOk: this.handleOk //confirmLoading={this.state.confirmLoading}
        ,
        onCancel: this.handleCancel
      }, tableData ? this.renderTable(tableData) : /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          width: '100%',
          textAlign: 'center'
        }
      }, "\u6682\u65E0\u6570\u636E")));
    }
  }]);

  return CustomTableSelect;
}(_react.Component);

exports["default"] = CustomTableSelect;