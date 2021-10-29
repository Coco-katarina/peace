"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diagramXML = void 0;
var diagramXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn2:definitions \n  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" \n  xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" \n  xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" \n  xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" \n  xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" \n  xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\" \n  id=\"sample-diagram\" \n  targetNamespace=\"http://bpmn.io/schema/bpmn\"\n>\n  <bpmn2:process id=\"Process_1\" isExecutable=\"false\">\n    <bpmn2:startEvent id=\"StartEvent_1\"/>\n  </bpmn2:process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\">\n      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">\n        <dc:Bounds height=\"36.0\" width=\"36.0\" x=\"412.0\" y=\"240.0\"/>\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn2:definitions>";
exports.diagramXML = diagramXML;