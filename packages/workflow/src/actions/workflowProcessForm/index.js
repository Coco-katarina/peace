'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getProcessFormSystemFields(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'PROCESS_FORM_SYSTEM_FIELDS',
        url: ApiTable.getProcessFormSystemFieldsUrl.replace('{processId}', id),
        msg: { error: '获取当前流程表单系统字段失败' },
        reducer: { name: 'processSystemFields' }
    });
}
export function getProcessFormFields(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'PROCESS_FORM_FIELDS',
        url: ApiTable.getFormFieldsUrl.replace('{processId}', id),
        msg: { error: '获取当前流程表单系统字段失败' },
        reducer: { name: 'processFormFields' }
    });
}
export function getProcessById(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'PROCESS_BY_ID',
        url: ApiTable.getProcessByIdUrl.replace('{processId}', id),
        msg: { error: '获取当前流程配置失败' },
        reducer: { name: 'processInfo' }
    });
}
export function getWorkflowProcessByProcinstId(query) {
    return dispatch => basicAction({
        type: 'get',
        query: query,
        dispatch: dispatch,
        actionType: 'GET_PROCESS_BY_PROCINSTID',
        url: ApiTable.getWorkflowProcessByProcinstIdUrl,
        msg: { error: '获取指定流程数据失败' },
    });
}
export function getFlowRecord(query) {
    return dispatch => basicAction({
        type: 'get',
        query: query,
        dispatch: dispatch,
        actionType: 'GET_FLOW_RECORD',
        url: ApiTable.getFlowRecordUrl,
        msg: { error: '获取审批意见失败' },
        reducer: { name: 'flowRecord' }
    });
}
export function getHistoryProcessById(id, params) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        query: params,
        actionType: 'PROCESS_BY_ID',
        url: ApiTable.getHistoryProcessByIdUrl.replace('{processId}', id),
        msg: { error: '获取当前流程配置失败' },
        reducer: { name: 'processHistoryInfo' }
    });
}
export function getProcessPageConfig(processId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_PROCESS_PAGE_CONFIG',
        url: ApiTable.getProcessPageConfig.replace('{processId}', processId),
        msg: { error: '获取流程页面配置失败' },
        reducer: {
            name: 'processPageConfig'
        }
    });
}

export function postAuditActions(params, actionName) {

    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        data: params,
        actionType: 'POST_AUDIT_ACTION',
        url: ApiTable.getApprovalActionUrl.replace('{type}', actionName),
        msg: { option: '审批操作' },
    });
}

export function createProcessDraft(params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'CREATE_PROCESS_DRAFT',
        url: ApiTable.createProcessDraftUrl,
        msg: { error: '新增草稿失败' },
    });
}
export function submitProcessApply(key, params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'SUBMIT_PROCESS_APPLY',
        url: ApiTable.submitProcessApplyUrl.replace('{key}', key),
        msg: { error: '提交申请失败' },
    });
}
export default {
    getProcessFormSystemFields,
    getProcessFormFields,
    getProcessById,
    getWorkflowProcessByProcinstId,
    getFlowRecord,
    getHistoryProcessById,
    getProcessPageConfig,
    postAuditActions,
    createProcessDraft,
    submitProcessApply
}