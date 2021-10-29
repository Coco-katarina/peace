"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.util = void 0;

var CONST = _interopRequireWildcard(require("./const"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var util = {
  /**
   * 从registerWidgets属性中获取注入XForm组件中的数据内容
   */
  getXFormCustomWidgets: function getXFormCustomWidgets(registerWidgets) {
    var xformRegisterWidgets = {};
    var widgetType = '';
    registerWidgets.map(function (widget) {
      if (typeof widget.schema.uiSchema['ui:widget'] !== 'undefined') {
        widgetType = widget.schema.uiSchema['ui:widget'];
        xformRegisterWidgets[widgetType] = widget.component;
      } else {
        console.warn('xformBuilder:注册的customWidget没有指定ui:widget');
      }
    });
    return xformRegisterWidgets;
  },

  /**
   * 从url中获取参数值
   * @param key 待获取的参数的key值（默认不进行编码处理）
   */
  getParamsFromUrl: function getParamsFromUrl(key) {
    if (!key) {
      return;
    }

    var params = location.href.slice(location.href.indexOf('?') + 1).split('&');
    var paramsObj = {};
    var splitParams;
    params.forEach(function (param) {
      splitParams = param.split('=');
      paramsObj[splitParams[0]] = splitParams[1];
    });

    if (paramsObj[key]) {
      return paramsObj[key];
    } else {
      return '';
    }
  },

  /**
   * 生成随机len位数的字符串
   * @param len
   */
  getRandomString: function getRandomString(len) {
    len = len || 16;
    var $firstChars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'; // 字符串首字符集合

    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/

    var maxPos = $chars.length;
    var pwd = '';

    for (var i = 0; i < len; i++) {
      if (i === 0) {
        pwd += $firstChars.charAt(Math.floor(Math.random() * $firstChars.length));
      } else {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
    }

    return pwd;
  },

  /**
   * 从localStorage中获取数据
   * @param key 获取字段的key值，不传该参数则代表获取命名空间下所有配置数据
   */
  getXFormLocalStorage: function getXFormLocalStorage(key) {
    var namespace = CONST.LOCALSTORAGE_NAMESPACE;
    var localStorageData = window.localStorage.getItem(namespace);

    if (!key) {
      return JSON.parse(localStorageData);
    } else {
      if (localStorageData !== null) {
        return JSON.parse(localStorageData)[key] || null;
      } else {
        return null;
      }
    }
  },

  /**
   * 更新localStorage中的数据
   * @param data 待更新的数据
   */
  setXFormLocalStorage: function setXFormLocalStorage(data) {
    var namespace = CONST.LOCALSTORAGE_NAMESPACE;
    var localStorageData = window.localStorage.getItem(namespace);

    if (localStorageData !== null) {
      window.localStorage.setItem(namespace, JSON.stringify(_objectSpread(_objectSpread({}, JSON.parse(localStorageData)), data)));
    } else {
      window.localStorage.setItem(namespace, JSON.stringify(data));
    }
  },

  /**
   * 判断当前字段类型是否能够支持当前的适配端，默认不支持
   **/
  _isInConfigPlatform: function _isInConfigPlatform(configPlatform, platform) {
    if (platform === 'both') {
      return configPlatform.indexOf('laptop') > -1 && configPlatform.indexOf('mobile') > -1;
    } else if (platform === 'laptop' || platform === 'mobile') {
      return configPlatform.indexOf(platform) > -1;
    } else {
      return false;
    }
  }
};
exports.util = util;