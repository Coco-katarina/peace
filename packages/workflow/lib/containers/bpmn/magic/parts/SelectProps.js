"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _EntryFactory = _interopRequireDefault(require("@fs-fork/bpmn-js-properties-panel/lib/factory/EntryFactory"));

var _ModelUtil = require("bpmn-js/lib/util/ModelUtil");

var _CmdHelper = _interopRequireDefault(require("@fs-fork/bpmn-js-properties-panel/lib/helper/CmdHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var options = [{
  name: 'html',
  value: 'html'
}, {
  name: 'js',
  value: 'js'
}, {
  name: 'css',
  value: 'css'
}];

function getSelect(element) {
  var bo = (0, _ModelUtil.getBusinessObject)(element);
  var selectedOption = bo.get('camunda:customSelect');
  return selectedOption;
}

function setSelect(element, value) {
  var obj = {};
  obj['camunda:customSelect'] = value.customSelect;
  return obj;
}

function _default(group, element, bpmnFactory, translate) {
  var selectGroup = _EntryFactory["default"].selectBox({
    id: 'customSelect',
    label: translate('自定义下拉框'),
    selectOptions: options,
    modelProperty: 'customSelect',
    get: function get(el) {
      return {
        customSelect: getSelect(el)
      };
    },
    set: function set(el, value) {
      var bo = (0, _ModelUtil.getBusinessObject)(el);
      var props = setSelect(el, value);
      return _CmdHelper["default"].updateBusinessObject(element, bo, props);
    }
  });

  group.entries.push(selectGroup);
}