import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function addGroupRole(params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'ADD_GROUP_ROLE',
        url: ApiTable.addGroupRoleUrl,
        msg: {
            option: '新增角色组'
        },
    });
}

export function modifyGroupRole(id, params) {
    return dispatch => basicAction({
        type: 'put',
        data: params,
        dispatch: dispatch,
        actionType: 'MODIFY_GROUP_ROLE',
        url: ApiTable.groupRoleUrlById.replace('{groupId}', id),
        msg: {
            option: '编辑角色组'
        },
    });
}

export function deleteGroupRole(id,) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_GROUP_ROLE',
        url: ApiTable.groupRoleUrlById.replace('{groupId}', id),
        msg: {
            option: '删除角色组'
        },
    });
}


export function addRole(params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'ADD_ROLE',
        url: ApiTable.addRoleUrl,
        msg: {
            option: '新增角色'
        },
    });
}

export function modifyRole(id, params) {
    return dispatch => basicAction({
        type: 'put',
        data: params,
        dispatch: dispatch,
        actionType: 'MODIFY__ROLE',
        url: ApiTable.roleUrlById.replace('{roleId}', id),
        msg: {
            option: '编辑角色'
        },
    });
}

export function deleteRole(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_ROLE',
        url: ApiTable.roleUrlById.replace('{roleId}', id),
        msg: {
            option: '删除角色'
        },
    });
}


export function modifyAuthor(roleId, params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'MODIFY_AUTHORLIST',
        url: ApiTable.modifyAuthor.replace('{roleId}', roleId),
        msg: {
            success: '修改权限成功,重新登录后生效',
            error: '修改权限信息失败'
        },
    });
}
export function modifyRoleUsers(roleId, params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'MODIFY_ROLE_USERS',
        url: ApiTable.modifyRoleUsers.replace('{roleId}', roleId),
        msg: {
            option: '修改角色关联用户'
        },
    });
}

export function deleteRoleUsers(roleId,params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'DELETE_ROLE_USERS',
        url: ApiTable.deleteRoleUsers.replace('{roleId}', roleId),
        msg: {
            option: '删除角色关联用户'
        },
    });
}


export function modifyRoleStructures(roleId, params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'MODIFY_ROLE_STRUCTURES',
        url: ApiTable.modifyRoleStructures.replace('{roleId}', roleId),
        msg: {
            option: '修改角色关注结构物'
        },
    });
}



