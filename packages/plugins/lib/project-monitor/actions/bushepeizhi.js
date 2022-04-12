'use strict'
import { basicAction, Request } from '@peace/utils'
import { ApiTable } from '$utils'

//structFactorList
export const STRUCT_FACTOR_LIST_REQUEST = 'STRUCT_FACTOR_LIST_REQUEST';
export const STRUCT_FACTOR_LIST_SUCCESS = 'STRUCT_FACTOR_LIST_SUCCESS';
export const STRUCT_FACTOR_LIST_FAILURE = 'STRUCT_FACTOR_LIST_FAILURE';

// export function getStructFactorList(structId) {
//     return dispatch => basicAction({
//         type: 'get',
//         dispatch: dispatch,
//         actionType: 'STRUCT_FACTOR_LIST',
//         url: ApiTable.getStructFactorList.replace('{structureId}', structId),
//         msg: {
//             error: '获取结构物监测因素失败'
//         },
//         reducer: {
//             name: 'structFactorList'
//         }
//     });
// }

//addStructFactors
export const ADD_FACTOR_REQUEST = 'ADD_FACTOR_REQUEST';
export const ADD_FACTOR_SUCCESS = 'ADD_FACTOR_SUCCESS';
export const ADD_FACTOR_FAILURE = 'ADD_FACTOR_FAILURE';
export function addStructFactors(structId, factorIds) {
    return dispatch => basicAction({
        type: 'put',
        data: factorIds,
        dispatch: dispatch,
        actionType: 'ADD_FACTOR',
        url: ApiTable.addStructFactors.replace('{structureId}', structId),
        msg: {
            option: '保存'
        }
    });
}

//factorDevicesFormulaList
export const FACTOR_DEVICE_FORMULA_LIST_REQUEST = 'FACTOR_DEVICE_FORMULA_LIST_REQUEST';
export const FACTOR_DEVICE_FORMULA_LIST_SUCCESS = 'FACTOR_DEVICE_FORMULA_LIST_SUCCESS';
export const FACTOR_DEVICE_FORMULA_LIST_FAILURE = 'FACTOR_DEVICE_FORMULA_LIST_FAILURE';

export function getFactorDeviceFormulaList(structureId, factorId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'FACTOR_DEVICE_FORMULA_LIST',
        url: ApiTable.getFactorDevice.replace('{structureId}', structureId).replace('{factorId}', factorId),
        msg: {
            error: '获取组合计算公式失败'
        },
        reducer: {
            name: 'factorDeviceFormulaList'
        }
    });

}

//groupTypeFactor
export const GROUP_TYPE_FACTOR_REQUEST = 'GROUP_TYPE_FACTOR_REQUEST';
export const GROUP_TYPE_FACTOR_SUCCESS = 'GROUP_TYPE_FACTOR_SUCCESS';
export const GROUP_TYPE_FACTOR_FAILURE = 'GROUP_TYPE_FACTOR_FAILURE';

export function getGroupTypeFactor(factorId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GROUP_TYPE_FACTOR',
        url: ApiTable.getPointGroupType.replace('{factorId}', factorId),
        msg: {
            error: '获取分组列表失败'
        },
        reducer: {
            name: 'getGroupTypeFactor'
        }
    });

}

//pointInfoSave
export const SAVE_POINTS_INFO_REQUEST = 'SAVE_POINTS_INFO_REQUEST';
export const SAVE_POINTS_INFO_SUCCESS = 'SAVE_POINTS_INFO_SUCCESS';
export const SAVE_POINTS_INFO_FAILURE = 'SAVE_POINTS_INFO_FAILURE';
export function savePointInfo(structureId, pointInfo) {
    return dispatch => basicAction({
        type: 'post',
        data: pointInfo,
        dispatch: dispatch,
        actionType: 'SAVE_POINTS_INFO',
        url: ApiTable.addStructPoints.replace('{structureId}', structureId),
        msg: {
            option: '保存测点'
        }
    });

}

//modifyPointInfo
export const UPDATE_POINT_REQUEST = 'UPDATE_POINT_REQUEST';
export const UPDATE_POINT_SUCCESS = 'UPDATE_POINT_SUCCESS';
export const UPDATE_POINT_FAILURE = 'UPDATE_POINT_FAILURE';

export function modifyPointInfo(stationId, pointInfo) {
    return dispatch => basicAction({
        type: 'put',
        data: pointInfo,
        dispatch: dispatch,
        actionType: 'UPDATE_POINT',
        url: ApiTable.modifyStructPoints.replace('{stationId}', stationId),
        msg: {
            option: '修改测点'
        }
    });
}

//deletePointInfo
export const DELETE_POINT_REQUEST = 'DELETE_POINT_REQUEST';
export const DELETE_POINT_SUCCESS = 'DELETE_POINT_SUCCESS';
export const DELETE_POINT_FAILURE = 'DELETE_POINT_FAILURE';
export function deletePointInfo(stationId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'SAVE_POINTS_INFO',
        url: ApiTable.deleteStructPoints.replace('{stationId}', stationId),
        msg: {
            option: '删除测点'
        }
    });
}

//renameStationGroup
export const RENAME_POINT_GROUP_REQUEST = 'RENAME_POINT_GROUP_REQUEST';
export const RENAME_POINT_GROUP_SUCCESS = 'RENAME_POINT_GROUP_SUCCESS';
export const RENAME_POINT_GROUP_FAILURE = 'RENAME_POINT_GROUP_FAILURE';

export function renameStationGroup(info) {
    return dispatch => basicAction({
        type: 'put',
        data: info,
        dispatch: dispatch,
        actionType: 'RENAME_POINT_GROUP',
        url: ApiTable.renameStationGroup,
        msg: {
            option: '修改测点分组名称'
        }
    });
}

export function checkCedianName(structureId, factorId, stationName) {
    const url = ApiTable.checkCedianName;
    return Request.get(url, { structureId, factorId, stationName });
}
export function checkGroupName(structureId, factorId, groupName) {
    const url = ApiTable.checkGroupName;
    let category = 'display';
    return Request.get(url, { structureId, factorId, groupName, category });
}
export default {
    // getStructFactorList,
    addStructFactors, savePointInfo, modifyPointInfo, deletePointInfo,
    getFactorDeviceFormulaList, getGroupTypeFactor, renameStationGroup
}