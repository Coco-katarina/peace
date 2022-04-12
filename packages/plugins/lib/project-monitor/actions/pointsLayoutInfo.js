'use strict'
 import { Request, RouteRequest } from '@peace/utils';
 import { ApiTable, RouteTable } from '$utils';
 //pointsImgList
 export const POINTS_IMG_LIST_REQUEST = 'POINTS_IMG_LIST_REQUEST';
 export const POINTS_IMG_LIST_SUCCESS = 'POINTS_IMG_LIST_SUCCESS';
 export const POINTS_IMG_LIST_FAILURE = 'POINTS_IMG_LIST_FAILURE';
 export const CLEAR_POINTS_IMG_LIST_REQUEST = 'CLEAR_POINTS_IMG_LIST_REQUEST';
 function requestPointsImgList(structId) {
     return {
         type: POINTS_IMG_LIST_REQUEST
     }
 }
 function receivePointsImgList(items) {
     return {
         type: POINTS_IMG_LIST_SUCCESS,
         payload: { items }
     }
 }
 function failPointsImgList(error) {
     return {
         type: POINTS_IMG_LIST_FAILURE,
         payload: { error: error },
         error: '获取结构物热点图失败'
     }
 }
 export function getPointsImgList(structId, modelType) {
     return (dispatch) => {
         dispatch(requestPointsImgList(structId));
         return Request.get(ApiTable.getHeatmaps.replace('{structureId}', structId).replace('{modelType}', modelType))
             .then(res => dispatch(receivePointsImgList(res))
             , error => dispatch(failPointsImgList(error)));
     }
 }
 
 export const REQUEST_POINTS_IMG = 'REQUEST_POINTS_IMG';
 export const GET_POINTS_IMG_DONE = 'GET_POINTS_IMG_DONE';
 export function getPointsImg(pointsImgId) {
     return (dispatch) => {
         dispatch({ type: REQUEST_POINTS_IMG });
         return Request.get(ApiTable.getPointsImg.replace('{heatmapId}', pointsImgId))
             .then(res => dispatch({ type: GET_POINTS_IMG_DONE, payload: { data: res } })
             , error => dispatch({ type: GET_POINTS_IMG_DONE, payload: { error: error },  error: '获取布设热点图失败' }));
     }
 }
 
 export function cleanUpTrashImg(images) {
     return RouteRequest.post(RouteTable.cleanUpUploadTrash, images);
 }
 
 export const REQUEST_DELETE_POINTS_IMG = 'REQUEST_DELETE_POINTS_IMG';
 export const DELETE_POINTS_IMG_DONE = 'DELETE_POINTS_IMG_DONE';
 export function deletePointsImg(pointsImgId) {
     return dispatch => {
         dispatch({ type: REQUEST_DELETE_POINTS_IMG });
         const url = ApiTable.deletePointsImg.replace('{heatmapId}', pointsImgId);
         return Request.delete(url, pointsImgId)
             .then(_ => dispatch({ type: DELETE_POINTS_IMG_DONE, done: '删除截面成功' })
                 , error => dispatch({ type: DELETE_POINTS_IMG_DONE, error: '删除截面失败' }))
     }
 }
 
export const REQUEST_SAVE_POINTS_IMG = 'REQUEST_SAVE_POINTS_IMG';
export const SAVE_POINTS_IMG_DONE = 'SAVE_POINTS_IMG_DONE';
export function createPointsImg(structureId, params) {
     return dispatch => {
         dispatch({ type: REQUEST_SAVE_POINTS_IMG });
         const url = ApiTable.createPointsImg.replace('{structureId}', structureId);
         return Request.post(url, params)
             .then(_ => dispatch({ type: SAVE_POINTS_IMG_DONE, done: params.model=="3D" && params.heatmap.typeId == 3 ? '新增模型成功' : '新增截面成功' })
             , error => dispatch({ type: SAVE_POINTS_IMG_DONE, error: '新增截面失败' }))
     }
 }
 
 export function modifyPointsImg(heatmapId, heatmap) {
     return dispatch => {
         dispatch({ type: REQUEST_SAVE_POINTS_IMG });
         const url = ApiTable.modifyPointsImg.replace('{heatmapId}', heatmapId);
         return Request.put(url, heatmap)
             .then(_ => dispatch({ type: SAVE_POINTS_IMG_DONE, done: heatmap.model=="3D" && heatmap.heatmap.typeId == 3 ? '修改模型成功' : '修改截面成功'})
             , error => dispatch({ type: SAVE_POINTS_IMG_DONE, error: '修改截面失败' }))
     }
 }
 
 export default {
    getPointsImgList,
    getPointsImg,
    createPointsImg,
    deletePointsImg,
    modifyPointsImg
}