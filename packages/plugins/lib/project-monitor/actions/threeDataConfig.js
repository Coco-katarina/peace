'use strict';
import { Request, RouteRequest } from '@peace/utils'
import { ApiTable } from '$utils'

 export const REQUEST_SAVE_THREEDATA_THREEHEATMAP = 'REQUEST_SAVE_THREEDATA_THREEHEATMAP';
 export const SAVE_THREEDATA_THREEHEATMAP_SUCCESS = 'SAVE_THREEDATA_THREEHEATMAP_SUCCESS';
 export const SAVE_THREEDATA_THREEHEATMAP_ERROR = 'SAVE_THREEDATA_THREEHEATMAP_ERROR';
 export function saveThreeHeatMap(spots) {
     return dispatch=> {
         dispatch({type: REQUEST_SAVE_THREEDATA_THREEHEATMAP});
         const url = ApiTable.saveThreeHeatMapUrl;
         return Request.post(url, spots)
             .then(res=> dispatch({type: SAVE_THREEDATA_THREEHEATMAP_SUCCESS, payload: {saveThreeHeatMapMsg: res}})
                 , error=> dispatch({type: SAVE_THREEDATA_THREEHEATMAP_ERROR, payload: {error: error}, error: '保存结构物热点图信息失败'}));
     }
 }
 
 export const REQUEST_SAVE_HOTSPOT_SIZE = 'REQUEST_SAVE_HOTSPOT_SIZE';
 export const SAVE_HOTSPOT_SIZE_SUCCESS = 'SAVE_HOTSPOT_SIZE_SUCCESS';
 export const SAVE_HOTSPOT_SIZE_ERROR = 'SAVE_HOTSPOT_SIZE_ERROR';
 export function saveHotspotSize(heatmapId,size) {
     return dispatch=> {
         dispatch({type: REQUEST_SAVE_HOTSPOT_SIZE});
         const url = ApiTable.saveHotspotSize.replace('{heatmapId}', heatmapId).replace('{size}', size);
         return Request.put(url, {})
             .then(res=> dispatch({type: SAVE_HOTSPOT_SIZE_SUCCESS, payload: {saveHotspotSizeMsg: res}})
                 , error=> dispatch({type: SAVE_HOTSPOT_SIZE_ERROR, payload: {error: error}, error: '保存热点尺寸信息失败'}));
     }
 }

 //removeFile
export const REMOVE_FILE_REQUEST = 'REMOVE_FILE_REQUEST';
export const REMOVE_FILE_SUCCESS = 'REMOVE_FILE_SUCCESS';
export const REMOVE_FILE_FAILURE = 'REMOVE_FILE_FAILURE';

 export function removeFile(fileId, fileName) {
    return dispatch => {
        dispatch({ type: REMOVE_FILE_REQUEST });
        if (fileId) {
            return RouteRequest.post('/_upload/cleanup', [fileId])
                .then(_ => dispatch({ type: REMOVE_FILE_SUCCESS })
                    , error => dispatch({ type: REMOVE_FILE_FAILURE }))
        } else {
            return dispatch({ type: REMOVE_FILE_SUCCESS })
        }
    }
}
 
 export default {
     saveThreeHeatMap,
     saveHotspotSize,
     removeFile
 };