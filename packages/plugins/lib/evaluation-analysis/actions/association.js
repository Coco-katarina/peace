import { basicAction, Request } from '@peace/utils';
import { ApiTable } from '$utils';

export function clearCorrelationData() {
    return {
        type: 'CLEAR_CORRELATION_DATA'
    }
}
export function getCorrelationData(startTime, endTime, stationIds, factorProto) {
    return dispatch => {
        dispatch({ type: 'CORRELATION_DATA_REQUEST' });
        const url = ApiTable.getStationThemesData;
        return Request.get(url, {
            stations: stationIds,
            startTime: startTime,
            endTime: endTime
        }).then(res => {
            return dispatch({ type: 'CORRELATION_DATA_SUCCESS', payload: { items: res, factorProto: factorProto } });
        }
            , err => {
                return dispatch({ type: 'CORRELATION_DATA_FAILURE', payload: { error: '获取测点数据失败' } });
            });
    }
}



export default {
    getCorrelationData,
    clearCorrelationData
}