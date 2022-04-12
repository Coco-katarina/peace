import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getSystemLog(params) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_SYSTEM_LOG',
        url: ApiTable.getSystemLog,
        query: params,
        msg: {
            error: '获取系统日志失败'
        },
        reducer: {
            name: 'sysLogs'
        }
    });
}

export default {
    getSystemLog
}