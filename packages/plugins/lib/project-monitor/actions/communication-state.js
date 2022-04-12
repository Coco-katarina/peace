import { basicAction } from '@peace/utils';
import { ApiTable } from '$utils';

export const getStructsType = {
    REQUESTING: "GET_STRUCTS_REQUEST",
    REQUEST_SUCCESS: "GET_STRUCTS_SUCCESS",
    REQUEST_ERROR: "GET_STRUCTS_FAILURE",
}
export function getStructs(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: getStructsType,
        url: ApiTable.getStructsList.replace('{organizationId}', id),
        msg: {
            option: '查询结构物'
        }
    });
}
export const getStructsDevicesType = {
    REQUESTING: "GET_STRUCTS_DEVICES_REQUEST",
    REQUEST_SUCCESS: "GET_STRUCTS_DEVICES_SUCCESS",
    REQUEST_ERROR: "GET_STRUCTS_DEVICES_FAILURE",
}
export function getStructsDevices(iotaid) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: getStructsDevicesType,
        url: ApiTable.getIotaThingsLlinkStatus.replace('{iotaThingId}', iotaid),
        msg: {
            option: '查询结构物设备状态'
        }
    });
}
export const getDevicesAlarmsType = {
    REQUESTING: "GET_DEVICES_ALARMS_REQUEST",
    REQUEST_SUCCESS: "GET_DEVICES_ALARMS_SUCCESS",
    REQUEST_ERROR: "GET_DEVICES_ALARMS_FAILURE",
}
export function getDevicesAlarms(devicesIds) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: getDevicesAlarmsType,
        data: devicesIds,
        url: ApiTable.getDevicesAlarms,
        msg: {
            option: '查询设备状态信息'
        }
    });
}