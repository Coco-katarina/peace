'use strict';

import { basicAction } from '@peace/utils';
import { ApiTable } from '$utils';

function getCollections(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_COLLECTION',
        url: ApiTable.getCollection.replace("{structureId}", structureId),
        msg: {
            option: '查询动态采集配置信息'
        },
        reducer: {
            name: 'collectionList'
        }
    });
}

function addCollection(data) {
    return dispatch => basicAction({
        type: 'post',
        data: data,
        dispatch: dispatch,
        actionType: 'POST_COLLECTION',
        url: ApiTable.postCollection,
        msg: {
            option: '新增动态采集'
        }
    });
}

function editCollection(dimensionId, data) {
    return dispatch => basicAction({
        type: 'put',
        data: data,
        dispatch: dispatch,
        actionType: 'PUT_COLLECTION',
        url: ApiTable.putCollection.replace("{dimensionId}", dimensionId),
        msg: {
            option: '修改动态采集配置信息'
        }
    });
}

function delCollection(dimensionId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DEL_COLLECTION',
        url: ApiTable.delCollection.replace("{dimensionId}", dimensionId),
        msg: {
            option: '删除动态采集配置'
        },
    });
}

function getStations(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: "GET_STATIONS",
        url: ApiTable.getCedian.replace('{structureId}', structId),
        msg: {
            option: '查询测点'
        }
    });
}

export { getCollections, addCollection, editCollection, delCollection, getStations }