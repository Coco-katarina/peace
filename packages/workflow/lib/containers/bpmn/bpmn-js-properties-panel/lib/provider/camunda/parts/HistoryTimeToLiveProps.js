'use strict';

var is = require('bpmn-js/lib/util/ModelUtil').is,
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

var historyTimeToLive = require('./implementation/HistoryTimeToLive');

module.exports = function (group, element, bpmnFactory, translate) {
  var businessObject = getBusinessObject(element);

  if (is(element, 'camunda:Process') || is(element, 'bpmn:Participant') && businessObject.get('processRef')) {
    group.entries = group.entries.concat(historyTimeToLive(element, bpmnFactory, {
      getBusinessObject: function (element) {
        var bo = getBusinessObject(element);

        if (!is(bo, 'bpmn:Participant')) {
          return bo;
        }

        return bo.get('processRef');
      }
    }, translate));
  }
};