/**Created by Zhouxin on 2018/10/11. */
'use strict';
import { Request } from '@peace/utils'
import { ApiTable } from '$utils'
import { basicAction } from '@peace/utils';
export const AGGCONFIG_LIST_REQUEST = 'AGGCONFIG_LIST_REQUEST';
export const AGGCONFIG_LIST_SUCCESS = 'AGGCONFIG_LIST_SUCCESS';
export const AGGCONFIG_LIST_FAILURE = 'AGGCONFIG_LIST_FAILURE';
// export function getAggConfig(structId) {
//     return dispatch => {
//         const url = ApiTable.getAggregate.replace('{structId}', parseInt(structId));
//         dispatch({ type: AGGCONFIG_LIST_REQUEST });

//         return Request.get(url)
//             .then(res => dispatch({
//                 type: AGGCONFIG_LIST_SUCCESS,
//                 payload: res
//             }), error => dispatch({
//                 type: AGGCONFIG_LIST_FAILURE,
//                 payload: { error: error },
//                 error: '获取聚集配置失败'
//             }));
//     }
// }

export const AGGCONFIG_ADD_REQUEST = 'AGGCONFIG_ADD_REQUEST';
export const AGGCONFIG_ADD_SUCCESS = 'AGGCONFIG_ADD_SUCCESS';
export const AGGCONFIG_ADD_FAILURE = 'AGGCONFIG_ADD_FAILURE';
export function addAggConfig(data) {
    return dispatch => {
        const url = ApiTable.addAggregate;
        dispatch({ type: AGGCONFIG_ADD_REQUEST });

        return Request.post(url, data)
            .then(res => dispatch({
                type: AGGCONFIG_ADD_SUCCESS,
                payload: res
            }), error => dispatch({
                type: AGGCONFIG_ADD_FAILURE,
                payload: { error: error },
                error: '新增聚集配置失败'
            }));
    }
}
export const AGGCONFIG_MODIFY_REQUEST = 'AGGCONFIG_MODIFY_REQUEST';
export const AGGCONFIG_MODIFY_SUCCESS = 'AGGCONFIG_MODIFY_SUCCESS';
export const AGGCONFIG_MODIFY_FAILURE = 'AGGCONFIG_MODIFY_FAILURE';
export function modifyAggConfig(id, data) {
    return dispatch => {
        const url = ApiTable.modifyAggreate.replace('{id}', id);
        dispatch({ type: AGGCONFIG_MODIFY_REQUEST });

        return Request.put(url, data)
            .then(res => dispatch({
                type: AGGCONFIG_MODIFY_SUCCESS,
                payload: res
            }), error => dispatch({
                type: AGGCONFIG_MODIFY_FAILURE,
                payload: { error: error },
                error: '修改聚集配置失败'
            }));
    }
}

export const AGGCONFIG_DEL_REQUEST = 'AGGCONFIG_DEL_REQUEST';
export const AGGCONFIG_DEL_SUCCESS = 'AGGCONFIG_DEL_SUCCESS';
export const AGGCONFIG_DEL_FAILURE = 'AGGCONFIG_DEL_FAILURE';
export function delAggConfig(id) {
    return dispatch => {
        const url = ApiTable.delAggreate.replace('{id}', id);
        dispatch({ type: AGGCONFIG_DEL_REQUEST });

        return Request.delete(url)
            .then(res => dispatch({
                type: AGGCONFIG_DEL_SUCCESS,
                payload: res
            }), error => dispatch({
                type: AGGCONFIG_DEL_FAILURE,
                payload: { error: error },
                error: '删除聚集配置失败'
            }));
    }
}

export const AGGCONFIG_EXEC_SUCCESS = "AGGCONFIG_EXEC_SUCCESS";
export const AGGCONFIG_EXEC_ERROR = "AGGCONFIG_EXEC_ERROR";
export function execAgg(data) {
    return dispatch => {
        const url = ApiTable.execAggregate;

        return Request.post(url, data)
            .then(res => {
                return dispatch({
                    type: AGGCONFIG_EXEC_SUCCESS,
                    done: '立即执行请求发送成功'
                })
            }, err => {
                return dispatch({
                    type: AGGCONFIG_EXEC_ERROR,
                    error: '立即执行请求发送失败'
                });
            });
    }
}