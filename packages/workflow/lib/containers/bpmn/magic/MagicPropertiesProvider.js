"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MagicPropertiesProvider;

var _inherits = _interopRequireDefault(require("inherits"));

var _PropertiesActivator = _interopRequireDefault(require("@fs-fork/bpmn-js-properties-panel/lib/PropertiesActivator"));

var _InputTxtProps = _interopRequireDefault(require("./parts/InputTxtProps"));

var _CheckboxProps = _interopRequireDefault(require("./parts/CheckboxProps"));

var _SelectProps = _interopRequireDefault(require("./parts/SelectProps"));

var _UserCustomProps = _interopRequireDefault(require("./parts/UserCustomProps"));

var _DynamicSelectProps = _interopRequireDefault(require("./parts/DynamicSelectProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate) {
  var generalGroup = {
    id: 'general',
    label: '',
    entries: []
  };
  (0, _InputTxtProps["default"])(generalGroup, element, bpmnFactory, translate);
  (0, _CheckboxProps["default"])(generalGroup, element, bpmnFactory, translate);
  (0, _SelectProps["default"])(generalGroup, element, bpmnFactory, translate);
  (0, _UserCustomProps["default"])(generalGroup, element, bpmnFactory, translate);
  (0, _DynamicSelectProps["default"])(generalGroup, element, bpmnFactory, translate);
  return [generalGroup];
}

function MagicPropertiesProvider(eventBus, bpmnFactory, elementRegistry, translate) {
  _PropertiesActivator["default"].call(this, eventBus);

  this.getTabs = function (element) {
    var gengralTab = {
      id: 'general',
      label: '基本信息',
      groups: createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate)
    };
    return [gengralTab];
  };
}

(0, _inherits["default"])(MagicPropertiesProvider, _PropertiesActivator["default"]);