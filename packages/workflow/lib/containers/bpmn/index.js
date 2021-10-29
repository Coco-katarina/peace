"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _Modeler = _interopRequireDefault(require("bpmn-js/lib/Modeler"));

var _bpmnJsPropertiesPanel = _interopRequireDefault(require("./bpmn-js-properties-panel"));

var _camunda = _interopRequireDefault(require("./bpmn-js-properties-panel/lib/provider/camunda"));

var _magic = _interopRequireDefault(require("./magic"));

var _camunda2 = _interopRequireDefault(require("./custom/camunda.json"));

var _customTranslate = _interopRequireDefault(require("./customTranslate/customTranslate"));

var _EditingTools = _interopRequireDefault(require("./components/EditingTools"));

var _xml = require("./sources/xml");

var _paletteData = _interopRequireDefault(require("./custom/paletteData"));

var _customContextPad = _interopRequireDefault(require("./custom/customContextPad"));

var _ElementHelper = _interopRequireDefault(require("./bpmn-js-properties-panel/lib/helper/ElementHelper"));

var _userTaskModal = _interopRequireDefault(require("./modal/userTaskModal"));

var _formAuthModal = _interopRequireDefault(require("./modal/formAuthModal"));

var _buttonAuthModal = _interopRequireDefault(require("./modal/buttonAuthModal"));

var _conditionExpressionModal = _interopRequireDefault(require("./modal/conditionExpressionModal"));

var _noticeModal = _interopRequireDefault(require("./modal/noticeModal"));

var _$utils = require("$utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (elementID, css) {
  if (typeof window == 'undefined') return;
  if (typeof document == 'undefined') return;
  if (typeof document.head == 'undefined') return;
  if (window.document.getElementById(elementID)) return;
  var style = document.createElement('style');
  style.type = "text/css";
  style.id = elementID;
  style.innerHTML = css;
  document.head.appendChild(style);
})("02de82e0d6ce815291a0609aa7353b51", ".bpmn-containers{position:relative}.content{position:relative;width:100%;height:100%}.content>.message{width:100%;height:100%;text-align:center;display:table;font-size:16px;color:#111}.content>.message .note{vertical-align:middle;text-align:center;display:table-cell}.content>.message.error .details{max-width:500px;font-size:12px;margin:20px auto;text-align:left;color:#bd2828}.content>.message.error pre{border:1px solid #bd2828;background:#fefafa;padding:10px;color:#bd2828}.content.with-diagram .intro,.content.with-error .intro,.content:not(.with-error) .error{display:none}.content .canvas{position:absolute;top:0;left:0;right:0;bottom:0}.content .canvas,.content .properties-panel-parent{display:none}.content.with-diagram .canvas,.content.with-diagram .properties-panel-parent{display:block}.buttons{position:fixed;bottom:20px;left:20px;padding:0;margin:0;list-style:none}.buttons>li{display:inline-block;margin-right:10px}.buttons>li>a{background:#ddd;border:1px solid #666;display:inline-block;padding:5px}.buttons a{opacity:.3}.buttons a.active{opacity:1}.bjs-powered-by{display:none}.properties-panel-parent{position:absolute;top:20px;bottom:0;right:0;width:260px;z-index:10;border-left:1px solid #ccc;overflow:auto}.properties-panel-parent:empty{display:none}.properties-panel-parent>.djs-properties-panel{padding-bottom:70px;min-height:100%}.bpp-properties-panel{border-color:rgba(0,0,0,.09);box-shadow:0 2px 8px rgba(0,0,0,.09)}ul.bpp-properties-tabs-links>li.bpp-active a{border-top:2px solid #0e88eb;color:#0e88eb}ul.bpp-properties-tabs-links>li>a{border:1px solid #0e88eb;border-radius:2px 2px 0 0}.bpp-properties-group:hover>.group-toggle{background-color:#0e88eb}.bpp-properties-panel [contenteditable]:focus,.bpp-properties-panel button:focus,.bpp-properties-panel input:focus,.bpp-properties-panel textarea:focus{border-color:#0e88eb;box-shadow:0 0 1px 2px rgba(77,144,254,.27058823529411763)}.bpp-properties-panel [contenteditable]{margin:0 auto}.bpp-properties-tab-bar{border-color:#0e88eb}.bpp-properties-group+.bpp-properties-group{border-top:1px dotted #0e88eb}.bpp-properties-panel .bpp-textfield .btn-select{padding:5px 10px;margin-top:5px;cursor:pointer}.highlight:not(.djs-connection) .djs-visual>:first-child{fill:green!important}.bpp-hide,.djs-overlay-context-pad .djs-context-pad .bpmn-icon-intermediate-event-none,.djs-overlay-context-pad .djs-context-pad .bpmn-icon-text-annotation{display:none}.deploy-button{position:absolute;left:544px;top:25px}");

var customTranslateModule = {
  translate: ['value', _customTranslate["default"]]
};

var domQuery = require('min-dom').query;

var domEvent = require('min-dom').event;

var domAttr = require('min-dom').attr;

var Bpmn = /*#__PURE__*/function (_Component) {
  _inherits(Bpmn, _Component);

  var _super = _createSuper(Bpmn);

  function Bpmn(props) {
    var _this2;

    _classCallCheck(this, Bpmn);

    _this2 = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this2), "addModelerListener", function () {
      // 监听 modeler
      var _this = _assertThisInitialized(_this2);

      var elementRegistry = _this2.bpmnModeler.get('elementRegistry');

      var moddle = _this2.bpmnModeler.get('moddle');

      var modeling = _this2.bpmnModeler.get('modeling'); //console.log(moddle)


      var bpmnJson = _this2.state.bpmnJson; // 'shape.removed', 'connect.end', 'connect.move'

      var events = ['shape.added', 'shape.move.end', 'shape.removed'];
      events.forEach(function (event) {
        _this.bpmnModeler.on(event, function (e) {
          if (event === 'shape.added') {
            //console.log('新增了shape',e)
            if (e.element && (e.element.type === 'bpmn:StartEvent' || e.element.type === 'bpmn:UserTask')) {
              _this.setState({
                curElementId: e.element.id
              });

              if (bpmnJson[e.element.id]) {
                if (!bpmnJson[e.element.id].type || !bpmnJson[e.element.id].name) {
                  bpmnJson[e.element.id] = _objectSpread(_objectSpread({}, bpmnJson[e.element.id]), {}, {
                    name: e.element.businessObject.name,
                    type: e.element.type
                  });

                  _this.setState({
                    bpmnJson: bpmnJson
                  });
                }
              } else {
                bpmnJson[e.element.id] = {
                  name: e.element.businessObject.name,
                  type: e.element.type
                };

                _this.setState({
                  bpmnJson: bpmnJson
                });
              }
            }

            if (e.element && e.element.type === 'bpmn:StartEvent') {
              //开始节点默认配置处理
              //console.log(elementRegistry.get(e.element.id));
              //延时处理不然会报错
              if (e.element.businessObject.initiator !== 'applyUserId') {
                setTimeout(function () {
                  modeling.updateProperties(elementRegistry.get(e.element.id), {
                    name: '流程开始',
                    initiator: 'applyUserId'
                  });
                }, 500);
              }
            }

            if (e.element && e.element.type === 'bpmn:EndEvent') {
              //结束节点默认配置处理
              if (!e.element.businessObject.name) {
                setTimeout(function () {
                  modeling.updateProperties(elementRegistry.get(e.element.id), {
                    name: '流程结束'
                  });
                }, 500);
              }
            }
          } else if (event === 'shape.move.end') {//console.log('移动了shape')
          } else if (event === 'shape.removed') {
            //console.log('删除了shape')
            var _bpmnJson = _this.state.bpmnJson;
            _bpmnJson[e.element.id] && delete _bpmnJson[e.element.id];

            _this.setState({
              curElementId: null,
              bpmnJson: _bpmnJson
            });
          }
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "addEventBusListener", function () {
      // 监听 element
      var _this = _assertThisInitialized(_this2);

      var eventBus = _this2.bpmnModeler.get('eventBus');

      var modeling = _this2.bpmnModeler.get('modeling');

      var elementRegistry = _this2.bpmnModeler.get('elementRegistry');

      var bpmnJson = _this2.state.bpmnJson;
      var eventTypes = ['element.click', 'element.changed'];
      eventTypes.forEach(function (eventType) {
        eventBus.on(eventType, function (e) {
          if (!e || e.element.type == 'bpmn:Process') return;

          if (eventType === 'element.changed') {
            //console.log(111,e,bpmnJson)
            if (e.element && (e.element.type === 'bpmn:StartEvent' || e.element.type === 'bpmn:UserTask')) {
              if (bpmnJson[e.element.id]) {
                if (bpmnJson[e.element.id].type != e.element.type || bpmnJson[e.element.id].name != e.element.businessObject.name) {
                  bpmnJson[e.element.id] = _objectSpread(_objectSpread({}, bpmnJson[e.element.id]), {}, {
                    name: e.element.businessObject.name,
                    type: e.element.type
                  });

                  _this.setState({
                    bpmnJson: bpmnJson
                  });
                }
              }
            }
          } else if (eventType === 'element.click') {
            //const shape = e.element ? elementRegistry.get(e.element.id) : e.shape
            //console.log(e)
            if (e.element.type && e.element.type === 'label') {
              _this.setState({
                curElementId: e.element.businessObject.id
              });
            } else {
              _this.setState({
                curElementId: e.element.id
              });
            } // if(e.element && e.element.type === 'bpmn:StartEvent'){
            //   const query = `input[name="initiator"]`;
            //   let input = domQuery(query);
            //   if(input){
            //     domAttr(input,'readonly','readonly');
            //   }
            // }

          }
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "download", function (type, data, name) {
      var dataTrack = '';
      var a = document.createElement('a');

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

      name = name || "diagram.".concat(dataTrack); //const newXml = data.replace(/camunda:/g,'activiti:');

      a.setAttribute('href', "data:application/bpmn20-xml;charset=UTF-8,".concat(encodeURIComponent(data)));
      a.setAttribute('target', '_blank');
      a.setAttribute('dataTrack', "diagram:download-".concat(dataTrack));
      a.setAttribute('download', name);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleOpenFile", function (e) {
      var that = _assertThisInitialized(_this2);

      var file = e.target.files[0]; //console.log(file);

      var allowType = ".bpmn|.xml|";
      var pathName = file.name;
      var extName = pathName.substring(pathName.lastIndexOf(".")).toLowerCase();

      if (allowType.indexOf(extName + "|") == -1) {
        _antd.message.error('该文件类型不允许上传,请上传 bpmn 或者 xml 类型的文件!');

        return;
      }

      var isLt10M = file.size / 1024 / 1024 < 2;

      if (!isLt10M) {
        _antd.message.error('流程图文件超出限制大小10M,加载失败！');

        return;
      }

      var reader = new FileReader();
      var data = '';
      reader.readAsText(file);

      reader.onload = function (event) {
        data = event.target.result; // const newXml = data.replace(/activiti:/g,'camunda:');

        that.renderDiagram(data, 'open');
      };
    });

    _defineProperty(_assertThisInitialized(_this2), "handleSave", function () {
      //this.props.onSetProcessNodes(bpmnNodes);
      var bpmnJson = _this2.state.bpmnJson;

      _this2.bpmnModeler.saveXML({
        format: true
      }, function (err, xml) {
        console.log(xml);
        console.log(bpmnJson);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "handleSaveStorage", function () {
      var storeXml = null;

      _this2.bpmnModeler.saveXML({
        format: true
      }, function (err, xml) {
        _$utils.Func.storage.set('bpmn', xml);

        storeXml = xml;
      });

      return storeXml;
    });

    _defineProperty(_assertThisInitialized(_this2), "getShapeById", function (id) {
      var elementRegistry = _this2.bpmnModeler.get('elementRegistry');

      return elementRegistry.get(id);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleRedo", function () {
      _this2.bpmnModeler.get('commandStack').redo();
    });

    _defineProperty(_assertThisInitialized(_this2), "handleUndo", function () {
      _this2.bpmnModeler.get('commandStack').undo();
    });

    _defineProperty(_assertThisInitialized(_this2), "handleDownloadSvg", function () {
      _this2.bpmnModeler.saveSVG({
        format: true
      }, function (err, data) {
        _this2.download('svg', data);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "handleDownloadXml", function () {
      _this2.bpmnModeler.saveXML({
        format: true
      }, function (err, data) {
        _this2.download('xml', data);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "handleZoom", function (radio) {
      var newScale = !radio ? 1.0 // 不输入radio则还原
      : _this2.state.scale + radio <= 0.2 // 最小缩小倍数
      ? 0.2 : _this2.state.scale + radio;

      _this2.bpmnModeler.get('canvas').zoom(newScale);

      _this2.setState({
        scale: newScale
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "adjustPalette", function () {
      try {
        // 获取 bpmn 设计器实例
        var canvas = _this2.canvasRef.current;
        var djsPalette = canvas.children[0].children[1].children[4];
        var djsPalStyle = {
          width: '130px',
          padding: '5px',
          background: 'white',
          left: '20px',
          borderRadius: 0
        };

        for (var key in djsPalStyle) {
          djsPalette.style[key] = djsPalStyle[key];
        }

        var palette = djsPalette.children[0];
        var allGroups = palette.children;
        allGroups[0].style['display'] = 'none'; // 修改控件样式

        for (var gKey in allGroups) {
          var group = allGroups[gKey];

          for (var cKey in group.children) {
            var control = group.children[cKey];
            var controlStyle = {
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              padding: '5px'
            };

            if (control.className && control.dataset && control.className.indexOf('entry') !== -1) {
              var controlProps = new _paletteData["default"]().getControl(control.dataset.action);
              control.innerHTML = "<div style='font-size: 14px;font-weight:500;margin-left:15px;'>".concat(controlProps['title'], "</div>");

              for (var csKey in controlStyle) {
                control.style[csKey] = controlStyle[csKey];
              }

              if (controlProps['title'] == undefined) {
                control.style.display = 'none';
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "renderDiagram", function (xml) {
      var bpmnModel = _this2.bpmnModeler;
      var _this2$props = _this2.props,
          BasicInfo = _this2$props.BasicInfo,
          bpmnXml = _this2$props.bpmnXml;
      bpmnModel.importXML(xml, function (err) {
        if (err) {
          _antd.message.error('打开流程文件失败，请检查流程文件是否正确！');
        } else {
          // console.log('导入成功');
          if (BasicInfo) {
            var modeling = bpmnModel.get('modeling');
            var rootElement = bpmnModel.get('canvas').getRootElement();

            var str = _$utils.Func.getRandomString(10);

            var updatePro = bpmnXml ? {
              name: BasicInfo.name
            } : {
              name: BasicInfo.name,
              id: "process_".concat(BasicInfo.id, "_").concat(str)
            };
            modeling.updateProperties(rootElement, updatePro);
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "handleUserTask", function () {
      var _this2$state = _this2.state,
          curElementId = _this2$state.curElementId,
          bpmnJson = _this2$state.bpmnJson;
      bpmnJson[curElementId] = bpmnJson[curElementId] || {};
      var _bpmnJson$curElementI = bpmnJson[curElementId],
          _bpmnJson$curElementI2 = _bpmnJson$curElementI.multiInstanceType,
          multiInstanceType = _bpmnJson$curElementI2 === void 0 ? 'single' : _bpmnJson$curElementI2,
          _bpmnJson$curElementI3 = _bpmnJson$curElementI.auditUserType,
          auditUserType = _bpmnJson$curElementI3 === void 0 ? 'selectUsers' : _bpmnJson$curElementI3,
          _bpmnJson$curElementI4 = _bpmnJson$curElementI.users,
          users = _bpmnJson$curElementI4 === void 0 ? [] : _bpmnJson$curElementI4;

      var element = _this2.getShapeById(curElementId);

      var modeling = _this2.bpmnModeler.get('modeling');

      var moddle = _this2.bpmnModeler.get('moddle'); //single:单人办理  parallel:多人并行 anyone:多人任意 sequence:多人顺序


      if (multiInstanceType === 'single') {
        var assigneeUser = '';

        if (auditUserType == 'applyUser' || auditUserType == 'departmentLeader') {
          assigneeUser = auditUserType == 'applyUser' ? '${' + "applyUserId" + '}' : '${' + "departmentLeader" + '}';
        } else {
          if (users.length === 0) {
            _antd.message.error('未选择人员');

            return false;
          }

          assigneeUser = "".concat(_constants.BpmnConst.userNamePrefix).concat(users[0].id);
        }

        modeling.updateProperties(element, {
          loopCharacteristics: null,
          assignee: assigneeUser
        });
      } else {
        //会签配置
        var loopCharacteristics = moddle.create('bpmn:MultiInstanceLoopCharacteristics');
        loopCharacteristics['collection'] = "fsAssigneeList";
        loopCharacteristics['elementVariable'] = "fsAssignee";

        if (multiInstanceType === 'sequence') {
          loopCharacteristics['isSequential'] = 'true';
        }

        var body = multiInstanceType === 'anyone' ? '${' + "nrOfCompletedInstances>=1" + '}' : '${' + "nrOfActiveInstances==0" + '}';

        var completionCondition = _ElementHelper["default"].createElement('bpmn:FormalExpression', {
          body: body
        }, loopCharacteristics, moddle);

        loopCharacteristics['completionCondition'] = completionCondition;
        var obj = {
          loopCharacteristics: loopCharacteristics,
          assignee: '${' + "fsAssignee" + '}'
        };
        modeling.updateProperties(element, obj);
      }

      bpmnJson[curElementId] = _objectSpread(_objectSpread({}, bpmnJson[curElementId]), {}, {
        multiInstanceType: multiInstanceType,
        auditUserType: auditUserType,
        users: users
      });

      _this2.setState({
        bpmnJson: bpmnJson
      });

      return true;
    });

    _defineProperty(_assertThisInitialized(_this2), "handleConditionExpression", function () {
      var _this2$state2 = _this2.state,
          curElementId = _this2$state2.curElementId,
          bpmnJson = _this2$state2.bpmnJson;
      bpmnJson[curElementId] = bpmnJson[curElementId] || {};
      var _bpmnJson$curElementI5 = bpmnJson[curElementId],
          _bpmnJson$curElementI6 = _bpmnJson$curElementI5.expressType,
          expressType = _bpmnJson$curElementI6 === void 0 ? 'pass' : _bpmnJson$curElementI6,
          _bpmnJson$curElementI7 = _bpmnJson$curElementI5.expressCondition,
          expressCondition = _bpmnJson$curElementI7 === void 0 ? [] : _bpmnJson$curElementI7,
          _bpmnJson$curElementI8 = _bpmnJson$curElementI5.expressName,
          expressName = _bpmnJson$curElementI8 === void 0 ? '' : _bpmnJson$curElementI8;

      var element = _this2.getShapeById(curElementId);

      var modeling = _this2.bpmnModeler.get('modeling');

      var moddle = _this2.bpmnModeler.get('moddle'); //console.log(element);


      var conditionStr = '';
      expressCondition.map(function (v) {
        var conditionValue = Number(v.conditionValue) ? Number(v.conditionValue) : "'".concat(v.conditionValue, "'");
        conditionStr += "".concat(v.logical ? v.logical == 'and' ? '&&' : '||' : '').concat(v.procinstVar).concat(v.operator).concat(conditionValue);
      });

      var _this2$getLastTaskEle = _this2.getLastTaskElementId(element),
          lastTaskElementId = _this2$getLastTaskEle.elementId,
          getewayType = _this2$getLastTaskEle.getewayType,
          targetRef = _this2$getLastTaskEle.targetRef;

      var body = '';

      switch (expressType) {
        case 'pass':
          body = '${deptPass}';
          break;

        case 'reject':
          body = '${!deptPass}';
          break;

        default:
          body = '${' + "".concat(conditionStr) + '}';
          break;
      }

      var condition = moddle.create('bpmn:FormalExpression', {
        body: body
      });
      modeling.updateProperties(element, {
        conditionExpression: condition,
        name: expressName
      });

      if (lastTaskElementId) {
        bpmnJson[lastTaskElementId] = bpmnJson[lastTaskElementId] || {};
        var _bpmnJson$lastTaskEle = bpmnJson[lastTaskElementId].express,
            express = _bpmnJson$lastTaskEle === void 0 ? {} : _bpmnJson$lastTaskEle;
        express[curElementId] = {
          expressType: expressType,
          expressCondition: expressCondition,
          expressName: expressName,
          targetRef: targetRef
        };
        bpmnJson[lastTaskElementId] = _objectSpread(_objectSpread({}, bpmnJson[lastTaskElementId]), {}, {
          express: express,
          customExclusive: getewayType == "ExclusiveGateway" && expressType == "custom" ? true : false
        });
      }

      bpmnJson[curElementId] = _objectSpread(_objectSpread({}, bpmnJson[curElementId]), {}, {
        expressType: expressType,
        expressCondition: expressCondition,
        expressName: expressName
      });

      _this2.setState({
        bpmnJson: bpmnJson
      });

      return true;
    });

    _defineProperty(_assertThisInitialized(_this2), "handleFormAuth", function () {
      var _this2$state3 = _this2.state,
          curElementId = _this2$state3.curElementId,
          bpmnJson = _this2$state3.bpmnJson;
      bpmnJson[curElementId] = bpmnJson[curElementId] || {};
      var _bpmnJson$curElementI9 = bpmnJson[curElementId],
          _bpmnJson$curElementI10 = _bpmnJson$curElementI9.canEditCodes,
          canEditCodes = _bpmnJson$curElementI10 === void 0 ? [] : _bpmnJson$curElementI10,
          _bpmnJson$curElementI11 = _bpmnJson$curElementI9.showCodes,
          showCodes = _bpmnJson$curElementI11 === void 0 ? [] : _bpmnJson$curElementI11;
      bpmnJson[curElementId] = _objectSpread(_objectSpread({}, bpmnJson[curElementId]), {}, {
        canEditCodes: canEditCodes,
        showCodes: showCodes
      });

      _this2.setState({
        bpmnJson: bpmnJson
      });

      return true;
    });

    _defineProperty(_assertThisInitialized(_this2), "handleNoticeUser", function () {
      var _this2$state4 = _this2.state,
          curElementId = _this2$state4.curElementId,
          bpmnJson = _this2$state4.bpmnJson;
      bpmnJson[curElementId] = bpmnJson[curElementId] || {};
      var _bpmnJson$curElementI12 = bpmnJson[curElementId].noticeUsers,
          noticeUsers = _bpmnJson$curElementI12 === void 0 ? [] : _bpmnJson$curElementI12;
      bpmnJson[curElementId] = _objectSpread(_objectSpread({}, bpmnJson[curElementId]), {}, {
        noticeUsers: noticeUsers
      });

      _this2.setState({
        bpmnJson: bpmnJson
      });

      return true;
    });

    _defineProperty(_assertThisInitialized(_this2), "handleOk", function (e) {
      var modalType = _this2.state.modalType;
      var flag = true;

      switch (modalType) {
        case 'conditionExpression':
          flag = _this2.handleConditionExpression();
          break;

        case 'userTask':
          flag = _this2.handleUserTask();
          break;

        case 'formAuth':
          flag = _this2.handleFormAuth();
          break;

        case 'noticeUser':
          flag = _this2.handleNoticeUser();
          break;

        default:
          break;
      }

      flag && _this2.setState({
        visible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "handleCancel", function (e) {
      _this2.setState({
        visible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "saveBpmnJson", function (bpmnJson) {
      _this2.setState({
        bpmnJson: bpmnJson
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "renderModalContent", function () {
      var _this2$props2 = _this2.props,
          companyUsers = _this2$props2.companyUsers,
          formSchema = _this2$props2.formSchema,
          buttonAuth = _this2$props2.buttonAuth,
          processFormFields = _this2$props2.processFormFields;
      var _this2$state5 = _this2.state,
          bpmnJson = _this2$state5.bpmnJson,
          curElementId = _this2$state5.curElementId,
          modalType = _this2$state5.modalType;

      switch (modalType) {
        case 'conditionExpression':
          return /*#__PURE__*/_react["default"].createElement(_conditionExpressionModal["default"], {
            bpmnJson: bpmnJson,
            curElementId: curElementId,
            saveBpmnJson: _this2.saveBpmnJson,
            procinstVars: processFormFields.filter(function (f) {
              return f.isProcinstVar;
            }).map(function (v) {
              return {
                code: v.code,
                name: v.name
              };
            })
          });
          break;

        case 'userTask':
          return /*#__PURE__*/_react["default"].createElement(_userTaskModal["default"], {
            companyUsers: companyUsers,
            bpmnJson: bpmnJson,
            curElementId: curElementId,
            saveBpmnJson: _this2.saveBpmnJson
          });
          break;

        case 'buttonAuth':
          return /*#__PURE__*/_react["default"].createElement(_buttonAuthModal["default"], {
            bpmnJson: bpmnJson,
            curElementId: curElementId,
            buttonAuth: buttonAuth,
            saveBpmnJson: _this2.saveBpmnJson
          });
          break;

        case 'formAuth':
          return /*#__PURE__*/_react["default"].createElement(_formAuthModal["default"], {
            bpmnJson: bpmnJson,
            curElementId: curElementId,
            formFileds: _$utils.Func.getFieldsByFormSchema(formSchema),
            saveBpmnJson: _this2.saveBpmnJson
          });
          break;

        case 'noticeUser':
          return /*#__PURE__*/_react["default"].createElement(_noticeModal["default"], {
            companyUsers: companyUsers,
            bpmnJson: bpmnJson,
            curElementId: curElementId,
            saveBpmnJson: _this2.saveBpmnJson
          });
          break;

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "getLastTaskElementId", function (element) {
      var elementId = null;
      var getewayType = null;
      var targetRef = null;
      var getewayTypes = ['bpmn:ParallelGateway', 'bpmn:ExclusiveGateway', 'bpmn:InclusiveGateway', 'bpmn:ComplexGateway'];
      var sourceRefTypes = ['bpmn:StartEvent', 'bpmn:UserTask'];

      if (element.businessObject.sourceRef) {
        if (sourceRefTypes.includes(element.businessObject.sourceRef.$type)) {
          elementId = element.businessObject.sourceRef.id;
        } else {
          if (getewayTypes.includes(element.businessObject.sourceRef.$type)) {
            if (element.businessObject.sourceRef.incoming[0] && element.businessObject.sourceRef.incoming[0].sourceRef && sourceRefTypes.includes(element.businessObject.sourceRef.incoming[0].sourceRef.$type)) {
              elementId = element.businessObject.sourceRef.incoming[0].sourceRef.id;
              getewayType = element.businessObject.sourceRef.$type.replace('bpmn:', '');
            }
          }
        }
      }

      if (element.businessObject.targetRef) {
        var _element$businessObje = element.businessObject.targetRef,
            $type = _element$businessObje.$type,
            id = _element$businessObje.id;
        targetRef = {
          type: $type.replace('bpmn:', ''),
          elementId: id
        };
      }

      return {
        elementId: elementId,
        getewayType: getewayType,
        targetRef: targetRef
      };
    });

    _defineProperty(_assertThisInitialized(_this2), "getBpmnJsonRelations", function () {
      var elementRegistry = _this2.bpmnModeler.get('elementRegistry');

      var allNodes = _this2.bpmnModeler._definitions.rootElements[0];
      var bpmnJson = _this2.state.bpmnJson; //console.log(elementRegistry,allNodes);
      //处理流程节点之间关系

      var geteway = {}; //先取出网关节点的上一个任务节点  ParallelGateway:并行网关; ExclusiveGateway:独占网关;InclusiveGateway:包容性网关

      var getewayTypes = ['bpmn:ParallelGateway', 'bpmn:ExclusiveGateway', 'bpmn:InclusiveGateway', 'bpmn:ComplexGateway'];
      console.log(allNodes);
      allNodes.flowElements.map(function (element) {
        if (getewayTypes.includes(element.$type) && Array.isArray(element.incoming)) {
          geteway[element.id] = [];
          element.incoming.map(function (e) {
            if (e.sourceRef && (e.sourceRef.$type === 'bpmn:UserTask' || e.sourceRef.$type === 'bpmn:StartEvent')) {
              geteway[element.id].push({
                id: e.sourceRef.id,
                type: e.sourceRef.$type
              });
            }
          });
        }
      });
      allNodes.flowElements.map(function (element) {
        //console.log(element.incoming)
        if (element.$type === 'bpmn:UserTask' && bpmnJson[element.id] && Array.isArray(element.incoming)) {
          bpmnJson[element.id].sourceRef = [];
          element.incoming.map(function (e) {
            if (e.sourceRef) {
              switch (e.sourceRef.$type) {
                case 'bpmn:UserTask':
                case 'bpmn:StartEvent':
                  bpmnJson[element.id].sourceRef.push({
                    id: e.sourceRef.id,
                    type: e.sourceRef.$type
                  });
                  break;

                case 'bpmn:ExclusiveGateway':
                case 'bpmn:ParallelGateway':
                case 'bpmn:InclusiveGateway':
                case 'bpmn:ComplexGateway':
                  if (geteway[e.sourceRef.id]) {
                    bpmnJson[element.id].sourceRef = geteway[e.sourceRef.id];
                  }

                default:
                  break;
              }
            }
          });
        }
      });
      return bpmnJson;
    });

    _defineProperty(_assertThisInitialized(_this2), "handerSaveProcess", function () {
      var handerSaveProcess = _this2.props.handerSaveProcess;

      _this2.bpmnModeler.saveXML({
        format: true
      }, function (err, xml) {
        //console.log(xml);
        var newBpmnJson = _this2.getBpmnJsonRelations();

        handerSaveProcess && handerSaveProcess(newBpmnJson, xml);
      });
    });

    _this2.bpmnModeler = null;
    _this2.state = {
      scale: 1,
      // 流程图比例
      visible: false,
      modalTitle: '',
      confirmLoading: false,
      inputName: '',
      currentSelect: {
        selectedRowKeys: [],
        selectedRowNames: []
      },
      //multiInstanceType: 'single',
      //auditUserType: 'selectUsers',
      curElementId: null,
      modalType: null,
      // expressType: 'pass',
      // expressCondition: '',
      bpmnJson: props.bpmnJson || {},
      formSchema: {}
    };
    _this2.canvasRef = /*#__PURE__*/_react["default"].createRef(); //在全局对象上挂载弹出modal框的函数,在bpmn-js-properties-panel factory 中各种控件工厂函数中使用

    window.openBpmnModal = function (type) {
      if (!_this2.state.curElementId) {
        _antd.message.error('请先点击流程图中的相关节点');
      } else {
        var title = '';

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

        _this2.setState({
          visible: true,
          modalType: type,
          modalTitle: title //currentSelect: newSelect

        });
      }
    };

    return _this2;
  }

  _createClass(Bpmn, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var onGetProcessFormFields = this.props.onGetProcessFormFields;
      this.bpmnModeler = new _Modeler["default"]({
        container: '#canvas',
        propertiesPanel: {
          parent: '#properties-panel'
        },
        additionalModules: [_bpmnJsPropertiesPanel["default"], _magic["default"], _camunda["default"], customTranslateModule, _customContextPad["default"]],
        moddleExtensions: {
          camunda: _camunda2["default"]
        }
      });
      onGetProcessFormFields && onGetProcessFormFields(); //先检查props 是否有xml

      var bpmnXml = this.props.bpmnXml;

      if (bpmnXml) {
        this.renderDiagram(bpmnXml);
      } else {
        this.renderDiagram(_xml.diagramXML);
      } //自定义左侧工具栏处理


      this.adjustPalette(); //监听shape 包含增加 ，移动，删除及处理

      this.addModelerListener(); //监听element 包含change，click事件及处理

      this.addEventBusListener();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var contentHeight = this.props.contentHeight;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "bpmn-containers"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.canvasRef,
        className: "canvas",
        style: {
          overflow: "hidden",
          background: '#fff',
          height: contentHeight
        },
        id: "canvas"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "properties-panel-parent panel",
        id: "properties-panel",
        style: {
          height: '100%',
          paddingBottom: 30
        }
      }), /*#__PURE__*/_react["default"].createElement(_EditingTools["default"], {
        onOpenFIle: this.handleOpenFile,
        onSave: this.handleSave,
        onUndo: this.handleUndo,
        onRedo: this.handleRedo,
        onDownloadSvg: this.handleDownloadSvg,
        onDownloadXml: this.handleDownloadXml,
        onZoomIn: function onZoomIn() {
          return _this3.handleZoom(0.1);
        },
        onZoomOut: function onZoomOut() {
          return _this3.handleZoom(-0.1);
        },
        onZoomReset: function onZoomReset() {
          return _this3.handleZoom();
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "deploy-button"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        onClick: this.handerSaveProcess
      }, "\u4FDD\u5B58\u90E8\u7F72")), /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        width: "65%",
        centered: true,
        title: this.state.modalTitle,
        visible: this.state.visible,
        maskClosable: false,
        destroyOnClose: true,
        onOk: this.handleOk,
        confirmLoading: this.state.confirmLoading,
        onCancel: this.handleCancel
      }, this.renderModalContent()));
    }
  }]);

  return Bpmn;
}(_react.Component);

exports["default"] = Bpmn;