"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchema = getSchema;
exports.getFieldsBySchema = getFieldsBySchema;
exports.isSchemaLegal = isSchemaLegal;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getSchema() {
  var jsonSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var uiSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var bizData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var originSequence = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  var sequence = _toConsumableArray(originSequence);

  var properties = jsonSchema.properties || {};
  Object.keys(properties).forEach(function (jsonSchemaKey) {
    if (sequence.indexOf(jsonSchemaKey) < 0) {
      sequence.push(jsonSchemaKey);
    }
  });
  return {
    jsonSchema: jsonSchema,
    uiSchema: uiSchema,
    formData: formData,
    bizData: bizData,
    sequence: sequence
  };
}

function getFieldsBySchema(schemaData, bpmnNodes) {
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
      properties = _jsonSchema$propertie === void 0 ? {} : _jsonSchema$propertie,
      _jsonSchema$required = jsonSchema.required,
      required = _jsonSchema$required === void 0 ? [] : _jsonSchema$required;
  var fields = [];
  var nodes = Array.isArray(bpmnNodes) && bpmnNodes.map(function (v) {
    return v.id;
  }) || [];
  sequence.forEach(function (fieldName) {
    var field = {};

    if (_typeof(fieldName) === 'object' && fieldName.group) {
      var group = fieldName.group;
      var code = fieldName.code;
      var groupSchema = properties[group] || {};

      if (groupSchema.type === 'array') {
        var childProperties = groupSchema.items.properties || {};
        var childRequired = groupSchema.items.required || [];
        var childJsonSchema = childProperties[code] || {};
        field.jsonSchema = _defineProperty({}, code, childJsonSchema);
        var childUiSchema = uiSchema[group] && uiSchema[group].items && uiSchema[group].items[code];

        var filterUiSchema = _filterNodesUiSchema(childUiSchema, nodes);

        field.uiSchema = _defineProperty({}, code, filterUiSchema);
        field.formData = _defineProperty({}, code, formData[group] && formData[group][0][code] ? formData[group][0][code] : '');
        var childBizData = bizData[code];
        field.bizData = _defineProperty({}, code, childBizData);
        field.code = code;
        field.label = childJsonSchema.title;
        field.type = childBizData.type;
        field.fieldType = childBizData.fieldType;
        field.required = childRequired.indexOf(code) >= 0;
        field.hasgroup = group;
      } else {
        var _childProperties = groupSchema.properties || {};

        var _childRequired = groupSchema.required || [];

        var _childJsonSchema = _childProperties[code] || {};

        field.jsonSchema = _defineProperty({}, code, _childJsonSchema);

        var _childUiSchema = uiSchema[group] && uiSchema[group][code];

        var _filterUiSchema = _filterNodesUiSchema(_childUiSchema, nodes);

        field.uiSchema = _defineProperty({}, code, _filterUiSchema);
        field.formData = _defineProperty({}, code, formData[group] && formData[group][code] ? formData[group][code] : '');
        var _childBizData = bizData[code];
        field.bizData = _defineProperty({}, code, _childBizData);
        field.code = code;
        field.label = _childJsonSchema.title;
        field.type = _childBizData.type;
        field.fieldType = _childBizData.fieldType;
        field.required = _childRequired.indexOf(code) >= 0;
        field.hasgroup = group;
      } // debugger;

    } else {
      var fieldJsonSchema = properties[fieldName] || {};
      field.jsonSchema = _defineProperty({}, fieldName, fieldJsonSchema);
      var fieldUiSchema = uiSchema[fieldName];

      var _filterUiSchema2 = _filterNodesUiSchema(fieldUiSchema, nodes);

      field.uiSchema = _defineProperty({}, fieldName, _filterUiSchema2);
      var fieldFormData = formData[fieldName];
      field.formData = _defineProperty({}, fieldName, fieldFormData);
      var fieldBizData = bizData[fieldName];
      field.bizData = _defineProperty({}, fieldName, fieldBizData);
      field.code = fieldName;
      field.label = fieldJsonSchema.title;
      field.type = fieldBizData.type;
      field.fieldType = fieldBizData.fieldType;
      field.required = required.indexOf(fieldName) >= 0;
    }

    fields.push(field);
  }); //debugger;

  return {
    fields: fields
  };
} //过滤修改后的节点


function _filterNodesUiSchema(uiSchema, nodes) {
  if (uiSchema.items !== undefined) {
    //array 
    if (uiSchema.items['ui:options'] !== undefined) {
      if (uiSchema.items['ui:options'].shownodes !== undefined && Array.isArray(uiSchema.items['ui:options'].shownodes)) {
        var filterNodes = uiSchema.items['ui:options'].shownodes.filter(function (item) {
          return nodes.includes(item);
        });
        uiSchema.items['ui:options'].shownodes = filterNodes;
      }

      if (uiSchema.items['ui:options'].disnodes !== undefined && Array.isArray(uiSchema.items['ui:options'].disnodes)) {
        var _filterNodes = uiSchema.items['ui:options'].disnodes.filter(function (item) {
          return nodes.includes(item);
        });

        uiSchema.items['ui:options'].disnodes = _filterNodes;
      }
    }
  } else {
    if (uiSchema['ui:options'] !== undefined) {
      if (uiSchema['ui:options'].shownodes !== undefined && Array.isArray(uiSchema['ui:options'].shownodes)) {
        var _filterNodes2 = uiSchema['ui:options'].shownodes.filter(function (item) {
          return nodes.includes(item);
        });

        uiSchema['ui:options'].shownodes = _filterNodes2;
      }

      if (uiSchema['ui:options'].disnodes !== undefined && Array.isArray(uiSchema['ui:options'].disnodes)) {
        var _filterNodes3 = uiSchema['ui:options'].disnodes.filter(function (item) {
          return nodes.includes(item);
        });

        uiSchema['ui:options'].disnodes = _filterNodes3;
      }
    }
  }

  return uiSchema;
}

function isSchemaLegal(schema) {
  return !!(schema.sequence && schema.jsonSchema && schema.uiSchema && schema.formData && schema.bizData);
}