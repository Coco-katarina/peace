/**
 * Created by zmh on 2017/7/3.
 */
 'use strict';
 import * as actionTypes from '../actions/pointsLayoutInfo';
 
 const initPointsImgListState = {
     items: [],
     current: null,
     isRequesting: false,
     isSaving: false,
     isDeleting: false
 }
 function pointsImgList(state = initPointsImgListState, action) {
     const { payload } = action;
     switch (action.type) {
         case actionTypes.CLEAR_POINTS_IMG_LIST_REQUEST:
             return Object.assign({}, state, { isRequesting: false, error: null });
         case actionTypes.POINTS_IMG_LIST_REQUEST:
             return Object.assign({}, state, { isRequesting: true, error: null });
         case actionTypes.POINTS_IMG_LIST_SUCCESS:
             return Object.assign({}, state, { isRequesting: false, items: payload.items });
         case actionTypes.POINTS_IMG_LIST_FAILURE:
             return Object.assign({}, state, { isRequesting: false, error: payload.error });
         case actionTypes.REQUEST_POINTS_IMG:
             return Object.assign({}, state, { isRequesting: true });
         case actionTypes.GET_POINTS_IMG_DONE:
             return Object.assign({}, state, { isRequesting: false, current: payload.data });
         case actionTypes.REQUEST_SAVE_POINTS_IMG:
             return Object.assign({}, state, { isSaving: true });
         case actionTypes.SAVE_POINTS_IMG_DONE:
             return Object.assign({}, state, { isSaving: false });
         case actionTypes.REQUEST_DELETE_POINTS_IMG:
             return Object.assign({}, state, { isDeleting: true });
         case actionTypes.DELETE_POINTS_IMG_DONE:
             return Object.assign({}, state, { isDeleting: false });
         default:
             return state;
     }
 }
 
 export {
     pointsImgList
 }