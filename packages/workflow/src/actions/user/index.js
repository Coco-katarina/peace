import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getUserInfo(token) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_USERINFO_BY_TOKEN',
        url: `${ApiTable.getUserInfoByTokenUrl}?token=${token}`,
        msg: { error: '获取应用列表失败' },
        reducer: { name: 'userInfo' }
    });
}

export function getButtonAuth() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_BUTTON_AUTH',
        url: ApiTable.getDataDictionaryUrl.replace('{model}', 'WorkflowButtonAuth'),
        msg: { error: '获取按钮列表失败' },
        reducer: { name: 'buttonAuth' }
    });
}

//获取全部用户
export function getCompanyUsers(companyId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_COMPANY_USERS',
        url: ApiTable.getUser.replace('{companyId}', companyId),
        msg: { error: '获取公司用户信息失败' },
        reducer: { name: 'companyUsers' }
    });
}

export function getCompanyOrganization(companyId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_COMPANY_ORG',
        url: ApiTable.getCompanyOrganization.replace('{companyId}', companyId),
        msg: { error: '获取组织信息失败' },
        reducer: { name: 'companyOrganization' }
    });
}
export default {
    getUserInfo,
    getButtonAuth,
    getCompanyUsers,
    getCompanyOrganization
}