 import { Request } from '@peace/utils';
 import { ApiTable } from '$utils';
 import * as types from '../constants/threeHeatMap';
 
 //热点图
 export function getHeatMap(structId, modelType) {
     return dispatch => {
         dispatch(requestHeatMap());
         const url = ApiTable.getHeatmaps.replace('{structureId}', structId).replace('{modelType}', modelType);
         return Request.get(url)
             .then(res => dispatch(receiveHeatMap(res))
             , err => dispatch(failHeatMap(err)))
             // .then(_ => dispatch(clearHotspotDatasource()))
     };
 }
 function requestHeatMap() {
     return {
         type: types.HEAT_MAP_REQUEST
     }
 }
 function receiveHeatMap(heatMap) {
     return {
         type: types.HEAT_MAP_SUCCESS,
         payload: { heatMap }
     }
 }
 function failHeatMap(requestError) {
     return {
         type: types.HEAT_MAP_FAILURE,
         payload: { error: requestError },
         error: '获取三维热点图失败'
     }
 }
 
 export function followSensor(sensorId, follow) {
     return dispatch => {
         dispatch(requestFollowSensor());
         const url = ApiTable.followSensorUrl.replace('{sensorId}', sensorId).replace('{follow}', follow);
         return Request.get(url)
             .then(res => dispatch(receiveFollowSensor(res.message)),
             err => dispatch(failFollowSensor(err)))
             .then(dispatch(updateFollowSensor(sensorId, follow)));
     };
 }
 function requestFollowSensor() {
     return {
         type: types.FOLLOW_SENSOR_REQUEST,
     }
 }
 function receiveFollowSensor(message) {
     if (message == "取消关注成功") {
         return {
             type: types.FOLLOW_SENSOR_SUCCESS
         }
     } else {
         return {
             type: types.FOLLOW_SENSOR_SUCCESS,
             done: message,
         }
     }
 }
 function failFollowSensor(requestError) {
     return {
         type: types.FOLLOW_SENSOR_FAILURE,
         error: requestError.message
     }
 }
 
 //选择/取消选择热点
 export function selectHotspot(sensorId) {
     return {
         type: types.THREE_HOTSPOT_SELECT,
         payload: { sensorId }
     }
 }
 export function deselectHotspot() {
     return {
         type: types.THREE_HOTSPOT_DESELECT,
     }
 }
 
 //更新关注的传感器
 export function updateFollowSensor(sensorId, follow) {
     return {
         type: types.UPDATE_FOLLOW_SENSOR,
         payload: {
             sensorId, follow
         }
     }
 }
 //根据可配传感器列表配置热点新
 export function initHotspotDatasource(sensors, factors) {
     return {
         type: types.INIT_HOTSPOT_DATASOURCE,
         payload: { sensors, factors },
     }
 }
 
 export function clearHotspotDatasource() {
     return {
         type: types.CLEAR_HOTSPOT_DATASOURCE,
     }
 }
 
 //加载最新告警
 export function loadLatestWarning(warnings) {
     return {
         type: types.LOAD_LATEST_WARNING,
         payload: { warnings },
     }
 }
 
 //加载最新数据
 export function loadLatestData(lastDataMap) {
     return {
         type: types.LOAD_LATEST_DATA,
         payload: { lastDataMap },
     }
 }
 
 //加载最新振动数据
 export function loadLatestVibData(vibLatestData) {
     return {
         type: types.LOAD_LATEST_VIB_DATA,
         payload: { vibLatestData },
     }
 }
 
 //更新推送的数据
 export function updatePushedData(pushData) {
     return {
         type: types.UPDATE_PUSHED_DATA,
         payload: { pushData },
     }
 }
 
 //更新推送的告警
 export function updatePushedAlarm(pushedWarning) {
     return {
         type: types.UPDATE_PUSHED_WARNING,
         payload: { pushedWarning },
     }
 }
 
 
 //获取结构物列表
 export function getStructs() {
     return (dispatch) => {
         dispatch(requestStructs());
         return Request.get(ApiTable.structsWithFactorUrl)
             .then(res => dispatch(receiveStructs(res)),
             err => dispatch(failStructs(err)));
     }
 }
 function requestStructs() {
     return { type: types.THREE_STRUCTS_REQUEST }
 }
 function receiveStructs(items) {
     return {
         type: types.THREE_STRUCTS_SUCCESS,
         payload: { items }
     }
 }
function failStructs(requestError) {
     return {
         type: types.THREE_STRUCTS_FAILURE,
         payload: { error: requestError },
         error: '获取结构物列表失败'
     }
 }
 
 export function initStructData() {
     return (dispatch) => {
         dispatch(requestHeatMap());
         dispatch(requestStructs());
         dispatch(requestProductTypes());
     }
 }
 
 export default {
    getHeatMap,
    selectHotspot,
    deselectHotspot,
    clearHotspotDatasource,
    initHotspotDatasource,
    loadLatestData,
    loadLatestVibData,
    loadLatestWarning,
    updatePushedData,
    followSensor,
    getStructs
};