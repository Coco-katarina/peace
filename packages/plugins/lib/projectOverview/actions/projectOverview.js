'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getStructuresByOrganizations(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STRUCTURES_BY_ORGANIZATION',
        url: `${ApiTable.getStructuresByOrganizations.replace('{id}', orgId)}`,
        msg: { error: '获取结构物列表失败' },
        reducer: { name: 'structuresList' }
    });
}

export function getStructureByStructureId(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STRUCTURE_BY_STRUCTURE_ID',
        url: `${ApiTable.getStructureByStructureId.replace('{structureId}', structureId)}`,
        msg: { error: '获取结构物失败' },
        reducer: { name: 'structure' }
    });
}

export function getFactorsByStructures(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_FACTORS_BY_STRUCTURE_ID',
        url: `${ApiTable.getFactorsByStructures.replace('{structId}', structureId)}`,
        msg: { error: '获取结构物传感器失败' },
        reducer: { name: 'structureFactors' }
    });
}


export function getAlarmsByStructure(structureId, status) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ALARMS_BY_STRUCTURE_ID',
        url: `${ApiTable.getAlarmsByStructure.replace('{structId}', structureId).replace('{status}', status)}`,
        msg: { error: '获取结构物告警失败' },
        reducer: { name: 'alarmsByStructures' }
    });
}


export function getAlarmsByUser(userId, status) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ALARMS_BY_USER',
        url: `${ApiTable.getAlarmsByUser.replace('{userId}', userId).replace('{status}', status)}`,
        msg: { error: '获取结构物告警失败' },
        reducer: { name: 'alarmsByUser' }
    });
}

export function getUserAlarmsInfo(userId) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'GET_USER_ALARMS_INFO',
        url: `${ApiTable.getAlarms.replace('{userId}', userId)}`,
        data: {
            "status": "new", // {string, optional} 告警状态，{"new":新告警, "history":历史告警}
            "levels": [1, 2, 3, 4], // {array[int], optional} 告警等级数组
            "types": [1] // {array[int], optional} 告警子类型id数组：{-1:无告警, 1:数据异常, 2:DTU异常, 3:传感器异常, 4:网关异常, 5:节点异常}
        },
        msg: { error: '获取用户告警信息失败' },
        reducer: { name: 'userAlarmsInfo' }
    })
}

export function  getStationList(structureId) {
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