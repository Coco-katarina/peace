"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = void 0;

var _nattyFetch = _interopRequireDefault(require("natty-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 使用reqwest发起的jsonp http请求（仅在本地调试环境用）
 * @param ajaxUrl
 * @param ajaxParams
 * @param ajaxOptions
 * @return Promise
 */
var commonAjax = function commonAjax(ajaxUrl, ajaxParams, env) {
  var ajaxOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (typeof ajaxUrl === 'string' && ajaxUrl.length > 0) {
    // ajax配置，默认为jsonp get请求
    var method = ajaxOptions.type || 'GET';
    var jsonp = true; // post请求的场景不能用jsonp调用

    if (method.toUpperCase() === 'POST') {
      jsonp = false;
    }

    if (location.href.indexOf('xform-mock=true') > -1 || env === 'dev') {
      method = 'GET';
      jsonp = false;
    }

    var withCredentials = true;

    if (ajaxUrl && ajaxUrl.indexOf('alicdn') >= 0) {
      withCredentials = false;
    }

    return new Promise(function (resolve, reject) {
      var nattyFetchRequest = _nattyFetch["default"].create({
        url: ajaxUrl,
        data: ajaxParams,
        withCredentials: withCredentials,
        method: method.toUpperCase(),
        jsonp: jsonp,
        urlMark: false,
        urlStamp: false,
        fit: function fit(response, vars) {
          if (response.success) {
            return {
              success: response.success,
              content: response.data
            };
          } else {
            return {
              success: response.success,
              error: response.data
            };
          }
        }
      });

      nattyFetchRequest().then(function (data) {
        resolve(data);
      })["catch"](function (error) {
        console.warn('xform:接口' + ajaxUrl + '调用失败:', error);
        reject(error);
      });
    });
  } else {
    console.warn('xform:' + '未传入有效的ajax url！');
  }
};

var commonCustomRequest = function commonCustomRequest(api, params, customGateway, env) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  if (_typeof(customGateway) === 'object' && typeof customGateway.request === 'function') {
    if (typeof api === 'string' && api.length > 0) {
      if (location.href.indexOf('xform-mock=true') > -1 || env === 'dev') {
        return commonAjax(api, params, env, options);
      } else {
        var defaultOptions = {}; // mix options

        for (var key in options) {
          if (options.hasOwnProperty(key)) {
            defaultOptions[key] = options[key];
          }
        }

        var nattyFetchCustomRequest = _nattyFetch["default"].create({
          data: Object.assign({}, defaultOptions, {
            api: api,
            data: params
          }),
          plugins: [customGateway.request]
        });

        return new Promise(function (resolve, reject) {
          nattyFetchCustomRequest().then(function (data) {
            resolve(data);
          })["catch"](function (error) {
            // error里面必须包含message字段
            reject(error);
            console.error('[xform-editor]', error);
          });
        });
      }
    } else {
      console.warn('未传入有效的api！');
    }
  } else {
    console.warn('未传入customGateway属性，或customGateway属性格式不正确。必须为：{request: [Function]}');
  }
};

var request = {
  /**
   * 根据gateway不同获取不同接口
   */
  getInterface: function getInterface(name, customInterfaces, env) {
    var result = '';
    var interfaces = {
      mock: {
        getSchemaByCode: '/getJsonSchemaByCode.json',
        getDataSourceListData: '/getDataSourceList.json',
        getServerCheckListData: '/getServerCheckList.json',
        getInitConfig: '/getInitConfig.json',
        getSelectedFieldsData: '/getSelectedFieldsData.json',
        saveFieldsData: '/saveFieldsData.json',
        updateFieldsData: '/updateFieldsData.json',
        dataSourceServerUrl: '/datasource.json'
      },
      local: {
        dataSourceServerUrl: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/datasource.json',
        getSchemaByCode: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getSchemaByCode.json',
        serverCheck: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/serverCheck.json',
        getDataSourceListData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getDataSourceList.json',
        getServerCheckListData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getServerCheckList.json',
        getInitConfig: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getInitConfig.json',
        getSelectedFieldsData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/getSelectedFieldsData.json',
        saveFieldsData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/saveFieldsData.json',
        updateFieldsData: '//g.alicdn.com/xform/xform-open/0.0.3/xform-mock/updateFieldsData.json'
      }
    };

    if (location.href.indexOf('xform-mock=true') > -1) {
      // mock=true为xform自己进行开发调试的后门
      result = interfaces.mock[name];
    } else if (env === 'dev') {
      result = interfaces.local[name];
    } else {
      if (_typeof(customInterfaces) === 'object') {
        if (typeof customInterfaces[name] !== 'undefined') {
          result = customInterfaces[name];
        } else {
          console.warn('xform:设置了customInterfaces属性，但是未设置【' + name + '】字段');
        }
      } else {
        console.warn('xform:未设置必要的customInterfaces属性字段');
      }
    }

    return result;
  },

  /**
   * 区分网关的fetch方法
   */
  fetch: function fetch(fetchApi, fetchParams, customGateway, env) {
    var fetchOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    if (_typeof(customGateway) === 'object' && typeof customGateway.request === 'function') {
      return commonCustomRequest(fetchApi, fetchParams, customGateway, env, fetchOptions);
    } else {
      return commonAjax(fetchApi, fetchParams, env, fetchOptions);
    }
  }
};
exports.request = request;