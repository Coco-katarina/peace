'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Func = /*#__PURE__*/function () {
  function Func() {
    _classCallCheck(this, Func);
  }

  _createClass(Func, null, [{
    key: "isAuthorized",
    value: function isAuthorized(authcode) {
      if (JSON.parse(sessionStorage.getItem('user'))) {
        var _JSON$parse = JSON.parse(sessionStorage.getItem('user')),
            resources = _JSON$parse.resources;

        return resources.includes(authcode);
      } else {
        return false;
      }
    }
  }, {
    key: "getContentHeight",
    value: function getContentHeight(clientWidth, clientHeight) {
      var breadcrumbsHeight = clientWidth >= 1920 ? 66 : clientHeight * 7.96 / 100;
      var contentHeight = clientWidth >= 1920 ? clientHeight - 150 - breadcrumbsHeight + 20 : clientHeight * 86.11 / 100 - breadcrumbsHeight;
      return contentHeight;
    }
    /**
    * 生成随机len位数的字符串
    * @param len
    */

  }, {
    key: "getRandomString",
    value: function getRandomString(len) {
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
    }
  }, {
    key: "String2XML",
    value: //convert string to xml object
    function String2XML(xmlstring) {
      // for IE
      if (window.ActiveXObject) {
        var xmlobject = new ActiveXObject("Microsoft.XMLDOM");
        xmlobject.async = "false";
        xmlobject.loadXML(xmlstring);
        return xmlobject;
      } // for other browsers
      else {
        var parser = new DOMParser();
        var xmlobject = parser.parseFromString(xmlstring, "text/xml");
        return xmlobject;
      }
    } //convert xml object to string

  }, {
    key: "XML2String",
    value: function XML2String(xmlobject) {
      // for IE
      if (window.ActiveXObject) {
        return xmlobject.xml;
      } // for other browsers
      else {
        return new XMLSerializer().serializeToString(xmlobject);
      }
    }
  }, {
    key: "getFieldsByFormSchema",
    value: function getFieldsByFormSchema(schemaData, bpmnNodes) {
      var _schemaData$sequence = schemaData.sequence,
          sequence = _schemaData$sequence === void 0 ? [] : _schemaData$sequence,
          _schemaData$jsonSchem = schemaData.jsonSchema,
          jsonSchema = _schemaData$jsonSchem === void 0 ? {} : _schemaData$jsonSchem,
          _schemaData$uiSchema = schemaData.uiSchema,
          uiSchema = _schemaData$uiSchema === void 0 ? {} : _schemaData$uiSchema,
          _schemaData$formData = schemaData.formData,
          formData = _schemaData$formData === void 0 ? {} : _schemaData$formData,
          _schemaData$bizData = schemaData.bizData,
          bizData = _schemaData$bizData === void 0 ? {} : _schemaData$bizData;
      var _jsonSchema$propertie = jsonSchema.properties,
          properties = _jsonSchema$propertie === void 0 ? {} : _jsonSchema$propertie;
      var fields = []; //const nodes = Array.isArray(bpmnNodes) && bpmnNodes.map(v => v.id) || [];

      sequence.forEach(function (fieldName) {
        var field = {};

        if (_typeof(fieldName) === 'object' && fieldName.group) {
          var group = fieldName.group;
          var code = fieldName.code;
          field.code = code;
          field.group = group;
          var groupSchema = properties[group] || {};

          if (groupSchema.type === 'array') {
            var childProperties = groupSchema.items.properties || {};
            field.jsonSchema = childProperties[code] || {};
            field.uiSchema = uiSchema[group] && uiSchema[group].items && uiSchema[group].items[code] || {};
          } else {
            var _childProperties = groupSchema.properties || {};

            field.jsonSchema = _childProperties[code] || {};
            field.uiSchema = uiSchema[group] && uiSchema[group][code];
          }
        } else {
          var fieldJsonSchema = properties[fieldName] || {};
          field.jsonSchema = fieldJsonSchema;
          var fieldUiSchema = uiSchema[fieldName];
          field.uiSchema = fieldUiSchema;
          field.code = fieldName;
        }

        fields.push(field); //debugger;
      });
      return fields;
    }
  }, {
    key: "filterUiSchema",
    value: function filterUiSchema(uiSchema, bpmnJson, fieldName) {
      var shownodes = ['historyNode'],
          disnodes = ['historyNode'];

      for (var _i = 0, _Object$entries = Object.entries(bpmnJson); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            k = _Object$entries$_i[0],
            v = _Object$entries$_i[1];

        if (v.showCodes && v.showCodes.includes(fieldName)) {
          shownodes.push(k);
        }

        if (v.canEditCodes && !v.canEditCodes.includes(fieldName)) {
          disnodes.push(k);
        }
      }

      if (uiSchema.items !== undefined) {
        //array 
        if (uiSchema.items['ui:options'] !== undefined) {
          uiSchema.items['ui:options'].shownodes = shownodes;
          uiSchema.items['ui:options'].disnodes = disnodes;
        } else {
          uiSchema.items['ui:options'] = {
            shownodes: shownodes,
            disnodes: disnodes
          };
        }
      } else {
        if (uiSchema['ui:options'] !== undefined) {
          uiSchema['ui:options'].shownodes = shownodes;
          uiSchema['ui:options'].disnodes = disnodes;
        } else {
          uiSchema['ui:options'] = {
            shownodes: shownodes,
            disnodes: disnodes
          };
        }
      }

      return uiSchema;
    }
  }, {
    key: "handleJsonSchemaForm",
    value: function handleJsonSchemaForm(schemaData, bpmnJson) {
      var _this = this;

      var _schemaData$sequence2 = schemaData.sequence,
          sequence = _schemaData$sequence2 === void 0 ? [] : _schemaData$sequence2,
          _schemaData$jsonSchem2 = schemaData.jsonSchema,
          jsonSchema = _schemaData$jsonSchem2 === void 0 ? {} : _schemaData$jsonSchem2,
          _schemaData$uiSchema2 = schemaData.uiSchema,
          uiSchema = _schemaData$uiSchema2 === void 0 ? {} : _schemaData$uiSchema2,
          _schemaData$formData2 = schemaData.formData,
          formData = _schemaData$formData2 === void 0 ? {} : _schemaData$formData2,
          _schemaData$bizData2 = schemaData.bizData,
          bizData = _schemaData$bizData2 === void 0 ? {} : _schemaData$bizData2;
      var _jsonSchema$propertie2 = jsonSchema.properties,
          properties = _jsonSchema$propertie2 === void 0 ? {} : _jsonSchema$propertie2;
      var newUiSchema = {}; //const nodes = Array.isArray(bpmnNodes) && bpmnNodes.map(v => v.id) || [];

      sequence.forEach(function (fieldName) {
        if (_typeof(fieldName) === 'object' && fieldName.group) {
          var group = fieldName.group;
          var code = fieldName.code;

          if (uiSchema[group]) {
            newUiSchema[group] = _this.filterUiSchema(uiSchema[group], bpmnJson, group);

            if (uiSchema[group].items) {
              if (newUiSchema[group].items[code]) {
                newUiSchema[group].items[code] = _this.filterUiSchema(newUiSchema[group].items[code], bpmnJson, code);
              }
            } else {
              if (newUiSchema[group][code]) {
                newUiSchema[group][code] = _this.filterUiSchema(newUiSchema[group][code], bpmnJson, code);
              }
            }
          }
        } else {
          newUiSchema[fieldName] = _this.filterUiSchema(uiSchema[fieldName], bpmnJson, fieldName);
        }
      }); //debugger;

      return {
        jsonSchema: jsonSchema,
        uiSchema: newUiSchema,
        formData: formData,
        bizData: bizData,
        sequence: sequence
      };
    }
  }]);

  return Func;
}();

exports["default"] = Func;

_defineProperty(Func, "storage", {
  set: function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: function get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  setXml: function setXml() {},
  remove: function remove(key) {
    localStorage.removeItem(key);
  }
});