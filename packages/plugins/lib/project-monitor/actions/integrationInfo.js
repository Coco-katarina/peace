'use strict';

import { basicAction, Request } from '@peace/utils'
import { ApiTable } from '$utils'

export function getStructsList(organizationId, params) {
    let param = params ?
        params.keywords ?
            `?projects=${params.projects}&structureTypes=${params.structures}&keywords=${params.keywords}`
            : `?projects=${params.projects}&structureTypes=${params.structures}`
        : null;
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STRUCTS_INFO',
        url: param ?
            ApiTable.getStructsList.replace('{organizationId}', organizationId) + param
            : ApiTable.getStructsList.replace('{organizationId}', organizationId),
        msg: {
            error: '获取结构物列表失败'
        },
        reducer: {
            name: 'structList'
        }
    });
}


export const GET_STRUCT_STATE_SUCCESS = 'REQUEST_GET_STRUCT_STATE_SUCCESS';
export const GET_STRUCT_STATE_ERROR = 'REQUEST_GET_STRUCT_STATE_ERROR';
// export function getStructState(structId) {
//     return dispatch => basicAction({
//         type: 'get',
//         dispatch: dispatch,
//         actionType: 'REQUEST_GET_STRUCT_STATE',
//         url: ApiTable.getStructState.replace('{structureId}', structId),
//         msg: {
//             error: '结构物信息获取失败'
//         },
//         reducer: {
//             name: 'singleStructState'
//         }
//     });
// }



export const REQUEST_GET_ZUWANG_INFO = 'REQUEST_GET_ZUWANG_INFO';
export const GET_ZUWANG_INFO_SUCCESS = 'GET_ZUWANG_INFO_SUCCESS';
export const GET_ZUWANG_INFO_ERROR = 'GET_ZUWANG_INFO_ERROR';
export function getDeviceList(iotaThingId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ZUWANG_INFO',
        url: ApiTable.getDeviceList.replace('{iotaThingId}', iotaThingId),
        msg: {
            error: '组网信息获取失败'
        },
        reducer: {
            name: 'deviceList'
        }
    });

}



export function deleteStruct(structureId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'REQUEST_REMOVE_STRUCT',
        url: ApiTable.deleteStruct.replace('{structureId}', structureId),
        msg: {
            option: '删除结构物信息'
        },
    });
}



export function modifyStructState(structId, struct) {
    return dispatch => basicAction({
        type: 'put',
        data: struct,
        dispatch: dispatch,
        actionType: 'REQUEST_MODIFY_STRUCT_STATE',
        url: ApiTable.modifyStructState.replace('{structureId}', structId),
        msg: {
            error: '结构物信息修改失败'
        }
    });
}

export function getDeviceMeta() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_GET_ZUWANG_META',
        url: ApiTable.getDeviceMeta,
        msg: {
            error: '设备原型获取失败'
        },
        reducer: {
            name: 'deviceMeta'
        }
    });
}

export function getDeviceMetaDeployed(iotaThingId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_GET_ZUWANG_META_DEPLOYED',
        url: ApiTable.getDeviceMetaDeployed.replace('{iotaThingId}', iotaThingId),
        msg: {
            error: '设备原型获取失败'
        },
        reducer: {
            name: 'deviceMetaDeployed'
        }
    });
}



export function modifyZuwang(iotaThingId, zuwang) {
    return dispatch => basicAction({
        type: 'post',
        data: zuwang,
        dispatch: dispatch,
        actionType: 'REQUEST_MODIFY_ZUWANG_STATE',
        url: ApiTable.modifyZuwang.replace('{iotaThingId}', iotaThingId),
        msg: {
            option: '组网部署'
        }
    });
}

export function getstationsDeployed(heatmapId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_GET_STATIONS_DEPLOYED_STATE',
        url: ApiTable.getstationsDeployed.replace('{heatmapId}', heatmapId),
        msg: {
            error: '获取测点失败'
        },
        reducer: {
            name: 'staionsDeployedList'
        }
    });
}

export function modifystationsDeployed(heatmapId, stations, noDoneMsg) {
    return dispatch => basicAction({
        type: 'post',
        data: stations,
        dispatch: dispatch,
        actionType: 'REQUEST_MODIFY_STATIONS_DEPLOYED_STATE',
        url: ApiTable.modifystationsDeployed.replace('{heatmapId}', heatmapId),
        msg: {
            success: noDoneMsg ? '' : '测点修改成功',
            error: '修改测点失败'
        },
    });
}

export function getDimensionsList(organizationId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_GET_DIMENSIONS',
        url: ApiTable.getDimensionsList.replace('{iotaThingId}', organizationId),
        msg: {
            error: '获取采集策略信息失败'
        },
        reducer: {
            name: 'dimensionsList'
        }
    });
}

export function AddDimension(organizationId, dimension) {
    return dispatch => basicAction({
        type: 'post',
        data: dimension,
        dispatch: dispatch,
        actionType: 'REQUEST_ADD_DIMENSION',
        url: ApiTable.addDimension.replace('{iotaThingId}', organizationId),
        msg: {
            option: '添加采集策略'
        },
    });
}

export function modifyDimension(organizationId, dimensionId, dimension) {
    return dispatch => basicAction({
        type: 'put',
        data: dimension,
        dispatch: dispatch,
        actionType: 'UPDATE_DIMENSION_REQUEST',
        url: ApiTable.modifyDimension.replace('{iotaThingId}', organizationId).replace('{dimensionId}', dimensionId),
        msg: {
            option: '修改采集策略'
        },
    });
}

export function deleteDimension(organizationId, dimensionId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_DIMENSION_REQUEST',
        url: ApiTable.deleteDimension.replace('{iotaThingId}', organizationId).replace('{dimensionId}', dimensionId),
        msg: {
            option: '删除采集策略'
        },
    });
}

export function invokeCapability(capabilityData) {
    return dispatch => basicAction({
        type: 'post',
        data: capabilityData,
        dispatch: dispatch,
        actionType: 'REQUEST_INVOKE_CAPABILITY',
        url: ApiTable.invokeCapability,
        msg: {
            error: '命令下发失败'
        },
        reducer: {
            name: 'invokeCapability'
        }
    });
}

export function getDebugHistory(deviceId, values) {
    return dispatch => basicAction({
        type: 'get',
        query: values,
        dispatch: dispatch,
        actionType: 'GET_DEBUG_HISTORY_CAPABILITY',
        url: ApiTable.getDebugHistory.replace('{deviceId}', deviceId),
        msg: {
            error: '获取下发历史记录失败'
        },
        reducer: {
            name: 'debugHistory'
        }
    });
}

const REQUEST_IDAU_DIAGNOSIS = 'REQUEST_IDAU_DIAGNOSIS'
export function fetchIdauDiagnosis(deviceId, start, end, isNow, limit) {
    return dispatch => basicAction({
        type: 'get',
        query: { start: start, end: end, limit: limit },
        dispatch: dispatch,
        actionType: 'REQUEST_IDAU_DIAGNOSIS',
        url: ApiTable.getIDauDiagnosis.replace('{deviceId}', deviceId),
        msg: {
            error: '获取诊断信息失败'
        },
        reducer: {
            name: 'idauDiagnosis'
        }
    });
}

export function clearIdauDiagnosisHistory() {
    return { type: 'CLEAR_' + REQUEST_IDAU_DIAGNOSIS }
}

export function getSensorLastData(sensorIds) {
    return dispatch => basicAction({
        type: 'post',
        data: { sensorIds: sensorIds },
        dispatch: dispatch,
        actionType: 'REQUEST_SENSORS_LAST_DATA',
        url: ApiTable.getSensorLastData,
        msg: {
            error: '获取传感器采集数据失败'
        },
        reducer: {
            name: 'sensorsLastData'
        }
    });
}

export const REQUEST_CHECK_REPEAT_ID_HTTPSERVER_DEVICE = 'REQUEST_CHECK_REPEAT_ID_HTTPSERVER_DEVICE';
export const CHECK_REPEAT_ID_HTTPSERVER_DEVICE_SUCCESS = 'CHECK_REPEAT_ID_HTTPSERVER_DEVICE_SUCCESS';
export const CHECK_REPEAT_ID_HTTPSERVER_DEVICE_ERROR = 'CHECK_REPEAT_ID_HTTPSERVER_DEVICE_ERROR';
export const CHECK_REPEAT_ID_HTTPSERVER_DEVICE_REPEAT = 'CHECK_REPEAT_ID_HTTPSERVER_DEVICE_REPEAT';
export function checkRepeatIdHttpServerDevice(id, port) {
    return dispatch => {
        dispatch({ type: REQUEST_CHECK_REPEAT_ID_HTTPSERVER_DEVICE });

        const url = ApiTable.checkRepeatIdHttpServerDevice.replace('{deviceHttpId}', id).replace('{port}', port);
        return Request.get(url)
            .then(res => dispatch({ type: CHECK_REPEAT_ID_HTTPSERVER_DEVICE_SUCCESS, payload: { data: res } }),
                error => {
                    if (error.status == 409) {
                        return dispatch({ type: CHECK_REPEAT_ID_HTTPSERVER_DEVICE_REPEAT })
                    } else {
                        return dispatch({ type: CHECK_REPEAT_ID_HTTPSERVER_DEVICE_ERROR, error: '查询查询当前设备id是否重复失败' })
                    }
                }
            )
    }
}

export default {
    getStructsList,
    // getStructState,
    getDeviceList,
    getDeviceMeta,
    getDeviceList,
    getstationsDeployed,
    getDimensionsList,
    getDebugHistory,
    getSensorLastData,
    getDeviceMetaDeployed,
    invokeCapability,
    fetchIdauDiagnosis,
}