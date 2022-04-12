import { basicAction, RouteRequest } from '@peace/utils';
import { DataServiceApiTable } from '../constant';
import { ApiTable } from '$utils'

export function getStaticFiles (strucId) {
    const url = DataServiceApiTable.getStaticFiles + (strucId ? '?strucId=' + strucId : '')
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STATIC_FILES',
        url: url,
        msg: {
            error: '获取文件失败'
        },
        reducer: {
            name: 'staticFiles'
        }
    })
}

export default {
    getStaticFiles,
}