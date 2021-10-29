import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Modal, Upload, Button, Table, message, Tooltip, Tag, Radio, Space, Input, Row, Col, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from './bpmn-js-properties-panel';
import propertiesProviderModule from './bpmn-js-properties-panel/lib/provider/camunda';
import propertiesProvider from './magic'
import camundaModdleDescriptor from './custom/camunda.json';
import customTranslate from './customTranslate/customTranslate';
import EditingTools from './components/EditingTools';
import { diagramXML } from './sources/xml';
import PaletteData from './custom/paletteData';
import CustomContextPadModule from './custom/customContextPad';
import elementHelper from './bpmn-js-properties-panel/lib/helper/ElementHelper';
import UserTaskModal from './modal/userTaskModal';
import FormAuthModal from './modal/formAuthModal';
import ButtonAuthModal from './modal/buttonAuthModal';
import ConditionExpressionModal from './modal/conditionExpressionModal';
import NoticeModal from './modal/noticeModal';

// import { Table, Search } from '$components';
// import { RouteRequest } from '@peace/utils';
import { Func, RouteTable } from '$utils';
import { BpmnConst } from './constants'
import './bpmn.less';


const customTranslateModule = {
  translate: ['value', customTranslate]
};
let domQuery = require('min-dom').query;
let domEvent = require('min-dom').event;
let domAttr = require('min-dom').attr;

export default class Bpmn extends Component {
  constructor(props) {
    super(props);
    this.bpmnModeler = null;

    this.state = {
      scale: 1, // 流程图比例
      visible: false,
      modalTitle: '',
      confirmLoading: false,
      inputName: '',
      currentSelect: {
        selectedRowKeys: [],
        selectedRowNames: [],
      },
      //multiInstanceType: 'single',
      //auditUserType: 'selectUsers',
      curElementId: null,
      modalType: null,
      // expressType: 'pass',
      // expressCondition: '',
      bpmnJson: props.bpmnJson || {},
      formSchema: {},


    };
    this.canvasRef = React.createRef();
    //在全局对象上挂载弹出modal框的函数,在bpmn-js-properties-panel factory 中各种控件工厂函数中使用
    window.openBpmnModal = (type) => {

      if (!this.state.curElementId) {
        message.error('请先点击流程图中的相关节点');
      } else {
        let title = '';
        switch (type) {
          //流转条件
          case 'conditionExpression':
            title = '流转条件配置';
            break;
          case 'userTask':
            title = '审批人员配置';
            break;
          case 'buttonAuth':
            title = '按钮权限配置';
            break;
          case 'formAuth':
            title = '表单权限配置';
            break;
          case 'noticeUser':
            title = '抄送人员配置';
            break;
          default:
            break;
        }
        this.setState({
          visible: true,
          modalType: type,
          modalTitle: title,
          //currentSelect: newSelect
        })
      }
    }

  }

  componentDidMount() {
    const { onGetProcessFormFields } = this.props;
    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#properties-panel'
      },
      additionalModules: [propertiesPanelModule, propertiesProvider, propertiesProviderModule, customTranslateModule, CustomContextPadModule],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });

    onGetProcessFormFields && onGetProcessFormFields();

    //先检查props 是否有xml
    const { bpmnXml } = this.props;
    if (bpmnXml) {
      this.renderDiagram(bpmnXml);
    } else {
      this.renderDiagram(diagramXML);
    }
    //自定义左侧工具栏处理
    this.adjustPalette();
    //监听shape 包含增加 ，移动，删除及处理
    this.addModelerListener();

    //监听element 包含change，click事件及处理
    this.addEventBusListener();
  }

  addModelerListener = () => {
    // 监听 modeler
    const _this = this;
    const elementRegistry = this.bpmnModeler.get('elementRegistry');
    const moddle = this.bpmnModeler.get('moddle');
    const modeling = this.bpmnModeler.get('modeling');
    //console.log(moddle)
    let { bpmnJson } = this.state;
    // 'shape.removed', 'connect.end', 'connect.move'
    const events = ['shape.added', 'shape.move.end', 'shape.removed']
    events.forEach(function (event) {
      _this.bpmnModeler.on(event, e => {

        if (event === 'shape.added') {
          //console.log('新增了shape',e)
          if (e.element && (e.element.type === 'bpmn:StartEvent' || e.element.type === 'bpmn:UserTask')) {
            _this.setState({ curElementId: e.element.id });
            if (bpmnJson[e.element.id]) {
              if (!bpmnJson[e.element.id].type || !bpmnJson[e.element.id].name) {
                bpmnJson[e.element.id] = {
                  ...bpmnJson[e.element.id],
                  name: e.element.businessObject.name,
                  type: e.element.type,
                }
                _this.setState({ bpmnJson: bpmnJson });
              }
            } else {
              bpmnJson[e.element.id] = {
                name: e.element.businessObject.name,
                type: e.element.type,
              }
              _this.setState({ bpmnJson: bpmnJson });
            }
          }
          if (e.element && e.element.type === 'bpmn:StartEvent') {
            //开始节点默认配置处理
            //console.log(elementRegistry.get(e.element.id));
            //延时处理不然会报错
            if (e.element.businessObject.initiator !== 'applyUserId') {
              setTimeout(() => {
                modeling.updateProperties(elementRegistry.get(e.element.id), { name: '流程开始', initiator: 'applyUserId' });
              }, 500)
            }

          }
          if (e.element && e.element.type === 'bpmn:EndEvent') {
            //结束节点默认配置处理
            if (!e.element.businessObject.name) {
              setTimeout(() => {
                modeling.updateProperties(elementRegistry.get(e.element.id), { name: '流程结束' });
              }, 500)
            }

          }
        } else if (event === 'shape.move.end') {
          //console.log('移动了shape')

        } else if (event === 'shape.removed') {
          //console.log('删除了shape')
          let { bpmnJson } = _this.state;
          bpmnJson[e.element.id] && delete bpmnJson[e.element.id];

          _this.setState({ curElementId: null, bpmnJson: bpmnJson })

        }
      })
    })
  }

  addEventBusListener = () => {
    // 监听 element
    const _this = this;
    const eventBus = this.bpmnModeler.get('eventBus')
    const modeling = this.bpmnModeler.get('modeling')
    const elementRegistry = this.bpmnModeler.get('elementRegistry')
    let { bpmnJson } = this.state;
    const eventTypes = ['element.click', 'element.changed']
    eventTypes.forEach(function (eventType) {
      eventBus.on(eventType, function (e) {

        if (!e || e.element.type == 'bpmn:Process') return

        if (eventType === 'element.changed') {
          //console.log(111,e,bpmnJson)
          if (e.element && (e.element.type === 'bpmn:StartEvent' || e.element.type === 'bpmn:UserTask')) {
            if (bpmnJson[e.element.id]) {
              if ((bpmnJson[e.element.id].type != e.element.type) || (bpmnJson[e.element.id].name != e.element.businessObject.name)) {
                bpmnJson[e.element.id] = {
                  ...bpmnJson[e.element.id],
                  name: e.element.businessObject.name,
                  type: e.element.type,
                }
                _this.setState({ bpmnJson: bpmnJson });
              }
            }
          }
        } else if (eventType === 'element.click') {
          //const shape = e.element ? elementRegistry.get(e.element.id) : e.shape
          //console.log(e)
          if (e.element.type && e.element.type === 'label') {
            _this.setState({ curElementId: e.element.businessObject.id });
          } else {
            _this.setState({ curElementId: e.element.id });
          }
          // if(e.element && e.element.type === 'bpmn:StartEvent'){
          //   const query = `input[name="initiator"]`;
          //   let input = domQuery(query);
          //   if(input){
          //     domAttr(input,'readonly','readonly');
          //   }
          // }
        }
      })
    })
  }

  /**
   * 下载xml/svg
   *  @param  type  类型  svg / xml
   *  @param  data  数据
   *  @param  name  文件名称
   */
  download = (type, data, name) => {
    let dataTrack = '';
    const a = document.createElement('a');

    switch (type) {
      case 'xml':
        dataTrack = 'bpmn';
        break;
      case 'svg':
        dataTrack = 'svg';
        break;
      default:
        break;
    }

    name = name || `diagram.${dataTrack}`;
    //const newXml = data.replace(/camunda:/g,'activiti:');

    a.setAttribute('href', `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`);
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
    a.setAttribute('download', name);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 导入xml文件
  handleOpenFile = (e) => {
    const that = this;
    const file = e.target.files[0];
    //console.log(file);
    let allowType = ".bpmn|.xml|";
    let pathName = file.name;
    var extName = pathName.substring(pathName.lastIndexOf(".")).toLowerCase();
    if (allowType.indexOf(extName + "|") == -1) {
      message.error('该文件类型不允许上传,请上传 bpmn 或者 xml 类型的文件!');
      return;
    }
    const isLt10M = file.size / 1024 / 1024 < 2;
    if (!isLt10M) {
      message.error('流程图文件超出限制大小10M,加载失败！');
      return;
    }
    const reader = new FileReader();
    let data = '';
    reader.readAsText(file);
    reader.onload = function (event) {
      data = event.target.result;
      // const newXml = data.replace(/activiti:/g,'camunda:');
      that.renderDiagram(data, 'open');
    };
  };

  // 保存
  handleSave = () => {
    //this.props.onSetProcessNodes(bpmnNodes);
    let { bpmnJson } = this.state;
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      console.log(xml);
      console.log(bpmnJson);
    });
  };
  //缓存xml
  handleSaveStorage = () => {
    let storeXml = null;
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      Func.storage.set('bpmn', xml);
      storeXml = xml
    });
    return storeXml;
  };

  getShapeById = (id) => {
    const elementRegistry = this.bpmnModeler.get('elementRegistry');
    return elementRegistry.get(id);
  }
  // 前进
  handleRedo = () => {
    this.bpmnModeler.get('commandStack').redo();
  };

  // 后退
  handleUndo = () => {
    this.bpmnModeler.get('commandStack').undo();
  };

  // 下载SVG格式
  handleDownloadSvg = () => {
    this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
      this.download('svg', data);
    });
  };

  // 下载XML格式
  handleDownloadXml = () => {
    this.bpmnModeler.saveXML({ format: true }, (err, data) => {
      this.download('xml', data);
    });
  };

  // 流程图放大缩小
  handleZoom = (radio) => {
    const newScale = !radio
      ? 1.0 // 不输入radio则还原
      : this.state.scale + radio <= 0.2 // 最小缩小倍数
        ? 0.2
        : this.state.scale + radio;

    this.bpmnModeler.get('canvas').zoom(newScale);
    this.setState({
      scale: newScale
    });
  };

  // 自定义左侧工具栏（暴力调整）
  adjustPalette = () => {
    try {
      // 获取 bpmn 设计器实例
      const canvas = this.canvasRef.current;
      const djsPalette = canvas.children[0].children[1].children[4]
      const djsPalStyle = {
        width: '130px',
        padding: '5px',
        background: 'white',
        left: '20px',
        borderRadius: 0
      }
      for (var key in djsPalStyle) {
        djsPalette.style[key] = djsPalStyle[key]
      }
      const palette = djsPalette.children[0]
      const allGroups = palette.children
      allGroups[0].style['display'] = 'none'
      // 修改控件样式
      for (var gKey in allGroups) {
        const group = allGroups[gKey]
        for (var cKey in group.children) {
          const control = group.children[cKey]
          const controlStyle = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            padding: '5px'
          }
          if (
            control.className &&
            control.dataset &&
            control.className.indexOf('entry') !== -1
          ) {
            const controlProps = new PaletteData().getControl(
              control.dataset.action
            )
            control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${controlProps['title']
              }</div>`

            for (var csKey in controlStyle) {
              control.style[csKey] = controlStyle[csKey]
            }
            if (controlProps['title'] == undefined) {
              control.style.display = 'none';
            }
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  //渲染传入的xml文件
  renderDiagram = (xml) => {
    const bpmnModel = this.bpmnModeler;
    const { BasicInfo, bpmnXml } = this.props;
    bpmnModel.importXML(xml, (err) => {
      if (err) {
        message.error('打开流程文件失败，请检查流程文件是否正确！');
      } else {
        // console.log('导入成功');
        if (BasicInfo) {
          const modeling = bpmnModel.get('modeling');
          const rootElement = bpmnModel.get('canvas').getRootElement();
          const str = Func.getRandomString(10);
          let updatePro = bpmnXml ? { name: BasicInfo.name } : { name: BasicInfo.name, id: `process_${BasicInfo.id}_${str}` };

          modeling.updateProperties(rootElement, updatePro)
        }
      }
    });
  };

  //编辑节点选择用户后的处理
  handleUserTask = () => {
    let { curElementId, bpmnJson } = this.state;
    bpmnJson[curElementId] = bpmnJson[curElementId] || {}
    const { multiInstanceType = 'single', auditUserType = 'selectUsers', users = [] } = bpmnJson[curElementId];
    const element = this.getShapeById(curElementId);
    const modeling = this.bpmnModeler.get('modeling');
    const moddle = this.bpmnModeler.get('moddle');
    //single:单人办理  parallel:多人并行 anyone:多人任意 sequence:多人顺序
    if (multiInstanceType === 'single') {
      let assigneeUser = ''
      if (auditUserType == 'applyUser' || auditUserType == 'departmentLeader') {
        assigneeUser = auditUserType == 'applyUser' ? '${' + `applyUserId` + '}' : '${' + `departmentLeader` + '}';
      } else {
        if (users.length === 0) {
          message.error('未选择人员');
          return false;
        }
        assigneeUser = `${BpmnConst.userNamePrefix}${users[0].id}`;
      }

      modeling.updateProperties(element, {
        loopCharacteristics: null,
        assignee: assigneeUser
      });
    } else {
      //会签配置
      let loopCharacteristics = moddle.create('bpmn:MultiInstanceLoopCharacteristics');
      loopCharacteristics['collection'] = `fsAssigneeList`;
      loopCharacteristics['elementVariable'] = `fsAssignee`;

      if (multiInstanceType === 'sequence') {
        loopCharacteristics['isSequential'] = 'true'
      }
      let body = multiInstanceType === 'anyone' ? '${' + `nrOfCompletedInstances>=1` + '}' : '${' + `nrOfActiveInstances==0` + '}';
      let completionCondition = elementHelper.createElement(
        'bpmn:FormalExpression',
        {
          body: body
        },
        loopCharacteristics,
        moddle
      );
      loopCharacteristics['completionCondition'] = completionCondition;

      let obj = {
        loopCharacteristics: loopCharacteristics,
        assignee: '${' + `fsAssignee` + '}'
      };
      modeling.updateProperties(element, obj);
    }

    bpmnJson[curElementId] = {
      ...bpmnJson[curElementId],
      multiInstanceType: multiInstanceType,
      auditUserType: auditUserType,
      users: users
    }
    this.setState({ bpmnJson: bpmnJson });
    return true;
  }


  //编辑网关流转条件后的处理
  handleConditionExpression = () => {
    let { curElementId, bpmnJson } = this.state;
    bpmnJson[curElementId] = bpmnJson[curElementId] || {}
    const { expressType = 'pass', expressCondition = [], expressName = '' } = bpmnJson[curElementId];
    const element = this.getShapeById(curElementId);
    const modeling = this.bpmnModeler.get('modeling');
    const moddle = this.bpmnModeler.get('moddle');
    //console.log(element);
    let conditionStr = '';
    expressCondition.map(v => {
      const conditionValue = Number(v.conditionValue) ? Number(v.conditionValue) : `'${v.conditionValue}'`;
      conditionStr += `${v.logical ? v.logical == 'and' ? '&&' : '||' : ''}${v.procinstVar}${v.operator}${conditionValue}`;
    })
    const { elementId: lastTaskElementId, getewayType, targetRef } = this.getLastTaskElementId(element);
    let body = '';
    switch (expressType) {
      case 'pass':
        body = '${deptPass}';
        break;
      case 'reject':
        body = '${!deptPass}';
        break;
      default:
        body = '${' + `${conditionStr}` + '}';
        break;
    }
    const condition = moddle.create('bpmn:FormalExpression', {
      body: body
    });
    modeling.updateProperties(element, { conditionExpression: condition, name: expressName });
    if (lastTaskElementId) {
      bpmnJson[lastTaskElementId] = bpmnJson[lastTaskElementId] || {};
      let { express = {} } = bpmnJson[lastTaskElementId];
      express[curElementId] = {
        expressType: expressType,
        expressCondition: expressCondition,
        expressName: expressName,
        targetRef
      }
      bpmnJson[lastTaskElementId] = {
        ...bpmnJson[lastTaskElementId],
        express: express,
        customExclusive: getewayType == "ExclusiveGateway" && expressType == "custom" ? true : false
      }
    }
    bpmnJson[curElementId] = {
      ...bpmnJson[curElementId],
      expressType: expressType,
      expressCondition: expressCondition,
      expressName: expressName
    }
    this.setState({ bpmnJson: bpmnJson });
    return true;
  }
  //编辑表单字段权限后的处理
  handleFormAuth = () => {
    let { curElementId, bpmnJson } = this.state;
    bpmnJson[curElementId] = bpmnJson[curElementId] || {}
    let { canEditCodes = [], showCodes = [] } = bpmnJson[curElementId];
    bpmnJson[curElementId] = {
      ...bpmnJson[curElementId],
      canEditCodes: canEditCodes,
      showCodes: showCodes,
    }
    this.setState({ bpmnJson: bpmnJson });
    return true;
  }
  //编辑抄送选择人员后的处理
  handleNoticeUser = () => {
    let { curElementId, bpmnJson } = this.state;
    bpmnJson[curElementId] = bpmnJson[curElementId] || {}
    const { noticeUsers = [] } = bpmnJson[curElementId];

    bpmnJson[curElementId] = {
      ...bpmnJson[curElementId],
      noticeUsers: noticeUsers
    }
    this.setState({ bpmnJson: bpmnJson });
    return true;
  }
  //modal 确认后的处理入口
  handleOk = (e) => {
    const { modalType } = this.state;
    let flag = true;
    switch (modalType) {
      case 'conditionExpression':
        flag = this.handleConditionExpression()
        break;
      case 'userTask':
        flag = this.handleUserTask();
        break;
      case 'formAuth':
        flag = this.handleFormAuth();
        break;
      case 'noticeUser':
        flag = this.handleNoticeUser();
        break;
      default:
        break;
    }
    flag && this.setState({
      visible: false,
    })

  }
  //modal 取消
  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  saveBpmnJson = (bpmnJson) => {
    this.setState({ bpmnJson: bpmnJson })
  }

  //渲染 modal 弹窗
  renderModalContent = () => {
    const { companyUsers, formSchema, buttonAuth, processFormFields } = this.props;
    const { bpmnJson, curElementId, modalType } = this.state;

    switch (modalType) {
      case 'conditionExpression':
        return <ConditionExpressionModal
          bpmnJson={bpmnJson}
          curElementId={curElementId}
          saveBpmnJson={this.saveBpmnJson}
          procinstVars={processFormFields.filter(f => f.isProcinstVar).map(v => ({ code: v.code, name: v.name }))}
        />;
        break;
      case 'userTask':
        return <UserTaskModal
          companyUsers={companyUsers}
          bpmnJson={bpmnJson}
          curElementId={curElementId}
          saveBpmnJson={this.saveBpmnJson}
        />;
        break;
      case 'buttonAuth':
        return <ButtonAuthModal
          bpmnJson={bpmnJson}
          curElementId={curElementId}
          buttonAuth={buttonAuth}
          saveBpmnJson={this.saveBpmnJson}
        />;
        break;
      case 'formAuth':
        return <FormAuthModal
          bpmnJson={bpmnJson}
          curElementId={curElementId}
          formFileds={Func.getFieldsByFormSchema(formSchema)}
          saveBpmnJson={this.saveBpmnJson}
        />;
        break;
      case 'noticeUser':
        return <NoticeModal
          companyUsers={companyUsers}
          bpmnJson={bpmnJson}
          curElementId={curElementId}
          saveBpmnJson={this.saveBpmnJson}
        />;
        break;
      default:
        break;
    }

  }

  //根据传入节点获取上个节点id、网关类型，下个节点id和类型
  getLastTaskElementId = (element) => {
    let elementId = null;
    let getewayType = null;
    let targetRef = null;
    const getewayTypes = ['bpmn:ParallelGateway', 'bpmn:ExclusiveGateway', 'bpmn:InclusiveGateway', 'bpmn:ComplexGateway'];
    const sourceRefTypes = ['bpmn:StartEvent', 'bpmn:UserTask'];
    if (element.businessObject.sourceRef) {
      if (sourceRefTypes.includes(element.businessObject.sourceRef.$type)) {
        elementId = element.businessObject.sourceRef.id;
      } else {
        if (getewayTypes.includes(element.businessObject.sourceRef.$type)) {
          if (element.businessObject.sourceRef.incoming[0] && element.businessObject.sourceRef.incoming[0].sourceRef && sourceRefTypes.includes(element.businessObject.sourceRef.incoming[0].sourceRef.$type)) {
            elementId = element.businessObject.sourceRef.incoming[0].sourceRef.id;
            getewayType = (element.businessObject.sourceRef.$type).replace('bpmn:', '')
          }
        }
      }
    }
    if (element.businessObject.targetRef) {
      const { $type, id } = element.businessObject.targetRef;
      targetRef = {
        type: $type.replace('bpmn:', ''),
        elementId: id
      }
    }
    return { elementId, getewayType, targetRef };
  }
  //处理节点之间的关系
  getBpmnJsonRelations = () => {
    const elementRegistry = this.bpmnModeler.get('elementRegistry');
    const allNodes = this.bpmnModeler._definitions.rootElements[0];
    let { bpmnJson } = this.state;
    //console.log(elementRegistry,allNodes);
    //处理流程节点之间关系
    let geteway = {}
    //先取出网关节点的上一个任务节点  ParallelGateway:并行网关; ExclusiveGateway:独占网关;InclusiveGateway:包容性网关
    const getewayTypes = ['bpmn:ParallelGateway', 'bpmn:ExclusiveGateway', 'bpmn:InclusiveGateway', 'bpmn:ComplexGateway'];
    console.log(allNodes);
    allNodes.flowElements.map(element => {
      if (getewayTypes.includes(element.$type) && Array.isArray(element.incoming)) {
        geteway[element.id] = [];
        element.incoming.map(e => {
          if (e.sourceRef && (e.sourceRef.$type === 'bpmn:UserTask' || e.sourceRef.$type === 'bpmn:StartEvent')) {
            geteway[element.id].push({ id: e.sourceRef.id, type: e.sourceRef.$type })
          }
        })
      }
    })
    allNodes.flowElements.map(element => {
      //console.log(element.incoming)
      if (element.$type === 'bpmn:UserTask' && bpmnJson[element.id] && Array.isArray(element.incoming)) {
        bpmnJson[element.id].sourceRef = [];
        element.incoming.map(e => {
          if (e.sourceRef) {
            switch (e.sourceRef.$type) {
              case 'bpmn:UserTask':
              case 'bpmn:StartEvent':
                bpmnJson[element.id].sourceRef.push({ id: e.sourceRef.id, type: e.sourceRef.$type })
                break;
              case 'bpmn:ExclusiveGateway':
              case 'bpmn:ParallelGateway':
              case 'bpmn:InclusiveGateway':
              case 'bpmn:ComplexGateway':
                if (geteway[e.sourceRef.id]) {
                  bpmnJson[element.id].sourceRef = geteway[e.sourceRef.id]
                }
              default:
                break;
            }
          }
        })
      }
    })
    return bpmnJson;
  }
  //保存并部署
  handerSaveProcess = () => {
    const { handerSaveProcess } = this.props;
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      //console.log(xml);
      const newBpmnJson = this.getBpmnJsonRelations();

      handerSaveProcess && handerSaveProcess(newBpmnJson, xml);
    });
  }

  render() {
    const { contentHeight } = this.props;

    return (
      <div className='bpmn-containers'>
        <div ref={this.canvasRef} className='canvas' style={{ overflow: "hidden", background: '#fff', height: contentHeight }} id="canvas" />
        <div
          className='properties-panel-parent panel'
          id="properties-panel"
          style={{ height: '100%', paddingBottom: 30 }}
        >
        </div>
        <EditingTools
          onOpenFIle={this.handleOpenFile}
          onSave={this.handleSave}
          onUndo={this.handleUndo}
          onRedo={this.handleRedo}
          onDownloadSvg={this.handleDownloadSvg}
          onDownloadXml={this.handleDownloadXml}
          onZoomIn={() => this.handleZoom(0.1)}
          onZoomOut={() => this.handleZoom(-0.1)}
          onZoomReset={() => this.handleZoom()}
        />
        <div className='deploy-button'>
          <Button type='primary' onClick={this.handerSaveProcess}>
            保存部署
          </Button>
        </div>
        <Modal
          width='65%'
          centered
          title={this.state.modalTitle}
          visible={this.state.visible}
          maskClosable={false}
          destroyOnClose={true}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          {this.renderModalContent()}
        </Modal>

      </div>
    );
  }
}
