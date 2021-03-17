import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';
import * as T from '../../constants'

function getCorrelationData(startTime, endTime, stationIds, factorProto) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.GetCorrelationData,
        url: ApiTable.getStationThemesData,
        query: {
            stations: stationIds,
            startTime: startTime,
            endTime: endTime
        },
        msg: {
            option: '查询测点数据'
        },
        reducer: {
            name: 'correlationData'
        },
        callback: (res) => {
            return {
                data: res,
                factorProto: factorProto
            }
        }
    });
}
export { getCorrelationData }