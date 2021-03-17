import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';
import * as T from '../constants/index';

function getAbnMethods() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: "GET_ABN_METHODS",
        url: ApiTable.getAbnMethods,
        msg: {
            option: '查询异常识别算法'
        },
        reducer: {
            name: 'abnMethods'
        }
    });
}
function getAbnParamList(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: "GET_ABN_PARAMS",
        url: ApiTable.getAbnParamList.replace('{id}', id),
        msg: {
            option: '查询异常参数配置'
        },
        reducer: {
            name: 'abnParamList'
        }
    });
}
function addAbnParams(id, data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: "ADD_ABN_PARAMS",
        url: ApiTable.getAbnParamList.replace("{id}", id),
        data: data,
        msg: {
            option: '新增异常参数配置'
        },
    });
}
function editAbnParams(id, pushData) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: "EDIT_ABN_PARAMS",
        url: ApiTable.editAbnParams.replace("{id}", id),
        data: pushData,
        msg: {
            option: '修改聚集配置'
        },
    });
}
function deleteAbnParams(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: "DELETE_ABN_PARAMS",
        url: ApiTable.deleteAbnParams.replace("{id}", id),
        msg: {
            option: '删除异常参数配置'
        },
    });
}
function getAbnTaskResult(structId, start, end, pushData) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: "GET_ABNORMAL_TASK_RESULT",
        url: ApiTable.getAbnTaskResult.replace("{structId}", structId).replace("{start}", start).replace("{end}", end),
        data: pushData,
        msg: {
            option: '异常数据对比'
        },
        msgSuccessShow: false,
        reducer: {
            name: "abnCalcState"
        }
    });
}
function getItemAbnResult_int(structId, start, end, pushData) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: T.GetItemAbnResult_int,
        url: ApiTable.getAbnTaskResult.replace("{structId}", structId).replace("{start}", start).replace("{end}", end),
        data: pushData,
        msg: {
            option: '中断数据对比'
        },
        msgSuccessShow: false,
        // reducer: {
        //     name: "abnItemState_int"
        // }
    });
}
function getItemAbnResult_burr(structId, start, end, pushData) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: T.GetItemAbnResult_burr,
        url: ApiTable.getAbnTaskResult.replace("{structId}", structId).replace("{start}", start).replace("{end}", end),
        data: pushData,
        msg: {
            option: '毛刺数据对比'
        },
        msgSuccessShow: false,
        // reducer: {
        //     name: "abnItemState_burr"
        // }
    });
}
function getItemAbnResult_tr(structId, start, end, pushData) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: T.GetItemAbnResult_tr,
        url: ApiTable.getAbnTaskResult.replace("{structId}", structId).replace("{start}", start).replace("{end}", end),
        data: pushData,
        msg: {
            option: '异常趋势数据对比'
        },
        msgSuccessShow: false,
        // reducer: {
        //     name: "abnItemState_tr"
        // }
    });
}
function batchCfgAbnParams(ids, enable) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: "PUT_BATCH_SWITCH",
        url: ApiTable.batchSwitch.replace("{ids}", ids),
        data: enable,
        msg: {
            option: enable.enabled ? '批量启用异常参数配置' : '批量禁用异常参数配置'
        },
    });
}
export {
    getAbnMethods,
    getAbnParamList,
    addAbnParams, editAbnParams, deleteAbnParams,
    getAbnTaskResult, getItemAbnResult_int, getItemAbnResult_burr, getItemAbnResult_tr,
    batchCfgAbnParams
}