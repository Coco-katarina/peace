"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = isEmpty;
exports.isId = isId;
exports.isUrl = isUrl;
exports.isEmail = isEmail;
exports.isDigit = isDigit;
exports.isMoney = isMoney;
exports.isTel = isTel;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 表单字段非空校验
 * @private
 */
function isEmpty(value, widgetType) {
  // 根据schema的约定，input类型和uploader两种类型的ui:widget为空字符串
  if (widgetType !== '') {
    if (widgetType !== 'array') {
      return typeof value === 'undefined' || typeof value === 'string' && value === '' || typeof value === 'string' && value === '{}' || _typeof(value) === 'object' && JSON.stringify(value) === '[]' || _typeof(value) === 'object' && JSON.stringify(value) === '{}';
    } else {
      var rslt = false;
      var check = JSON.stringify(value) === '[]' || JSON.stringify(value) === '[""]' || JSON.stringify(value) === '[[]]';

      if (Array.isArray(value)) {
        // value.map(v=> {
        //     if(Array.isArray(v)){
        //         rslt = v.some(s=> !s )
        //     }else{
        //         if(!v){
        //             rslt  = true
        //         }
        //     }
        // })
        rslt = value.some(function (v) {
          return !v || Array.isArray(v) && v.some(function (s) {
            return !s;
          });
        });
      }

      return check ? check : rslt;
    }
  } else {
    return typeof value === 'string' && value === '' || _typeof(value) === 'object' && value.filter(function (item) {
      return item.status === 'done';
    }).length <= 0;
  }
}
/**
 * 验证是否为身份证号
 * @param id 身份证号
 * @return {boolean}
 */


function isId(id) {
  if (typeof id === 'undefined') {
    return false;
  }

  if (typeof id === 'string') {
    id = id.trim();
  }

  var reg = /\d{17}[0-9xX]/;
  return reg.test(id);
}
/**
 * url验证(当输入为空时要通过验证，非空验证逻辑要拆出来)
 * @param url
 * @returns {boolean}
 */


function isUrl(url) {
  if (typeof url !== 'string') {
    return false;
  } // url中不能出现空格


  if (url.indexOf(' ') > -1) {
    return false;
  }

  var strRegex = "^((https|http):\/\/)?" + "(((([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5])[.]{1}){3}([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5]))" //  IP>形式的URL- 199.194.52.184
  + "|" + "([0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D-]+[.]{1})+[a-zA-Z-]+)" //  DOMAIN（域名）形式的URL
  + "(:[0-9]{1,4})?" //  端口- :80
  + "((/?)|(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?){1}";
  var re = new RegExp(strRegex);
  return re.test(url.trim());
}
/**
 * 邮箱验证(当输入为空时要通过验证，非空验证逻辑要拆出来)
 * @param str
 * @returns {boolean}
 */


function isEmail(str) {
  if (typeof str !== 'string') {
    return false;
  }

  var reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return reg.test(str.trim());
}
/**
 * 全部是数字验证，主要用于填写一些ID的地方(当输入为空时要通过验证，非空验证逻辑要拆出来)
 * @param str
 * @returns {boolean}
 */


function isDigit(str) {
  if (typeof str === 'undefined') {
    return false;
  }

  if (typeof str === 'string') {
    str = str.trim();
  }

  var reg = /^\d+$/;
  return reg.test(str);
}
/**
 * 金额校验，可带小数点，小数点后最多两位
 * @param str
 * @returns {boolean}
 */


function isMoney(str) {
  if (typeof str === 'undefined') {
    return false;
  }

  if (typeof str === 'string') {
    str = str.trim();
  }

  var reg = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
  return reg.test(str);
}
/**
 * 电话验证，这里只做是不是11为数字的验证(当输入为空时要通过验证，非空验证逻辑要拆出来)
 * @param tel
 * @returns {boolean}
 */


function isTel(tel) {
  if (typeof tel === 'undefined') {
    return false;
  }

  if (typeof tel === 'string') {
    tel = tel.trim();
  }

  var reg = /^\d{11}$/;
  return reg.test(tel);
}