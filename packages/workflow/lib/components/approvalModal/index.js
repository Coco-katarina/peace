'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _antd = require("antd");

var _$components = require("$components");

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("@peace/utils");

var _index = require("../../actions/index");

var _$utils = require("$utils");

var _authButton = _interopRequireDefault(require("../buttonAuth/authButton"));

var _excluded = ["processInstanceId", "taskDefinitionKey", "id", "variables"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
})("b3218c36d4491c93a4029da0b5aee544", ".process-approval{background-color:#fff;min-height:100vh;box-sizing:border-box}.process-approval_header{position:fixed;width:100%;height:50px;line-height:50px;right:0;background-color:#fff;z-index:999}.process-approval_header-title{font-size:20px;font-weight:700}.process-approval_header-action{text-align:right}.process-approval_header-action .ant-btn{margin-right:15px}.process-approval_card{margin:20px}.process-approval_form{padding-top:50px}");

var ApprovalModal = function ApprovalModal(props) {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      processInfo = _useState2[0],
      setProcessInfo = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      processNodes = _useState4[0],
      setProcessNodes = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      formSchema = _useState6[0],
      setFormSchema = _useState6[1];

  var _useState7 = (0, _react.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      formData = _useState8[0],
      setFormData = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      isRequesting = _useState10[0],
      setIsRequesting = _useState10[1];

  var _ref = props.processData || {},
      processInstanceId = _ref.processInstanceId,
      taskDefinitionKey = _ref.taskDefinitionKey,
      taskId = _ref.id,
      variables = _ref.variables,
      extInfo = _objectWithoutProperties(_ref, _excluded);

  var buttonAuth = props.buttonAuth,
      userList = props.userList,
      user = props.user,
      flowRecord = props.flowRecord,
      dispatch = props.dispatch,
      successCallBack = props.successCallBack;
  var columns = [{
    title: '序号',
    dataIndex: 'id',
    width: 80,
    render: function render(text, record, index) {
      return /*#__PURE__*/_react["default"].createElement("span", null, index + 1);
    }
  }, // {
  //     title: '节点',
  //     dataIndex: 'node',
  //     width: 120,
  // }, 
  {
    title: '处理人',
    dataIndex: 'operator',
    ellipsis: true,
    width: 120
  }, {
    title: '处理操作',
    dataIndex: 'actionName',
    width: 120
  }, {
    title: '处理内容',
    dataIndex: 'operateContent',
    width: 250,
    ellipsis: true
  }, {
    title: '处理时间',
    dataIndex: 'operateAt',
    width: 120,
    render: function render(v, t) {
      return (0, _moment["default"])(v).format('YYYY-MM-DD HH:mm:ss');
    }
  }, {
    title: '处理意见',
    dataIndex: 'comment',
    width: 300,
    render: function render(v, t) {
      return /*#__PURE__*/_react["default"].createElement("div", null, v);
    }
  }];

  var _useState11 = (0, _react.useState)(1),
      _useState12 = _slicedToArray(_useState11, 2),
      actiPage = _useState12[0],
      setActiPage = _useState12[1];

  (0, _react.useEffect)(function () {
    dispatch((0, _index.getButtonAuth)());
    dispatch((0, _index.getCompanyOrganization)(user.companyId));
    dispatch((0, _index.getWorkflowProcessByProcinstId)({
      procinstId: processInstanceId
    })).then(function (res) {
      //setIsRequesting(false);
      if (res.success) {
        var data = res.payload.data;

        if (data && data.form) {
          var processSchema = data.form.formSchema;
          setProcessInfo(data);

          if (data.version && data.version.bpmnJson) {
            setProcessNodes(data.version.bpmnJson);
          }

          if (data.history && data.history.formData) {
            processSchema.formData = data.history.formData;
          }

          if (processSchema) {
            (0, _$utils.buildFormSchemaByDataSourceUrl)(processSchema, _utils.Request, [], 'all').then(function (schema) {
              setIsRequesting(false);
              setFormSchema(schema);
              setFormData(schema.formData);
            })["catch"](function (err) {
              _antd.message.error('获取表单数据源失败，请重试!');
            });
          }
        }
      } else {
        setIsRequesting(false);
      }
    });
    dispatch((0, _index.getFlowRecord)({
      procinstId: processInstanceId
    }));
  }, []);

  var onPageChange = function onPageChange(e) {
    setActiPage(e);
  };

  var tableChange = function tableChange(pagination) {
    console.log(pagination);
  };

  var formChange = function formChange(data) {
    setFormData(data);
  };

  var noticecolumns = [{
    dataIndex: 'id',
    key: 'id',
    title: '序号',
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
  return /*#__PURE__*/_react["default"].createElement(_antd.Spin, {
    spinning: isRequesting
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "process-approval"
  }, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    className: "process-approval_header"
  }, formSchema ? /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 24,
    className: "process-approval_header-action"
  }, buttonAuth.map(function (v) {
    var btnProps = {
      noticeData: {
        leftColumns: noticecolumns,
        rightColumns: noticecolumns,
        data: userList
      },
      btnInfo: _objectSpread({}, v),
      currentNodeId: taskDefinitionKey,
      processNodes: processNodes,
      applyInfo: _objectSpread(_objectSpread({}, extInfo), {}, {
        procinstId: processInstanceId,
        taskId: taskId,
        applyUser: processInfo.history.applyUser,
        variables: variables,
        endAddress: processInfo.endAddress
      }),
      onSucessCallBack: function onSucessCallBack() {
        if (successCallBack) {
          successCallBack();
        }
      }
    };
    return /*#__PURE__*/_react["default"].createElement(_authButton["default"], _extends({}, btnProps, {
      key: v.functionName
    }));
  })) : ''), /*#__PURE__*/_react["default"].createElement("div", {
    className: "process-approval_form"
  }, formSchema ? /*#__PURE__*/_react["default"].createElement(_$components.ProcessForm, {
    formSchema: formSchema,
    isRequesting: true,
    currentNode: taskDefinitionKey,
    onChange: formChange
  }) : !isRequesting && /*#__PURE__*/_react["default"].createElement(_$components.NoResource, {
    title: "\u672A\u67E5\u8BE2\u5230\u8BE5\u6D41\u7A0B\u7684\u8868\u5355"
  })), /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    title: "\u5904\u7406\u8BE6\u60C5",
    className: "process-approval_card"
  }, /*#__PURE__*/_react["default"].createElement(_antd.Table, {
    columns: columns,
    bordered: true,
    dataSource: flowRecord
  }))));
};

function mapStateToProps(state) {
  var buttonAuth = state.buttonAuth,
      companyOrganization = state.companyOrganization,
      auth = state.auth,
      flowRecord = state.flowRecord;
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
    user: JSON.parse(sessionStorage.getItem('user')),
    buttonAuth: buttonAuth.data || [],
    userList: userList,
    flowRecord: flowRecord.data || []
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(ApprovalModal);

exports["default"] = _default;