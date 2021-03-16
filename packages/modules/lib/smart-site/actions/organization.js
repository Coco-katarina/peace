'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

function getInstitutions(userId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_INSTITUTION',
        url: ApiTable.getInstitution.replace('{userId}', userId),
        msg: {
            error: '机构获取失败'
        },
        reducer: {
            name: 'institutions'
        }
    }); 
}

function getInstitutionsRoles() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_INSTITUTION_ROLE',
        url: ApiTable.getInstitutionRole,
        msg: {
            error: '机构角色获取失败'
        },
        reducer: {
            name: 'institutionRoles'
        }
    });
}

function addInstitution(userId,data) {
    return dispatch => basicAction({
        type: 'post',
        data: data,
        dispatch: dispatch,
        actionType: 'ADD_INSTITUTION',
        url: ApiTable.addInstitution.replace('{userId}',userId),
        msg: {
            option: '新增机构'
        },
    });
}

function modifyInstitution(id, data) {
    return dispatch => basicAction({
        type: 'put',
        data: data,
        dispatch: dispatch,
        actionType: 'MODIFY_INSTITUTION',
        url: ApiTable.updateInstitution.replace('{institutionId}', id),
        msg: {
            option: '修改机构'
        },
    });
}

function deleteInstitution(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_INSTITUTION',
        url: ApiTable.deleteInstitution.replace('{institutionId}', id),
        msg: {
            option: '删除机构'
        },
    });
}
export {
    getInstitutions,
    getInstitutionsRoles,
    addInstitution,
    modifyInstitution,
    deleteInstitution
}
