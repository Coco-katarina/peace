import { basicAction } from '@peace/utils';
import { ApiTable } from '$utils';

export function getHistoryData(stations, begin, end, aggtype) {
    const url = ApiTable.getStationData
    let query = {
        stations, begin, end,
        orderDirection: 'DESC',
    }
    if (aggtype) query.aggtype = aggtype
    return dispatch => basicAction({
        type: 'get',
        dispatch,
        query: query,
        actionType: 'STATION_HISTTORY_DATA',
        url,
        msg: {
            error: '获取实时数据失败'
        },
        reducer: {
            name: 'historyData'
        }
    });
}

export function getWindRoseData(stationId, startTime, endTime) {
    const url = ApiTable.getWindRose.replace('{stationId}', stationId)
    return dispatch => basicAction({
        type: 'get',
        dispatch,
        query: {
            startTime, endTime
        },
        actionType: 'WIND_ROSE_DATA',
        url,
        msg: {
            error: '获取实时数据失败'
        },
        reducer: {
            name: 'windroseData'
        }
    });
}

export default {
    getHistoryData, getWindRoseData
}