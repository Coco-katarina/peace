"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _antd = require("antd");

var _$components = require("$components");

var _utils = require("@peace/utils");

var _$utils = require("$utils");

var _workflowProcessForm = require("../../actions/workflowProcessForm");

var _user = require("../../actions/user");

var _buttonAuth = require("../buttonAuth");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
})("ccb316fcedd5a6f953b265ed32528c39", ".process-apply{background-color:#fff;box-sizing:border-box}.process-apply_header{width:100%;height:50px;line-height:50px;right:0;background-color:#fff;z-index:999}.process-apply_header-title{font-size:20px;font-weight:700}.process-apply_header-action{text-align:right}.process-apply_header-action .ant-btn{margin-right:15px}.process-apply_card{margin:20px}");

var ProcessApply = function ProcessApply(props) {
  var dispatch = props.dispatch,
      user = props.user,
      location = props.location,
      processData = props.processData,
      successCallBack = props.successCallBack,
      processFormFields = props.processFormFields,
      processId = props.processId;

  var _ref = location && location.state ? location.state : {},
      processInstanceId = _ref.processInstanceId,
      taskDefinitionKey = _ref.taskDefinitionKey,
      taskId = _ref.id;

  var _ref2 = location || {},
      search = _ref2.search;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      processInfo = _useState2[0],
      setProcessInfo = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      formSchema = _useState4[0],
      setFormSchema = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      processNodes = _useState6[0],
      setProcessNodes = _useState6[1];

  var _useState7 = (0, _react.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      startNodeId = _useState8[0],
      setStartNodeId = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      isRequesting = _useState10[0],
      setIsRequesting = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      xFormRef = _useState12[0],
      setXFormRef = _useState12[1];

  var _useState13 = (0, _react.useState)(),
      _useState14 = _slicedToArray(_useState13, 2),
      functionName = _useState14[0],
      setFunctionName = _useState14[1];

  var _useState15 = (0, _react.useState)(null),
      _useState16 = _slicedToArray(_useState15, 2),
      expectTime = _useState16[0],
      setExpectTime = _useState16[1];

  var _useState17 = (0, _react.useState)(null),
      _useState18 = _slicedToArray(_useState17, 2),
      formItemName = _useState18[0],
      setFormItemName = _useState18[1];

  var _useState19 = (0, _react.useState)(),
      _useState20 = _slicedToArray(_useState19, 2),
      parentData = _useState20[0],
      setParentData = _useState20[1];

  var _useState21 = (0, _react.useState)(false),
      _useState22 = _slicedToArray(_useState21, 2),
      hiddenDraft = _useState22[0],
      setHiddenDraft = _useState22[1];

  var submitFormRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    // window.addEventListener('message', function (e) {
    //   if (e && e.data) {
    //     let temp = JSON.parse(e.data);
    //     if (temp.formData) {
    //       setParentData(temp.formData);
    //     }
    //     if (temp.options && temp.options.hiddenDraft) {
    //       setHiddenDraft(temp.options.hiddenDraft)
    //     }
    //   }
    // }, false);
    initInfo(user);
  }, []);

  var initInfo = function initInfo(user) {
    dispatch((0, _user.getCompanyOrganization)(user.companyId));
    dispatch((0, _workflowProcessForm.getProcessFormFields)(processId));
    dispatch((0, _workflowProcessForm.getProcessById)(processId)).then(function (res) {
      if (res.success) {
        var data = res.payload.data;

        if (data.form) {
          var processSchema = null;

          if (data.version && data.version.workflowProcessForm && data.version.workflowProcessForm.formSchema) {
            processSchema = data.version.workflowProcessForm.formSchema;
          }

          setProcessInfo(data);

          if (data.version && data.version.bpmnJson) {
            setProcessNodes(data.version.bpmnJson);

            for (var key in data.version.bpmnJson) {
              var val = data.version.bpmnJson[key];

              if (val.type == 'bpmn:StartEvent') {
                setStartNodeId(key);
              }
            }
          }

          if (processSchema) {
            (0, _$utils.buildFormSchemaByDataSourceUrl)(processSchema, _utils.Request, []).then(function (schema, sourceData) {
              setFormSchema(schema);
              setIsRequesting(false);
            })["catch"](function (err) {
              _antd.message.error('获取表单数据源失败，请重试!');

              setIsRequesting(false);
            });
          }
        }
      } else {
        setIsRequesting(false);
      }
    });

    if (processInstanceId) {
      dispatch((0, _workflowProcessForm.getFlowRecord)({
        procinstId: processInstanceId
      }));
    }
  };

  var btnClick = function btnClick(functionName) {
    setFunctionName(functionName);
    xFormRef.XFormSubmit();
  };

  var onSuccess = function onSuccess(info) {
    if (successCallBack) {
      successCallBack();
      setIsRequesting(false);
    } else if (parent.postMessage) {
      var data = {
        type: 'saveSuccess'
      };
      parent.postMessage(JSON.stringify(data), '*');
    }
  };

  var submitApplyProps = {
    procKey: processInfo && processInfo.version ? processInfo.version.procKey : '',
    params: {
      taskId: taskId,
      processId: processId,
      versionId: processInfo && processInfo.version ? processInfo.version.id : '',
      processName: processInfo ? processInfo.name : '',
      groupName: processInfo ? processInfo.groupName : '',
      node: processNodes && startNodeId ? processNodes[startNodeId].name : '',
      user: {
        id: user && user.id,
        name: user && user.name,
        department: user && user.department
      },
      actionName: '提交申请',
      endAddress: processInfo ? processInfo.endAddress : '',
      syncInterface: processInfo ? processInfo.syncInterface : '',
      expectTime: expectTime,
      formItemName: formItemName,
      procinstVars: processFormFields.filter(function (f) {
        return f.isProcinstVar;
      }).map(function (v) {
        return v.code;
      })
    },
    processNodes: processNodes,
    currentNodeId: startNodeId,
    statusChange: function statusChange(requesting) {
      setIsRequesting(requesting);
    },
    onSucessCallBack: onSuccess
  };

  var onCurrentRef = function onCurrentRef(ref) {
    setXFormRef(ref);
  };

  var handFormSubmit = function handFormSubmit(formData) {
    if (functionName == 'submitApply') {
      submitApply(formData);
    } else {
      saveDraft(formData);
    }
  }; //保存草稿


  var saveDraft = function saveDraft(formData) {
    var dataToSave = {
      processId: processId,
      versionId: processInfo && processInfo.version ? processInfo.version.id : '',
      formData: formData
    };
    dispatch((0, _workflowProcessForm.createProcessDraft)(dataToSave)).then(function (res) {
      if (res.success) {
        _antd.message.success('保存草稿成功');

        onSuccess(); // sucessCallBack({
        //   type: 'draft',
        //   formData: formData
        // });
      } else {
        _antd.message.error('保存草稿失败');
      }
    });
  }; //提交申请


  var submitApply = function submitApply(formData) {
    submitFormRef.current.submit(formData);
  }; // const disabledDate = (current) => {
  //   return current && current < moment().subtract(1, 'days').endOf('day');
  // }
  // const range = (start, end) => {
  //   const result = [];
  //   for (let i = start; i < end; i += 1) {
  //       result.push(i);
  //   }
  //   return result;
  // };
  // const disabledTime = (date) => {
  //     const hours = moment().hours();
  //     const minutes = moment().minutes();
  //     const seconds = moment().seconds();
  //     // 当日只能选择当前时间之后的时间点
  //     if (date && moment(date).date() === moment().date()) {
  //         return {
  //             disabledHours: () => range(0, 24).splice(0, hours),
  //             disabledMinutes: () => range(0, 60).splice(0, minutes + 1),
  //             disabledSeconds: () => range(0, 60).splice(0, seconds + 1)
  //         };
  //     }
  //     return {
  //         disabledHours: () => [],
  //         disabledMinutes: () => [],
  //         disabledSeconds: () => []
  //     };
  // };


  var onDateChange = function onDateChange(date, dateString) {
    setExpectTime(dateString);
  };

  var onInputChange = function onInputChange(e) {
    var value = e.target.value;

    if (!value) {
      setFormItemName(null);
    } else if (value && value.trim() == "") {
      setFormItemName(null);
    } else {
      setFormItemName(value.trim());
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_antd.Spin, {
    spinning: isRequesting
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "process-apply"
  }, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    className: "process-apply_header"
  }, formSchema ? /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 24,
    className: "process-apply_header-action"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "\u4E8B\u9879\u540D\u79F0: "), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
    style: {
      marginRight: 15,
      width: 200
    },
    maxLength: 50,
    defaultValue: processInfo ? processInfo.name : '',
    onChange: onInputChange
  }), /*#__PURE__*/_react["default"].createElement("span", null, "\u671F\u671B\u5B8C\u6210\u65F6\u95F4: "), /*#__PURE__*/_react["default"].createElement(_antd.DatePicker, {
    style: {
      marginRight: 15
    },
    format: "YYYY-MM-DD HH:00:00" //disabledDate={disabledDate}
    ,
    showTime: {
      format: 'HH'
    },
    onChange: onDateChange
  }), hiddenDraft ? '' : /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    onClick: function onClick() {
      return btnClick('saveDraft');
    }
  }, "\u4FDD\u5B58\u8349\u7A3F"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    onClick: function onClick() {
      return btnClick('submitApply');
    }
  }, "\u63D0\u4EA4\u7533\u8BF7"), /*#__PURE__*/_react["default"].createElement(_buttonAuth.SubmitApply, _extends({
    ref: submitFormRef
  }, submitApplyProps))) : ''), /*#__PURE__*/_react["default"].createElement("div", {
    className: "process-apply_form"
  }, formSchema ? /*#__PURE__*/_react["default"].createElement(_$components.ProcessForm, {
    formSchema: _objectSpread(_objectSpread({}, formSchema), {}, {
      formData: _objectSpread(_objectSpread({}, formSchema.formData), parentData)
    }),
    isRequesting: true,
    onCurrentRef: onCurrentRef // extFormSchema={extFormSchema}
    // extType={`frist`}
    // listItemTitles={listItemTitles}
    ,
    currentNode: startNodeId,
    onFormSubmit: handFormSubmit // onCancel={this.handFormCancel}

  }) : !isRequesting && /*#__PURE__*/_react["default"].createElement(_$components.NoResource, {
    title: Number(processId) > 0 ? '未查询到该流程的表单' : '未查询到该流程'
  }))));
};

function mapStateToProps(state) {
  var companyOrganization = state.companyOrganization,
      auth = state.auth,
      flowRecord = state.flowRecord,
      processFormFields = state.processFormFields;
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
            user.departments.map(function (a) {
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
              department: departmentsName
            });
          }
        });
      }
    });
  }

  return {
    user: auth.user,
    flowRecord: flowRecord.data || [],
    processFormFields: processFormFields && processFormFields.data || [],
    userList: userList
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(ProcessApply);

exports["default"] = _default;