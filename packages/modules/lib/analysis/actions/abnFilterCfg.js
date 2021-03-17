'use strict';

import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';
import * as T from '../constants';

function getAbnFilterMethods() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: "GET_ABNFILTER_METHODS",
        url: ApiTable.getAbnFilterMethods,
        msg: {
            option: '查询算法列表'
        },
        reducer: {
            name: 'abnFilterMethods'
        }
    });
}
function getAbnFilterCfgs(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: "GET_ABNFILTER_CONFIGS",
        url: ApiTable.getAbnFilterCfgs.replace('{id}', structId),
        msg: {
            option: '查询取配置列表'
        },
        reducer: {
            name: 'abnFilterConfig'
        }
    });
}
function createAbnFilterCfg(config) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: "POST_ABNFILTER_CONFIGS",
        url: ApiTable.createAbnFilterCfg,
        data: config,
        msg: {
            option: '新增配置'
        },
    });
}
function updateAbnFilterCfg(id, config) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: "PUT_ABNFILTER_CONFIGS",
        url: ApiTable.updateAbnFilterCfg.replace('{id}', id),
        data: config,
        msg: {
            option: '修改配置'
        },
    });
}
function changeCfgStatus(id, state) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: "PUT_ABNFILTER_CONFIGS_STATUS",
        url: ApiTable.changeCfgStatus.replace('{id}', id),
        data: state,
        msg: {
            option: '修改配置'
        },
    });
}
function deleteAbnFilterCfg(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: "DEL_ABNFILTER_CONFIGS",
        url: ApiTable.deleteAbnFilterCfg.replace('{id}', id),
        msg: {
            option: '删除配置'
        },
    });
}
function getAbnFilterTaskResult(start, end, pushData) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: T.GetAbnFilterResult,
        url: ApiTable.getAbnFilterTaskResult.replace("{start}", start).replace("{end}", end),
        data: pushData,
        msg: {
            option: '查询异常过滤-数据对比'
        },
        msgSuccessShow: false,
        // reducer: {
        //     name: 'abnFilterCalcState'
        // }
    });
}
function updateFilterData(data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: "UPDATE_FILTER_DATA_COMPLETE",
        url: ApiTable.updateFilterData,
        data: data,
        msg: {
            option: '更新数据'
        },
    });
}
function batchAbnFilterCfgs(ids, enable) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: "PUT_BATCH_SWITCH_ABN_FILTER",
        url: ApiTable.batchSwitchAbnFilterCfgs.replace("{ids}", ids),
        data: enable,
        msg: {
            option: enable ? '批量启用异常过滤算法配置' : '批量禁用异常过滤算法配置'
        },
    });
}
export {
    getAbnFilterMethods,
    getAbnFilterCfgs,
    createAbnFilterCfg,
    updateAbnFilterCfg,
    deleteAbnFilterCfg,
    changeCfgStatus,
    getAbnFilterTaskResult,
    updateFilterData,
    batchAbnFilterCfgs
}