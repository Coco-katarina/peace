"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _reactRedux = require("react-redux");

var _index = _interopRequireDefault(require("./customTransferTable/index"));

var _actions = require("../../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TextArea = _antd.Input.TextArea;

var AuthButton = function AuthButton(props) {
  var btnInfo = props.btnInfo,
      noticeData = props.noticeData,
      userList = props.userList,
      departments = props.departments,
      dispatch = props.dispatch,
      applyInfo = props.applyInfo,
      user = props.user,
      processNodes = props.processNodes,
      currentNodeId = props.currentNodeId,
      onSucessCallBack = props.onSucessCallBack;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var _Form$useForm = _antd.Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0]; //console.log(processNodes,currentNodeId,btnInfo);


  var selectUsers = null;
  var isShow = false;
  var isBeforeAssign = false;
  var isAfterAssign = false;
  var nextNode = {},
      currentNode;
  var fsBeforeAssignUser = null;
  var fsBeforeAssignUnNum = null;
  var fsAfterAssignUser = null;
  var fsAfterAssignUnNum = null;

  if (processNodes && currentNodeId && btnInfo) {
    currentNode = processNodes[currentNodeId] || {};

    for (var key in processNodes) {
      var values = processNodes[key];

      if (values.sourceRef) {
        var sourceData = values.sourceRef.find(function (v) {
          return v.id == currentNodeId;
        });

        if (sourceData) {
          nextNode = values;
        }
      }
    } //是否拥有按钮权限


    isShow = Array.isArray(currentNode.buttonList) && currentNode.buttonList.includes(btnInfo.id);

    if (isShow) {
      //判断是否前，后加签人员
      if (Array.isArray(applyInfo.variables)) {
        fsBeforeAssignUser = applyInfo.variables.find(function (v) {
          return v.name == "fsBeforeAssignUser".concat(user.id) && v.taskId == applyInfo.taskId;
        });
        fsBeforeAssignUnNum = applyInfo.variables.find(function (v) {
          return v.name == 'fsBeforeAssignUnNum' && v.taskId == applyInfo.taskId;
        });

        if (fsBeforeAssignUser && fsBeforeAssignUnNum && fsBeforeAssignUnNum.value > 0) {
          isBeforeAssign = true;
        }
      }

      if (Array.isArray(applyInfo.variables)) {
        fsAfterAssignUser = applyInfo.variables.find(function (v) {
          return v.name == "fsAfterAssignUser".concat(user.id) && v.taskId == applyInfo.taskId;
        });
        fsAfterAssignUnNum = applyInfo.variables.find(function (v) {
          return v.name == 'fsAfterAssignUnNum' && v.taskId == applyInfo.taskId;
        });

        if (fsAfterAssignUser && fsAfterAssignUnNum && fsAfterAssignUnNum.value > 0) {
          isAfterAssign = true;
        }
      }

      switch (btnInfo.functionName) {
        case 'beforeAssign':
        case 'afterAssign':
        case 'assignee':
          if (isBeforeAssign || isAfterAssign) {
            isShow = false;
          }

          break;

        case 'back':
          if (currentNode.sourceRef && currentNode.sourceRef.find(function (v) {
            return v.type == 'bpmn:StartEvent';
          })) {
            isShow = false;
          }

          break;

        case 'nextAssign':
          if (isBeforeAssign || isAfterAssign && fsAfterAssignUnNum && fsAfterAssignUnNum.value != 1) {
            isShow = false;
          } //先判断是否多人任务


          if (currentNode.multiInstanceType == 'parallel' || currentNode.multiInstanceType == 'squence') {
            if (Array.isArray(currentNode.users) && currentNode.users.length > 0) {
              isShow = false;
            }
          } //再判断下个节点是否需要指定


          var _nextNode = nextNode,
              auditUserType = _nextNode.auditUserType,
              multiInstanceType = _nextNode.multiInstanceType;

          if (auditUserType != 'lastAssign') {
            isShow = false;
          }

          break;

        default:
          break;
      }
    } // if (!isAssignUsers && currentNode.afterAssignUsers && currentNode.afterAssignUsers.length > 0) {
    //     isAssignUsers = currentNode.afterAssignUsers.some(v => v.id == user.id);
    // }

  }

  if (noticeData && noticeData.data && currentNode && currentNode.noticeUsers) {
    noticeData.data = noticeData.data.map(function (v) {
      var obj = currentNode.noticeUsers.find(function (val) {
        return val.id == v.id;
      });

      if (obj) {
        v.disabled = true;
      }

      return v;
    });
  }

  var options = {
    leftTitle: '待选人员',
    rightTitle: '已选人员'
  };
  var radioOpts = {
    checkType: 'radio'
  };
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

  var confirmClick = function confirmClick() {
    var endAddress = null;

    if (applyInfo.endAddress) {
      var connector = applyInfo.endAddress.indexOf('?') === -1 ? '?' : '&';
      endAddress = "".concat(applyInfo.endAddress).concat(connector, "token=").concat(user.token);
    }

    var params = {
      procinstId: applyInfo.procinstId || '',
      taskId: applyInfo.taskId || '',
      applyUser: applyInfo.applyUser || user.id,
      actionName: btnInfo.name,
      endAddress: applyInfo.endAddress
    };
    form.validateFields().then(function (values) {
      var noticeUsers = currentNode && currentNode.noticeUsers || [];

      if (values.noticeUsers && values.noticeUsers.length > 0) {
        values.noticeUsers.map(function (v) {
          var data = userList.find(function (user) {
            return user.id == v;
          });
          noticeUsers.push({
            id: data.id,
            name: data.name
          });
        });
      }

      params.noticeUsers = noticeUsers;
      params.comment = values.comment;
      params.variables = {};

      switch (btnInfo.id) {
        case 1:
          //办理
          //流转条件变量
          if (values.expressCondition) {
            params.variables.deptPass = {
              value: values.expressCondition == 'pass' ? true : false
            };
          } //会签人员变量


          if (Array.isArray(selectUsers)) {
            params.variables.fsAssigneeList = {
              value: selectUsers.map(function (v) {
                return "fsUser".concat(v.id);
              })
            };
          } //领导变量


          if (values.departmentLeader) {
            params.variables.departmentLeader = {
              value: "fsUser".concat(values.departmentLeader)
            };
          } //指定人员变量
          // if (values.assignUser) {
          //     params.variables.fsAssigneeList = { value: [`fsUser${values.assignUser}`] };
          // }
          //前加签办理


          if (isBeforeAssign) {
            params.isBeforeAssign = true;
            params.fsBeforeAssignUnNum = fsBeforeAssignUnNum.value;
          } //后加签办理


          if (isAfterAssign) {
            params.isAfterAssign = true;
            params.fsAfterAssignUnNum = fsAfterAssignUnNum.value;
          }

          break;

        case 2:
          //退回
          params.activityIds = currentNode && currentNode.sourceRef && currentNode.sourceRef.filter(function (f) {
            return f.type === 'bpmn:UserTask';
          }).map(function (v) {
            return v.id;
          });
          break;

        case 3:
          //驳回
          params.deletedType = 'reject';
          break;

        case 4:
          //前加签
          var beforeAssignUsers = [];
          Array.isArray(values.beforeAssignUsers) && values.beforeAssignUsers.map(function (v) {
            var data = userList.find(function (user) {
              return user.id == v;
            });
            beforeAssignUsers.push({
              id: data.id,
              name: data.name
            });
          });
          params.beforeAssignUsers = beforeAssignUsers;
          break;

        case 5:
          //后加签
          var afterAssignUsers = [];
          Array.isArray(values.afterAssignUsers) && values.afterAssignUsers.map(function (v) {
            var data = userList.find(function (user) {
              return user.id == v;
            });
            afterAssignUsers.push({
              id: data.id,
              name: data.name
            });
          });
          params.afterAssignUsers = afterAssignUsers;
          break;

        case 6:
          //转办
          var assigneeUser = userList.find(function (user) {
            return user.id == values.assigneeUser;
          });
          params.assigneeUser = {
            id: assigneeUser.id,
            name: assigneeUser.name
          };
          break;

        case 7:
          //指定
          //流转条件变量
          if (values.expressCondition) {
            params.variables.deptPass = {
              value: values.expressCondition == 'pass' ? true : false
            };
          }

          var assignUser = userList.find(function (user) {
            return user.id == values.assignUser;
          });
          params.assignUser = {
            id: assignUser.id,
            name: assignUser.name
          };
          break;
      }

      dispatch((0, _actions.postAuditActions)(params, btnInfo.functionName)).then(function (res) {
        if (res.success) {
          _antd.message.success("".concat(btnInfo.name, "\u64CD\u4F5C\u6210\u529F"));

          onSucessCallBack && onSucessCallBack();
        } else {
          var error = res.error;

          _antd.message.error(error || "".concat(btnInfo.name, "\u64CD\u4F5C\u5931\u8D25"));
        }
      })["catch"](function (err) {
        _antd.message.error("".concat(btnInfo.name, "\u64CD\u4F5C\u5931\u8D25"));
      });
      setIsVisible(false);
    });
  };

  var renderAction = function renderAction() {
    var renderEle = [];

    if (currentNode && !isBeforeAssign && (!isAfterAssign || isAfterAssign && fsAfterAssignUnNum && fsAfterAssignUnNum.value == 1)) {
      var _currentNode = currentNode,
          express = _currentNode.express,
          noticeUsers = _currentNode.noticeUsers;
      var _nextNode2 = nextNode,
          _multiInstanceType = _nextNode2.multiInstanceType,
          multiInstanceUsers = _nextNode2.users,
          _auditUserType = _nextNode2.auditUserType;
      var excludedUsers = userList.filter(function (v) {
        return v.id != user.id;
      });

      switch (btnInfo.id) {
        case 1:
          //办理
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

          var transferData = {
            leftColumns: userColumns,
            rightColumns: userColumns
          };

          if (_multiInstanceType == 'anyone' || _multiInstanceType == 'parallel' || _multiInstanceType == 'squence') {
            switch (_auditUserType) {
              case 'selectUsers':
                selectUsers = multiInstanceUsers;
                break;

              case 'departmentLeader':
                break;

              case 'lastAssign':
                //办理中暂不处理指定，默认不指定
                selectUsers = multiInstanceUsers;
                break;

              default:
                break;
            }
          } else {
            if (_auditUserType == 'departmentLeader') {
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
                options: radioOpts,
                transferData: transferData
              })));
            }
          }

          break;

        case 2:
          //退回
          break;

        case 3:
          //驳回
          break;

        case 4:
          //前加签
          renderEle.push( /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
            label: "\u524D\u52A0\u7B7E",
            name: "beforeAssignUsers",
            rules: [{
              required: true,
              message: '前加签至少选中一个成员'
            }]
          }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
            options: options,
            transferData: {
              leftColumns: userColumns,
              rightColumns: userColumns,
              data: excludedUsers
            }
          })));
          break;

        case 5:
          //后加签
          renderEle.push( /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
            label: "\u540E\u52A0\u7B7E",
            name: "afterAssignUsers",
            rules: [{
              required: true,
              message: '后加签至少选中一个成员！'
            }]
          }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
            options: options,
            transferData: {
              leftColumns: userColumns,
              rightColumns: userColumns,
              data: excludedUsers
            }
          })));
          break;

        case 6:
          //转办
          renderEle.push( /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
            label: "\u8F6C\u529E",
            name: "assigneeUser",
            rules: [{
              required: true,
              message: '请选择转办人员！'
            }]
          }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
            options: radioOpts,
            transferData: {
              leftColumns: userColumns,
              data: excludedUsers
            }
          })));
          break;

        case 7:
          //指定
          if (express && _typeof(express) === 'object') {
            var _radios = Object.values(express).filter(function (f) {
              return ['pass', 'reject'].includes(f.expressType);
            });

            renderEle.push( /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
              label: "\u6D41\u8F6C\u6761\u4EF6",
              name: "expressCondition",
              rules: [{
                required: true,
                message: '请选择'
              }]
            }, /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, null, _radios.map(function (v) {
              return /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
                value: v.expressType
              }, v.expressName);
            }))));
          }

          if (_multiInstanceType == 'anyone' || _multiInstanceType == 'parallel' || _multiInstanceType == 'squence') {
            var assignUsers = [];

            if (_auditUserType == 'lastAssign') {
              assignUsers = multiInstanceUsers.map(function (v) {
                v.key = v.id;
                return v;
              });
            }

            renderEle.push( /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
              label: "\u6307\u5B9A",
              name: "assignUser",
              rules: [{
                required: true,
                message: '请指定人员！'
              }]
            }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
              options: radioOpts,
              transferData: {
                leftColumns: userColumns,
                data: assignUsers
              }
            })));
          }

          break;
      }
    }

    return renderEle.length > 0 ? renderEle : '';
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-block'
    }
  }, isShow ? /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-block'
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
    visible: isVisible,
    onOk: confirmClick,
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
  }, renderAction(), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
    label: "\u610F\u89C1",
    name: "comment"
  }, /*#__PURE__*/_react["default"].createElement(TextArea, {
    showCount: true,
    maxLength: 300,
    rows: 5
  })), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
    label: "\u6284\u9001",
    name: "noticeUsers"
  }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
    options: options,
    transferData: noticeData,
    targetKeys: currentNode.noticeUsers && currentNode.noticeUsers.length > 0 && currentNode.noticeUsers.map(function (v) {
      return v.id;
    })
  }))))), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    onClick: function onClick() {
      return setIsVisible(true);
    }
  }, btnInfo.name)) : '');
};

function mapStateToProps(state) {
  var companyOrganization = state.companyOrganization,
      auth = state.auth;
  var companyOrganization_ = companyOrganization.data || {};
  var userList = [];

  if (companyOrganization_.departments && companyOrganization_.departments.length > 0) {
    companyOrganization_.departments.map(function (v) {
      if (v.users && v.users.length > 0) {
        v.users.map(function (user) {
          if (!userList.find(function (val) {
            return val.id == user.id;
          })) {
            var departmentsName = '';
            var departmentIds = [];
            user.departments.map(function (a) {
              departmentIds.push(a.id);

              if (departmentsName == '') {
                departmentsName = a.name;
              } else {
                departmentsName = departmentsName + ',' + a.name;
              }
            });
            userList.push({
              id: user.id,
              key: user.id,
              name: user.name,
              department: departmentsName,
              departmentIds: departmentIds
            });
          }
        });
      }
    });
  }

  return {
    user: JSON.parse(sessionStorage.getItem('user')),
    departments: companyOrganization_.departments || [],
    userList: userList
  };
}

AuthButton.propTypes = {
  noticeData: _propTypes["default"].object,
  // 包含 {leftColumns,rightColumns,data}
  btnInfo: _propTypes["default"].object,
  // 按钮信息
  currentNodeId: _propTypes["default"].string,
  // 当前节点
  processNodes: _propTypes["default"].object,
  //所有节点信息
  applyInfo: _propTypes["default"].object //申请相关信息

};

var _default = (0, _reactRedux.connect)(mapStateToProps)(AuthButton);

exports["default"] = _default;