
export default class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate, modeling, bpmnFactory) {
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

    getContextPadEntries(element) {
        const {
            autoPlace,
            create,
            elementFactory,
            translate,
            modeling,
            bpmnFactory
        } = this;
        function appendUserTask(event, element) {
            if (autoPlace) {
                const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
                autoPlace.append(element, shape);
            } else {
                appendUserTaskStart(event, element);
            }
            
        // let loopCharacteristics = bpmnFactory.create('bpmn:MultiInstanceLoopCharacteristics');
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
            const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
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
        }
    }
}

CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate',
    'modeling',
    'bpmnFactory'
];