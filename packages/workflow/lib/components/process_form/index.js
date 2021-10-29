/** 
 * Created by Xumeng 2020/07/06.
 * 流程表单渲染通用组件 
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../../containers/editor-form/scalable-form-antd/index"));

var _utils = require("@peace/utils");

var _$utils = require("$utils");

var _moment = _interopRequireDefault(require("moment"));

var _excluded = ["uiSchema"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var ProcessForm = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ProcessForm, _React$PureComponent);

  var _super = _createSuper(ProcessForm);

  function ProcessForm(props) {
    var _this;

    _classCallCheck(this, ProcessForm);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleXformChange", function (formData, bizData) {//let { uiSchema, ...formValues } = formData;
      //console.log('Xform Changed!', formData);
      //console.log('Xform Changed!', bizData);
    });

    _defineProperty(_assertThisInitialized(_this), "getListItemTitles", function (formValues) {
      var listShowItems = {};
      var _this$props = _this.props,
          formSchema = _this$props.formSchema,
          listItemTitles = _this$props.listItemTitles;

      if (Array.isArray(listItemTitles) && listItemTitles.length > 0) {
        var _loop = function _loop(key, value) {
          if (_typeof(value) === 'object') {
            if (Array.isArray(value)) {
              if (_typeof(value[0]) === 'object') {
                if (listItemTitles.some(function (item) {
                  return value[0].hasOwnProperty(item);
                })) {
                  listShowItems[key] = value;
                }
              }
            } else {
              listItemTitles.map(function (item) {
                if (value.hasOwnProperty(item)) {
                  listShowItems[item] = value[item];
                }
              });
            }
          } else {
            if (listItemTitles.includes(key)) {
              listShowItems[key] = value;
            }
          }
        };

        for (var _i = 0, _Object$entries = Object.entries(formValues); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          _loop(key, value);
        }
      }

      return listShowItems;
    });

    _defineProperty(_assertThisInitialized(_this), "handleXformSubmit", function (formData, bizData) {
      console.log('Xform Submitted!', formData); //console.log('Xform Submitted!', bizData);

      var uiSchema = formData.uiSchema,
          formValues = _objectWithoutProperties(formData, _excluded);

      if (_this.props.onFormSubmit) {
        _this.props.onFormSubmit(formValues);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBtnClick", function (behavior, options) {
      //console.log(behavior,options)
      _this.behaviorUrl = options.behaviorUrl ? options.behaviorUrl : null;

      switch (behavior) {
        case '取消':
          if (_this.props.onCancel) {
            _this.props.onCancel();
          }

          break;

        case '弹出控件组':
          if (_this.props.onPopView) {
            _this.props.onPopView(options);
          }

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultValuesFormData", function (bizData, formData, sequence) {
      var _loop2 = function _loop2(key, value) {
        if (value.type === 'date') {
          if (formData.hasOwnProperty(key)) {
            formData[key] = (0, _moment["default"])().format('YYYY-MM-DD');
          } else {
            var group = sequence.find(function (v) {
              return v.code == key;
            }) ? sequence.find(function (v) {
              return v.code == key;
            }).group : null;

            if (group) {
              if (Array.isArray(formData[group]) && formData[group].length === 1) {
                formData[group][0][key] = (0, _moment["default"])().format('YYYY-MM-DD');
              } else {
                formData[group][key] = (0, _moment["default"])().format('YYYY-MM-DD');
              }
            }
          }
        }
      };

      for (var _i2 = 0, _Object$entries2 = Object.entries(bizData); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            key = _Object$entries2$_i[0],
            value = _Object$entries2$_i[1];

        _loop2(key, value);
      }

      return formData;
    });

    _defineProperty(_assertThisInitialized(_this), "uploadhander", function (file, action, uploadType, getUrl) {
      var RouteTable = _$utils.WebAPI.RouteTable;

      if (action == 'upload') {
        var formData = new FormData();
        formData.append('file', file);
        var type = uploadType == 'picture' || uploadType == 'picture-inline' || uploadType == 'picture-card' ? 'image' : 'project';

        _utils.RouteRequest.post(RouteTable.fileUpload, formData, {
          type: type
        }).then(function (res) {
          if (res && res.filename) {
            getUrl(res.filename.replace(/\\/g, '/'));
          }
        }, function (err) {
          getUrl('');
        });
      } else {
        _utils.RouteRequest["delete"](RouteTable.cleanUpUploadTrash, {
          url: file.url
        });
      }
    });

    _this.state = {
      formData: null,
      formSchema: null
    };
    _this.behaviorUrl = null;
    _this.xform = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  _createClass(ProcessForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var onCurrentRef = this.props.onCurrentRef;
      onCurrentRef && onCurrentRef(this.xform.current);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          formSchema = _this$props2.formSchema,
          currentNode = _this$props2.currentNode,
          extFormSchema = _this$props2.extFormSchema,
          extType = _this$props2.extType,
          formItemLayout = _this$props2.formItemLayout;

      var _ref = formSchema || {},
          _ref$jsonSchema = _ref.jsonSchema,
          jsonSchema = _ref$jsonSchema === void 0 ? {} : _ref$jsonSchema,
          _ref$uiSchema = _ref.uiSchema,
          uiSchema = _ref$uiSchema === void 0 ? {} : _ref$uiSchema,
          _ref$formData = _ref.formData,
          formData = _ref$formData === void 0 ? {} : _ref$formData,
          _ref$bizData = _ref.bizData,
          bizData = _ref$bizData === void 0 ? {} : _ref$bizData,
          _ref$sequence = _ref.sequence,
          sequence = _ref$sequence === void 0 ? [] : _ref$sequence;

      var _ref2 = extFormSchema || {},
          _ref2$jsonSchema = _ref2.jsonSchema,
          extJsonSchema = _ref2$jsonSchema === void 0 ? {} : _ref2$jsonSchema,
          _ref2$uiSchema = _ref2.uiSchema,
          extUiSchema = _ref2$uiSchema === void 0 ? {} : _ref2$uiSchema,
          _ref2$formData = _ref2.formData,
          extFromData = _ref2$formData === void 0 ? {} : _ref2$formData,
          _ref2$bizData = _ref2.bizData,
          extBizData = _ref2$bizData === void 0 ? {} : _ref2$bizData,
          _ref2$sequence = _ref2.sequence,
          extSequence = _ref2$sequence === void 0 ? [] : _ref2$sequence;

      jsonSchema.properties = Object.assign({}, jsonSchema.properties, extJsonSchema);
      uiSchema = Object.assign({}, uiSchema, extUiSchema);
      formData = Object.assign({}, formData, extFromData);
      bizData = Object.assign({}, bizData, extBizData);

      if (!extType || extType == 'frist') {
        sequence = [].concat(extSequence, sequence);
      } else {
        sequence = [].concat(sequence, extSequence);
      }

      formData = this.getDefaultValuesFormData(bizData, formData, sequence);
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "xform-root-process"
      }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
        ref: this.xform,
        defaultSubmitButton: true,
        locale: "zh-cn",
        xtrackerCode: "xform-core-demo",
        popupContainer: function popupContainer() {
          return document.getElementById('xform-root-process');
        },
        alignType: "inline",
        labelAlign: "right",
        customUploadRequest: this.uploadhander,
        formItemLayout: formItemLayout ? formItemLayout : {
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 20
          }
        },
        formContext: {
          onClickCallBack: this.handleBtnClick,
          currentNode: currentNode
        },
        itemNumberInRow: 2,
        jsonSchema: jsonSchema,
        uiSchema: uiSchema,
        formData: this.state.formData ? this.state.formData : formData,
        bizData: bizData,
        sequence: sequence,
        onChange: this.handleXformChange,
        onSubmit: this.handleXformSubmit
      }));
    }
  }]);

  return ProcessForm;
}(_react["default"].PureComponent);

ProcessForm.propTypes = {
  formSchema: _propTypes["default"].object.isRequired,
  // json数据资源，包含 {jsonSchema,uiSchema,formData,bizData,sequence}
  extFormSchema: _propTypes["default"].object,
  // 额外的formSchema ，包含 {jsonSchema,uiSchema,formData,bizData,sequence}
  extType: _propTypes["default"].oneOf(['frist', 'last']),
  //额外的formSchema 插入方式， 只支持插入 最前面或者最后面
  currentNode: _propTypes["default"].string,
  //当前节点 
  onFormSubmit: _propTypes["default"].func,
  // 表单提交 回调函数
  onCancel: _propTypes["default"].func,
  // 表单取消 回调函数
  onPopView: _propTypes["default"].func,
  // 表单按钮弹出控件组 回调函数
  listItemTitles: _propTypes["default"].array //系统字段数组用于后续业务逻辑处理需要 例 ：['sealTitle', 'sealName']

};
var _default = ProcessForm;
exports["default"] = _default;