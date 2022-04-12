'use strict'
import { Request } from '@peace/utils'
import { ApiTable } from '$utils'

//查询结构物是否已经有bim模型

function getedBimPath(path) {
    return {
        type: GET_BIM_PATH_SUCCESS,
        payload: { bimPath: path }
    }
}
export const GET_BIM_PATH = 'GET_BIM_PATH';
export const GET_BIM_PATH_SUCCESS = 'GET_BIM_PATH_SUCCESS';
export const GET_BIM_PATH_FAILURE = 'GET_BIM_PATH_FAILURE';
export function getBimPath(structId) {
    return dispatch => {
        dispatch({ type: GET_BIM_PATH });
        const url = ApiTable.getBimRenderPath.replace('{structId}', structId);
        return Request.get(url)
            .then(res => dispatch(getedBimPath(res.bimRenderingPath))
                , error => dispatch(getedBimPath('error')))
    }
}

export const STORAGE_BIM_PATH = 'STORAGE_BIM_PATH';
export const STORAGE_BIM_PATH_SUCCESS = 'STORAGE_BIM_PATH_SUCCESS';
export const STORAGE_BIM_PATH_FAILURE = 'STORAGE_BIM_PATH_FAILURE';
export function storageBimPath(structId, bimPath) {
    return dispatch => {
        dispatch({ type: STORAGE_BIM_PATH });
        const url = ApiTable.storageBimRenderPath.replace('{structId}', structId);
        return Request.post(url, bimPath)
            .then(_ => dispatch({ type: STORAGE_BIM_PATH_SUCCESS })
                , error => dispatch({ type: STORAGE_BIM_PATH_FAILURE }))
    }
}

export const UPDATE_BIM_PATH = 'UPDATE_BIM_PATH';
export const UPDATE_BIM_PATH_SUCCESS = 'UPDATE_BIM_PATH_SUCCESS';
export const UPDATE_BIM_PATH_FAILURE = 'UPDATE_BIM_PATH_FAILURE';
export function updateBimPath(structId, bimPath) {
    return dispatch => {
        dispatch({ type: STORAGE_BIM_PATH });
        const url = ApiTable.updateBimRenderPath.replace('{structId}', structId);
        return Request.put(url, bimPath)
            .then(_ => dispatch({ type: UPDATE_BIM_PATH_SUCCESS })
                , error => dispatch({ type: UPDATE_BIM_PATH_FAILURE }))
    }
}

export const CHANGE_BIM_STATIONS = 'CHANGE_BIM_STATIONS';
export const CHANGE_BIM_STATIONS_SUCCESS = 'CHANGE_BIM_STATIONS_SUCCESS';
export const CHANGE_BIM_STATIONS_FAILURE = 'CHANGE_BIM_STATIONS_FAILURE';
export function changeBimStations(structId, stations) {
    return dispatch => {
        dispatch({ type: CHANGE_BIM_STATIONS });
        const url = ApiTable.changeBimStations.replace('{structId}', structId);
        return Request.post(url, stations)
            .then(_ => dispatch({ type: CHANGE_BIM_STATIONS_SUCCESS })
                , error => dispatch({ type: CHANGE_BIM_STATIONS_FAILURE }))
    }
}

function getedBimStations(res) {
    return {
        type: GET_BIM_STATIONS_SUCCESS,
        payload: { bimStations: res }
    }
}

export const GET_BIM_STATIONS = 'GET_BIM_STATIONS';
export const GET_BIM_STATIONS_SUCCESS = 'GET_BIM_STATIONS_SUCCESS';
export const GET_BIM_STATIONS_FAILURE = 'GET_BIM_STATIONS_FAILURE';
export function getBimStations(structId) {
    return dispatch => {
        dispatch({ type: GET_BIM_STATIONS });
        const url = ApiTable.getBimStations.replace('{structId}', structId);
        return Request.get(url)
            .then(res => dispatch(getedBimStations(res))
                , error => dispatch({ type: GET_BIM_STATIONS_FAILURE }))
    }
}

export default {
    getBimPath,
}