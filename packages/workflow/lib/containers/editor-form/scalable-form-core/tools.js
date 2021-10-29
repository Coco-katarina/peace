"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderJsonSchemaBySequence = getOrderJsonSchemaBySequence;
exports.getOrderSchemaBySequence = getOrderSchemaBySequence;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getOrderJsonSchemaBySequence(jsonSchema, sequence) {
  var sortSchema = {};

  if (_typeof(sequence) === 'object' && sequence.length > 0) {
    var key;

    for (key in jsonSchema) {
      if (jsonSchema.hasOwnProperty(key)) {
        if (key === 'properties') {
          sortSchema[key] = {};
        } else {
          sortSchema[key] = jsonSchema[key];
        }
      }
    }

    sequence.map(function (code) {
      if (typeof jsonSchema.properties[code] !== 'undefined') {
        sortSchema.properties[code] = jsonSchema.properties[code];
      }
    });
    return sortSchema;
  } else {
    return jsonSchema;
  }
} // 根据sequence属性获取排序后的schema数据


function getOrderSchemaBySequence(schema, sequence) {
  var sortSchema = {};

  if (_typeof(sequence) === 'object' && sequence.length > 0) {
    sequence.map(function (code) {
      if (typeof schema[code] !== 'undefined') {
        sortSchema[code] = schema[code];
      }
    });
    return sortSchema;
  } else {
    return schema;
  }
}