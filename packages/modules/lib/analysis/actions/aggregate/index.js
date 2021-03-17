import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';
import * as T from '../../constants';

export function getAggConfig(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.AggconfigGetTypes,
        url: ApiTable.getAggregate.replace('{structId}', parseInt(structId)),
        msg: {
            option: '查询聚集配置'
        },
        reducer: {
            name: 'aggreateList'
        }
    });
}
export function postAggConfig(data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: T.AggconfigPostTypes,
        url: ApiTable.addAggregate,
        data: data,
        msg: {
            option: '新增聚集配置'
        },
    });
}
export function putAggConfig(id, data) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: T.AggconfigPutTypes,
        url: ApiTable.modifyAggreate.replace('{id}', id),
        data: data,
        msg: {
            option: '修改聚集配置'
        },
    });
}

export function delAggConfig(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: T.AggconfigDelTypes,
        url: ApiTable.delAggreate.replace('{id}', id),
        msg: {
            option: '删除聚集配置'
        },
    });
}
export function execAgg(data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: T.ExecAggTypes,
        url: ApiTable.execAggregate,
        data: data,
        msg: {
            option: '立即执行请求发送'
        },
    });
}