'use strict';
import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';
import * as T from '../../constants';

export function getFactors(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.FactorsGetTypes,
        url: ApiTable.getStructFactorList.replace('{structureId}', structId),
        msg: {
            option: '查询监测因素信息'
        },
        reducer: {
            name: 'thresholdFactors'
        }
    });
}

export function getStructures(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.StructuresGetTypes,
        url: ApiTable.getStructsList.replace('{organizationId}', orgId),
        msg: {
            option: '查询结构物信息'
        },
        reducer: {
            name: 'thresholdStructures'
        }
    });
}

export function getStations(structId, factorId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.ThesholdStationsGetType,
        url: ApiTable.getStations.replace('{structureId}', structId) + `?factorId=${factorId}`,
        msg: {
            option: '查询测点'
        },
        reducer: {
            name: 'thresholdStations'
        },
        callback: (res) => {
            return res.length > 0 ?
                res[0].groups.reduce((p, n) => {
                    n.stations.forEach(s => {
                        p.push({ id: s.id, name: s.name });
                    });
                    return p;
                }, [])
                : []
        }
    });
}