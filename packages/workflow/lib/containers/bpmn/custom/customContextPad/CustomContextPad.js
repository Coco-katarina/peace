"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomContextPad = /*#__PURE__*/function () {
  function CustomContextPad(config, contextPad, create, elementFactory, injector, translate, modeling, bpmnFactory) {
    _classCallCheck(this, CustomContextPad);

    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.modeling = modeling;
    this.bpmnFactory = bpmnFactory;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this); // // 定义这是一个contextPad
  }

  _createClass(CustomContextPad, [{
    key: "getContextPadEntries",
    value: function getContextPadEntries(element) {
      var autoPlace = this.autoPlace,
          create = this.create,
          elementFactory = this.elementFactory,
          translate = this.translate,
          modeling = this.modeling,
          bpmnFactory = this.bpmnFactory;

      function appendUserTask(event, element) {
        if (autoPlace) {
          var shape = elementFactory.createShape({
            type: 'bpmn:UserTask'
          });
          autoPlace.append(element, shape);
        } else {
          appendUserTaskStart(event, element);
        } // let loopCharacteristics = bpmnFactory.create('bpmn:MultiInstanceLoopCharacteristics');
        // loopCharacteristics['collection'] = 'flow_assignee';
        // loopCharacteristics['elementVariable'] = 'flow_assignee';
        // let completionCondition = elementHelper.createElement(
        //     'bpmn:FormalExpression', 
        //     { 
        //         body: '${mulitiInstance.completeTask(execution,passResult,mulitiActivityId)}' 
        //     }, 
        //     loopCharacteristics, 
        //     bpmnFactory
        // );
        // loopCharacteristics['completionCondition'] = completionCondition;
        // modeling.updateProperties(shape, { loopCharacteristics: loopCharacteristics });

      }

      function appendUserTaskStart(event) {
        var shape = elementFactory.createShape({
          type: 'bpmn:UserTask'
        });
        create.start(event, shape, element);
      }

      return {
        'append.user-task': {
          group: 'model',
          className: 'bpmn-icon-user-task',
          title: translate('创建一个用户任务节点'),
          action: {
            click: appendUserTask,
            dragstart: appendUserTaskStart
          }
        }
      };
    }
  }]);

  return CustomContextPad;
}();

exports["default"] = CustomContextPad;
CustomContextPad.$inject = ['config', 'contextPad', 'create', 'elementFactory', 'injector', 'translate', 'modeling', 'bpmnFactory'];