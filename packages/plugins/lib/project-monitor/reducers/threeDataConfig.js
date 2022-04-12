'use strict';

 import * as actionTypes from '../actions/threeDataConfig';

 const initSaveState = {
     saveThreeHeatMapMsg: null,
     isRequesting: false,
     error: null
 };
 
 function saveThreeHeatMap(state = initSaveState, action) {
     const payload = action.payload;
     switch (action.type){
         case actionTypes.REQUEST_SAVE_THREEDATA_THREEHEATMAP:
             return Object.assign({}, state, {
                 isRequesting: true,
                 saveThreeHeatMapMsg: null
             });
         case actionTypes.SAVE_THREEDATA_THREEHEATMAP_SUCCESS:
             return Object.assign({}, state, {
                 isRequesting: false,
                 saveThreeHeatMapMsg: payload.saveThreeHeatMapMsg
             });
         case actionTypes.SAVE_THREEDATA_THREEHEATMAP_ERROR:
             return Object.assign({}, state, {
                 isRequesting: false,
                 error: payload.error
             });
         default:
             return state;
     }
 }
 
 const initSaveHotSpotSizeState = {
     saveHotspotSizeMsg: null,
     isRequesting: false,
     error: null
 };
 
 function saveHotspotSize(state = initSaveHotSpotSizeState, action) {
     const payload = action.payload;
     switch (action.type){
         case actionTypes.REQUEST_SAVE_HOTSPOT_SIZE:
             return Object.assign({}, state, {
                 isRequesting: true,
                 saveHotspotSizeMsg: null
             });
         case actionTypes.SAVE_HOTSPOT_SIZE_SUCCESS:
             return Object.assign({}, state, {
                 isRequesting: false,
                 saveHotspotSizeMsg: payload.saveThreeHeatMapMsg
             });
         case actionTypes.SAVE_HOTSPOT_SIZE_ERROR:
             return Object.assign({}, state, {
                 isRequesting: false,
                 error: payload.error
             });
         default:
             return state;
     }
 }
 
 export {
     saveThreeHeatMap,
     saveHotspotSize
 };