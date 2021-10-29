"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactJsonschemaForm = _interopRequireDefault(require("react-jsonschema-form"));

var _validate2 = require("./validate");

var _tools = require("./tools");

var _request = require("./request");

var _logger = _interopRequireDefault(require("../logger"));

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var XFORM_HIDDEN_CLASS = 'xform-hidden';
var XFORM_ROOT_CLASS = 'xform-root-container';
var debugMode = location.search.indexOf('xform-debug') > -1; //const debugMode = true

var formRenderTime;
var taskSuccess = false; // 表单提交任务是否完成，防止重复发送success类型的task埋点

var isFormDirty = false; // 表单是否是dirty状态
// 表单校验类型，'live'表示实时校验，'submit'表示表单提交前校验，主要用在判断只在提交校验的场景下才进行服务端校验

var validateType = 'submit'; // 表单初始formData，用来做表单重置

var initFormData = {};

var XFORM_ROOT_ELEMENT = function XFORM_ROOT_ELEMENT(triggerNode) {
  var parentNode = triggerNode;

  while (parentNode.tagName.toLowerCase() !== 'body') {
    parentNode = parentNode.parentNode;

    if (parentNode.className.indexOf(XFORM_ROOT_CLASS) > -1) {
      return parentNode;
    }
  }

  return document.body;
};

var deepCloneObject = function deepCloneObject(obj) {
  if (_typeof(obj) !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.concat();
  } else {
    return JSON.parse(JSON.stringify(obj));
  }
};

var XFormCore = /*#__PURE__*/function (_Component) {
  _inherits(XFormCore, _Component);

  var _super = _createSuper(XFormCore);

  function XFormCore(props) {
    var _this2;

    _classCallCheck(this, XFormCore);

    _this2 = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this2), "_showPopView", function (popWhat) {
      var hasPopCode = false;
      var popCode = '';
      var groupCode = [];
      var uiSchema = _this2.state.uiSchema;
      Object.keys(uiSchema).map(function (key) {
        if (uiSchema[key]['ui:widget'] == 'button' && uiSchema[key]['ui:options'] && uiSchema[key]['ui:options'].popCode && uiSchema[key]['ui:options'].popCode != '') {
          hasPopCode = true;
          popCode = uiSchema[key]['ui:options'].popCode;
        }

        if (uiSchema[key]['ui:widget'] && uiSchema[key]['ui:widget'] == 'group' || uiSchema[key]['items'] && uiSchema[key]['items']['ui:widget'] == 'group') {
          groupCode.push(key);
        }
      });

      if (hasPopCode && popCode != '' && groupCode.length > 0 && groupCode.filter(function (x) {
        return x == popCode;
      }).length > 0) {
        _this2.setState({
          popView: true,
          shouldPopCode: popWhat
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "_closePopView", function () {
      _this2.setState({
        popView: false,
        shouldPopCode: ''
      });
    });

    _this2._fieldHasDataSource = _this2._fieldHasDataSource.bind(_assertThisInitialized(_this2));
    _this2._isUpdateFieldsDataSource = _this2._isUpdateFieldsDataSource.bind(_assertThisInitialized(_this2));
    _this2._getFieldDataFromDataSource = _this2._getFieldDataFromDataSource.bind(_assertThisInitialized(_this2));
    _this2._fetchDataFromDataSource = _this2._fetchDataFromDataSource.bind(_assertThisInitialized(_this2));
    _this2._setAllFieldsBizData = _this2._setAllFieldsBizData.bind(_assertThisInitialized(_this2));
    _this2._setAllFieldsDisable = _this2._setAllFieldsDisable.bind(_assertThisInitialized(_this2));
    _this2._setAllFieldsReadonly = _this2._setAllFieldsReadonly.bind(_assertThisInitialized(_this2));
    _this2._setAllFieldsDisplayName = _this2._setAllFieldsDisplayName.bind(_assertThisInitialized(_this2));
    _this2._validate = _this2._validate.bind(_assertThisInitialized(_this2));
    _this2._validateField = _this2._validateField.bind(_assertThisInitialized(_this2));
    _this2._validateFieldSync = _this2._validateFieldSync.bind(_assertThisInitialized(_this2));
    _this2._updateFieldsData = _this2._updateFieldsData.bind(_assertThisInitialized(_this2));
    _this2._updateFieldsShow = _this2._updateFieldsShow.bind(_assertThisInitialized(_this2));
    _this2._shouldFieldHidden = _this2._shouldFieldHidden.bind(_assertThisInitialized(_this2));
    _this2._filterExportData = _this2._filterExportData.bind(_assertThisInitialized(_this2));
    _this2._handleXFormChange = _this2._handleXFormChange.bind(_assertThisInitialized(_this2));
    _this2._handleXFormSubmit = _this2._handleXFormSubmit.bind(_assertThisInitialized(_this2));
    _this2.validate = _this2.validate.bind(_assertThisInitialized(_this2));
    _this2.XFormSubmit = _this2.XFormSubmit.bind(_assertThisInitialized(_this2));
    _this2.XFormInitFormData = _this2.XFormInitFormData.bind(_assertThisInitialized(_this2));
    _this2.XFormReset = _this2.XFormReset.bind(_assertThisInitialized(_this2));
    _this2.XFormSetFormData = _this2.XFormSetFormData.bind(_assertThisInitialized(_this2));
    _this2.XFormCurrentFormData = _this2.XFormCurrentFormData.bind(_assertThisInitialized(_this2));
    _this2.XFormBizData = _this2.XFormBizData.bind(_assertThisInitialized(_this2));
    _this2.XFormValidate = _this2.XFormValidate.bind(_assertThisInitialized(_this2));
    _this2.XFormValidateSync = _this2.XFormValidateSync.bind(_assertThisInitialized(_this2));
    _this2.XFormFetchAllFromDataSource = _this2.XFormFetchAllFromDataSource.bind(_assertThisInitialized(_this2));
    _this2.XFormFetchFromDataSource = _this2.XFormFetchFromDataSource.bind(_assertThisInitialized(_this2));

    var logEvent = props.logEvent || function () {};

    _this2.logger = new _logger["default"](logEvent);
    _this2.state = {
      sequence: [],
      jsonSchema: {
        description: '',
        title: '',
        type: 'object',
        properties: {}
      },
      uiSchema: {},
      formData: {},
      bizData: {},
      popView: false,
      shouldPopCode: ''
    };
    return _this2;
  }

  _createClass(XFormCore, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      var _this3 = this;

      // 初始化xform schema
      var _this$props = this.props,
          env = _this$props.env,
          locale = _this$props.locale,
          formCode = _this$props.formCode,
          sequence = _this$props.sequence,
          jsonSchema = _this$props.jsonSchema,
          uiSchema = _this$props.uiSchema,
          formData = _this$props.formData,
          bizData = _this$props.bizData,
          customGateway = _this$props.customGateway,
          customInterfaces = _this$props.customInterfaces,
          mockInterfaces = _this$props.mockInterfaces,
          customInterfacesParams = _this$props.customInterfacesParams,
          onload = _this$props.onload;
      var fieldName, jsonSchemaProperties;
      var fetchSchemaParams = {},
          dataSourcePromises = [];
      this.logger.logPageView();

      if (typeof formCode === 'string' && formCode.length > 0) {
        if (typeof this.props.beforeSchemaFetch === 'function') {
          fetchSchemaParams = this.props.beforeSchemaFetch(formCode);
        } // 根据formCode获取schema，属性中对应的值优先


        _request.request.fetch(_request.request.getInterface('getSchemaByCode', customInterfaces, env, mockInterfaces), Object.assign({}, fetchSchemaParams, {
          formCode: formCode,
          lang: locale
        }, customInterfacesParams && customInterfacesParams.getSchemaByCode || {}), customGateway, env, {
          type: 'POST'
        }).then(function (data) {
          if (typeof data.jsonSchema !== 'undefined' && typeof data.uiSchema !== 'undefined' && typeof data.formData !== 'undefined' && typeof data.bizData !== 'undefined' && typeof data.sequence !== 'undefined') {
            jsonSchema = jsonSchema || data.jsonSchema;
            uiSchema = uiSchema || data.uiSchema;
            formData = typeof formData !== 'undefined' ? Object.assign({}, data.formData, formData) : data.formData;
            bizData = typeof bizData !== 'undefined' ? Object.assign({}, data.bizData, bizData) : data.bizData;
            sequence = sequence || data.sequence; // 保存初始formData

            initFormData = formData; // 在bizData中设置字段的初始disabled和readonly状态

            bizData = _this3._setAllFieldsBizData(bizData, uiSchema, jsonSchema);

            _this3.setState({
              jsonSchema: deepCloneObject(jsonSchema),
              uiSchema: deepCloneObject(uiSchema),
              formData: deepCloneObject(formData),
              bizData: deepCloneObject(bizData),
              sequence: deepCloneObject(sequence)
            }, function () {
              dataSourcePromises = []; // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形

              jsonSchemaProperties = jsonSchema.properties;

              for (fieldName in jsonSchemaProperties) {
                if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                  // 初始获取更新全部没有被配置联动的数据源
                  if (_this3._fieldHasDataSource(fieldName, jsonSchema) && !_this3._isUpdateFieldsDataSource(fieldName, uiSchema)) {
                    dataSourcePromises.push(_this3._getFieldDataFromDataSource(fieldName, true));
                  }
                }
              }

              Promise.all(dataSourcePromises).then(function (data) {
                data.map(function (resolveFormData) {
                  formData = Object.assign({}, formData, resolveFormData);
                });

                for (fieldName in jsonSchemaProperties) {
                  if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                    // 初始化级联数据源
                    if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {
                      _this3._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                    }
                  }
                }
              })["catch"](function (error) {
                console.warn(error);
              }); // 触发onload属性

              onload(formData, bizData);
            });

            if (debugMode) {
              console.log('formCode init formData', formData);
            }
          } else {
            console.warn('xform: getSchemaByCode接口返回缺乏必要的参数');

            _this3.logger.logException('xform.getSchemaByCode', true);
          }
        })["catch"](function (error) {
          console.warn('xform:获取xform schema接口失败：' + error.message);

          _this3.logger.logException('xform.getSchemaByCode', true);
        });
      } else if (typeof jsonSchema !== 'undefined' && typeof uiSchema !== 'undefined' && typeof formData !== 'undefined') {
        // 根据组件属性来初始化xform schema
        // 保存初始formData
        initFormData = formData; // 在bizData中设置字段的初始disabled和readonly状态

        bizData = this._setAllFieldsBizData(bizData, uiSchema, jsonSchema);
        this.setState({
          jsonSchema: deepCloneObject(jsonSchema),
          uiSchema: deepCloneObject(uiSchema),
          formData: deepCloneObject(formData),
          bizData: deepCloneObject(bizData),
          sequence: typeof sequence !== 'undefined' ? deepCloneObject(sequence) : []
        }, function () {
          dataSourcePromises = []; // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形

          jsonSchemaProperties = jsonSchema.properties;

          for (fieldName in jsonSchemaProperties) {
            if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
              // 初始获取更新全部没有被配置联动的数据源
              if (_this3._fieldHasDataSource(fieldName, jsonSchema) && !_this3._isUpdateFieldsDataSource(fieldName, uiSchema)) {
                dataSourcePromises.push(_this3._getFieldDataFromDataSource(fieldName, true));
              }
            }
          }

          Promise.all(dataSourcePromises).then(function (data) {
            data.map(function (resolveFormData) {
              formData = Object.assign({}, formData, resolveFormData);
            });

            for (fieldName in jsonSchemaProperties) {
              if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                // 初始化级联数据源
                if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {
                  _this3._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                }
              }
            }
          })["catch"](function (error) {
            console.warn(error);
          }); // 触发onload属性

          onload(formData, bizData);
        });

        if (debugMode) {
          console.log('schema init formData', formData);
        }
      } else {
        console.warn('xform: 至少传入formCode属性或jsonSchema、uiSchema、formData三个属性');
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // 发送表单Dirty率任务类型埋点
      this.logger.logTask('表单Dirty率'); // 记录xform渲染完成时间，用来计算表单填写计时

      formRenderTime = new Date().getTime(); // 所有form禁用Enter提交

      var formNodeListArray = Array.prototype.slice.call(document.querySelectorAll('form'));
      formNodeListArray.forEach(function (form) {
        form.onkeypress = function (event) {
          var txtArea = /textarea/i.test((event.target || event.srcElement).tagName);
          return txtArea || (event.keyCode || event.which || event.charCode || 0) !== 13;
        };
      });
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var onError = this.props.onError;

      if (typeof onError === 'function') {
        onError(error, info);
      }

      console.error('[xform-core] error', error);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this4 = this;

      var jsonSchema, uiSchema, formData, bizData, sequence;
      var fieldName, jsonSchemaProperties, prevFormData;
      var fetchSchemaParams = {},
          dataSourcePromises = [];
      var env = nextProps.env,
          locale = nextProps.locale,
          customInterfaces = nextProps.customInterfaces,
          mockInterfaces = nextProps.mockInterfaces,
          customGateway = nextProps.customGateway,
          customInterfacesParams = nextProps.customInterfacesParams,
          onload = nextProps.onload;

      if (nextProps.formCode !== '') {
        if (nextProps.formCode !== this.props.formCode) {
          if (debugMode) {
            console.log('formCode compare:', nextProps.formCode !== this.props.formCode);
            console.log('nextProps.formCode:', nextProps.formCode);
            console.log('this.props.formCode:', this.props.formCode);
          }

          if (typeof nextProps.beforeSchemaFetch === 'function') {
            fetchSchemaParams = nextProps.beforeSchemaFetch(nextProps.formCode);
          } // 根据formCode获取schema，属性中对应的值优先


          _request.request.fetch(_request.request.getInterface('getSchemaByCode', customInterfaces, env, mockInterfaces), Object.assign({}, fetchSchemaParams, {
            formCode: nextProps.formCode,
            lang: locale
          }, customInterfacesParams && customInterfacesParams.getSchemaByCode || {}), customGateway, env, {
            type: 'POST'
          }).then(function (data) {
            if (typeof data.jsonSchema !== 'undefined' && typeof data.uiSchema !== 'undefined' && typeof data.formData !== 'undefined' && typeof data.bizData !== 'undefined' && typeof data.sequence !== 'undefined') {
              jsonSchema = nextProps.jsonSchema || data.jsonSchema;
              uiSchema = nextProps.uiSchema || data.uiSchema;
              formData = typeof nextProps.formData !== 'undefined' ? Object.assign({}, data.formData, nextProps.formData) : data.formData;
              bizData = typeof nextProps.bizData !== 'undefined' ? Object.assign({}, data.bizData, nextProps.bizData) : data.bizData;
              sequence = nextProps.sequence || data.sequence; // 在bizData中设置字段的初始disabled和readonly状态

              bizData = _this4._setAllFieldsBizData(bizData, uiSchema, jsonSchema);

              _this4.setState({
                jsonSchema: deepCloneObject(jsonSchema),
                uiSchema: deepCloneObject(uiSchema),
                formData: deepCloneObject(formData),
                bizData: deepCloneObject(bizData),
                sequence: deepCloneObject(sequence)
              }, function () {
                // 更改了formCode，要触发数据源的更新
                dataSourcePromises = []; // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形

                jsonSchemaProperties = jsonSchema.properties;

                for (fieldName in jsonSchemaProperties) {
                  if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                    // 初始获取更新全部没有被配置联动的数据源
                    if (_this4._fieldHasDataSource(fieldName, jsonSchema) && !_this4._isUpdateFieldsDataSource(fieldName, uiSchema)) {
                      dataSourcePromises.push(_this4._getFieldDataFromDataSource(fieldName, true));
                    }
                  }
                }

                Promise.all(dataSourcePromises).then(function (data) {
                  data.map(function (resolveFormData) {
                    formData = Object.assign({}, formData, resolveFormData);
                  });

                  for (fieldName in jsonSchemaProperties) {
                    if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                      // 初始化级联数据源
                      if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {
                        _this4._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                      }
                    }
                  }
                })["catch"](function (error) {
                  console.warn(error);
                }); // 触发onload属性

                onload(formData, bizData);
              });

              if (debugMode) {
                console.log('formCode componentWillReceiveProps formData', formData);
              }
            } else {
              console.warn('xform: getSchemaByCode接口返回缺乏必要的参数');

              _this4.logger.logException('xform.getSchemaByCode', true);
            }
          })["catch"](function (error) {
            console.warn('xform:获取schema接口失败：' + error.message);

            _this4.logger.logException('xform.getSchemaByCode', true);
          });
        } else if (JSON.stringify(nextProps.formData) !== JSON.stringify(this.props.formData)) {
          // 使用formCode的场景，更新formData属性依旧要触发重渲染
          if (debugMode) {
            console.log('formData compare:', JSON.stringify(nextProps.formData) !== JSON.stringify(this.props.formData));
            console.log('nextProps.formData:', nextProps.formData);
            console.log('this.props.formData:', this.props.formData);
          }

          jsonSchema = this.state.jsonSchema;
          uiSchema = this.state.uiSchema;
          formData = nextProps.formData;
          prevFormData = this.props.formData || {};
          this.setState({
            formData: deepCloneObject(formData)
          }, function () {
            // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形
            jsonSchemaProperties = jsonSchema.properties;

            for (fieldName in jsonSchemaProperties) {
              if (jsonSchemaProperties.hasOwnProperty(fieldName) && formData[fieldName] !== prevFormData[fieldName]) {
                // 更新级联数据源（formData更新的场景，一定不是整个表单重加载，因而只需要触发级联数据源的更新）
                if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {
                  _this4._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                }
              }
            }
          });
        } else if (JSON.stringify(nextProps.bizData) !== JSON.stringify(this.props.bizData)) {
          // 使用formCode的场景，更新bizData属性依旧要触发重渲染
          if (debugMode) {
            console.log('bizData compare:', JSON.stringify(nextProps.bizData) !== JSON.stringify(this.props.bizData));
            console.log('nextProps.bizData:', nextProps.bizData);
            console.log('this.props.bizData:', this.props.bizData);
          }

          bizData = nextProps.bizData;
          this.setState({
            bizData: deepCloneObject(bizData)
          });
        } else if (JSON.stringify(nextProps.sequence) !== JSON.stringify(this.props.sequence)) {
          // 使用formCode的场景，更新sequence属性依旧要触发重渲染
          if (debugMode) {
            console.log('sequence compare:', JSON.stringify(nextProps.sequence) !== JSON.stringify(this.props.sequence));
            console.log('nextProps.sequence:', nextProps.sequence);
            console.log('this.props.sequence:', this.props.sequence);
          }

          sequence = nextProps.sequence;
          this.setState({
            sequence: deepCloneObject(sequence)
          });
        }
      } else {
        if (debugMode) {
          console.log('jsonSchema compare:', JSON.stringify(nextProps.jsonSchema) !== JSON.stringify(this.props.jsonSchema));
          console.log('uiSchema compare:', JSON.stringify(nextProps.uiSchema) !== JSON.stringify(this.props.uiSchema));
          console.log('formData compare:', JSON.stringify(nextProps.formData) !== JSON.stringify(this.props.formData));
          console.log('bizData compare:', JSON.stringify(nextProps.bizData) !== JSON.stringify(this.props.bizData));
          console.log('sequence compare:', JSON.stringify(nextProps.sequence) !== JSON.stringify(this.props.sequence));
        }

        jsonSchema = nextProps.jsonSchema;
        jsonSchemaProperties = jsonSchema.properties;
        uiSchema = nextProps.uiSchema;
        formData = nextProps.formData;
        bizData = nextProps.bizData;
        sequence = nextProps.sequence;
        prevFormData = this.props.formData || {}; // 在bizData中设置字段的初始disabled和readonly状态

        bizData = this._setAllFieldsBizData(bizData, uiSchema, jsonSchema);

        if (JSON.stringify(nextProps.jsonSchema) !== JSON.stringify(this.props.jsonSchema) || JSON.stringify(nextProps.uiSchema) !== JSON.stringify(this.props.uiSchema)) {
          this.setState({
            jsonSchema: deepCloneObject(jsonSchema),
            uiSchema: deepCloneObject(uiSchema),
            formData: deepCloneObject(formData),
            bizData: deepCloneObject(bizData),
            sequence: deepCloneObject(sequence)
          }, function () {
            // uiSchema的props更新了，这时全部数据源都要重新获取一遍
            dataSourcePromises = []; // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形

            for (fieldName in jsonSchemaProperties) {
              if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                // 初始获取更新全部没有被配置联动的数据源
                if (_this4._fieldHasDataSource(fieldName, jsonSchema) && !_this4._isUpdateFieldsDataSource(fieldName, uiSchema)) {
                  dataSourcePromises.push(_this4._getFieldDataFromDataSource(fieldName, true));
                }
              }
            }

            Promise.all(dataSourcePromises).then(function (data) {
              data.map(function (resolveFormData) {
                formData = Object.assign({}, formData, resolveFormData);
              });

              for (fieldName in jsonSchemaProperties) {
                if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
                  // 初始化级联数据源
                  if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {
                    _this4._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                  }
                }
              }
            })["catch"](function (error) {
              console.warn(error);
            }); // 触发onload属性

            onload(formData, bizData);
          });
        } else if (JSON.stringify(nextProps.formData) !== JSON.stringify(this.props.formData) || JSON.stringify(nextProps.bizData) !== JSON.stringify(this.props.bizData) || JSON.stringify(nextProps.sequence) !== JSON.stringify(this.props.sequence)) {
          this.setState({
            formData: deepCloneObject(formData),
            bizData: deepCloneObject(bizData),
            sequence: deepCloneObject(sequence)
          }, function () {
            // 这里要通过jsonSchema来进行字段遍历，只有jsonSchema中能够保证表单字段的完整性，其它字段都有可能会出现字段缺失的情形
            for (fieldName in jsonSchemaProperties) {
              if (jsonSchemaProperties.hasOwnProperty(fieldName) && formData[fieldName] !== prevFormData[fieldName]) {
                // 初始化级联数据源（formData更新的场景，一定不是整个表单重加载，因而只需要触发级联数据源的更新）
                if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {
                  _this4._updateFieldsData(fieldName, formData[fieldName], uiSchema[fieldName]['ui:options'].updateFields);
                }
              }
            }
          });
        }
      }
    } // 验证一个字段是否有配置数据源

  }, {
    key: "_fieldHasDataSource",
    value: function _fieldHasDataSource(fieldName, jsonSchema) {
      jsonSchema = jsonSchema || this.state.jsonSchema;
      var jsonSchemaProperties = jsonSchema.properties;
      var jsonSchemaContent = jsonSchemaProperties[fieldName];
      return _typeof(jsonSchemaContent) === 'object' && typeof jsonSchemaContent.dataSource === 'string' && jsonSchemaContent.dataSource !== '';
    } // 验证一个字段的数据源配置是否配置过数据源级联

  }, {
    key: "_isUpdateFieldsDataSource",
    value: function _isUpdateFieldsDataSource(name, uiSchema) {
      var result = false;
      uiSchema = uiSchema || this.state.uiSchema;

      for (var fieldName in uiSchema) {
        if (uiSchema.hasOwnProperty(fieldName)) {
          if (uiSchema[fieldName] && uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].updateFields && uiSchema[fieldName]['ui:options'].updateFields.length > 0) {
            if (uiSchema[fieldName]['ui:options'].updateFields.indexOf(name) > -1) {
              result = true;
            }
          }
        }
      }

      return result;
    } // 根据配置的数据源，返回field的数据并放置到jsonSchema的data中

  }, {
    key: "_getFieldDataFromDataSource",
    value: function _getFieldDataFromDataSource() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
      var returnPromise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // 检测fieldName是否配置了数据源
      var jsonSchema = this.state.jsonSchema;
      var jsonSchemaProperties = jsonSchema.properties;
      var fieldName, fieldValue;
      var promises = []; // 获取数据源数据并更新jsonSchema

      if (name === 'all') {
        for (fieldName in jsonSchemaProperties) {
          if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
            fieldValue = jsonSchemaProperties[fieldName];

            if (returnPromise) {
              promises.push(this._fetchDataFromDataSource(fieldName, fieldValue, {}, returnPromise));
            } else {
              this._fetchDataFromDataSource(fieldName, fieldValue);
            }
          }
        }

        return Promise.all(promises);
      } else {
        if (jsonSchemaProperties.hasOwnProperty(name)) {
          fieldName = name;
          fieldValue = jsonSchemaProperties[fieldName];

          if (returnPromise) {
            return this._fetchDataFromDataSource(fieldName, fieldValue, {}, returnPromise);
          } else {
            this._fetchDataFromDataSource(fieldName, fieldValue);
          }
        } else {
          console.warn('xform:_getFieldDataFromDataSource方法中传入的字段' + name + '未配置相应的jsonSchema');
        }
      }
    } // updateFieldsParams为联动数据源配置参数，主要是用来注入联动字段改变后的参数

  }, {
    key: "_fetchDataFromDataSource",
    value: function _fetchDataFromDataSource(fieldName, fieldValue) {
      var _this5 = this;

      var updateFieldsParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var returnPromise = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var fieldOptionProcessOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var promise = new Promise(function (resolve, reject) {
        var _this5$props = _this5.props,
            env = _this5$props.env,
            gateway = _this5$props.gateway,
            customGateway = _this5$props.customGateway,
            customInterfaces = _this5$props.customInterfaces,
            mockInterfaces = _this5$props.mockInterfaces,
            customInterfacesParams = _this5$props.customInterfacesParams,
            onChange = _this5$props.onChange;
        var _this5$state = _this5.state,
            jsonSchema = _this5$state.jsonSchema,
            uiSchema = _this5$state.uiSchema,
            formData = _this5$state.formData,
            bizData = _this5$state.bizData;

        var dataSourceServerUrl = _request.request.getInterface('dataSourceServerUrl', customInterfaces, env, mockInterfaces),
            dataSourceServerParams = {},
            overallParams = {};

        var dataSourceCode, defaultValue, help;

        if (typeof fieldValue !== 'undefined') {
          if (fieldValue.type === 'array' && !fieldValue.uniqueItems) {
            dataSourceCode = fieldValue.items.dataSource;
          } else {
            dataSourceCode = fieldValue.dataSource;
          }
        } // 兼容服务端mtop必须指定类型的缺陷


        if (fieldOptionProcessOnly) {
          defaultValue = null;
          help = null;
        } else {
          if (typeof formData[fieldName] !== 'string') {
            defaultValue = JSON.stringify(formData[fieldName]);
          } else {
            defaultValue = formData[fieldName];
          }

          help = uiSchema[fieldName] && uiSchema[fieldName]['ui:help'] || null;
        }

        if (typeof dataSourceCode !== 'undefined') {
          if (typeof _this5.props.beforeDataSourceFetch === 'function') {
            dataSourceServerParams = _this5.props.beforeDataSourceFetch(dataSourceCode, formData, bizData);
          } // 这里要针对mtop类型的网关场景做特殊处理（集团mtop不允许参数为Map类型！！！），这里是hack的代码，gateway属性不再对外披露


          if (gateway === 'mtop') {
            overallParams = {
              sourceCode: dataSourceCode,
              defaultValue: defaultValue,
              help: help,
              stringifyParams: JSON.stringify(Object.assign({}, formData, dataSourceServerParams, updateFieldsParams))
            };
          } else {
            overallParams = {
              sourceCode: dataSourceCode,
              defaultValue: defaultValue,
              help: help,
              params: Object.assign({}, formData, dataSourceServerParams, updateFieldsParams),
              stringifyParams: JSON.stringify(Object.assign({}, formData, dataSourceServerParams, updateFieldsParams))
            };
          }

          _request.request.fetch(dataSourceServerUrl, Object.assign({}, overallParams, customInterfacesParams && customInterfacesParams.dataSourceServerUrl || {}), customGateway, env, {
            type: 'POST'
          }).then(function (data) {
            // 注意数据源这里的逻辑！数据源更新操作要从state中重新获取一遍相关的schema数据再更新，防止出现被数据源更新的schema数据被回退
            var _this5$state2 = _this5.state,
                jsonSchema = _this5$state2.jsonSchema,
                uiSchema = _this5$state2.uiSchema,
                formData = _this5$state2.formData,
                bizData = _this5$state2.bizData;
            var jsonSchemaProperties = jsonSchema.properties;
            var jsonSchemaContent, uiSchemaContent;

            if (typeof fieldValue !== 'undefined') {
              if (fieldValue.type === 'array' && !fieldValue.uniqueItems) {
                jsonSchemaContent = fieldValue.items;
                uiSchemaContent = uiSchema[fieldName].items;
              } else {
                jsonSchemaContent = fieldValue;
                uiSchemaContent = uiSchema[fieldName];
              }
            }

            if (typeof data.data !== 'undefined' && data.data !== null) {
              // 更新jsonSchema中的数据源data字段
              jsonSchemaContent.data = data.data;
            }

            if (typeof data.defaultValue !== 'undefined' && data.defaultValue !== null) {
              if (typeof formData[fieldName] !== 'string') {
                if (typeof formData[fieldName] === 'boolean') {
                  formData[fieldName] = data.defaultValue === 'true';
                } else {
                  try {
                    formData[fieldName] = JSON.parse(data.defaultValue);
                  } catch (e) {
                    formData[fieldName] = data.defaultValue;
                  }
                }
              } else {
                formData[fieldName] = data.defaultValue;
              } // 通过数据源更新了formData，要触发onChange，保证组件使用方的数据一致性


              if (_typeof(bizData) !== 'object') {
                onChange(_this5._filterExportData(uiSchema, formData));
              } else {
                onChange(_this5._filterExportData(uiSchema, formData), _this5._filterExportData(uiSchema, bizData));
              }
            }

            if (typeof data.help !== 'undefined' && data.help !== null) {
              // 更新ui:help字段
              if (typeof uiSchemaContent !== 'undefined') {
                uiSchemaContent['ui:help'] = data.help;
              } else {
                uiSchemaContent = {
                  'ui:help': data.help
                };
              }
            }

            if (fieldValue.type === 'array' && !fieldValue.uniqueItems) {
              jsonSchemaProperties[fieldName].items = jsonSchemaContent;
              jsonSchema.properties = jsonSchemaProperties;
              uiSchema[fieldName].items = uiSchemaContent;
            } else {
              jsonSchemaProperties[fieldName] = jsonSchemaContent;
              jsonSchema.properties = jsonSchemaProperties;
              uiSchema[fieldName] = uiSchemaContent;
            }

            _this5.setState({
              jsonSchema: deepCloneObject(jsonSchema),
              uiSchema: deepCloneObject(uiSchema),
              formData: deepCloneObject(formData)
            }, function () {
              resolve(_defineProperty({}, fieldName, formData[fieldName]));
            });
          })["catch"](function (error) {
            // 注意数据源这里的逻辑！数据源更新操作要从state中重新获取一遍相关的schema数据再更新，防止出现被数据源更新的schema数据被回退
            var _this5$state3 = _this5.state,
                jsonSchema = _this5$state3.jsonSchema,
                uiSchema = _this5$state3.uiSchema,
                formData = _this5$state3.formData,
                bizData = _this5$state3.bizData;
            var jsonSchemaProperties = jsonSchema.properties;
            var jsonSchemaContent, uiSchemaContent; // 如果接口异常，要传一个空data，防止出现使用到配置的enum和enumNames

            jsonSchemaProperties[fieldName].data = [];
            jsonSchema.properties = jsonSchemaProperties;

            _this5.setState({
              jsonSchema: deepCloneObject(jsonSchema)
            });

            console.warn('xform:获取数据源接口失败：' + error.message);

            _this5.logger.logException('xform.fetchDataSource', true);

            reject(error);
          });
        }
      });

      if (returnPromise) {
        return promise;
      } else {
        return promise.then();
      }
    } // 设置表单全部字段的bizData中的disabled与readonly初始配置值

  }, {
    key: "_setAllFieldsBizData",
    value: function _setAllFieldsBizData() {
      var bizData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var uiSchema = arguments.length > 1 ? arguments[1] : undefined;
      var jsonSchema = arguments.length > 2 ? arguments[2] : undefined;
      var jsonSchemaProperties = jsonSchema.properties;
      var fieldName,
          uiSchemaContent,
          jsonSchemaContent,
          fieldDisabled = false,
          fieldReadonly = false; // 这里使用jsonSchema来遍历是因为存在某些field不需要配置uiSchema

      for (fieldName in jsonSchemaProperties) {
        if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
          jsonSchemaContent = jsonSchemaProperties[fieldName];

          if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
            uiSchemaContent = uiSchema[fieldName].items;
          } else {
            uiSchemaContent = uiSchema[fieldName];
          }

          fieldDisabled = false, fieldReadonly = false;

          if (typeof uiSchemaContent !== 'undefined') {
            if (typeof uiSchemaContent['ui:disabled'] === 'boolean') {
              fieldDisabled = uiSchemaContent['ui:disabled'];
            }

            if (typeof uiSchemaContent['ui:readonly'] === 'boolean') {
              fieldReadonly = uiSchemaContent['ui:readonly'];
            }
          }

          if (typeof bizData[fieldName] !== 'undefined') {
            bizData[fieldName].disabled = fieldDisabled;
            bizData[fieldName].readonly = fieldReadonly;
          } else {
            bizData[fieldName] = {
              disabled: fieldDisabled,
              readonly: fieldReadonly
            };
          }
        }
      }

      return bizData;
    } // 设置表单的所有field为禁用状态

  }, {
    key: "_setAllFieldsDisable",
    value: function _setAllFieldsDisable(bizData, uiSchema, jsonSchema, isDisabled) {
      var jsonSchemaProperties = jsonSchema.properties;
      var fieldName, uiSchemaContent, jsonSchemaContent, fieldDisabled; // 这里使用jsonSchema来遍历是因为存在某些field不需要配置uiSchema

      for (fieldName in jsonSchemaProperties) {
        if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
          jsonSchemaContent = jsonSchemaProperties[fieldName];

          if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
            uiSchemaContent = uiSchema[fieldName].items;
          } else {
            uiSchemaContent = uiSchema[fieldName];
          }

          fieldDisabled = bizData[fieldName].disabled;

          if (fieldDisabled) {
            if (typeof uiSchemaContent !== 'undefined') {
              uiSchemaContent['ui:disabled'] = fieldDisabled;
            } else {
              uiSchemaContent = {
                'ui:disabled': fieldDisabled
              };
            }
          } else {
            if (typeof uiSchemaContent !== 'undefined') {
              uiSchemaContent['ui:disabled'] = isDisabled;
            } else {
              uiSchemaContent = {
                'ui:disabled': isDisabled
              };
            }
          }

          if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
            uiSchema[fieldName].items = uiSchemaContent;
          } else {
            uiSchema[fieldName] = uiSchemaContent;
          }
        }
      }

      return uiSchema;
    } // 设置表单的所有field为只读状态

  }, {
    key: "_setAllFieldsReadonly",
    value: function _setAllFieldsReadonly(bizData, uiSchema, jsonSchema, isReadonly) {
      var jsonSchemaProperties = jsonSchema.properties;
      var fieldName, uiSchemaContent, jsonSchemaContent, fieldReadonly; // 这里使用jsonSchema来遍历是因为存在某些field不需要配置uiSchema

      for (fieldName in jsonSchemaProperties) {
        if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
          jsonSchemaContent = jsonSchemaProperties[fieldName];

          if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
            uiSchemaContent = uiSchema[fieldName].items;
          } else {
            uiSchemaContent = uiSchema[fieldName];
          }

          fieldReadonly = bizData[fieldName].readonly;

          if (fieldReadonly) {
            if (typeof uiSchemaContent !== 'undefined') {
              uiSchemaContent['ui:readonly'] = fieldReadonly;
            } else {
              uiSchemaContent = {
                'ui:readonly': fieldReadonly
              };
            }
          } else {
            if (typeof uiSchemaContent !== 'undefined') {
              uiSchemaContent['ui:readonly'] = isReadonly;
            } else {
              uiSchemaContent = {
                'ui:readonly': isReadonly
              };
            }
          }

          if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
            uiSchema[fieldName].items = uiSchemaContent;
          } else {
            uiSchema[fieldName] = uiSchemaContent;
          }
        }
      }

      return uiSchema;
    } // 设置字段的bizData的displayName

  }, {
    key: "_setAllFieldsDisplayName",
    value: function _setAllFieldsDisplayName(_ref) {
      var jsonSchema = _ref.jsonSchema,
          uiSchema = _ref.uiSchema,
          formData = _ref.formData,
          bizData = _ref.bizData;
      var jsonSchemaProperties = jsonSchema.properties;
      var fieldName, jsonSchemaContent, enumOptions, displayName;

      for (fieldName in jsonSchemaProperties) {
        if (jsonSchemaProperties.hasOwnProperty(fieldName)) {
          jsonSchemaContent = jsonSchemaProperties[fieldName];
          displayName = undefined;

          if (typeof jsonSchemaContent["enum"] === 'undefined' && typeof jsonSchemaContent.enumNames === 'undefined' && typeof jsonSchemaContent.data === 'undefined') {
            // 这种类型字段不需要进行code => label的转换，字段bizData.displayName值直接等同于formData[fieldName]
            displayName = formData[fieldName];
          } else {
            // 这种类型字段带有enum和enumOptions或者绑定了数据源，字段bizData.displayName需要进行转换
            enumOptions = [];

            if (typeof jsonSchemaContent.data !== 'undefined') {
              enumOptions = jsonSchemaContent.data;
            } else {
              jsonSchemaContent["enum"].map(function (enumItem, index) {
                enumOptions.push({
                  label: jsonSchemaContent.enumNames[index],
                  value: jsonSchemaContent["enum"][index]
                });
              });
            } // 从enumOptions中获取displayName


            enumOptions = this._flattenTreeData(enumOptions);

            if (Array.isArray(formData[fieldName])) {
              displayName = [];
              formData[fieldName].map(function (formDataItem) {
                enumOptions.map(function (option) {
                  if (option.value === formDataItem) {
                    displayName.push(option.label);
                  }
                });
              });
            } else {
              enumOptions.map(function (option) {
                if (option.value === formData[fieldName]) {
                  displayName = option.label;
                }
              });
            }
          }

          if (typeof bizData[fieldName] !== 'undefined') {
            bizData[fieldName].displayName = displayName;
          } else {
            bizData[fieldName] = {
              displayName: displayName
            };
          }
        }
      }

      return bizData;
    } // 扁平化Tree数据结构（树形结构数据扁平化）

  }, {
    key: "_flattenTreeData",
    value: function _flattenTreeData(treeRoot) {
      var _this6 = this;

      var result = [];
      treeRoot.map(function (treeNode) {
        result.push({
          label: treeNode.label,
          value: treeNode.value
        });

        if (treeNode.children && treeNode.children.length > 0) {
          result = result.concat(_this6._flattenTreeData(treeNode.children));
        }
      });
      return result;
    } // 表单校验（如果传入了指定的fieldName则只校验当前name项目，否则所有项目都校验）
    // @return boolean
    // modify 2020-06-23 XUMENG 

  }, {
    key: "_validate",
    value: function _validate(formData) {
      var _this7 = this;

      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var failCallback = arguments.length > 3 ? arguments[3] : undefined;
      var uiSchema = this.state.uiSchema;
      var jsonSchema = this.state.jsonSchema;
      var jsonSchemaProperties = jsonSchema.properties;

      if (debugMode) {
        console.log('validate uiSchema:', uiSchema);
        console.log('validate formData:', formData);
      }

      var jsonSchemaContent;
      var fieldName, fieldValue, fieldValidate, classNames, widgetType;
      var validateItemPromises = [],
          validatePromises = [];

      if (name === 'all') {
        for (fieldName in uiSchema) {
          if (uiSchema.hasOwnProperty(fieldName)) {
            jsonSchemaContent = jsonSchemaProperties[fieldName]; //如果是分组

            if (jsonSchemaContent.type === 'object' && jsonSchemaContent.hasOwnProperty('properties')) {
              var childJsonSchemaProperties = jsonSchemaContent.properties;
              var childJsonSchemaContent = void 0,
                  childFieldValue = void 0,
                  childFieldValidate = [],
                  childClassNames = '',
                  childWidgetType = '';
              var childValidateItemPromises = [],
                  childValidatePromises = [];

              for (var child in childJsonSchemaProperties) {
                if (uiSchema[fieldName].hasOwnProperty(child)) {
                  childJsonSchemaContent = childJsonSchemaProperties[child];
                  childFieldValue = formData[fieldName] && formData[fieldName][child];

                  if (typeof uiSchema[fieldName][child] !== 'undefined') {
                    childFieldValidate = uiSchema[fieldName][child]['ui:options'] && uiSchema[fieldName][child]['ui:options'].validate || [];
                    childClassNames = uiSchema[fieldName][child].classNames || '';
                    childWidgetType = uiSchema[fieldName][child]['ui:widget'] || '';
                  }

                  var groupHasItem = false;

                  if (childJsonSchemaContent.type === 'array' && !childJsonSchemaContent.uniqueItems && childJsonSchemaContent.hasOwnProperty('items')) {
                    childWidgetType = 'array';

                    if (typeof uiSchema[fieldName][child] !== 'undefined' && uiSchema[fieldName][child].hasOwnProperty('items')) {
                      childFieldValidate = uiSchema[fieldName][child].items['ui:options'] && uiSchema[fieldName][child].items['ui:options'].validate || [];
                      childClassNames = uiSchema[fieldName][child].items.classNames || '';
                      groupHasItem = true;
                    }
                  }

                  childValidateItemPromises = this._validateField(childFieldValidate, child, childFieldValue, childClassNames, childWidgetType, fieldName);

                  var rPromise = _groupPromise(this, child, childValidateItemPromises, fieldName, groupHasItem);

                  validatePromises.push(rPromise);
                }
              }
            } //如果是分组，且分组是array
            else if (jsonSchemaContent.type === 'array' && jsonSchemaContent.hasOwnProperty('items') && jsonSchemaContent.items.type === 'object' && jsonSchemaContent.items.hasOwnProperty('properties')) {
              var _childJsonSchemaProperties = jsonSchemaContent.items.properties;

              var _childJsonSchemaContent = void 0,
                  _childFieldValue = void 0,
                  _childFieldValidate = [],
                  _childClassNames = '',
                  _childWidgetType = '';

              var _childValidateItemPromises = [];

              var _loop = function _loop(_child) {
                if (uiSchema[fieldName].hasOwnProperty('items') && uiSchema[fieldName].items.hasOwnProperty(_child)) {
                  _childJsonSchemaContent = _childJsonSchemaProperties[_child];
                  _childFieldValue = formData[fieldName] && Array.isArray(formData[fieldName]) && formData[fieldName].map(function (v) {
                    return v[_child];
                  });

                  if (typeof uiSchema[fieldName].items[_child] !== 'undefined') {
                    _childFieldValidate = uiSchema[fieldName].items[_child]['ui:options'] && uiSchema[fieldName].items[_child]['ui:options'].validate || [];
                    _childClassNames = uiSchema[fieldName].items.classNames || uiSchema[fieldName].items[_child].classNames || '';
                    _childWidgetType = uiSchema[fieldName].items[_child]['ui:widget'] || '';
                  }

                  _childWidgetType = 'array'; //如果分组下 的控件 仍然一个array

                  var _groupHasItem = false;

                  if (_childJsonSchemaContent.type === 'array' && !_childJsonSchemaContent.uniqueItems && _childJsonSchemaContent.hasOwnProperty('items')) {
                    if (typeof uiSchema[fieldName].items[_child] !== 'undefined' && uiSchema[fieldName].items[_child].hasOwnProperty('items')) {
                      _childFieldValidate = uiSchema[fieldName].items[_child].items['ui:options'] && uiSchema[fieldName].items[_child].items['ui:options'].validate || [];
                      _childClassNames = uiSchema[fieldName].items.classNames || uiSchema[fieldName].items[_child].items.classNames || '';
                      _groupHasItem = true;
                    }
                  }

                  _childValidateItemPromises = _this7._validateField(_childFieldValidate, _child, _childFieldValue, _childClassNames, _childWidgetType, fieldName);

                  var _rPromise = _groupItemPromise(_this7, _child, _childValidateItemPromises, fieldName, _groupHasItem);

                  validatePromises.push(_rPromise);
                }
              };

              for (var _child in _childJsonSchemaProperties) {
                _loop(_child);
              }
            } else {
              fieldValue = formData[fieldName];
              fieldValidate = [];
              classNames = '';
              widgetType = ''; //判断是否为array

              if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems && uiSchema[fieldName].hasOwnProperty('items')) {
                widgetType = 'array';

                if (typeof uiSchema[fieldName].items !== 'undefined') {
                  fieldValidate = uiSchema[fieldName].items['ui:options'] && uiSchema[fieldName].items['ui:options'].validate || [];
                  classNames = uiSchema[fieldName].items.classNames || '';
                }

                validateItemPromises = this._validateField(fieldValidate, fieldName, fieldValue, classNames, widgetType);

                var _rPromise2 = _groupItemPromise(this, fieldName, validateItemPromises);

                validatePromises.push(_rPromise2);
              } else {
                if (typeof uiSchema[fieldName] !== 'undefined') {
                  fieldValidate = uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].validate || [];
                  classNames = uiSchema[fieldName].classNames || '';
                  widgetType = uiSchema[fieldName]['ui:widget'] || '';
                }

                validateItemPromises = this._validateField(fieldValidate, fieldName, fieldValue, classNames, widgetType);

                var _rPromise3 = _groupPromise(this, fieldName, validateItemPromises);

                validatePromises.push(_rPromise3);
              }
            }
          }
        }

        Promise.all(validatePromises).then(function () {
          if (typeof callback === 'function') {
            callback();
          }
        })["catch"](function () {
          if (typeof failCallback === 'function') {
            failCallback();
          }
        });
      } else {
        // 单个字段校验
        fieldName = name;
        jsonSchemaContent = jsonSchemaProperties[fieldName];
        fieldValue = formData[fieldName];
        fieldValidate = [];
        classNames = '';
        widgetType = '';

        if (typeof uiSchema[fieldName] !== 'undefined') {
          fieldValidate = uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].validate || [];
          classNames = uiSchema[fieldName].classNames || '';
          widgetType = uiSchema[fieldName]['ui:widget'] || '';
        } // 对于array类型的字段，widgetType设置为特殊值'array',方便进行校验判断


        if (jsonSchemaContent.type === 'array' && !jsonSchemaContent.uniqueItems) {
          widgetType = 'array';
        }

        validateItemPromises = this._validateField(fieldValidate, fieldName, fieldValue, classNames, widgetType);
        Promise.all(validateItemPromises).then(function () {
          // 将该fieldName下的_errorType置为空
          if (typeof uiSchema[fieldName] !== 'undefined') {
            if (typeof uiSchema[fieldName]['ui:options'] !== 'undefined') {
              uiSchema[fieldName]['ui:options']._errorType = '';
            } else {
              uiSchema[fieldName]['ui:options'] = {
                _errorType: ''
              };
            }
          }

          if (debugMode) {
            console.log('field:' + fieldName + ';errorType=' + uiSchema[fieldName]['ui:options']._errorType);
          }

          _this7.setState({
            uiSchema: deepCloneObject(uiSchema)
          });

          if (typeof callback === 'function') {
            callback();
          }
        })["catch"](function (error) {
          var errorType = error.errorType;
          var errorFieldName = error.fieldName;
          var errorMessage, errorValidateCode; // errorMessage, errorValidateCode字段只有动态校验器的场景才会出现，这种场景需要替换掉validate字段里面的message

          if (typeof error.errorMessage !== 'undefined' && typeof error.errorValidateCode !== 'undefined') {
            errorMessage = error.errorMessage;
            errorValidateCode = error.errorValidateCode;
            uiSchema[errorFieldName]['ui:options'].validate.map(function (validateItem, index) {
              if (validateItem.validateCode === errorValidateCode) {
                uiSchema[errorFieldName]['ui:options'].validate[index].message = errorMessage;
              }
            });
          } // 存在errorType，就要更新schema，来展示校验结果


          if (typeof uiSchema[errorFieldName] === 'undefined') {
            uiSchema[errorFieldName] = {
              'ui:options': {
                _errorType: errorType
              }
            };
          } else if (typeof uiSchema[errorFieldName]['ui:options'] === 'undefined') {
            uiSchema[errorFieldName]['ui:options'] = {
              _errorType: errorType
            };
          } else {
            uiSchema[errorFieldName]['ui:options']._errorType = errorType;
          }

          if (debugMode) {
            console.log('field:' + fieldName + ';errorType=' + uiSchema[fieldName]['ui:options']._errorType);
          }

          _this7.setState({
            uiSchema: deepCloneObject(uiSchema)
          });

          if (typeof failCallback === 'function') {
            failCallback();
          }
        });
      }

      function _groupItemPromise(_this, field, validateItemPromises) {
        var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var groupHasItem = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        if (group) {
          //如果分组下控件仍然是array
          if (groupHasItem) {
            return new Promise(function (resolve, reject) {
              Promise.all(validateItemPromises).then(function (values) {
                var resolveFieldName = values.length > 0 ? values[0].fieldName : field;
                var resolveGroup = values.length > 0 ? values[0].groupField : group; // 将该fieldName下的_errorType置为空

                if (typeof uiSchema[resolveGroup].items[resolveFieldName].items !== 'undefined') {
                  if (typeof uiSchema[resolveGroup].items[resolveFieldName].items['ui:options'] !== 'undefined') {
                    uiSchema[resolveGroup].items[resolveFieldName].items['ui:options']._errorType = '';
                  } else {
                    uiSchema[resolveGroup].items[resolveFieldName].items['ui:options'] = {
                      _errorType: ''
                    };
                  }
                }

                if (debugMode) {
                  console.log('field:' + resolveFieldName + ';errorType=' + uiSchema[resolveGroup].items[resolveFieldName].items['ui:options']._errorType);
                }

                _this.setState({
                  uiSchema: deepCloneObject(uiSchema)
                });

                resolve();
              })["catch"](function (error) {
                var errorType = error.errorType;
                var errorFieldName = error.fieldName;
                var errorGroup = error.groupField;
                var errorMessage, errorValidateCode; // errorMessage, errorValidateCode字段只有动态校验器的场景才会出现，这种场景需要替换掉validate字段里面的message

                if (typeof error.errorMessage !== 'undefined' && typeof error.errorValidateCode !== 'undefined') {
                  errorMessage = error.errorMessage;
                  errorValidateCode = error.errorValidateCode;
                  uiSchema[errorGroup].items[errorFieldName].items['ui:options'].validate.map(function (validateItem, index) {
                    if (validateItem.validateCode === errorValidateCode) {
                      uiSchema[errorGroup].items[errorFieldName].items['ui:options'].validate[index].message = errorMessage;
                    }
                  });
                } // 存在errorType，就要更新schema，来展示校验结果


                if (errorGroup && uiSchema[errorGroup] && uiSchema[errorGroup].hasOwnProperty('items') && uiSchema[errorGroup].items[errorFieldName] && uiSchema[errorGroup].items[errorFieldName].hasOwnProperty('items')) {
                  if (typeof uiSchema[errorGroup].items[errorFieldName].items === 'undefined') {
                    uiSchema[errorGroup].items[errorFieldName].items = {
                      'ui:options': {
                        _errorType: errorType
                      }
                    };
                  } else if (typeof uiSchema[errorGroup].items[errorFieldName].items['ui:options'] === 'undefined') {
                    uiSchema[errorGroup].items[errorFieldName].items['ui:options'] = {
                      _errorType: errorType
                    };
                  } else {
                    uiSchema[errorGroup].items[errorFieldName].items['ui:options']._errorType = errorType;
                  }

                  if (debugMode) {
                    console.log('field:' + errorFieldName + ';errorType=' + uiSchema[errorGroup].items[errorFieldName].items['ui:options']._errorType);
                  }

                  _this.setState({
                    uiSchema: deepCloneObject(uiSchema)
                  });
                }

                reject();
              });
            });
          } else {
            return new Promise(function (resolve, reject) {
              Promise.all(validateItemPromises).then(function (values) {
                var resolveFieldName = values.length > 0 ? values[0].fieldName : field;
                var resolveGroup = values.length > 0 ? values[0].groupField : group; // 将该fieldName下的_errorType置为空

                if (typeof uiSchema[resolveGroup].items[resolveFieldName] !== 'undefined') {
                  if (typeof uiSchema[resolveGroup].items[resolveFieldName]['ui:options'] !== 'undefined') {
                    uiSchema[resolveGroup].items[resolveFieldName]['ui:options']._errorType = '';
                  } else {
                    uiSchema[resolveGroup].items[resolveFieldName]['ui:options'] = {
                      _errorType: ''
                    };
                  }
                }

                if (debugMode) {
                  console.log('field:' + resolveFieldName + ';errorType=' + uiSchema[resolveGroup].items[resolveFieldName]['ui:options']._errorType);
                }

                _this.setState({
                  uiSchema: deepCloneObject(uiSchema)
                });

                resolve();
              })["catch"](function (error) {
                var errorType = error.errorType;
                var errorFieldName = error.fieldName;
                var errorGroup = error.groupField;
                var errorMessage, errorValidateCode; // errorMessage, errorValidateCode字段只有动态校验器的场景才会出现，这种场景需要替换掉validate字段里面的message

                if (typeof error.errorMessage !== 'undefined' && typeof error.errorValidateCode !== 'undefined') {
                  errorMessage = error.errorMessage;
                  errorValidateCode = error.errorValidateCode;
                  uiSchema[errorGroup].items[errorFieldName]['ui:options'].validate.map(function (validateItem, index) {
                    if (validateItem.validateCode === errorValidateCode) {
                      uiSchema[errorGroup].items[errorFieldName]['ui:options'].validate[index].message = errorMessage;
                    }
                  });
                } // 存在errorType，就要更新schema，来展示校验结果


                if (errorGroup && uiSchema[errorGroup] && uiSchema[errorGroup].hasOwnProperty('items')) {
                  if (typeof uiSchema[errorGroup].items[errorFieldName] === 'undefined') {
                    uiSchema[errorGroup].items[errorFieldName] = {
                      'ui:options': {
                        _errorType: errorType
                      }
                    };
                  } else if (typeof uiSchema[errorGroup].items[errorFieldName]['ui:options'] === 'undefined') {
                    uiSchema[errorGroup].items[errorFieldName]['ui:options'] = {
                      _errorType: errorType
                    };
                  } else {
                    uiSchema[errorGroup].items[errorFieldName]['ui:options']._errorType = errorType;
                  }

                  if (debugMode) {
                    console.log('field:' + errorFieldName + ';errorType=' + uiSchema[errorGroup].items[errorFieldName]['ui:options']._errorType);
                  }

                  _this.setState({
                    uiSchema: deepCloneObject(uiSchema)
                  });
                }

                reject();
              });
            });
          }
        } else {
          return new Promise(function (resolve, reject) {
            Promise.all(validateItemPromises).then(function (values) {
              var resolveFieldName = values.length > 0 ? values[0].fieldName : field; // 将该fieldName下的_errorType置为空

              if (typeof uiSchema[resolveFieldName].items !== 'undefined') {
                if (typeof uiSchema[resolveFieldName].items['ui:options'] !== 'undefined') {
                  uiSchema[resolveFieldName].items['ui:options']._errorType = '';
                } else {
                  uiSchema[resolveFieldName].items['ui:options'] = {
                    _errorType: ''
                  };
                }
              }

              if (debugMode) {
                console.log('field:' + resolveFieldName + ';errorType=' + uiSchema[resolveFieldName].items['ui:options']._errorType);
              }

              _this.setState({
                uiSchema: deepCloneObject(uiSchema)
              });

              resolve();
            })["catch"](function (error) {
              var errorType = error.errorType;
              var errorFieldName = error.fieldName;
              var errorMessage, errorValidateCode; // errorMessage, errorValidateCode字段只有动态校验器的场景才会出现，这种场景需要替换掉validate字段里面的message

              if (typeof error.errorMessage !== 'undefined' && typeof error.errorValidateCode !== 'undefined') {
                errorMessage = error.errorMessage;
                errorValidateCode = error.errorValidateCode;
                uiSchema[errorFieldName].items['ui:options'].validate.map(function (validateItem, index) {
                  if (validateItem.validateCode === errorValidateCode) {
                    uiSchema[errorFieldName].items['ui:options'].validate[index].message = errorMessage;
                  }
                });
              } // 存在errorType，就要更新schema，来展示校验结果


              if (typeof uiSchema[errorFieldName].items === 'undefined') {
                uiSchema[errorFieldName].items = {
                  'ui:options': {
                    _errorType: errorType
                  }
                };
              } else if (typeof uiSchema[errorFieldName].items['ui:options'] === 'undefined') {
                uiSchema[errorFieldName].items['ui:options'] = {
                  _errorType: errorType
                };
              } else {
                uiSchema[errorFieldName].items['ui:options']._errorType = errorType;
              }

              if (debugMode) {
                console.log('field:' + errorFieldName + ';errorType=' + uiSchema[errorFieldName].items['ui:options']._errorType);
              }

              _this.setState({
                uiSchema: deepCloneObject(uiSchema)
              });

              reject();
            });
          });
        }
      }

      function _groupPromise(_this, field, validateItemPromises) {
        var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var groupHasItem = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        if (group) {
          if (groupHasItem) {
            return new Promise(function (resolve, reject) {
              Promise.all(validateItemPromises).then(function (values) {
                var resolveFieldName = values.length > 0 ? values[0].fieldName : field;
                var resolveGroup = values.length > 0 ? values[0].groupField : group; // 将该fieldName下的_errorType置为空

                if (typeof uiSchema[resolveGroup][resolveFieldName].items !== 'undefined') {
                  if (typeof uiSchema[resolveGroup][resolveFieldName].items['ui:options'] !== 'undefined') {
                    uiSchema[resolveGroup][resolveFieldName].items['ui:options']._errorType = '';
                  } else {
                    uiSchema[resolveGroup][resolveFieldName].items['ui:options'] = {
                      _errorType: ''
                    };
                  }
                }

                if (debugMode) {
                  console.log('field:' + resolveFieldName + ';errorType=' + uiSchema[resolveGroup].items[resolveFieldName]['ui:options']._errorType);
                }

                _this.setState({
                  uiSchema: deepCloneObject(uiSchema)
                });

                resolve();
              })["catch"](function (error) {
                var errorType = error.errorType;
                var errorFieldName = error.fieldName;
                var errorGroup = error.groupField;
                var errorMessage, errorValidateCode; // errorMessage, errorValidateCode字段只有动态校验器的场景才会出现，这种场景需要替换掉validate字段里面的message

                if (typeof error.errorMessage !== 'undefined' && typeof error.errorValidateCode !== 'undefined') {
                  errorMessage = error.errorMessage;
                  errorValidateCode = error.errorValidateCode;
                  uiSchema[errorGroup][errorFieldName].items['ui:options'].validate.map(function (validateItem, index) {
                    if (validateItem.validateCode === errorValidateCode) {
                      uiSchema[errorGroup][errorFieldName].items['ui:options'].validate[index].message = errorMessage;
                    }
                  });
                } // 存在errorType，就要更新schema，来展示校验结果


                if (errorGroup && uiSchema[errorGroup] && uiSchema[errorGroup][errorFieldName] && uiSchema[errorGroup][errorFieldName].hasOwnProperty('items')) {
                  if (typeof uiSchema[errorGroup][errorFieldName].items === 'undefined') {
                    uiSchema[errorGroup][errorFieldName].items = {
                      'ui:options': {
                        _errorType: errorType
                      }
                    };
                  } else if (typeof uiSchema[errorGroup][errorFieldName].items['ui:options'] === 'undefined') {
                    uiSchema[errorGroup][errorFieldName].items['ui:options'] = {
                      _errorType: errorType
                    };
                  } else {
                    uiSchema[errorGroup][errorFieldName].items['ui:options']._errorType = errorType;
                  }

                  if (debugMode) {
                    console.log('field:' + errorFieldName + ';errorType=' + uiSchema[errorGroup][errorFieldName].items['ui:options']._errorType);
                  }

                  _this.setState({
                    uiSchema: deepCloneObject(uiSchema)
                  });
                }

                reject();
              });
            });
          } else {
            return new Promise(function (resolve, reject) {
              Promise.all(validateItemPromises).then(function (values) {
                var resolveFieldName = values.length > 0 ? values[0].fieldName : field;
                var resolveGroup = values.length > 0 ? values[0].groupField : group; // 将该fieldName下的_errorType置为空

                if (typeof uiSchema[resolveGroup][resolveFieldName] !== 'undefined') {
                  if (typeof uiSchema[resolveGroup][resolveFieldName]['ui:options'] !== 'undefined') {
                    uiSchema[resolveGroup][resolveFieldName]['ui:options']._errorType = '';
                  } else {
                    uiSchema[resolveGroup][resolveFieldName]['ui:options'] = {
                      _errorType: ''
                    };
                  }
                }

                if (debugMode) {
                  console.log('field:' + resolveFieldName + ';errorType=' + uiSchema[resolveGroup][resolveFieldName]['ui:options']._errorType);
                }

                _this.setState({
                  uiSchema: deepCloneObject(uiSchema)
                });

                resolve();
              })["catch"](function (error) {
                var errorType = error.errorType;
                var errorFieldName = error.fieldName;
                var errorGroup = error.groupField;
                var errorMessage, errorValidateCode; // errorMessage, errorValidateCode字段只有动态校验器的场景才会出现，这种场景需要替换掉validate字段里面的message

                if (typeof error.errorMessage !== 'undefined' && typeof error.errorValidateCode !== 'undefined') {
                  errorMessage = error.errorMessage;
                  errorValidateCode = error.errorValidateCode;
                  uiSchema[errorGroup][errorFieldName]['ui:options'].validate.map(function (validateItem, index) {
                    if (validateItem.validateCode === errorValidateCode) {
                      uiSchema[errorGroup][errorFieldName]['ui:options'].validate[index].message = errorMessage;
                    }
                  });
                } // 存在errorType，就要更新schema，来展示校验结果


                if (errorGroup && uiSchema[errorGroup]) {
                  if (typeof uiSchema[errorGroup][errorFieldName] === 'undefined') {
                    uiSchema[errorGroup][errorFieldName] = {
                      'ui:options': {
                        _errorType: errorType
                      }
                    };
                  } else if (typeof uiSchema[errorGroup][errorFieldName]['ui:options'] === 'undefined') {
                    uiSchema[errorGroup][errorFieldName]['ui:options'] = {
                      _errorType: errorType
                    };
                  } else {
                    uiSchema[errorGroup][errorFieldName]['ui:options']._errorType = errorType;
                  }

                  if (debugMode) {
                    console.log('field:' + errorFieldName + ';errorType=' + uiSchema[errorGroup][errorFieldName]['ui:options']._errorType);
                  }

                  _this.setState({
                    uiSchema: deepCloneObject(uiSchema)
                  });
                }

                reject();
              });
            });
          }
        } else {
          return new Promise(function (resolve, reject) {
            Promise.all(validateItemPromises).then(function (values) {
              var resolveFieldName = values.length > 0 ? values[0].fieldName : field; // 将该fieldName下的_errorType置为空

              if (typeof uiSchema[resolveFieldName] !== 'undefined') {
                if (typeof uiSchema[resolveFieldName]['ui:options'] !== 'undefined') {
                  uiSchema[resolveFieldName]['ui:options']._errorType = '';
                } else {
                  uiSchema[resolveFieldName]['ui:options'] = {
                    _errorType: ''
                  };
                }
              }

              if (debugMode) {
                console.log('field:' + resolveFieldName + ';errorType=' + uiSchema[resolveFieldName]['ui:options']._errorType);
              }

              _this.setState({
                uiSchema: deepCloneObject(uiSchema)
              });

              resolve();
            })["catch"](function (error) {
              var errorType = error.errorType;
              var errorFieldName = error.fieldName;
              var errorMessage, errorValidateCode; // errorMessage, errorValidateCode字段只有动态校验器的场景才会出现，这种场景需要替换掉validate字段里面的message

              if (typeof error.errorMessage !== 'undefined' && typeof error.errorValidateCode !== 'undefined') {
                errorMessage = error.errorMessage;
                errorValidateCode = error.errorValidateCode;
                uiSchema[errorFieldName]['ui:options'].validate.map(function (validateItem, index) {
                  if (validateItem.validateCode === errorValidateCode) {
                    uiSchema[errorFieldName]['ui:options'].validate[index].message = errorMessage;
                  }
                });
              } // 存在errorType，就要更新schema，来展示校验结果


              if (typeof uiSchema[errorFieldName] === 'undefined') {
                uiSchema[errorFieldName] = {
                  'ui:options': {
                    _errorType: errorType
                  }
                };
              } else if (typeof uiSchema[errorFieldName]['ui:options'] === 'undefined') {
                uiSchema[errorFieldName]['ui:options'] = {
                  _errorType: errorType
                };
              } else {
                uiSchema[errorFieldName]['ui:options']._errorType = errorType;
              }

              if (debugMode) {
                console.log('field:' + errorFieldName + ';errorType=' + uiSchema[errorFieldName]['ui:options']._errorType);
              }

              _this.setState({
                uiSchema: deepCloneObject(uiSchema)
              });

              reject();
            });
          });
        }
      } //debugger;

    }
  }, {
    key: "_validateField",
    value: function _validateField(fieldValidate, fieldName, fieldValue, classNames, widgetType) {
      var _this8 = this;

      var groupField = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var _this$props2 = this.props,
          env = _this$props2.env,
          gateway = _this$props2.gateway,
          customGateway = _this$props2.customGateway,
          customInterfaces = _this$props2.customInterfaces,
          mockInterfaces = _this$props2.mockInterfaces,
          customInterfacesParams = _this$props2.customInterfacesParams;
      var serverParams = {},
          overallParams = {};
      var formData = this.state.formData;
      var errorType = '';
      var promise;
      var promises = []; // 由于级联关系隐藏的字段直接校验通过

      var classnames = classNames.split(' ');

      if (classnames.indexOf(XFORM_HIDDEN_CLASS) > -1) {
        promises.push(new Promise(function (resolve) {
          resolve({
            fieldName: fieldName,
            groupField: groupField
          });
        }));
        return promises;
      } // ui:widget为hidden类型的字段直接校验通过


      if (widgetType === 'hidden') {
        promises.push(new Promise(function (resolve) {
          resolve({
            fieldName: fieldName,
            groupField: groupField
          });
        }));
        return promises;
      } // 如果fieldValidate为空数组（没有校验项），直接校验通过


      if (fieldValidate && fieldValidate.length <= 0) {
        promises.push(new Promise(function (resolve) {
          resolve({
            fieldName: fieldName,
            groupField: groupField
          });
        }));
        return promises;
      } // 遍历检查validate各项，查找校验不通过的errorType并写入schema中


      var _loop2 = function _loop2(i) {
        var validateItem = fieldValidate[i];
        var validateCode = void 0;
        errorType = '';

        switch (validateItem.type) {
          case 'empty':
            promise = new Promise(function (resolve, reject) {
              if ((0, _validate2.isEmpty)(fieldValue, widgetType)) {
                errorType = validateItem.type;
                reject({
                  fieldName: fieldName,
                  errorType: errorType,
                  groupField: groupField
                });
              } else {
                resolve({
                  fieldName: fieldName,
                  groupField: groupField
                });
              }
            });
            break;

          case 'digit':
            promise = new Promise(function (resolve, reject) {
              if (!(0, _validate2.isDigit)(fieldValue)) {
                errorType = validateItem.type;
                reject({
                  fieldName: fieldName,
                  errorType: errorType,
                  groupField: groupField
                });
              } else {
                resolve({
                  fieldName: fieldName,
                  groupField: groupField
                });
              }
            });
            break;

          case 'money':
            promise = new Promise(function (resolve, reject) {
              if (!(0, _validate2.isMoney)(fieldValue)) {
                errorType = validateItem.type;
                reject({
                  fieldName: fieldName,
                  errorType: errorType,
                  groupField: groupField
                });
              } else {
                resolve({
                  fieldName: fieldName,
                  groupField: groupField
                });
              }
            });
            break;

          case 'email':
            promise = new Promise(function (resolve, reject) {
              if (!(0, _validate2.isEmail)(fieldValue)) {
                errorType = validateItem.type;
                reject({
                  fieldName: fieldName,
                  errorType: errorType,
                  groupField: groupField
                });
              } else {
                resolve({
                  fieldName: fieldName,
                  groupField: groupField
                });
              }
            });
            break;

          case 'url':
            promise = new Promise(function (resolve, reject) {
              if (!(0, _validate2.isUrl)(fieldValue)) {
                errorType = validateItem.type;
                reject({
                  fieldName: fieldName,
                  errorType: errorType,
                  groupField: groupField
                });
              } else {
                resolve({
                  fieldName: fieldName,
                  groupField: groupField
                });
              }
            });
            break;

          case 'id':
            promise = new Promise(function (resolve, reject) {
              if (!(0, _validate2.isId)(fieldValue)) {
                errorType = validateItem.type;
                reject({
                  fieldName: fieldName,
                  errorType: errorType,
                  groupField: groupField
                });
              } else {
                resolve({
                  fieldName: fieldName,
                  groupField: groupField
                });
              }
            });
            break;

          case 'telephone':
            promise = new Promise(function (resolve, reject) {
              if (!(0, _validate2.isTel)(fieldValue)) {
                errorType = validateItem.type;
                reject({
                  fieldName: fieldName,
                  errorType: errorType,
                  groupField: groupField
                });
              } else {
                resolve({
                  fieldName: fieldName,
                  groupField: groupField
                });
              }
            });
            break;

          case 'server':
            // 只有提交时才进行服务端校验
            validateCode = validateItem.validateCode;

            if (typeof validateCode !== 'undefined') {
              promise = new Promise(function (resolve, reject) {
                if (validateType !== 'submit') {
                  resolve({
                    fieldName: fieldName,
                    groupField: groupField
                  });
                } else {
                  if (typeof _this8.props.beforeServerCheck === 'function') {
                    serverParams = _this8.props.beforeServerCheck(validateCode, _this8.state.formData, _this8.state.bizData);
                  } // 这里要针对mtop类型的网关场景做特殊处理（集团mtop不允许参数为Map类型！！！），这里是hack的代码，gateway属性不再对外披露


                  if (gateway === 'mtop') {
                    overallParams = {
                      validateCode: validateCode,
                      validateFieldName: fieldName,
                      validateFieldValue: fieldValue,
                      stringifyParams: JSON.stringify(Object.assign({}, formData, _defineProperty({}, fieldName, fieldValue), serverParams))
                    };
                  } else {
                    overallParams = {
                      validateCode: validateCode,
                      validateFieldName: fieldName,
                      validateFieldValue: fieldValue,
                      params: Object.assign({}, formData, _defineProperty({}, fieldName, fieldValue), serverParams),
                      stringifyParams: JSON.stringify(Object.assign({}, formData, _defineProperty({}, fieldName, fieldValue), serverParams))
                    };
                  }

                  _request.request.fetch(_request.request.getInterface('serverCheck', customInterfaces, env, mockInterfaces), Object.assign({}, overallParams, customInterfacesParams && customInterfacesParams.serverCheck || {}), customGateway, env, {
                    type: 'POST'
                  }).then(function (data) {
                    if (data && data.success) {
                      resolve({
                        fieldName: fieldName,
                        groupField: groupField
                      });
                    } else {
                      errorType = validateItem.type;

                      if (typeof data.message !== 'undefined') {
                        reject({
                          fieldName: fieldName,
                          errorType: errorType,
                          groupField: groupField,
                          errorMessage: data.message,
                          errorValidateCode: validateCode
                        });
                      } else {
                        reject({
                          fieldName: fieldName,
                          errorType: errorType,
                          groupField: groupField
                        });
                      }
                    }
                  })["catch"](function () {
                    errorType = validateItem.type;
                    reject({
                      fieldName: fieldName,
                      errorType: errorType,
                      groupField: groupField
                    });
                  });
                }
              });
            } else {
              promise = new Promise(function (resolve) {
                resolve({
                  fieldName: fieldName,
                  groupField: groupField
                });
              });
            }

            break;

          default:
            console.warn('uiSchema中定义了一个必能识别的校验类型');
            errorType = '';
            promise = new Promise(function (resolve) {
              resolve({
                fieldName: fieldName,
                groupField: groupField
              });
            });
        }

        promises.push(promise);
      };

      for (var i = 0; i < fieldValidate.length; i++) {
        _loop2(i);
      }

      return promises;
    } // 表单同步验证方法，其中不包括server类型的校验

  }, {
    key: "_validateFieldSync",
    value: function _validateFieldSync(fieldValidate, fieldValue, classNames, widgetType) {
      var i, validateItem; // 由于级联关系隐藏的字段直接校验通过

      var classnames = classNames.split(' ');

      if (classnames.indexOf(XFORM_HIDDEN_CLASS) > -1) {
        return {
          result: true,
          errorType: ''
        };
      } // ui:widget为hidden类型的字段直接校验通过


      if (widgetType === 'hidden') {
        return {
          result: true,
          errorType: ''
        };
      }

      for (i = 0; i < fieldValidate.length; i++) {
        validateItem = fieldValidate[i];

        switch (validateItem.type) {
          case 'empty':
            if ((0, _validate2.isEmpty)(fieldValue, widgetType)) {
              return {
                result: false,
                errorType: validateItem.type
              };
            }

            break;

          case 'email':
            if (!(0, _validate2.isEmail)(fieldValue)) {
              return {
                result: false,
                errorType: validateItem.type
              };
            }

            break;

          case 'url':
            if (!(0, _validate2.isUrl)(fieldValue)) {
              return {
                result: false,
                errorType: validateItem.type
              };
            }

            break;

          case 'telephone':
            if (!(0, _validate2.isTel)(fieldValue)) {
              return {
                result: false,
                errorType: validateItem.type
              };
            }

            break;

          case 'id':
            if (!(0, _validate2.isId)(fieldValue)) {
              return {
                result: false,
                errorType: validateItem.type
              };
            }

            break;

          case 'digit':
            if (!(0, _validate2.isDigit)(fieldValue)) {
              return {
                result: false,
                errorType: validateItem.type
              };
            }

            break;

          case 'money':
            if (!(0, _validate2.isMoney)(fieldValue)) {
              return {
                result: false,
                errorType: validateItem.type
              };
            }

            break;

          case 'server':
            console.warn('定义了server校验类型的表单验证，请使用XFormValidate方法做表单校验');
            break;

          default:
            console.warn('uiSchema中定义了一个必能识别的校验类型');
        }
      }

      return {
        result: true,
        errorType: ''
      };
    } // 根据updateFields字段来更新

  }, {
    key: "_updateFieldsData",
    value: function _updateFieldsData(changeFieldName, changeFieldValue, updateFields) {
      var _this9 = this;

      var jsonSchema = this.state.jsonSchema;
      var jsonSchemaProperties = jsonSchema.properties;
      var uiSchema = this.state.uiSchema;
      var fieldName, fieldValue;
      updateFields.map(function (updateField) {
        var _Object$assign4;

        fieldName = updateField;
        fieldValue = jsonSchemaProperties[updateField];

        _this9._fetchDataFromDataSource(fieldName, fieldValue, Object.assign({}, (_Object$assign4 = {}, _defineProperty(_Object$assign4, changeFieldName, changeFieldValue), _defineProperty(_Object$assign4, "changeFieldName", changeFieldName), _defineProperty(_Object$assign4, "changeFieldValue", changeFieldValue), _Object$assign4)));
      });
    } // 根据formData来判断表单各个字段的展示逻辑（field字段联动）

  }, {
    key: "_updateFieldsShow",
    value: function _updateFieldsShow(uiSchema, formData, sequence) {
      var _this10 = this;

      var field,
          showOptions,
          fieldHidden = false;

      for (field in uiSchema) {
        if (uiSchema.hasOwnProperty(field)) {
          var hasItems = false; //是否是array
          //判断是否是array

          if (uiSchema[field].hasOwnProperty('items')) {
            hasItems = true;

            if (typeof uiSchema[field].items === 'undefined') {
              fieldHidden = false;
            } else if (typeof uiSchema[field].items['ui:options'] === 'undefined') {
              fieldHidden = false;
            } else {
              showOptions = uiSchema[field].items['ui:options'].show; // 如果没有show字段证明该字段一直显示

              if (typeof showOptions === 'undefined') {
                fieldHidden = false;
              } else {
                fieldHidden = this._shouldFieldHidden(uiSchema, showOptions, formData);
              }
            }
          } else {
            if (typeof uiSchema[field] === 'undefined') {
              fieldHidden = false;
            } else if (typeof uiSchema[field]['ui:options'] === 'undefined') {
              fieldHidden = false;
            } else {
              showOptions = uiSchema[field]['ui:options'].show; // 如果没有show字段证明该字段一直显示

              if (typeof showOptions === 'undefined') {
                fieldHidden = false;
              } else {
                fieldHidden = this._shouldFieldHidden(uiSchema, showOptions, formData);
              }
            }
          }

          if (hasItems) {
            if (typeof uiSchema[field].items === 'undefined') {
              uiSchema[field].items = {
                classNames: fieldHidden ? XFORM_HIDDEN_CLASS : ''
              };
            } else if (typeof uiSchema[field].items.classNames === 'undefined') {
              uiSchema[field].items.classNames = fieldHidden ? XFORM_HIDDEN_CLASS : '';
            } else if (uiSchema[field].items.classNames && uiSchema[field].items.classNames.length > 0) {
              // 防止属性重复添加
              var classnames = uiSchema[field].items.classNames.split(' ');

              if (fieldHidden && classnames.indexOf(XFORM_HIDDEN_CLASS) <= -1) {
                classnames.push(XFORM_HIDDEN_CLASS);
              } else if (!fieldHidden && classnames.indexOf(XFORM_HIDDEN_CLASS) > -1) {
                classnames.splice(classnames.indexOf(XFORM_HIDDEN_CLASS), 1);
              }

              uiSchema[field].items.classNames = classnames.join(' ');
            } else {
              uiSchema[field].items.classNames = fieldHidden ? XFORM_HIDDEN_CLASS : '';
            }
          } else {
            if (typeof uiSchema[field] === 'undefined') {
              uiSchema[field] = {
                classNames: fieldHidden ? XFORM_HIDDEN_CLASS : ''
              };
            } else if (typeof uiSchema[field].classNames === 'undefined') {
              uiSchema[field].classNames = fieldHidden ? XFORM_HIDDEN_CLASS : '';
            } else if (uiSchema[field].classNames && uiSchema[field].classNames.length > 0) {
              // 防止属性重复添加
              var _classnames = uiSchema[field].classNames.split(' ');

              if (fieldHidden && _classnames.indexOf(XFORM_HIDDEN_CLASS) <= -1) {
                _classnames.push(XFORM_HIDDEN_CLASS);
              } else if (!fieldHidden && _classnames.indexOf(XFORM_HIDDEN_CLASS) > -1) {
                _classnames.splice(_classnames.indexOf(XFORM_HIDDEN_CLASS), 1);
              }

              uiSchema[field].classNames = _classnames.join(' ');
            } else {
              uiSchema[field].classNames = fieldHidden ? XFORM_HIDDEN_CLASS : '';
            }
          } //判断分组


          if (uiSchema[field]['ui:widget'] && (uiSchema[field]['ui:widget'] === 'group' || uiSchema[field]['ui:widget'] === 'Table')) {
            (function () {
              var childShowOptions = void 0,
                  childFieldHidden = false;
              var groupUischema = uiSchema[field];
              var codeArr = [];
              sequence ? sequence.map(function (v) {
                if (_typeof(v) === 'object' && v.group === field) {
                  codeArr.push(v.code);
                }
              }) : '';
              codeArr.map(function (code) {
                if (groupUischema.hasOwnProperty(code)) {
                  if (typeof uiSchema[field][code] === 'undefined') {
                    childFieldHidden = false;
                  } else if (typeof uiSchema[field][code]['ui:options'] === 'undefined') {
                    childFieldHidden = false;
                  } else {
                    childShowOptions = uiSchema[field][code]['ui:options'].show;

                    if (typeof childShowOptions === 'undefined') {
                      childFieldHidden = false;
                    } else {
                      //不应有跨分组关联
                      //console.log(groupUischema)
                      //console.log(formData)
                      //debugger;
                      childFieldHidden = _this10._shouldFieldHidden(groupUischema, childShowOptions, formData[field]);
                    }
                  }

                  if (typeof uiSchema[field][code] === 'undefined') {
                    uiSchema[field][code] = {
                      classNames: childFieldHidden ? XFORM_HIDDEN_CLASS : ''
                    };
                  } else if (typeof uiSchema[field][code].classNames === 'undefined') {
                    uiSchema[field][code].classNames = childFieldHidden ? XFORM_HIDDEN_CLASS : '';
                  } else if (uiSchema[field][code].classNames && uiSchema[field][code].classNames.length > 0) {
                    // 防止属性重复添加
                    var _classnames2 = uiSchema[field][code].classNames.split(' ');

                    if (childFieldHidden && _classnames2.indexOf(XFORM_HIDDEN_CLASS) <= -1) {
                      _classnames2.push(XFORM_HIDDEN_CLASS);
                    } else if (!childFieldHidden && _classnames2.indexOf(XFORM_HIDDEN_CLASS) > -1) {
                      _classnames2.splice(_classnames2.indexOf(XFORM_HIDDEN_CLASS), 1);
                    }

                    uiSchema[field][code].classNames = _classnames2.join(' ');
                  } else {
                    uiSchema[field][code].classNames = childFieldHidden ? XFORM_HIDDEN_CLASS : '';
                  }
                }
              });
            })();
          } //debugger;

        }
      } //debugger;


      return uiSchema;
    }
  }, {
    key: "_shouldFieldHidden",
    value: function _shouldFieldHidden(uiSchema, showOptions, formData) {
      var result = true;
      var fieldName;
      showOptions.map(function (showOption) {
        fieldName = showOption.field; // 如果该关联的字段是隐藏状态，则不应该再判断当前这个showOption的values。隐藏字段不应影响级联关系

        if (typeof uiSchema[fieldName] !== 'undefined') {
          var classNames = uiSchema[fieldName].classNames || '';

          if (classNames.indexOf(XFORM_HIDDEN_CLASS) <= -1) {
            showOption.values.map(function (value) {
              if (value === formData[fieldName]) {
                result = false;
              }
            });
          }
        } else {
          // 如果showOptions中的show字段在整个schema中不存在，则认为该字段不应有级联关系，应该展示该字段
          result = false;
        }
      });
      return result;
    } // 输出给组件外部的formData或bizData，要根据field字段是否隐藏进行过滤

  }, {
    key: "_filterExportData",
    value: function _filterExportData(uiSchema, formData) {
      // let filterFormData = { };
      var filterFormData = {
        uiSchema: uiSchema
      };
      var fieldName, classnames;

      for (fieldName in formData) {
        if (formData.hasOwnProperty(fieldName)) {
          classnames = [];

          if (uiSchema[fieldName] && uiSchema[fieldName].classNames && uiSchema[fieldName].classNames.length > 0) {
            classnames = uiSchema[fieldName].classNames.split(' ');
          }

          if (classnames.indexOf(XFORM_HIDDEN_CLASS) <= -1) {
            filterFormData[fieldName] = formData[fieldName];
          }
        }
      }

      return filterFormData;
    }
  }, {
    key: "_handleXFormChange",
    value: function _handleXFormChange(schema) {
      var _this11 = this;

      // 加入任务类型埋点
      if (!isFormDirty) {
        this.logger.logTask('表单完成率');
        this.logger.logTask('表单Dirty率', 'success'); // 记录xform渲染完成时间，用来计算表单填写计时

        formRenderTime = new Date().getTime();
        isFormDirty = true;
      }

      validateType = 'live';
      var currentFormData = schema.formData;
      var formData = this.state.formData;
      var jsonSchema = this.state.jsonSchema;
      var uiSchema = this.state.uiSchema;
      var bizData = this.state.bizData;
      var changeFieldName = ''; // 通过比较找出触发onChange的表单域name

      for (var fieldName in currentFormData) {
        if (currentFormData.hasOwnProperty(fieldName)) {
          // 非基本类型要用序列化的数据进行比较，基本类型直接比较
          if (_typeof(formData[fieldName]) !== 'object') {
            if (currentFormData[fieldName] !== formData[fieldName]) {
              changeFieldName = fieldName;
              break;
            }
          } else {
            if (JSON.stringify(currentFormData[fieldName]) !== JSON.stringify(formData[fieldName])) {
              changeFieldName = fieldName;
              break;
            }
          }
        }
      } // 如果发现表单没有发生变化，直接return


      if (changeFieldName === '') {
        return;
      } //计算控件
      //console.log(currentFormData);


      var currentFormData_ = deepCloneObject(currentFormData);

      for (var key in bizData) {
        if (bizData[key].type == 'Calculate' && (uiSchema[key] && uiSchema[key]['ui:options'] && uiSchema[key]['ui:options'].calculateFields || false // group 或 Table 的计算 
        )) {
          var uiSchemaWidge = uiSchema[key]['ui:options'].calculateFields;

          if (uiSchemaWidge.length) {
            var calculateType = uiSchema[key]['ui:algorithm'];

            if (calculateType == 'average') {
              //平均
              currentFormData_[key] = (uiSchemaWidge.reduce(function (s, uw) {
                s += Number(currentFormData[uw]);
                return s;
              }, 0) / uiSchemaWidge.length).toFixed(2);
            } else {
              //求和
              currentFormData_[key] = uiSchemaWidge.reduce(function (s, uw) {
                s += Number(currentFormData[uw]);
                return s;
              }, 0);
            }
          }
        }
      } //console.log(currentFormData_);
      // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确


      var updateShowUISchema = this._updateFieldsShow(uiSchema, currentFormData_, this.state.sequence); // debugger
      // 执行表单校验


      this.validate(currentFormData_, changeFieldName); // 根据schema设置字段bizData中的displayName

      bizData = this._setAllFieldsDisplayName({
        jsonSchema: jsonSchema,
        uiSchema: uiSchema,
        formData: currentFormData_,
        bizData: bizData
      });

      if (_typeof(bizData) !== 'object') {
        this.props.onChange(this._filterExportData(updateShowUISchema, currentFormData_), changeFieldName);
      } else {
        this.props.onChange(this._filterExportData(updateShowUISchema, currentFormData_), this._filterExportData(updateShowUISchema, bizData), changeFieldName);
      } // debugger


      this.setState({
        formData: deepCloneObject(currentFormData_),
        bizData: deepCloneObject(bizData)
      }, function () {
        // 检查表单联动数据源更新
        if (uiSchema[changeFieldName] && uiSchema[changeFieldName]['ui:options'] && uiSchema[changeFieldName]['ui:options'].updateFields && uiSchema[changeFieldName]['ui:options'].updateFields.length > 0) {
          _this11._updateFieldsData(changeFieldName, currentFormData_[changeFieldName], uiSchema[changeFieldName]['ui:options'].updateFields);
        }
      });
    }
  }, {
    key: "_handleXFormSubmit",
    value: function _handleXFormSubmit(schema) {
      var _this12 = this;

      var bizData = this.state.bizData;
      var uiSchema = this.state.uiSchema; // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确

      var updateShowUISchema = this._updateFieldsShow(uiSchema, schema.formData, this.state.sequence);

      validateType = 'submit'; //提交前校验

      this.validate(schema.formData, 'all', function () {
        if (_typeof(bizData) !== 'object') {
          _this12.props.onSubmit(_this12._filterExportData(updateShowUISchema, schema.formData));
        } else {
          _this12.props.onSubmit(_this12._filterExportData(updateShowUISchema, schema.formData), _this12._filterExportData(updateShowUISchema, bizData));
        } // 发送表单填写计时数据


        if (!taskSuccess) {
          _this12.logger.logTime('xform', '表单填写用时', null, new Date().getTime() - formRenderTime);

          _this12.logger.logTask('表单完成率', 'success', new Date().getTime() - formRenderTime);

          taskSuccess = true;
        }
      }, function () {
        // 发送表单填写计时数据
        _this12.logger.logTask('表单完成率', 'validate fail');
      });
    }
  }, {
    key: "validate",
    value: function validate(formData, changeFieldName, callback, failCallback) {
      if (changeFieldName === 'all') {
        // 完整表单提交校验的场景下才需要进行全局validation属性的校验
        if (this.props.validation(formData, this.state.bizData)) {
          this._validate(formData, changeFieldName, callback, failCallback);
        } else {
          // validate失败后，需要触发失败回调
          if (typeof failCallback === 'function') {
            failCallback();
          }
        }
      } else {
        this._validate(formData, changeFieldName, callback, failCallback);
      }
    } // XForm提交方法，允许通过refs方式访问（由于json-schema要求提交按钮必须在form内，这有很大的局限性，故允许通过调用XFormSubmit来在任意点触发表单提交）

  }, {
    key: "XFormSubmit",
    value: function XFormSubmit() {
      var _this13 = this;

      validateType = 'submit';
      var formData = this.state.formData;
      var bizData = this.state.bizData;
      var uiSchema = this.state.uiSchema; // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确

      var updateShowUISchema = this._updateFieldsShow(uiSchema, formData, this.state.sequence); // 提交前校验


      this.validate(formData, 'all', function () {
        if (_typeof(bizData) !== 'object') {
          _this13.props.onSubmit(_this13._filterExportData(updateShowUISchema, formData));
        } else {
          _this13.props.onSubmit(_this13._filterExportData(updateShowUISchema, formData), _this13._filterExportData(updateShowUISchema, bizData));
        } // 发送表单填写计时数据
        // 加入任务类型埋点


        if (!taskSuccess) {
          _this13.logger.logTime('xform', '表单填写用时', null, new Date().getTime() - formRenderTime);

          _this13.logger.logTask('表单完成率', 'success', new Date().getTime() - formRenderTime);

          taskSuccess = true;
        }
      }, function () {
        _this13.logger.logTask('表单完成率', 'validate fail');
      });
      this.logger.logEvent('api', 'use', 'XFormSubmit');
    } // 获取表单初始FormData

  }, {
    key: "XFormInitFormData",
    value: function XFormInitFormData() {
      this.logger.logEvent('api', 'use', 'XFormInitFormData');
      return initFormData;
    } // 重置XForm表单，允许通过refs方式访问

  }, {
    key: "XFormReset",
    value: function XFormReset() {
      this.setState({
        formData: deepCloneObject(initFormData)
      });
      this.logger.logEvent('api', 'use', 'XFormReset');
    } // 设置formData

  }, {
    key: "XFormSetFormData",
    value: function XFormSetFormData(formData) {
      this.setState({
        formData: deepCloneObject(formData)
      });
      this.logger.logEvent('api', 'use', 'XFormSetFormData');
    } // XForm获取Xform当前的formData的方法，允许通过refs方式访问

  }, {
    key: "XFormCurrentFormData",
    value: function XFormCurrentFormData() {
      var uiSchema = this.state.uiSchema;
      var formData = this.state.formData; // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确

      var updateShowUISchema = this._updateFieldsShow(uiSchema, formData, this.state.sequence);

      this.logger.logEvent('api', 'use', 'XFormCurrentFormData');
      return this._filterExportData(updateShowUISchema, formData);
    } // XForm获取当前bizData，允许通过refs方式访问

  }, {
    key: "XFormBizData",
    value: function XFormBizData() {
      var uiSchema = this.state.uiSchema;
      var formData = this.state.formData;
      var bizData = this.state.bizData; // 获取联动后的uiSchema，保证通过_filterExportData输出的formData的正确

      var updateShowUISchema = this._updateFieldsShow(uiSchema, formData, this.state.sequence);

      this.logger.logEvent('api', 'use', 'XFormBizData');
      return this._filterExportData(updateShowUISchema, bizData);
    } // XForm表单校验，允许通过refs方式访问（由于json-schema要求提交按钮必须在form内，这有很大的局限性，故允许通过调用XFormValidate来在任意点触发表单校验，之后可以自己实现校验后的处理逻辑）

  }, {
    key: "XFormValidate",
    value: function XFormValidate(callback, failCallback) {
      var _this14 = this;

      validateType = 'submit';
      var formData = this.state.formData;
      this.validate(formData, 'all', function () {
        // 发送表单填写计时数据（由于表单提交行为不可控，故使用表单校验近似作为）
        // 加入任务类型埋点
        if (!taskSuccess) {
          _this14.logger.logTime('xform', '表单填写用时', null, new Date().getTime() - formRenderTime);

          _this14.logger.logTask('表单完成率', 'success', new Date().getTime() - formRenderTime);

          taskSuccess = true;
        }

        if (typeof callback === 'function') {
          callback();
        }
      }, function () {
        // 加入任务类型埋点
        _this14.logger.logTask('表单完成率', 'validate fail');

        if (typeof failCallback === 'function') {
          failCallback();
        }
      });
      this.logger.logEvent('api', 'use', 'XFormValidate');
    } // XForm表单同步校验方法，允许通过refs方式访问（这是一个同步校验的方法，无法进行type: 'server'的校验类型）
    // @return boolean校验是否通过

  }, {
    key: "XFormValidateSync",
    value: function XFormValidateSync() {
      var uiSchema = this.state.uiSchema;
      var formData = this.state.formData;
      var validateResult = true;
      var fieldName,
          fieldValue,
          fieldValidate = [],
          classNames = '',
          widgetType = '';
      this.logger.logEvent('api', 'use', 'XFormValidateSync'); // 用户自定义的validation方法校验不通过则直接校验不通过

      if (!this.props.validation(formData, this.state.bizData)) {
        validateResult = false;
      } else {
        for (fieldName in uiSchema) {
          if (uiSchema.hasOwnProperty(fieldName)) {
            fieldValue = formData[fieldName];
            fieldValidate = [];
            classNames = '';
            widgetType = '';

            if (typeof uiSchema[fieldName] !== 'undefined') {
              fieldValidate = uiSchema[fieldName]['ui:options'] && uiSchema[fieldName]['ui:options'].validate || [];
              classNames = uiSchema[fieldName].classNames || '';
              widgetType = uiSchema[fieldName]['ui:widget'] || '';
            }

            var _this$_validateFieldS = this._validateFieldSync(fieldValidate, fieldValue, classNames, widgetType),
                result = _this$_validateFieldS.result,
                errorType = _this$_validateFieldS.errorType;

            if (result) {
              // 单个字段校验通过，将该fieldName下的_errorType置为空
              if (typeof uiSchema[fieldName] !== 'undefined') {
                if (typeof uiSchema[fieldName]['ui:options'] !== 'undefined') {
                  uiSchema[fieldName]['ui:options']._errorType = '';
                } else {
                  uiSchema[fieldName]['ui:options'] = {
                    _errorType: ''
                  };
                }
              }

              if (debugMode) {
                console.log('field:' + fieldName + ';errorType=' + uiSchema[fieldName]['ui:options']._errorType);
              }

              this.setState({
                uiSchema: deepCloneObject(uiSchema)
              });
            } else {
              // 单个字段校验不通过，存在errorType，就要更新schema，来展示校验结果
              if (typeof uiSchema[fieldName] === 'undefined') {
                uiSchema[fieldName] = {
                  'ui:options': {
                    _errorType: errorType
                  }
                };
              } else if (typeof uiSchema[fieldName]['ui:options'] === 'undefined') {
                uiSchema[fieldName]['ui:options'] = {
                  _errorType: errorType
                };
              } else {
                uiSchema[fieldName]['ui:options']._errorType = errorType;
              }

              if (debugMode) {
                console.log('field:' + fieldName + ';errorType=' + uiSchema[fieldName]['ui:options']._errorType);
              }

              this.setState({
                uiSchema: deepCloneObject(uiSchema)
              });
              validateResult = false;
            }
          }
        }
      }

      if (validateResult) {
        // 发送表单填写计时数据（由于表单提交行为不可控，故使用表单校验近似作为）
        // 加入任务类型埋点
        if (!taskSuccess) {
          this.logger.logTime('xform', '表单填写用时', null, new Date().getTime() - formRenderTime);
          this.logger.logTask('表单完成率', 'success', new Date().getTime() - formRenderTime);
          taskSuccess = true;
        }
      }

      return validateResult;
    } // XForm表单数据源更新方法，允许通过refs方式访问（该方法不需要参数，会去更新全部配置了数据源的字段）

  }, {
    key: "XFormFetchAllFromDataSource",
    value: function XFormFetchAllFromDataSource() {
      this._getFieldDataFromDataSource();

      this.logger.logEvent('api', 'use', 'XFormFetchAllFromDataSource');
    } // XForm表单数据源更新方法，允许通过refs方式访问（该方法需要传入待更新数据源的字段名称）

  }, {
    key: "XFormFetchFromDataSource",
    value: function XFormFetchFromDataSource(name) {
      if (typeof name === 'string') {
        this._getFieldDataFromDataSource(name);
      }

      this.logger.logEvent('api', 'use', 'XFormFetchFromDataSource');
    }
  }, {
    key: "setButtonInputDisable",
    value: function setButtonInputDisable(uiSchema, formData) {
      if (uiSchema) {
        if (formData.behavior) {
          if (uiSchema.popCode) {
            uiSchema.popCode['ui:disabled'] = formData.behavior == '弹出控件组' ? false : true;
            if (formData.behavior != '弹出控件组') formData.popCode = '';
          }

          if (uiSchema.behaviorUrl) {
            uiSchema.behaviorUrl['ui:disabled'] = formData.behavior == '提交' ? false : true;
            if (formData.behavior != '提交') formData.behaviorUrl = '';
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          popupContainer = _this$props3.popupContainer,
          widgets = _this$props3.widgets,
          fields = _this$props3.fields,
          fieldTemplate = _this$props3.fieldTemplate,
          arrayFieldTemplate = _this$props3.arrayFieldTemplate,
          objectFieldTemplate = _this$props3.objectFieldTemplate,
          formContext = _this$props3.formContext,
          defaultSubmitButtonComponent = _this$props3.defaultSubmitButtonComponent,
          className = _this$props3.className,
          disabled = _this$props3.disabled,
          readonly = _this$props3.readonly;
      var jsonSchema = this.state.jsonSchema;
      var uiSchema = this.state.uiSchema;
      var formData = this.state.formData;
      var bizData = this.state.bizData;
      var popView = this.state.popView;
      var shouldPopCode = this.state.shouldPopCode; // 禁用、只读状态

      uiSchema = this._setAllFieldsDisable(bizData, uiSchema, jsonSchema, disabled);
      uiSchema = this._setAllFieldsReadonly(bizData, uiSchema, jsonSchema, readonly); // 更新表单联动字段的展示

      uiSchema = this._updateFieldsShow(uiSchema, formData, this.state.sequence);
      this.setButtonInputDisable(uiSchema, formData);
      var seqJsonSchema = (0, _tools.getOrderJsonSchemaBySequence)(jsonSchema, this.state.sequence);
      var seqUiSchema = (0, _tools.getOrderSchemaBySequence)(uiSchema, this.state.sequence);
      var seqFormData = (0, _tools.getOrderSchemaBySequence)(formData, this.state.sequence); // console.log(seqJsonSchema, seqUiSchema, seqFormData);

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: XFORM_ROOT_CLASS
      }, /*#__PURE__*/_react["default"].createElement(_reactJsonschemaForm["default"], {
        noValidate: true,
        showErrorList: false,
        schema: deepCloneObject(seqJsonSchema),
        uiSchema: deepCloneObject(seqUiSchema),
        formData: deepCloneObject(seqFormData),
        widgets: widgets,
        fields: fields,
        FieldTemplate: fieldTemplate,
        ArrayFieldTemplate: arrayFieldTemplate,
        ObjectFieldTemplate: objectFieldTemplate,
        formContext: Object.assign({}, formContext, {
          schema: deepCloneObject(seqJsonSchema),
          popupContainer: popupContainer,
          getFieldDataFromDataSource: this._fetchDataFromDataSource,
          showPopView: this._showPopView,
          closePopView: this._closePopView,
          popView: popView,
          shouldPopCode: shouldPopCode
        }),
        className: className,
        onChange: this._handleXFormChange,
        onSubmit: this._handleXFormSubmit
      }, this.props.children || defaultSubmitButtonComponent));
    }
  }]);

  return XFormCore;
}(_react.Component);

_defineProperty(XFormCore, "propTypes", {
  env: _propTypes["default"].oneOf(['dev', 'prod']),
  locale: _propTypes["default"].string,
  popupContainer: _propTypes["default"].func,
  fieldTemplate: _propTypes["default"].func,
  arrayFieldTemplate: _propTypes["default"].func,
  objectFieldTemplate: _propTypes["default"].func,
  widgets: _propTypes["default"].object,
  fields: _propTypes["default"].object,
  formContext: _propTypes["default"].object,
  // defaultSubmitButtonComponent: PropTypes.element,
  formCode: _propTypes["default"].string,
  customGateway: _propTypes["default"].object,
  mockInterfaces: _propTypes["default"].shape({
    dataSourceServerUrl: _propTypes["default"].any,
    getSchemaByCode: _propTypes["default"].any,
    serverCheck: _propTypes["default"].any
  }),
  customInterfaces: _propTypes["default"].shape({
    dataSourceServerUrl: _propTypes["default"].any,
    getSchemaByCode: _propTypes["default"].any,
    serverCheck: _propTypes["default"].any
  }),
  customInterfacesParams: _propTypes["default"].shape({
    dataSourceServerUrl: _propTypes["default"].object,
    getSchemaByCode: _propTypes["default"].object,
    serverCheck: _propTypes["default"].object
  }),
  jsonSchema: _propTypes["default"].object,
  uiSchema: _propTypes["default"].object,
  formData: _propTypes["default"].object,
  bizData: _propTypes["default"].object,
  className: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  readonly: _propTypes["default"].bool,
  sequence: _propTypes["default"].array,
  beforeSchemaFetch: _propTypes["default"].func,
  beforeDataSourceFetch: _propTypes["default"].func,
  beforeServerCheck: _propTypes["default"].func,
  validation: _propTypes["default"].func,
  onload: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onSubmit: _propTypes["default"].func,
  logEvent: _propTypes["default"].func
});

_defineProperty(XFormCore, "defaultProps", {
  env: 'prod',
  popupContainer: XFORM_ROOT_ELEMENT,
  formContext: {},
  formCode: '',
  className: '',
  disabled: false,
  readonly: false,
  beforeSchemaFetch: function beforeSchemaFetch() {
    return {};
  },
  beforeDataSourceFetch: function beforeDataSourceFetch() {
    return {};
  },
  beforeServerCheck: function beforeServerCheck() {
    return {};
  },
  widgets: {},
  fields: {},
  validation: function validation() {
    return true;
  },
  onload: function onload() {},
  onChange: function onChange() {},
  onSubmit: function onSubmit() {}
});

var _default = XFormCore;
exports["default"] = _default;