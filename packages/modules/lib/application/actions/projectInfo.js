'use strict'

import { ApiTable } from '$utils';
import { basicAction, Request } from '@peace/utils';

export function getProjectList(userId, resourceControl) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_PROJECT_LIST',
        url: ApiTable.getProjects.replace('{userId}', userId) + (resourceControl ? '?resourceControl=true' : ''),
        msg: {
            error: '获取项目信息失败'
        },
    });
}

export function getPubProjectList(userId) {
    return (dispatch) => {
        dispatch(requestProjectList());
        let url = ApiTable.getProjects.replace('{userId}', userId);
        url = url + '?resourceControl=true';
        return Request.get(url)
            .then(res => dispatch(receiveProjectList(res.filter(r => r.status == 4)))
                , error => dispatch(failProjectList(error)));
    }
}

export function addProject(userId, project) {
    return dispatch => basicAction({
        type: 'post',
        data: project,
        dispatch: dispatch,
        actionType: 'ADD_PROJECT',
        url: ApiTable.addProject.replace("{userId}", userId),
        msg: {
            success: '添加项目成功',
            error: '添加项目失败',
        },
    });
}

export function editProjectAccount(projectId, formData) {
    return dispatch => basicAction({
        type: 'put',
        data: formData,
        dispatch: dispatch,
        actionType: 'UPDATE_PROJECT_ACCOUNT',
        url: ApiTable.editProjectAdmin.replace("{projectId}", projectId),
        msg: {
            success: '修改项目管理员密码成功',
            error: '修改项目管理员密码失败'
        },
    });
}

export function deleteProject(projectId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_PROJECT',
        url: ApiTable.deleteProject.replace("{projectId}", projectId),
        msg: {
            success: '删除项目成功',
            error: '删除项目失败'
        },
    });
}

export function editProject(projectId, data) {
    return dispatch => basicAction({
        type: 'put',
        data: data,
        dispatch: dispatch,
        actionType: 'UPDATE_PROJECT',
        url: ApiTable.editProject.replace('{projectId}', projectId),
        msg: {
            success: '项目修改成功',
            error: '项目修改失败'
        },
    });
}

export function applyProject(projectId, data) {
    return dispatch => basicAction({
        type: 'put',
        data: {},
        dispatch: dispatch,
        actionType: 'APPLY_PROJECT',
        url: ApiTable.applyProject.replace('{projectId}', projectId),
        msg: {
            success: '项目申请成功',
            error: '项目申请失败'
        },
    });
}

export function reviewedProject(projectId, data) {
    return dispatch => basicAction({
        type: 'put',
        data: data,
        dispatch: dispatch,
        actionType: 'REVIEWED_PROJECT',
        url: ApiTable.reviewedProject.replace("{projectId}", projectId),

        msg: {
            success: '项目审核成功',
            error: '项目审核失败'
        },
    });
}

export function publishProject(projectId, data) {
    return dispatch => basicAction({
        type: 'post',
        data: data,
        dispatch: dispatch,
        actionType: 'PUBLISH_PROJECT',
        url: ApiTable.publishProject.replace("{projectId}", projectId),
        msg: {
            success: '项目发布成功',
            error: '项目发布失败'
        },
    });
}

export function editProjectUrl(id, newUrl) {
    return dispatch => basicAction({
        type: 'put',
        data: { url: newUrl },
        dispatch: dispatch,
        actionType: 'CHANGE_PROJECT_ID',
        url: ApiTable.editProjectUrl.replace("{projectId}", id),
        msg: {
            success: '修改项目地址成功',
            error: '修改项目地址失败'
        },
    });
}

export const GENERATE_REVIEW_REPORT = 'GENERATE_REVIEW_REPORT'
export function generateReviewReport(sid, from, to) {
    return dispatch => basicAction({
        type: 'put',
        data: { structure: sid, from, to },
        dispatch: dispatch,
        actionType: GENERATE_REVIEW_REPORT,
        url: ApiTable.generateReviewReport,
        msg: {
            success: '已发送生成请求，等待生成',
            error: '生成请求发送失败'
        },
        callback: () => {
            return {
                structureId: sid
            }
        }
    });
}

export function getReviewReport() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REVIEW_REPORT',
        url: ApiTable.getReviewReport,
        reducer: { name: 'reviewReports' },
        msg: {},
    });
}

export function changeProjectEventState(projectId) {
    return dispatch => basicAction({
        type: 'put',
        data: {},
        dispatch: dispatch,
        actionType: 'PROJECT_EVENT_STATE_CHANGE',
        url: ApiTable.changeProjectEventState.replace("{projectId}", projectId),
        msg: {
            success: '事件响应服务状态变更成功',
            error: '事件响应服务状态变更失败'
        },
    });
}

export default {
    getProjectList,
    addProject,
    editProjectAccount,
    editProjectUrl,
    deleteProject,
    editProject,
    applyProject,
    reviewedProject,
    publishProject,
    generateReviewReport,
    getReviewReport,
    changeProjectEventState
};