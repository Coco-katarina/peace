import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function addDepartment(id, params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'ADD_DEPARTMENT',
        url: ApiTable.addDepartment.replace('{enterpriseId}', id),
        msg: {
            option: '新增部门'
        },
    });
}


export function deleteDepartment(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_DEPARTMENT',
        url: ApiTable.deleteDepartment.replace('{departmentId}', id),
        msg: {
            option: '删除部门'
        },
    });
}


export function modifyDepartment(id, params) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        data:params,
        actionType: 'MODIFY_DEPARTMENT',
        url: ApiTable.modifyDepartment.replace('{departmentId}', id),
        msg: {
            option: '修改部门名称'
        }
    });
}

export function sortDepartment(params) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        data:params,
        actionType: 'SORT_DEPARTMENT',
        url: ApiTable.sortDepartment,
        msg: {
            option: '部门排序'
        }
    });
}


export function sortDepartmentUsers(params) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        data:params,
        actionType: 'SORT_DEPARTMENT_USERS',
        url: ApiTable.sortDepartmentUsers,
        msg: {
            option: '部门用户排序'
        }
    });
}

export function enableMember(id) {
    return dispatch => basicAction({
        type: 'post',
        data: {},
        dispatch: dispatch,
        actionType: 'ENABLE_MEMBER',
        url: ApiTable.enableMember.replace('{memberId}', id),
        msg: {
            option: '启用成员'
        },
    });
}

export function disableMember(id) {
    return dispatch => basicAction({
        type: 'post',
        data: {},
        dispatch: dispatch,
        actionType: 'DIDABLE_MEMBER',
        url: ApiTable.disableMember.replace('{memberId}', id),
        msg: {
            option: '禁用成员'
        },
    });
}


export function addMembers(params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'ADD_MEMBER',
        url: ApiTable.addMember,
        msg: {
            option: '新增成员'
        },
    });
}

export function deleteMember(id,) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_MEMBER',
        url: ApiTable.deleteMember.replace('{memberId}', id),
        msg: {
            option: '删除成员'
        },
    });
}

export function deleteMembers(params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'DELETE_MEMBER_BULK',
        url: ApiTable.deleteMembers,
        msg: {
            option: '批量删除成员'
        },
    });
}

export function modifyMembers(id, params) {
    return dispatch => basicAction({
        type: 'put',
        data: params,
        dispatch: dispatch,
        actionType: 'MODIFY_MEMBER',
        url: ApiTable.modifyMember.replace('{memberId}', id),
        msg: {
            option: '编辑成员'
        },
    });
}

export function modifyDepartmentUsers(depId, params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'MODIFY_DEPARTMENT_USERS',
        url: ApiTable.modifyDepartmentUsers.replace('{depId}', depId),
        msg: {
            option: '修改部门关联用户'
        },
    });
}


