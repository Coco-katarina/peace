import { basicAction, Request } from '@peace/utils'
import { ApiTable } from '$utils'

export const THINGS_LIST_REQUEST = "THINGS_LIST_REQUEST";
export const THINGS_LIST_SUCCESS = "THINGS_LIST_SUCCESS";
export const THINGS_LIST_FAILURE = "THINGS_LIST_FAILURE";
export function getThingsList(id) {
    return dispatch => {
        const url = ApiTable.getStructsList.replace('{organizationId}', id)
        dispatch({ type: THINGS_LIST_REQUEST });
        return Request.get(url)
            .then(res => dispatch({
                type: THINGS_LIST_SUCCESS,
                payload: { list: res }
            })
                , error => dispatch({
                    type: THINGS_LIST_FAILURE,
                    payload: { error: error },
                    error: '获取监测对象失败'
                }));
    }
}

export const THINGS_DELETE_REQUEST = "THINGS_DELETE_REQUEST";
export const THINGS_DELETE_SUCCESS = "THINGS_DELETE_SUCCESS";
export const THINGS_DELETE_FAILURE = "THINGS_DELETE_FAILURE";

export function deleteStruct(struId) {
    return dispatch => {
        dispatch({ type: THINGS_DELETE_REQUEST });
        let url = ApiTable.deleteStruct.replace("{struId}", struId);
        return Request.get(url).then(
            res => {
                dispatch({
                    type: THINGS_DELETE_SUCCESS,
                    done: "监测对象删除成功"
                });
            },
            error =>
                dispatch({
                    type: THINGS_DELETE_FAILURE,
                    payload: { error: error },
                    error: "监测对象删除失败"
                })
        );
    };
}

export const THINGS_GET_WHOLEVIEW = "THINGS_GET_WHOLEVIEW";
export const THINGS_GET_WHOLEVIEW_SUCCESS = "THINGS_GET_WHOLEVIEW_SUCCESS";
export const THINGS_GET_WHOLEVIEW_ERROR = "THINGS_GET_WHOLEVIEW_ERROR";
export function getStructDeviceOverviews(structures) {
    return dispatch => {
        const url = ApiTable.getStructDeviceOverviews.replace("{structures}", structures);
        dispatch({ type: THINGS_GET_WHOLEVIEW });
        return Request.get(url).then(res => dispatch({
            type: THINGS_GET_WHOLEVIEW_SUCCESS,
            payload: res
        }), error => dispatch({
            type: THINGS_GET_WHOLEVIEW_ERROR,
            payload: { error: error },
            error: "获取结构物总览信息失败！"
        }));
    };
}

export function getStructTypes() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_GET_STRUCT_TYPES',
        url: ApiTable.getStructTypes,
        msg: {
            error: '获取结构物类型失败'
        },
        reducer: {
            name: 'structTypes'
        }
    });
}