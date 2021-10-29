"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogger = setLogger;
exports["default"] = void 0;

var CONST = _interopRequireWildcard(require("../common/const"));

var _request = require("../common/request");

var _fields = require("../common/fields");

var _antd = require("antd");

var _localeMessages = require("../i18n/localeMessages");

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function formatDataSourceListData(data, messages) {
  var result = data.map(function (item) {
    return _objectSpread({}, item);
  });
  return [{
    label: messages[(0, _localeMessages.getMessageId)('actionCreatorsDefaultDataSource')],
    value: ''
  }].concat(result);
}

var logger = null;

function setLogger(originLogger) {
  logger = originLogger;
}

function getLogger() {
  if (logger) {
    return logger;
  } else {
    return new _logger["default"](function () {});
  }
}

var actionCreators = {
  // 更新编辑中的field数据
  updateEditFieldData: function updateEditFieldData(fieldData, namespace) {
    return {
      type: CONST.XFORM_BUILDER_UPDATE_EDIT_FIELD,
      data: fieldData,
      namespace: namespace
    };
  },
  // 更新整个fields数据
  updateFields: function updateFields(fields, namespace) {
    return {
      type: CONST.XFORM_BUILDER_INIT_FIELDS,
      data: fields,
      namespace: namespace
    };
  },
  // // 更新groupfields数据
  // updateGroupFields(fields, namespace) {
  //     return {
  //         type: CONST.XFORM_BUILDER_GROUP_FIELDS,
  //         data: fields,
  //         namespace
  //     };
  // },
  // 获取builder的基础配置（包括系统字段、通用模板、业务属性、选项业务属性）
  fetchInitConfig: function fetchInitConfig(params, messages, resolve, reject) {
    var bizCode = params.bizCode,
        formCode = params.formCode,
        locale = params.locale,
        systemFieldSupport = params.systemFieldSupport,
        commonFieldSupport = params.commonFieldSupport,
        bizDataSupport = params.bizDataSupport,
        langConfigSupport = params.langConfigSupport,
        supportLangList = params.supportLangList,
        systemTemplate = params.systemTemplate,
        commonTemplate = params.commonTemplate,
        attributeTemplate = params.attributeTemplate,
        optionTemplate = params.optionTemplate,
        customInterfaces = params.customInterfaces,
        customGateway = params.customGateway,
        namespace = params.namespace,
        env = params.env; // 开启多语言配置的场景下，判断设置的locale属性在不在supportLangList中，如果不在，给一个warning

    if (langConfigSupport) {
      if (supportLangList && supportLangList.indexOf(locale) <= -1) {
        console.warn('[xform-editor]配置的locale属性值不在supportLangList中，将默认设置' + supportLangList[0] + '作为多语言设置的默认语言');
      }
    }

    var getInitConfig = function getInitConfig() {
      return new Promise(function (resolve, reject) {
        if (env === 'dev') {
          resolve({
            "systemTemplate": {
              "fields": []
            },
            "commonTemplate": {
              "fields": []
            },
            "attributeTemplate": {
              "fields": []
            },
            "optionTemplate": {
              "fields": []
            },
            "langs": [{
              "name": "English",
              "locale": "en",
              "enabled": true
            }],
            "defaultLang": "en",
            "platform": 'laptop'
          });
        } else {
          _request.request.fetch(_request.request.getInterface('getInitConfig', customInterfaces, env), {
            currentLang: locale,
            supportedLangs: supportLangList && supportLangList.join(','),
            bizCode: bizCode,
            formCode: formCode,
            systemTemplate: systemTemplate,
            commonTemplate: commonTemplate,
            attributeTemplate: attributeTemplate,
            optionTemplate: optionTemplate
          }, customGateway, env).then(resolve)["catch"](reject);
        }
      });
    };

    return function (dispatch) {
      getInitConfig().then(function (data) {
        if (systemFieldSupport) {
          if (data && data.systemTemplate && data.systemTemplate.fields) {
            dispatch({
              type: CONST.XFORM_BUILDER_UPDATE_SYSTEM_FIELDS,
              data: data.systemTemplate.fields,
              namespace: namespace
            });
          } else {
            console.warn('[xform-editor]getInitConfig接口缺少systemTemplate字段');
            getLogger().logException('xformBuilder.getInitConfig.missingSystemTemplate', true);
          }
        }

        if (commonFieldSupport) {
          if (data && data.commonTemplate && data.commonTemplate.fields) {
            dispatch({
              type: CONST.XFORM_BUILDER_UPDATE_COMMON_FIELDS,
              data: data.commonTemplate.fields,
              namespace: namespace
            });
          } else {
            console.warn('[xform-editor]getInitConfig接口缺少commonTemplate字段');
            getLogger().logException('xformBuilder.getInitConfig.missingCommonTemplate', true);
          }
        }

        if (bizDataSupport) {
          if (data && data.attributeTemplate && data.attributeTemplate.fields) {
            dispatch({
              type: CONST.XFORM_BUILDER_UPDATE_BIZ,
              data: data.attributeTemplate.fields,
              namespace: namespace
            });
          } else {
            console.warn('[xform-editor]getInitConfig接口缺少attributeTemplate字段');
            getLogger().logException('xformBuilder.getInitConfig.missingAttributeTemplate', true);
          }

          if (data && data.optionTemplate && data.optionTemplate.fields) {
            dispatch({
              type: CONST.XFORM_BUILDER_UPDATE_OPTION_BIZ,
              data: data.optionTemplate.fields,
              namespace: namespace
            });
          } else {
            console.warn('[xform-editor]]getInitConfig接口缺少optionTemplate字段');
            getLogger().logException('xformBuilder.getInitConfig.missingOptionTemplate', true);
          }
        } // 多语言配置版本


        if (langConfigSupport) {
          if (data && data.langs && data.defaultLang) {
            dispatch({
              type: CONST.XFORM_BUILDER_UPDATE_LANGS,
              data: {
                langs: data.langs,
                defaultLang: data.defaultLang,
                currentLang: data.defaultLang
              },
              namespace: namespace
            });
          } else {
            console.warn('[xform-editor]getInitConfig接口缺少字段langs和defaultLang字段');
            getLogger().logException('xformBuilder.getInitConfig.missingOptionTemplate', true);
          }
        }

        resolve(data);
      })["catch"](function (error) {
        _antd.message.error(messages[(0, _localeMessages.getMessageId)('actionCreatorsGetInitConfigErrorTip')] + error.message);

        getLogger().logException('xformBuilder.getInitConfigFields', true);
        console.error('[xform-editor]' + messages[(0, _localeMessages.getMessageId)('actionCreatorsGetInitConfigErrorTip')] + error.message);
        reject(error);
      });
    };
  },
  // 通过服务端重新获取多语言配置数据
  refetchLangConfig: function refetchLangConfig(params, messages, currentLang) {
    var bizCode = params.bizCode,
        formCode = params.formCode,
        locale = params.locale,
        langConfigSupport = params.langConfigSupport,
        supportLangList = params.supportLangList,
        systemTemplate = params.systemTemplate,
        commonTemplate = params.commonTemplate,
        attributeTemplate = params.attributeTemplate,
        optionTemplate = params.optionTemplate,
        customInterfaces = params.customInterfaces,
        customGateway = params.customGateway,
        namespace = params.namespace,
        env = params.env;
    return function (dispatch) {
      _request.request.fetch(_request.request.getInterface('getInitConfig', customInterfaces, env), {
        currentLang: locale,
        supportedLangs: supportLangList && supportLangList.join(','),
        bizCode: bizCode,
        formCode: formCode,
        systemTemplate: systemTemplate,
        commonTemplate: commonTemplate,
        attributeTemplate: attributeTemplate,
        optionTemplate: optionTemplate
      }, customGateway, env).then(function (data) {
        // 多语言配置版本
        if (langConfigSupport) {
          if (data && data.langs && data.defaultLang) {
            dispatch({
              type: CONST.XFORM_BUILDER_UPDATE_LANGS,
              data: {
                langs: data.langs,
                defaultLang: data.defaultLang,
                currentLang: currentLang
              },
              namespace: namespace
            });
          } else {
            console.warn('[xform-editor]getInitConfig接口缺少字段langs和defaultLang字段');
            getLogger().logException('xformBuilder.getInitConfig.missingOptionTemplate', true);
          }
        }
      })["catch"](function (error) {
        _antd.message.error(messages[(0, _localeMessages.getMessageId)('actionCreatorsGetInitConfigErrorTip')] + error.message);

        getLogger().logException('xformBuilder.getInitConfigFields', true);
        console.error('[xform-editor]' + messages[(0, _localeMessages.getMessageId)('actionCreatorsGetInitConfigErrorTip')] + error.message);
      });
    };
  },
  // 更新store中的langs多语言部分数据
  updateLangConfig: function updateLangConfig(langConfig, namespace) {
    return {
      type: CONST.XFORM_BUILDER_UPDATE_LANGS,
      data: langConfig,
      namespace: namespace
    };
  },
  // 清空多语言配置
  clearLangConfig: function clearLangConfig(namespace) {
    return {
      type: CONST.XFORM_BUILDER_CLEAR_LANGS,
      data: null,
      namespace: namespace
    };
  },
  // 更新全局配置
  updateGlobalConfig: function updateGlobalConfig(globalConfig, namespace) {
    return {
      type: CONST.XFORM_BUILDER_UPDATE_GLOBAL_CONFIG,
      data: globalConfig,
      namespace: namespace
    };
  },
  // 清空系统字段数据
  clearSystemFieldData: function clearSystemFieldData(namespace) {
    return {
      type: CONST.XFORM_BUILDER_CLEAR_SYSTEM_FIELDS,
      data: [],
      namespace: namespace
    };
  },
  // 清空通用字段数据
  clearCommonFieldData: function clearCommonFieldData(namespace) {
    return {
      type: CONST.XFORM_BUILDER_CLEAR_COMMON_FIELDS,
      data: [],
      namespace: namespace
    };
  },
  // 清空业务属性
  clearBizData: function clearBizData(namespace) {
    return {
      type: CONST.XFORM_BUILDER_CLEAR_BIZ,
      data: [],
      namespace: namespace
    };
  },
  // 清空选项业务属性
  clearOptionBizData: function clearOptionBizData(namespace) {
    return {
      type: CONST.XFORM_BUILDER_CLEAR_OPTION_BIZ,
      data: [],
      namespace: namespace
    };
  },
  // 获取生效字段初始field数据
  fetchSelectedFieldData: function fetchSelectedFieldData(params, filterSystemFields, messages) {
    var systemFieldSupport = params.systemFieldSupport,
        langConfigSupport = params.langConfigSupport,
        formCode = params.formCode,
        lang = params.lang,
        customInterfaces = params.customInterfaces,
        customGateway = params.customGateway,
        namespace = params.namespace,
        env = params.env,
        bpmnNodes = params.bpmnNodes;
    var fields,
        requestParam = {};
    return function (dispatch, getState) {
      if (typeof params.formCode === 'undefined' || params.formCode === '') {
        // 新建表单
        if (params.jsonSchema) {
          var schema = (0, _fields.getSchema)(params.jsonSchema, params.uiSchema, params.formData, params.bizData, params.sequence);
          var data = (0, _fields.getFieldsBySchema)(schema, bpmnNodes);

          if (data && data.fields) {
            fields = data.fields;

            if (!systemFieldSupport || filterSystemFields) {
              fields = fields.filter(function (field) {
                return field.fieldType !== 'system';
              });
            }

            dispatch({
              type: CONST.XFORM_BUILDER_INIT_FIELDS,
              data: fields,
              namespace: namespace
            });
            return;
          }
        }

        fields = getState().xformBuilderData[namespace].systemFields;

        if (!systemFieldSupport || filterSystemFields) {
          fields = fields.filter(function (field) {
            return field.fieldType !== 'system';
          });
        } // 初始更新store的fields(更新为store.systemFields)


        dispatch({
          type: CONST.XFORM_BUILDER_INIT_FIELDS,
          data: fields,
          namespace: namespace
        });
      } else {
        // 在老的表单的基础上编辑
        if (langConfigSupport) {
          requestParam = {
            formCode: formCode,
            // formCode用来决定是新建还是编辑更新
            lang: lang
          };
        } else {
          requestParam = {
            formCode: formCode // formCode用来决定是新建还是编辑更新

          };
        }

        var useGetSchemaByCode = true;

        if (customInterfaces && !customInterfaces.getSchemaByCode) {
          useGetSchemaByCode = false;
          console.warn('[xform-editor]please set getSchemaByCode in customInterfaces');
          getLogger().logException('NO xformBuilder.getSchemaByCode', true);
        }

        var apiName = useGetSchemaByCode ? 'getSchemaByCode' : 'getSelectedFieldsData';

        _request.request.fetch(_request.request.getInterface(apiName, customInterfaces, env), requestParam, customGateway, env).then(function (originData) {
          var data = originData;

          if (useGetSchemaByCode && originData) {
            if ((0, _fields.isSchemaLegal)(originData)) {
              data = (0, _fields.getFieldsBySchema)(originData, bpmnNodes);
            } else {
              throw new Error('json schema is not legal');
            }
          }

          if (data && 'fields' in data) {
            fields = data.fields;

            if (!systemFieldSupport || filterSystemFields) {
              fields = fields.filter(function (field) {
                return field.fieldType !== 'system';
              });
            } // 初始更新store的fields


            dispatch({
              type: CONST.XFORM_BUILDER_INIT_FIELDS,
              data: fields,
              namespace: namespace
            });
          } else {
            console.warn('[xform-editor]获取初始selectedFieldData缺少fields字段');
            getLogger().logException('xformBuilder.getSelectedFields', true); // 如果接口数据格式错误，则默认无生效字段

            dispatch({
              type: CONST.XFORM_BUILDER_INIT_FIELDS,
              data: [],
              namespace: namespace
            });
          }
        })["catch"](function (error) {
          _antd.message.error(messages[(0, _localeMessages.getMessageId)('actionCreatorsGetSelectFieldErrorTip')] + error.message); // 如果接口调用失败，则默认无生效字段


          dispatch({
            type: CONST.XFORM_BUILDER_INIT_FIELDS,
            data: [],
            namespace: namespace
          });
          getLogger().logException('xformBuilder.getSelectedFields', true);
          console.error('[xform-editor]' + messages[(0, _localeMessages.getMessageId)('actionCreatorsGetSelectFieldErrorTip')] + error.message);
        });
      }
    };
  },
  // 获取动态校验器列表
  fetchServerCodeList: function fetchServerCodeList(params, messages) {
    var customInterfaces = params.customInterfaces,
        customGateway = params.customGateway,
        namespace = params.namespace,
        env = params.env;
    return function (dispatch) {
      var getServerCheckListData = function getServerCheckListData() {
        return new Promise(function (resolve, reject) {
          if (env === 'dev') {
            resolve({
              "data": []
            });
          } else {
            _request.request.fetch(_request.request.getInterface('getServerCheckListData', customInterfaces, env), {}, customGateway, env).then(resolve)["catch"](reject);
          }
        });
      };

      getServerCheckListData().then(function (data) {
        if (data && typeof data.data !== 'undefined' && data.data.length > 0) {
          dispatch({
            type: CONST.XFORM_BUILDER_GET_SERVER_CODE,
            data: data.data,
            namespace: namespace
          });
        } else {
          console.warn('[xform-editor]获取动态校验器配置接口缺少data字段');
          getLogger().logException('xformBuilder.getServerCheckListData', true); // 如果数据源接口格式错误，则默认为空列表

          dispatch({
            type: CONST.XFORM_BUILDER_GET_SERVER_CODE,
            data: [{
              label: messages[(0, _localeMessages.getMessageId)('actionCreatorsDefaultDataSource')],
              value: ''
            }],
            namespace: namespace
          });
        }
      })["catch"](function (error) {
        _antd.message.error(messages[(0, _localeMessages.getMessageId)('actionCreatorsGetServerCodeErrorTip')] + error.message); // 如果出错，则默认为空列表


        dispatch({
          type: CONST.XFORM_BUILDER_GET_SERVER_CODE,
          data: [{
            label: messages[(0, _localeMessages.getMessageId)('actionCreatorsDefaultDataSource')],
            value: '',
            namespace: namespace
          }]
        });
        getLogger().logException('xformBuilder.getServerCheckListData', true);
        console.error('[xform-editor]' + messages[(0, _localeMessages.getMessageId)('actionCreatorsGetServerCodeErrorTip')] + error.message);
      });
    };
  },

  /**
  // 获取字段级配置数据源列表
  fetchFieldDataSourceList(params, messages) {
      const {customInterfaces, customGateway, namespace, env} = params;
      return (dispatch) => {
          request.fetch(request.getInterface('getDataSourceListData', customInterfaces, env), {
              pageNo: 1,
              pageSize: 2000,
              dataSourceParamJson: JSON.stringify({
                  sourceTypeList: ['FIELD_DATA', 'HSF_OPTION', 'SOP_CATEGORY', 'DEFAULT_VALUE']
              })
          }, customGateway, env, {type: 'POST'}).then((data) => {
              if (data && typeof data.data !== 'undefined' && data.data.length > 0) {
                  dispatch({
                      type: CONST.XFORM_BUILDER_GET_DATASOURCE,
                      data: formatDataSourceListData(data.data, messages),
                      namespace
                  });
              } else {
                  console.warn('[xform-editor]获获取数据源配置接口缺少data字段');
                  if (typeof XT !== 'undefined') {
                      XT('xform.exception', 'xformBuilder.getDataSourceList', true);
                  }
                  // 如果数据源接口格式错误，则默认传入“无数据源”配置项
                  dispatch({
                      type: CONST.XFORM_BUILDER_GET_DATASOURCE,
                      data: [{
                          label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                          value: ''
                      }],
                      namespace
                  });
              }
          }).catch((error) => {
              message.error(messages[getMessageId('actionCreatorsGetDataSourceErrorTip')] + error.message);
              // 如果出错，则默认传入“无数据源”配置项
              dispatch({
                  type: CONST.XFORM_BUILDER_GET_DATASOURCE,
                  data: [{
                      label: messages[getMessageId('actionCreatorsDefaultDataSource')],
                      value: '',
                      namespace
                  }]
              });
              if (typeof XT !== 'undefined') {
                  XT('xform.exception', 'xformBuilder.getDataSourceList', true);
              }
              console.error('[xform-editor]' + messages[getMessageId('actionCreatorsGetDataSourceErrorTip')] + error.message);
          });
      };
  },
  */
  // 获取字段级配置数据源列表
  fetchFieldDataSourceList: function fetchFieldDataSourceList(params, messages) {
    var customInterfaces = params.customInterfaces,
        customGateway = params.customGateway,
        namespace = params.namespace,
        env = params.env;

    var getFieldDataSourceList = function getFieldDataSourceList() {
      return new Promise(function (resolve, reject) {
        if (env === 'dev') {
          resolve({
            "data": []
          });
        } else {
          //    request.fetch(request.getInterface('dataSourceServerUrl', customInterfaces, env), {
          //        sourceCode: 'dataSourceList',
          //        params: {},
          //        stringifyParams: JSON.stringify({})
          //    }, customGateway, env, {type: 'POST'}).then(resolve).catch(reject);
          fetch('http://rest.apizza.net/mock/ed27f575082bc8b08597a0476ea1a8f5/memberList').then(function (res) {
            return res.json();
          }).then(resolve)["catch"](reject);
        }
      });
    };

    return function (dispatch) {
      getFieldDataSourceList().then(function (data) {
        if (data && typeof data.data !== 'undefined' && data.data.length > 0) {
          dispatch({
            type: CONST.XFORM_BUILDER_GET_DATASOURCE,
            data: data.data,
            namespace: namespace
          });
        } else {
          console.warn('[xform-editor]获获取数据源配置接口缺少data字段');
          getLogger().logException('xformBuilder.getDataSourceList', true); // 如果数据源接口格式错误，则默认传入“无数据源”配置项

          dispatch({
            type: CONST.XFORM_BUILDER_GET_DATASOURCE,
            data: [{
              label: messages[(0, _localeMessages.getMessageId)('actionCreatorsDefaultDataSource')],
              value: ''
            }],
            namespace: namespace
          });
        }
      })["catch"](function (error) {
        _antd.message.error(messages[(0, _localeMessages.getMessageId)('actionCreatorsGetDataSourceErrorTip')] + error.message); // 如果出错，则默认传入“无数据源”配置项


        dispatch({
          type: CONST.XFORM_BUILDER_GET_DATASOURCE,
          data: [{
            label: messages[(0, _localeMessages.getMessageId)('actionCreatorsDefaultDataSource')],
            value: '',
            namespace: namespace
          }]
        });
        getLogger().logException('xformBuilder.getDataSourceList', true);
        console.error('[xform-editor]' + messages[(0, _localeMessages.getMessageId)('actionCreatorsGetDataSourceErrorTip')] + error.message);
      });
    };
  },
  // 获取表单级配置数据源列表
  fetchFormDataSourceList: function fetchFormDataSourceList(params, messages) {
    var customInterfaces = params.customInterfaces,
        customGateway = params.customGateway,
        namespace = params.namespace,
        env = params.env;
    return function (dispatch) {
      var getDataSourceServerUrl = function getDataSourceServerUrl() {
        return new Promise(function (resolve, reject) {
          if (env === 'dev') {
            resolve({
              "defaultValue": "dataSourceList",
              "help": "请选择对应的数据源，看看能不能更新上去",
              "data": []
            });
          } else {
            // request.fetch(request.getInterface('getDataSourceListData', customInterfaces, env), {
            //     pageNo: 1,
            //     pageSize: 2000,
            //     dataSourceParamJson: JSON.stringify({
            //         sourceTypeList: ['FORM_DATA']
            //     })
            // }, customGateway, env, {type: 'POST'}).then(resolve).catch(reject);
            fetch('http://rest.apizza.net/mock/ed27f575082bc8b08597a0476ea1a8f5/datasourseList').then(function (res) {
              return res.json();
            }).then(resolve)["catch"](reject);
          }
        });
      };

      getDataSourceServerUrl().then(function (data) {
        if (data && data.data && data.data.length > 0) {
          dispatch({
            type: CONST.XFORM_BUILDER_GET_FORM_DATASOURCE,
            data: formatDataSourceListData(data.data, messages),
            namespace: namespace
          });
        } else {
          console.warn('[xform-editor]获获取数据源配置接口缺少data字段');
          getLogger().logException('xformBuilder.getDataSourceList', true); // 如果数据源接口格式错误，则默认传入“无数据源”配置项

          dispatch({
            type: CONST.XFORM_BUILDER_GET_FORM_DATASOURCE,
            data: [{
              label: messages[(0, _localeMessages.getMessageId)('actionCreatorsDefaultDataSource')],
              value: ''
            }],
            namespace: namespace
          });
        }
      })["catch"](function (error) {
        _antd.message.error('1' + messages[(0, _localeMessages.getMessageId)('actionCreatorsGetDataSourceErrorTip')] + error.message); // 如果出错，则默认传入“无数据源”配置项


        dispatch({
          type: CONST.XFORM_BUILDER_GET_FORM_DATASOURCE,
          data: [{
            label: messages[(0, _localeMessages.getMessageId)('actionCreatorsDefaultDataSource')],
            value: '',
            namespace: namespace
          }]
        });
        getLogger().logException('xformBuilder.getDataSourceList', true);
        console.error('[xform-editor]' + messages[(0, _localeMessages.getMessageId)('actionCreatorsGetDataSourceErrorTip')] + error.message);
      });
    };
  },
  // 生效字段中添加field数据
  addSelectedFieldData: function addSelectedFieldData(fieldData, namespace) {
    return {
      type: CONST.XFORM_BUILDER_ADD_FIELDS,
      data: fieldData,
      namespace: namespace
    };
  },
  // 生效字段索引为index的位置增加一个fieldData字段数据
  addFieldDataWithIndex: function addFieldDataWithIndex(fieldData, index, namespace) {
    return {
      type: CONST.XFORM_BUILDER_ADD_FIELDS_WITH_INDEX,
      data: {
        fieldData: fieldData,
        index: index
      },
      namespace: namespace
    };
  },
  // 生效字段中删除field数据
  deleteSelectedFieldData: function deleteSelectedFieldData(code, namespace) {
    return {
      type: CONST.XFORM_BUILDER_DELETE_FIELDS,
      data: code,
      namespace: namespace
    };
  },
  // 生效字段中更新field某项数据
  updateSelectedFieldItemData: function updateSelectedFieldItemData(code, fieldData, namespace) {
    return {
      type: CONST.XFORM_BUILDER_UPDATE_FIELDS_ITEM,
      data: {
        code: code,
        fieldData: fieldData
      },
      namespace: namespace
    };
  }
};
var _default = actionCreators;
exports["default"] = _default;