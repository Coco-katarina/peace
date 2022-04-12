import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';
import * as T from '../constants/struct';

function getFactors(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.FactorsGetTypes,
        url: ApiTable.getStructFactorList.replace('{structureId}', structId) + '?display',
        msg: {
            option: '查询监测因素'
        },
        reducer: {
            name: 'factors'
        }
    });
}
function getFactorItems(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.FactorsGetTypes,
        url: ApiTable.getStructFactorList.replace('{structureId}', structId),
        msg: {
            option: '查询监测因素'
        },
        reducer: {
            name: 'factorItems'
        }
    });
}
function getStations(structId, factorId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.StationsGetTypes,
        url: ApiTable.getCedian.replace('{structureId}', structId) + `?factorId=${factorId}`,
        msg: {
            option: '查询测点'
        },
        reducer: {
            name: 'stations'
        },
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
function getStructureFilter(orgId, params) {
    let param = params != undefined ?
        params.keywords ?
            `?projects=${params.projects}&structureTypes=${params.structures}&keywords=${params.keywords}`
            :
            `?projects=${params.projects}&structureTypes=${params.structures}`
        : null;
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.StructureGetTypes,
        url: param ? ApiTable.getStructsList.replace('{organizationId}', orgId) + param : ApiTable.getStructsList.replace('{organizationId}', orgId),
        msg: {
            option: '查询结构物信息'
        }
    });
}
function changeStructureFilterParams(old, params) {
    const newState = Immutable.fromJS(old).merge(params);

    let rslt = newState.toJS();

    return {
        type: T.StructFilterTypes.CHANGE,
        payload: { params: rslt }
    }
}
function getStructureAlarmStat(structureId, params) {
    let param = null;
    if (params.type == "period") {
        param = `?timeType=${params.type}&period=${params.range}`;
    } else if (params.type == "time") {
        param = `?timeType=${params.type}&startTime=${params.range.startTime}&endTime=${params.range.endTime}`;
    }
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.StructureAlarmStatGetTypes,
        url: ApiTable.getStructureAlarmStat.replace('{structureId}', structureId) + param,
        msg: {
            option: '查询结构物告警'
        },
        reducer: {
            name: 'structureAlarmStat'
        }
    })
}

function getStructureResources(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.StructResGetTypes,
        url: ApiTable.getStructureResources.replace(':id', structureId),
        msg: {
            option: '查询结构物相关资源'
        }
    });
}

function getStructState(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_GET_STRUCT_STATE',
        url: ApiTable.getStructState.replace('{structureId}', structId),
        msg: {
            error: '结构物信息获取失败'
        },
        reducer: {
            name: 'singleStructState'
        }
    });
}

function addStruct(orgId, struct) {
    return dispatch => basicAction({
        type: 'post',
        data: struct,
        dispatch,
        actionType: 'REQUEST_ADD_STRUCT',
        url: ApiTable.addStruct.replace('{organizationId}', orgId),
        msg: {
            error: '新增结构物失败'
        },
    });
}

function addStructFactors(structId, factorIds) {
    return dispatch => basicAction({
        dispatch,
        type: 'put',
        data: factorIds,
        actionType: 'ADD_FACTOR_REQUEST',
        url: ApiTable.addStructFactors.replace('{structureId}', structId),
        msg: {
            option: '保存'
        },
    });
}

function getFactorTemplateList(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'FACTOR_TEMPLATE_LIST_REQUEST',
        url: ApiTable.getFactorTemplateList.replace("{orgId}", orgId),
        msg: {
            error: '获取监测模板失败'
        },
        reducer: {
            name: 'factorTemplateData'
        }
    });
}

function getStructFactorList(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'FACTOR_TEMPLATE_LIST_REQUEST',
        url: ApiTable.getStructFactorList.replace('{structureId}', structId),
        msg: {
            error: '获取结构物监测因素失败'
        },
        reducer: {
            name: 'structFactorList'
        }
    });
}


export {
    getFactors,
    getFactorItems,
    getStations,
    getStructureFilter,
    getStructureAlarmStat,
    changeStructureFilterParams,
    getStructureResources,
    addStruct,
    getStructState,
    addStructFactors,
    getFactorTemplateList,
    getStructFactorList,
}