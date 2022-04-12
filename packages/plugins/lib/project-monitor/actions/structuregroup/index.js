/**
 * Created by ZhouXin on 2018/9/19.
 */
'use strict';
import { Request } from '@peace/utils'
import { ApiTable } from '$utils'

export const STRUCTUREGROUP_LIST_REQUEST = "STRUCTUREGROUP_LIST_REQUEST";
export const STRUCTUREGROUP_LIST_SUCCESS = "STRUCTUREGROUP_LIST_SUCCESS";
export const STRUCTUREGROUP_LIST_FAILURE = "STRUCTUREGROUP_LIST_FAILURE";
export function getStructuregroupList() {
    return dispatch => {
        const url = ApiTable.getStructuregroupList;
        dispatch({ type: STRUCTUREGROUP_LIST_REQUEST });
        return Request.get(url)
            .then(res => dispatch({
                type: STRUCTUREGROUP_LIST_SUCCESS,
                payload: res
            })
                , error => dispatch({
                    type: STRUCTUREGROUP_LIST_FAILURE,
                    payload: { error: error },
                    error: '获取结构物群组失败'
                }));
    }
}

export const STRUCTUREGROUP_ADD_REQUEST = "STRUCTUREGROUP_ADD_REQUEST";
export const STRUCTUREGROUP_ADD_SUCCESS = "STRUCTUREGROUP_ADD_SUCCESS";
export const STRUCTUREGROUP_ADD_FAILURE = "STRUCTUREGROUP_ADD_FAILURE";
export function addStructuregroup(structuregroupData) {
    return dispatch => {
        const url = ApiTable.addStructuregroup;
        dispatch({ type: STRUCTUREGROUP_ADD_REQUEST });
        return Request.post(url, structuregroupData)
            .then(res => dispatch({
                type: STRUCTUREGROUP_ADD_SUCCESS,
                payload: { data: res }
            })
                , error => dispatch({
                    type: STRUCTUREGROUP_ADD_FAILURE,
                    payload: { error: error },
                    error: '新增结构物群组失败'
                }));
    }
}

export const STRUCTUREGROUP_MODIFY_REQUEST = "STRUCTUREGROUP_MODIFY_REQUEST";
export const STRUCTUREGROUP_MODIFY_SUCCESS = "STRUCTUREGROUP_MODIFY_SUCCESS";
export const STRUCTUREGROUP_MODIFY_FAILURE = "STRUCTUREGROUP_MODIFY_FAILURE";
export function modifyStructuregroup(id, structuregroupData) {
    return dispatch => {
        const url = ApiTable.modifyStructuregroup.replace('{structuregroupId}', id);
        dispatch({ type: STRUCTUREGROUP_MODIFY_REQUEST });
        return Request.put(url, structuregroupData)
            .then(res => dispatch({
                type: STRUCTUREGROUP_MODIFY_SUCCESS,
                payload: { data: res },
            })
                , error => dispatch({
                    type: STRUCTUREGROUP_MODIFY_FAILURE,
                    payload: { error: error },
                    error: '修改结构物群组失败'
                }));
    }
}

export const STRUCTUREGROUP_DEL_REQUEST = "STRUCTUREGROUP_DEL_REQUEST";
export const STRUCTUREGROUP_DEL_SUCCESS = "STRUCTUREGROUP_DEL_SUCCESS";
export const STRUCTUREGROUP_DEL_FAILURE = "STRUCTUREGROUP_DEL_FAILURE";
export function delStructuregroup(id) {
    return dispatch => {
        const url = ApiTable.delStructuregroup.replace('{structuregroupId}', id);
        dispatch({ type: STRUCTUREGROUP_DEL_REQUEST });
        return Request.delete(url)
            .then(res => dispatch({
                type: STRUCTUREGROUP_DEL_SUCCESS,
                payload: { data: res },
            })
                , error => dispatch({
                    type: STRUCTUREGROUP_DEL_FAILURE,
                    payload: { error: error },
                    error: '删除结构物群组失败'
                }));
    }
}

export const STRUCTUREGROUP_RELATE_LIST_REQUEST = "STRUCTUREGROUP_RELATE_LIST_REQUEST";
export const STRUCTUREGROUP_RELATE_LIST_SUCCESS = "STRUCTUREGROUP_RELATE_LIST_SUCCESS";
export const STRUCTUREGROUP_RELATE_LIST_FAILURE = "STRUCTUREGROUP_RELATE_LIST_FAILURE";
export function getRelateStructs(id, type) {
    return dispatch => {
        const url = ApiTable.getStructuregroupRelateStructs.replace('{id}', id).replace('{type}', type);
        dispatch({ type: STRUCTUREGROUP_RELATE_LIST_REQUEST });
        return Request.get(url)
            .then(res => dispatch({
                type: STRUCTUREGROUP_RELATE_LIST_SUCCESS,
                payload: res,
            })
                , error => dispatch({
                    type: STRUCTUREGROUP_RELATE_LIST_FAILURE,
                    payload: { error: error },
                    error: '获取结构物群组关联结构物失败'
                }));
    }
}

export const STRUCTUREGROUP_RELATE_REQUEST = "STRUCTUREGROUP_RELATE_REQUEST";
export const STRUCTUREGROUP_RELATE_SUCCESS = "STRUCTUREGROUP_RELATE_SUCCESS";
export const STRUCTUREGROUP_RELATE_FAILURE = "STRUCTUREGROUP_RELATE_FAILURE";
export function saveRelateStructs(id, data) {
    return dispatch => {
        const url = ApiTable.structuregroupRelateStructs.replace('{structuregroupId}', id);
        dispatch({ type: STRUCTUREGROUP_RELATE_REQUEST });
        return Request.post(url, data)
            .then(res => dispatch({
                type: STRUCTUREGROUP_RELATE_SUCCESS,
                payload: res,
            })
                , error => dispatch({
                    type: STRUCTUREGROUP_RELATE_FAILURE,
                    payload: { error: error },
                    error: '结构物群组关联结构物失败'
                }));
    }
}

export const STRUCTUREGROUP_RELATE_DEL_REQUEST = "STRUCTUREGROUP_RELATE_DEL_REQUEST";
export const STRUCTUREGROUP_RELATE_DEL_SUCCESS = "STRUCTUREGROUP_RELATE_DEL_SUCCESS";
export const STRUCTUREGROUP_RELATE_DEL_FAILURE = "STRUCTUREGROUP_RELATE_DEL_FAILURE";
export function delRelateStructs(id, type) {
    return dispatch => {
        const url = ApiTable.delStructuregroupRelateStructs.replace('{id}', id).replace('{type}', type);
        dispatch({ type: STRUCTUREGROUP_RELATE_DEL_REQUEST });
        return Request.delete(url)
            .then(res => dispatch({
                type: STRUCTUREGROUP_RELATE_DEL_SUCCESS,
                payload: { res },
            })
                , error => dispatch({
                    type: STRUCTUREGROUP_RELATE_DEL_FAILURE,
                    payload: { error: error },
                    error: '删除结构物群组关联结构物失败'
                }));
    }
}
