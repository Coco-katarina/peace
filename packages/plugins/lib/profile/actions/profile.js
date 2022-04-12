import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getProfile(userId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_PROFILE',
        url: ApiTable.getUserInfo.replace('{userId}', userId),
        msg: { error: '获取用户信息失败' },
        reducer: {
            name: 'profile'
        }
    });
}

export function editProfile(userId, params, type) {
    return dispatch => basicAction({
        type: 'put',
        data: params,
        dispatch: dispatch,
        actionType: 'EDIT_PROFILE',
        url: ApiTable.modifyUserInfo.replace('{userId}', userId).replace('{type}', type || 'phone'),
        msg: { option: '更新个人信息' },
    });
}

export function editpassword(userId, params) {
    return dispatch => basicAction({
        type: 'put',
        data: params,
        dispatch: dispatch,
        actionType: 'EDIT_PASSWORD',
        url: ApiTable.modifyPassWord.replace('{userId}', userId),
        msg: { option: '更新密码' },
    });
}

export function editName(userId, params) {
    return dispatch => basicAction({
        type: 'put',
        data: params,
        dispatch: dispatch,
        actionType: 'EDIT_NAME',
        url: ApiTable.modifyName.replace('{userId}', userId),
        msg: { option: '修改姓名' },
    });
}

export function modifyEmailEnable(userId) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'MODIFY_EMAILENABLE',
        url: ApiTable.modifyEmailEnable.replace('{userId}', userId),
        msg: { option: '启用邮件通知' },
    });
}

export function modifyEmailDisable(userId) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'MODIFY_EMAILDISABLE',
        url: ApiTable.modifyEmailDisable.replace('{userId}', userId),
        msg: { option: '禁用邮件通知' },
    });
}

export function modifySmsEnable(userId) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'MODIFY_SMSENABLE',
        url: ApiTable.modifySmsEnable.replace('{userId}', userId),
        msg: { option: '启用短信通知' },
    });
}

export function modifySmsDisable(userId) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'MODIFY_SMSDISABLE',
        url: ApiTable.modifySmsDisable.replace('{userId}', userId),
        msg: { option: '禁用短信通知' },
    });
}

export function midifyDndEnable(userId) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'MIDIFY_DNDENABLE',
        url: ApiTable.midifyDndEnable.replace('{userId}', userId),
        msg: { option: '开启免打扰' },
    });
}

export function modifyDndDisable(userId) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'MIDIFY_DNDDISABLE',
        url: ApiTable.modifyDndDisable.replace('{userId}', userId),
        msg: { option: '关闭免打扰' },
    });
}

export default {
    getProfile, editProfile, editpassword, editName, modifyEmailEnable, modifyEmailDisable, modifySmsEnable, modifySmsDisable, midifyDndEnable, modifyDndDisable
}