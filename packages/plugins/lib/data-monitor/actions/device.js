import { basicAction } from '@peace/utils';
import { ApiTable } from '$utils';
import { DataMonitorApiTable }from '../constant';



export function getMyStructList(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_MY_STRUCT_LIST',
        url: `${ApiTable.getStructsList.replace('{organizationId}', orgId)}`,
        msg: { error: '获取结构物列表失败' },
        reducer: { name: 'myStructList' }
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

export function getDimensionsList(iotaThingId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_GET_DIMENSIONS',
        url: ApiTable.getDimensionsList.replace('{iotaThingId}', iotaThingId),
        msg: {
            error: '获取采集策略信息失败'
        },
        reducer: {
            name: 'dimensionsList'
        }
    });
}

export function getDevicesAlarms(deviceIds,query) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        data: deviceIds,
        query: query,
        actionType: 'REQUEST_POST_DEVICES_ALARMS',
        url: ApiTable.getDevicesAlarms,
        msg: {
            error: '获取设备告警信息失败'
        },
        reducer: {
            name: 'deviceListAlarms'
        }
    });
}
function getStationList(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_CEDIAN',
        url: ApiTable.getCedian.replace('{structureId}', structureId),
        msg: {
            error: '查询测点信息失败'
        },
        reducer: {
            name: 'factorStations'
        }
    });
}


export default {
    getMyStructList,
    getDeviceMeta,
    getDeviceList,
    getDimensionsList,
    getDevicesAlarms,
    getStationList
}