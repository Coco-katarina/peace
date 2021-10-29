"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactRedux = require("react-redux");

var _workflowProcessForm = require("../../actions/workflowProcessForm");

var _index = _interopRequireDefault(require("./customTransferTable/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SubmitApply = function SubmitApply(props) {
  var params = props.params,
      procKey = props.procKey,
      statusChange = props.statusChange,
      dispatch = props.dispatch,
      user = props.user,
      processNodes = props.processNodes,
      currentNodeId = props.currentNodeId,
      departments = props.departments,
      refInstance = props.refInstance,
      onSucessCallBack = props.onSucessCallBack;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      formValues = _useState4[0],
      setFormValues = _useState4[1];

  var _Form$useForm = _antd.Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var nextNode, currentNode;
  var actionEle;

  var renderNextNode = function renderNextNode(formData) {
    if (processNodes && currentNodeId) {
      currentNode = processNodes[currentNodeId];
      /** customExclusive独占网关自定义条件判断
       * true：找出流程变量对应的flow分支
       * false：sourceRef找下一节点信息
       */

      if (currentNode.customExclusive) {
        if (formData && currentNode.express) {
          for (var key in currentNode.express) {
            var evalString = null;

            if (currentNode.express[key].expressCondition.length) {
              currentNode.express[key].expressCondition.map(function (item, index) {
                var logical = item.logical,
                    conditionValue = item.conditionValue,
                    operator = item.operator,
                    procinstVar = item.procinstVar;

                if (index == 0) {
                  evalString = "'".concat(formData[procinstVar], "' ").concat(operator, " '").concat(conditionValue, "'");
                } else {
                  evalString += " ".concat(logical == "and" ? '&&' : '||', " '").concat(formData[procinstVar], "' ").concat(operator, " '").concat(conditionValue, "'");
                }
              });
            }

            if (evalString && eval(evalString)) {
              nextNode = processNodes[currentNode.express[key].targetRef && currentNode.express[key].targetRef.elementId];
              break;
            }
          }

          if (!nextNode) {
            _antd.message.error('没有满足条件的流程分支，请排查');
          }
        }
      } else {
        for (var _key in processNodes) {
          var values = processNodes[_key];

          if (values.sourceRef) {
            var sourceData = values.sourceRef.find(function (v) {
              return v.id == props.currentNodeId;
            });

            if (sourceData) {
              nextNode = values;
            }
          }
        }
      }
    }
  };

  (0, _react.useImperativeHandle)(refInstance, function () {
    return {
      submit: function submit(formData) {
        onSubmit(formData);
      }
    };
  });
  var userColumns = [{
    dataIndex: 'id',
    key: 'id',
    title: 'ID',
    width: 70
  }, {
    dataIndex: 'name',
    key: 'name',
    title: '姓名',
    render: function render(text, record, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          wordBreak: 'break-all'
        }
      }, text);
    }
  }];
  var options = {
    leftTitle: '待选人员',
    rightTitle: '已选人员'
  };
  var selectUsers = null;

  var renderAction = function renderAction(formData) {
    var renderEle = [];

    if (currentNode) {
      var _currentNode = currentNode,
          express = _currentNode.express;

      if (express && _typeof(express) === 'object') {
        var radios = Object.values(express).filter(function (f) {
          return ['pass', 'reject'].includes(f.expressType);
        });

        if (radios && radios.length > 0) {
          renderEle.push( /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
            label: "\u6D41\u8F6C\u6761\u4EF6",
            name: "expressCondition",
            rules: [{
              required: true,
              message: '请选择'
            }]
          }, /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, null, radios.map(function (v) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
              value: v.expressType
            }, v.expressName);
          }))));
        }
      }
    }

    renderNextNode(formData);

    if (nextNode) {
      var transferData = {
        leftColumns: userColumns,
        rightColumns: userColumns
      };
      var _nextNode = nextNode,
          multiInstanceType = _nextNode.multiInstanceType,
          multiInstanceUsers = _nextNode.users,
          auditUserType = _nextNode.auditUserType;

      if (multiInstanceType == 'anyone' || multiInstanceType == 'parallel' || multiInstanceType == 'squence') {
        switch (auditUserType) {
          case 'selectUsers':
            selectUsers = multiInstanceUsers;
            break;

          case 'lastAssign':
            transferData.data = multiInstanceUsers.map(function (v) {
              v.key = v.id;
              return v;
            });
            renderEle.push( /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
              label: "\u6307\u5B9A\u4E0B\u4E2A\u5BA1\u6279\u4EBA\u5458",
              name: "assignUser",
              rules: [{
                required: true,
                message: '请指定下个审批人员！'
              }]
            }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
              options: _objectSpread(_objectSpread({}, options), {}, {
                checkType: 'radio'
              }),
              transferData: transferData
            })));
            break;

          default:
            break;
        }
      } else {
        if (auditUserType == 'departmentLeader') {
          var userDepts = user.department.map(function (v) {
            return v.id;
          });
          var list = [];
          departments.map(function (v) {
            if (userDepts.includes(v.id)) {
              v.departmentUsers.map(function (val) {
                if ([1, 2].includes(val.principal)) {
                  list.push({
                    id: val.user.id,
                    key: val.user.id,
                    name: val.user.name
                  });
                }
              });
            }
          });
          transferData.data = list;
          renderEle.push( /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
            label: "\u9009\u62E9\u9886\u5BFC\u5BA1\u6279",
            name: "departmentLeader",
            rules: [{
              required: true,
              message: '请选择一个领导审批！'
            }]
          }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
            options: _objectSpread(_objectSpread({}, options), {}, {
              checkType: 'radio'
            }),
            transferData: transferData
          })));
        }
      }
    }

    return renderEle.length > 0 ? renderEle : '';
  };

  actionEle = renderAction(formValues);

  var onSubmit = function onSubmit(formData) {
    setFormValues(formData);
    actionEle = renderAction(formData);

    if (actionEle) {
      setIsVisible(true);
    } else {
      submitApply(formData);
    }
  };

  var submitApply = function submitApply(formData) {
    statusChange(true);
    form.validateFields().then(function (values) {
      var dataToSave = {
        businessKey: params.processId,
        formData: formData,
        node: params.node,
        actionName: params.actionName,
        versionId: params.versionId,
        processName: params.processName,
        syncInterface: params.syncInterface,
        variables: {
          // 启动流程的表单模板版本id ，用于渲染后续历史表单
          fsEmisApplyVersionId: {
            value: params.versionId
          },
          fsEmisBusinessName: {
            value: params.processName
          },
          fsEmisBusinessType: {
            //业务类型
            value: params.groupName
          },
          fsEmisApplyUserName: {
            value: params.user.name
          },
          // 所属部门ids
          fsEmisDepartment: {
            value: params.user.department.map(function (v) {
              return v.name;
            }).toString()
          }
        }
      }; //期望完成时间

      if (params.expectTime) {
        dataToSave.variables.fsEmisExpectTime = {
          value: params.expectTime
        };
      } //事项名称


      dataToSave.variables.fsFormItemName = {
        value: params.formItemName || params.processName
      }; //处理表单流程变量  分组是array的变量会有多个值不加入流程变量

      params.procinstVars.map(function (v) {
        if (formData[v]) {
          if (typeof formData[v] === 'number' || typeof formData[v] === 'string' || _typeof(formData[v]) === 'object' && Array.isArray(formData[v])) {
            dataToSave.variables[v] = {
              value: formData[v]
            };
          }
        } else {
          //变量在分组下
          for (var _i2 = 0, _Object$entries = Object.entries(formData); _i2 < _Object$entries.length; _i2++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            if (_typeof(value) === 'object' && !Array.isArray(value)) {
              for (var _i3 = 0, _Object$entries2 = Object.entries(value); _i3 < _Object$entries2.length; _i3++) {
                var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
                    k = _Object$entries2$_i[0],
                    child = _Object$entries2$_i[1];

                if (child[v]) {
                  if (typeof child[v] === 'number' || typeof child[v] === 'string' || _typeof(child[v]) === 'object' && Array.isArray(child[v])) {
                    dataToSave.variables[v] = {
                      value: child[v]
                    };
                  }
                }
              }
            }
          }
        }
      }); //流转条件变量

      if (values.expressCondition) {
        dataToSave.variables.deptPass = {
          value: values.expressCondition == 'pass' ? true : false
        };
      } //会签人员变量


      if (Array.isArray(selectUsers)) {
        dataToSave.variables.fsAssigneeList = {
          value: selectUsers.map(function (v) {
            return "fsUser".concat(v.id);
          })
        };
      } //领导变量


      if (values.departmentLeader) {
        dataToSave.variables.departmentLeader = {
          value: "fsUser".concat(values.departmentLeader)
        };
      } //指定人员变量


      if (values.assignUser) {
        dataToSave.variables.fsAssigneeList = {
          value: ["fsUser".concat(values.assignUser)]
        };
      }

      if (params.draftId) {
        dataToSave.draftId = params.draftId;
      }

      dispatch((0, _workflowProcessForm.submitProcessApply)(procKey, dataToSave)).then(function (res) {
        if (res.success) {
          _antd.message.success('提交申请成功');

          onSucessCallBack && onSucessCallBack({
            type: 'submit',
            formData: formData
          });
        } else {
          _antd.message.error('提交申请失败');

          if (statusChange) {
            statusChange(false);
          }
        }
      }); // if (params.taskId) {
      //     dispatch(adjustProcessApply(procKey, dataToSave)).then(res => {
      //         if (res.success) {
      //             message.success('提交申请成功');
      //             onSucessCallBack && onSucessCallBack({ type: 'submit', formData: formData })
      //         } else {
      //             message.error('提交申请失败');
      //         }
      //         if (statusChange) {
      //             statusChange(false);
      //         }
      //     });
      // } else {
      // }
    });
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-block'
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
    visible: isVisible,
    onOk: function onOk() {
      return submitApply(formValues);
    },
    onCancel: function onCancel() {
      return setIsVisible(false);
    },
    width: 1000
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Form, {
    form: form
  }, actionEle))));
};

function mapStateToProps(state) {
  var companyOrganization = state.companyOrganization,
      auth = state.auth;
  var companyOrganization_ = companyOrganization.data || {};
  return {
    user: JSON.parse(sessionStorage.getItem('user')),
    departments: companyOrganization_.departments || []
  };
}

SubmitApply = (0, _reactRedux.connect)(mapStateToProps)(SubmitApply);

var _default = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react["default"].createElement(SubmitApply, _extends({}, props, {
    refInstance: ref
  }));
});

exports["default"] = _default;