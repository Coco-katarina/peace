
'use strict'

import { basicAction, RouteRequest } from '@peace/utils';
import { ApiTable, RouteTable } from '$utils';

export function getHeatmaps(structId, modelType) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_POINTS_IMG_LIST',
        url: ApiTable.getHeatmaps.replace('{structureId}', structId).replace('{modelType}', modelType),
        msg: {
            option: '查询结构物热点图'
        },
        reducer: {
            name: 'stationDeploy'
        }
    });
}

export function getPointsImg(pointsImgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_POINTS_IMG',
        url: ApiTable.getPointsImg.replace('{heatmapId}', pointsImgId),
        msg: {
            option: '查询布设热点图'
        },
        reducer: {
            name: 'pointsImg'
        }
    });
}

export function cleanUpTrashImg(images) {
    return RouteRequest.post(RouteTable.cleanUpUploadTrash, images);
}

export const REQUEST_DELETE_POINTS_IMG = 'REQUEST_DELETE_POINTS_IMG';
export const DELETE_POINTS_IMG_DONE = 'DELETE_POINTS_IMG_DONE';
export function deletePointsImg(pointsImgId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        query: pointsImgId,
        actionType: 'DEL_POINTS_IMG',
        url: ApiTable.deletePointsImg.replace('{heatmapId}', pointsImgId),
        msg: {
            option: '删除截面'
        },
    });
}
export function createPointsImg(structureId, params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'POST_POINTS_IMG',
        url: ApiTable.createPointsImg.replace('{structureId}', structureId),
        msg: {
            success: params.model == "3D" && params.heatmap.typeId == 3 ? '新增模型成功' : '新增截面成功',
            error: '新增截面失败'
        }
    });
}
export function modifyPointsImg(heatmapId, heatmap) {
    return dispatch => basicAction({
        type: 'put',
        data: heatmap,
        dispatch: dispatch,
        actionType: 'PUT_POINTS_IMG',
        url: ApiTable.modifyPointsImg.replace('{heatmapId}', heatmapId),
        msg: {
            success: heatmap.model == "3D" && heatmap.heatmap.typeId == 3 ? '修改模型成功' : '修改截面成功',
            error: '修改截面失败'
        }
    });
}

export default {
    getHeatmaps,
    getPointsImg,
    createPointsImg,
    deletePointsImg,
    modifyPointsImg
}