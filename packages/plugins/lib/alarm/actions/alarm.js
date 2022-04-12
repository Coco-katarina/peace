import { useFsRequest, ApiTable } from '$utils';
import { basicAction, Request } from '@peace/utils';

export function getMyStructList(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_MY_STRUCT_LIST',
        url: `${ApiTable.getStructsList.replace('{organizationId}', orgId)}`,
        msg: { error: '获取结构物列表失败' },
        reducer: { name: 'myStructList' }
    });
}

export function getAlarms(userId, params = {}, data = {}) {
  
    let query =  {
            orderBy: params.orderBy || 'startTime',
            orderDirection: params.orderDirection || 'asc',
            limit: params.limit || 10,
            offset: params.offset || 0
    }
    
    return dispatch =>  basicAction({
                type: 'post',
                data: data,
                query: query,
                msgSuccessShow: false,
                dispatch: dispatch,
                actionType: 'GET_ALARM_LIST',
                url: ApiTable.getAlarms.replace('{userId}', userId),
                msg: {
                    option: '查询告警列表'
                }
            })
    
}

export function getAlarmDetails(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ALARM_DETAILS',
        url: ApiTable.getAlarmDetails.replace('{alarmId}', id),
        msg: {
            option: '查询告警详细'
        }
    })
}

export function checkAlarm(params) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: 'PUT_ALARM_CHECK',
        url: ApiTable.modifyAlarmChecked,
        data: params,
        msg: {
            option: '确认告警'
        }
    })
}

export function getStrategy(id) {
    
    return dispatch =>  basicAction({
                type: 'get',
                dispatch: dispatch,
                actionType: 'GET_ALARM_STRATEGY',
                url: ApiTable.getStrategy.replace('{id}',id),
                msg: {
                    error: '获取告警策略失败'
                }
            })
    
}
export function getAuthorList(orgId, user) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_AUTHOR',
        url: ApiTable.getEnterprisesMembers.replace('{enterpriseId}', orgId),
        msg: {
            error: '获取部门用户信息失败'
        },
        reducer: {
            name: 'authorData',
            params: {
                noClear: true
            }
        },
        callback: (res => {
            if (user && user.departmentName && user.departmentName != '默认') {
                return res.filter(m => m.departmentName == user.departmentName);
            } else {
                if (res.length && res[0].departmentName != '默认') {
                    let defaultIndex = res.findIndex(r => r.departmentName == '默认');
                    if (defaultIndex > 0) {
                        let defaultDep = res[defaultIndex]
                        res.splice(defaultIndex, 1)
                        res.unshift(defaultDep)
                    }
                }
                return res
            }
        })
    });
}

export function addStrategy(id, strategyData) {
    return dispatch => basicAction({
        type: 'post',
        data: strategyData,
        dispatch,
        actionType: 'ADD_ALARM_STRATEGY',
        url: ApiTable.getStrategy.replace("{id}", id),
        msg: {
            option: '新增告警策略'
        }
    });
   
}
export function editStrategy(id, strategyData) {
    return dispatch => basicAction({
        type: 'put',
        data: strategyData,
        dispatch,
        actionType: 'EDIT_ALARM_STRATEGY',
        url: ApiTable.editStrategy.replace("{id}", id),
        msg: {
            option: '修改告警策略'
        }
    });

}

export function deleteStrategy(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_ALARM_STRATEGY',
        url: ApiTable.deleteStrategy.replace("{id}", id),
        msg: {
            option: '删除告警策略'
        },
    });
}


export default {
    getAlarms,
    getAlarmDetails,
    getMyStructList,
    checkAlarm,
    getStrategy,
    getAuthorList,
    addStrategy,
    editStrategy,
    deleteStrategy
}