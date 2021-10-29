"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _EntryFactory = _interopRequireDefault(require("@fs-fork/bpmn-js-properties-panel/lib/factory/EntryFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(group, element, bpmnFactory, translate) {
  var checkboxGroup = _EntryFactory["default"].checkbox({
    id: 'customCheckbox',
    label: translate('自定义复选框'),
    modelProperty: 'camunda:customCheckbox'
  });

  group.entries.push(checkboxGroup);
}