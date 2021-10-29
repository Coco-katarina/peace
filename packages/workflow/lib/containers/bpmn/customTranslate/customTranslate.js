"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = customTranslate;

var _translations = _interopRequireDefault(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function customTranslate(template, replacements) {
  replacements = replacements || {}; // Translate

  template = _translations["default"][template] || template; // Replace

  return template.replace(/{([^}]+)}/g, function (_, key) {
    return replacements[key] || "{".concat(key, "}");
  });
}