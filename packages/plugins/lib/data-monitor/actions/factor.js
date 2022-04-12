import { basicAction } from '@peace/utils';
import { ApiTable } from '$utils';
import moment from 'moment'
export function getFactorList(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_FACTOR_LIST',
        url: `${ApiTable.getFactorList.replace('{orgId}', orgId)}`,
        msg: { error: '获取监测因素列表失败' },
        reducer: { name: 'facotrList' }
    })
}

export function getStations(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STATIONS_LIST',
        url: `${ApiTable.getStations
            .replace('{structureId}', structureId)}`,
        msg: { error: '获取监测因素列表失败' },
        reducer: { name: 'myStationList' }
    })
}

export function getRealTimeData(stationIds) {
    const url = ApiTable.getStationThemesData
    return dispatch => basicAction({
        type: 'get',
        dispatch,
        query: { limit: 12, stations: stationIds, startTime: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss') },
        actionType: 'REALTIME_DATA',
        url,
        msg: {
            error: '获取实时数据失败'
        },
        reducer: {
            name: 'realtimeData'
        }
    });
}

export function getHeatMapData(stationIds) {
    const url = ApiTable.getStationThemesData
    return dispatch => basicAction({
        type: 'get',
        dispatch,
        query: { limit: 1, stations: stationIds, startTime: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss') },
        actionType: 'GET_HEATMAP_DATA',
        url,
        msg: {
            error: '获取热点图数据失败'
        },
        reducer: {
            name: 'heatmapData'
        }
    });
}

function getBatchThreshold(structId, factorId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'MONITOR_BATCH_THRESHOLD',
        url: ApiTable.getBatchThreshold.replace('{structId}', structId).replace('{factorId}', factorId),
        msg: {
            option: '查询监测因素下测点阈值'
        },
        reducer: {
            name: 'monitorThreshold',
        }
    });
}

export function getUserAlarmsInfo(userId, structures) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        query: { limit: 1000 },
        data: {
            "structures": structures, // {array[int], optional} 结构物id数组
            "status": "new", // {string, optional} 告警状态，{"new":新告警, "history":历史告警}
            "levels": [1, 2, 3, 4], // {array[int], optional} 告警等级数组
            "types": [1] // {array[int], optional} 告警子类型id数组：{-1:无告警, 1:数据异常, 2:DTU异常, 3:传感器异常, 4:网关异常, 5:节点异常}
        },
        actionType: 'GET_REALTIME_ALARMS_INFO',
        url: `${ApiTable.getAlarms.replace('{userId}', userId)}`,
        msg: { error: '获取用户告警信息失败' },
        reducer: { name: 'realtimeAlarm' }
    })
}

export default {
    getFactorList,
    getStations,
    getRealTimeData,
    getBatchThreshold,
    getUserAlarmsInfo,
    getHeatMapData
}