/**
 * Created by zmh on 2017/7/7.
 */

'use strict'
import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'
//dataAcqEquipmentList
export const DATAACQ_EQUIPMENT_LIST_REQUEST = 'DATAACQ_EQUIPMENT_LIST_REQUEST';
export const DATAACQ_EQUIPMENT_LIST_SUCCESS = 'DATAACQ_EQUIPMENT_LIST_SUCCESS';
export const DATAACQ_EQUIPMENT_LIST_FAILURE = 'DATAACQ_EQUIPMENT_LIST_FAILURE';


export function getDataAcqEquipmentList(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'DATAACQ_EQUIPMENT_LIST',
        url: ApiTable.getSensorsStations.replace('{structureId}', structureId),
        msg: {
            error: '获取设备列表失败'
        },
        reducer: {
            name: 'dataAcqEquipmentList'
        }
    });
}

//dataAcquisitionPointList
export const DATA_ACQUISITION_POINT_LIST_REQUEST = 'DATA_ACQUISITION_POINT_LIST_REQUEST';
export const DATA_ACQUISITION_POINT_LIST_CLEAR = 'DATA_ACQUISITION_POINT_LIST_CLEAR';
export const DATA_ACQUISITION_POINT_LIST_SUCCESS = 'DATA_ACQUISITION_POINT_LIST_SUCCESS';
export const DATA_ACQUISITION_POINT_LIST_FAILURE = 'DATA_ACQUISITION_POINT_LIST_FAILURE';


export function getDataAcquisitionPointList(structureId, factorId, startTime, endTime, stationsInfo) {
    const url = ApiTable.getStationsData.replace('{structureId}', structureId).replace('{factorId}', factorId)
            .replace('{startTime}', startTime)
            .replace('{endTime}', endTime);
    return dispatch => basicAction({
        type: 'post',
        data: stationsInfo,
        dispatch,
        actionType: 'DATA_ACQUISITION_POINT_LIST',
        url,
        msg: {
            error: '获取数据失败'
        },
        reducer: {
            name: 'dataAcquisitionPointList'
        }
    });

}

//dataAcquisitionList
export const DATA_ACQUISITION_LIST_REQUEST = 'DATA_ACQUISITION_LIST_REQUEST';
export const DATA_ACQUISITION_LIST_CLEAR = 'DATA_ACQUISITION_LIST_CLEAR';
export const DATA_ACQUISITION_LIST_SUCCESS = 'DATA_ACQUISITION_LIST_SUCCESS';
export const DATA_ACQUISITION_LIST_FAILURE = 'DATA_ACQUISITION_LIST_FAILURE';

export function getDataAcquisitionList(structureId, startTime, endTime, sensorsInfo) {
    const url = ApiTable.getSensorsRawData.replace('{structureId}', structureId)
            .replace('{startTime}', startTime)
            .replace('{endTime}', endTime);
    return dispatch => basicAction({
        type: 'post',
        data: sensorsInfo,
        dispatch,
        actionType: 'DATA_ACQUISITION_LIST',
        url,
        msg: {
            error: '获取数据失败'
        },
        reducer: {
            name: 'dataAcquisitionList'
        }
    });
}



export const REQUEST_VIBERATION_RAWS_DATA = 'REQUEST_VIBERATION_RAWS_DATA';
export const GET_VIBERATION_RAWS_DATA_SUCCESS = 'GET_VIBERATION_RAWS_DATA_SUCCESS';
export const GET_VIBERATION_RAWS_DATA_ERROR = "GET_VIBERATION_RAWS_DATA_ERROR";
export const CLEAR_BLASTVIB_RAWS_DATA = 'CLEAR_BLASTVIB_RAWS_DATA';
export function getVibrationRawsData(data, factorProto) {
    return dispatch => basicAction({
        type: 'post',
        data: {
            collectTimesWithStationId: data,
            factorProto: factorProto
        },
        dispatch,
        actionType: 'GET_VIBERATION_RAWS_DATA',
        url: ApiTable.getVibrationRawsData,
        msg: {
            error: '获取振动时域数据失败'
        },
        reducer: {
            name: 'vibrationRawsData'
        }
    });
 
}

export const REQUEST_VIBERATION_FFTS_DATA = 'REQUEST_VIBERATION_FFTS_DATA';
export const GET_VIBERATION_FFTS_DATA_SUCCESS = 'GET_VIBERATION_FFTS_DATA_SUCCESS';
export const GET_VIBERATION_FFTS_DATA_ERROR = "GET_VIBERATION_FFTS_DATA_ERROR";
export const CLEAR_BLASTVIB_FFTS_DATA = 'CLEAR_BLASTVIB_FFTS_DATA';
export function getVibrationFftsData(data, factorProto) {
    return dispatch => basicAction({
        type: 'post',
        data: {
            collectTimesWithStationId: data,
            factorProto: factorProto
        },
        dispatch,
        actionType: 'GET_VIBERATION_FFTS_DATA',
        url: ApiTable.getVibrationFftsData,
        msg: {
            error: '获取振动频谱数据失败'
        },
        reducer: {
            name: 'vibrationFftsData'
        }
    });

}

export const REQUEST_AGGREGATION_DATA = 'REQUEST_AGGREGATION_DATA';
export const GET_AGGREGATION_DATA_SUCCESS = 'GET_AGGREGATION_DATA_SUCCESS';
export const GET_AGGREGATION_DATA_ERROR = "GET_AGGREGATION_DATA_ERROR";

export function getAggregationData(params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch,
        actionType: 'GET_AGGREGATION_DATA',
        url: ApiTable.getAggregationData,
        msg: {
            error: '获取聚集数据失败'
        },
        reducer: {
            name: 'aggregationData'
        }
    });
}

export default {
    getDataAcqEquipmentList,
    getDataAcquisitionPointList,
    getDataAcquisitionList,
    getVibrationRawsData,
    getVibrationFftsData,
    getAggregationData,
}