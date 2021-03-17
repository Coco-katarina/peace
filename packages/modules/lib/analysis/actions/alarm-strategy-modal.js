import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

//projectInfo
export const STRATEGY_PROJECT_LIST_REQUEST = 'STRATEGY_PROJECT_LIST_REQUEST';
export const STRATEGY_PROJECT_LIST_SUCCESS = 'STRATEGY_PROJECT_LIST_SUCCESS';
export const STRATEGY_PROJECT_LIST_FAILURE = 'STRATEGY_PROJECT_LIST_FAILURE';

export function getProjectList(userId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'STRATEGY_PROJECT_LIST',
        url: ApiTable.getProjects.replace("{userId}", userId),
        msg: {
            error: '获取项目信息失败'
        },
        reducer: {
            name: 'analysisStrategyProjectList'
        }
    });
}

export const RECEIVER_LIST_REQUEST = 'RECEIVER_LIST_REQUEST';
export const RECEIVER_LIST_SUCCESS = 'RECEIVER_LIST_SUCCESS';
export const RECEIVER_LIST_FAILURE = 'RECEIVER_LIST_FAILURE';

export function getReceiverList(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'STRATEGY_RECEIVER_LIST',
        url: ApiTable.getEnterprisesMembers.replace("{enterpriseId}", id),
        msg: {
            error: '获取接收人信息失败'
        },
        reducer: {
            name: 'analysisStrategyReceiverList'
        }
    });

}

export function getStructsList(orgId, idArr = []) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'STRUCTS_LIST',
        url: ApiTable.getStructsList.replace("{organizationId}", orgId) + `?projects=${idArr.join(",")}`,
        msg: {
            error: '获取结构物信息失败'
        },
        reducer: {
            name: 'analysisStructsList'
        }
    });
}

export default {
    getProjectList,
    getReceiverList,
    getStructsList
}


