"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _EntryFactory = _interopRequireDefault(require("@fs-fork/bpmn-js-properties-panel/lib/factory/EntryFactory"));

var _ModelUtil = require("bpmn-js/lib/util/ModelUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(group, element, bpmnFactory, translate) {
  if (!(0, _ModelUtil.is)(element, 'bpmn:UserTask')) return;
  group.entries.push(_EntryFactory["default"].textField({
    id: 'userCustom',
    label: translate('用户任务'),
    modelProperty: 'camunda:userCustom'
  }));
}