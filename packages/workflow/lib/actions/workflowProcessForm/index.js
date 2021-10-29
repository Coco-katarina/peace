'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProcessFormSystemFields = getProcessFormSystemFields;
exports.getProcessFormFields = getProcessFormFields;
exports.getProcessById = getProcessById;
exports.getWorkflowProcessByProcinstId = getWorkflowProcessByProcinstId;
exports.getFlowRecord = getFlowRecord;
exports.getHistoryProcessById = getHistoryProcessById;
exports.getProcessPageConfig = getProcessPageConfig;
exports.postAuditActions = postAuditActions;
exports.createProcessDraft = createProcessDraft;
exports.submitProcessApply = submitProcessApply;
exports["default"] = void 0;

var _utils = require("@peace/utils");

var _$utils = require("$utils");

function getProcessFormSystemFields(id) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      dispatch: dispatch,
      actionType: 'PROCESS_FORM_SYSTEM_FIELDS',
      url: _$utils.ApiTable.getProcessFormSystemFieldsUrl.replace('{processId}', id),
      msg: {
        error: '获取当前流程表单系统字段失败'
      },
      reducer: {
        name: 'processSystemFields'
      }
    });
  };
}

function getProcessFormFields(id) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      dispatch: dispatch,
      actionType: 'PROCESS_FORM_FIELDS',
      url: _$utils.ApiTable.getFormFieldsUrl.replace('{processId}', id),
      msg: {
        error: '获取当前流程表单系统字段失败'
      },
      reducer: {
        name: 'processFormFields'
      }
    });
  };
}

function getProcessById(id) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      dispatch: dispatch,
      actionType: 'PROCESS_BY_ID',
      url: _$utils.ApiTable.getProcessByIdUrl.replace('{processId}', id),
      msg: {
        error: '获取当前流程配置失败'
      },
      reducer: {
        name: 'processInfo'
      }
    });
  };
}

function getWorkflowProcessByProcinstId(query) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      query: query,
      dispatch: dispatch,
      actionType: 'GET_PROCESS_BY_PROCINSTID',
      url: _$utils.ApiTable.getWorkflowProcessByProcinstIdUrl,
      msg: {
        error: '获取指定流程数据失败'
      }
    });
  };
}

function getFlowRecord(query) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      query: query,
      dispatch: dispatch,
      actionType: 'GET_FLOW_RECORD',
      url: _$utils.ApiTable.getFlowRecordUrl,
      msg: {
        error: '获取审批意见失败'
      },
      reducer: {
        name: 'flowRecord'
      }
    });
  };
}

function getHistoryProcessById(id, params) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      dispatch: dispatch,
      query: params,
      actionType: 'PROCESS_BY_ID',
      url: _$utils.ApiTable.getHistoryProcessByIdUrl.replace('{processId}', id),
      msg: {
        error: '获取当前流程配置失败'
      },
      reducer: {
        name: 'processHistoryInfo'
      }
    });
  };
}

function getProcessPageConfig(processId) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      dispatch: dispatch,
      actionType: 'GET_PROCESS_PAGE_CONFIG',
      url: _$utils.ApiTable.getProcessPageConfig.replace('{processId}', processId),
      msg: {
        error: '获取流程页面配置失败'
      },
      reducer: {
        name: 'processPageConfig'
      }
    });
  };
}

function postAuditActions(params, actionName) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'post',
      dispatch: dispatch,
      data: params,
      actionType: 'POST_AUDIT_ACTION',
      url: _$utils.ApiTable.getApprovalActionUrl.replace('{type}', actionName),
      msg: {
        option: '审批操作'
      }
    });
  };
}

function createProcessDraft(params) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'post',
      data: params,
      dispatch: dispatch,
      actionType: 'CREATE_PROCESS_DRAFT',
      url: _$utils.ApiTable.createProcessDraftUrl,
      msg: {
        error: '新增草稿失败'
      }
    });
  };
}

function submitProcessApply(key, params) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'post',
      data: params,
      dispatch: dispatch,
      actionType: 'SUBMIT_PROCESS_APPLY',
      url: _$utils.ApiTable.submitProcessApplyUrl.replace('{key}', key),
      msg: {
        error: '提交申请失败'
      }
    });
  };
}

var _default = {
  getProcessFormSystemFields: getProcessFormSystemFields,
  getProcessFormFields: getProcessFormFields,
  getProcessById: getProcessById,
  getWorkflowProcessByProcinstId: getWorkflowProcessByProcinstId,
  getFlowRecord: getFlowRecord,
  getHistoryProcessById: getHistoryProcessById,
  getProcessPageConfig: getProcessPageConfig,
  postAuditActions: postAuditActions,
  createProcessDraft: createProcessDraft,
  submitProcessApply: submitProcessApply
};
exports["default"] = _default;