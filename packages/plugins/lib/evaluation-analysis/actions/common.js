import { basicAction } from '@peace/utils';
import { ApiTable } from '$utils';


export function getStations(structId,factorId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_THESHOLD_STATIONS_LIST',
        url: factorId ? ApiTable.getStations.replace('{structureId}', structId) + `?factorId=${factorId}`:
        ApiTable.getStations.replace('{structureId}', structId),
        msg: { error: '获取测点信息失败' },
        reducer: { name: 'thresholdStations' },
        callback: (res) => {
            
            return res && res.length && res[0].groups.reduce((p, n) => {
                    n.stations.forEach(s => {
                        p.push({ id: s.id, name: s.name });
                    });
                    return p;
            }, []) || []
            
           
        }
    });
}

export function getStationsWithOutFactorId(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ASSOCIATION_STATIONS_LIST',
        url: ApiTable.getStations.replace('{structureId}', structId),
        msg: { error: '获取测点信息失败' },
        reducer: { name: 'associationStations' },
    });
}



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

export function getFactors(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_THESHOLD_FACTORS_LIST',
        url:ApiTable.getStructFactorList.replace('{structureId}', structId),
        msg: { error: '查询监测因素失败' },
        reducer: { name: 'thresholdFactors' }
    });
}

export default {
    getMyStructList,
    getStations,
    getFactors,
    getStationsWithOutFactorId
}