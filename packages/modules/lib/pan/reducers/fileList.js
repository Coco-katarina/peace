/**
 * Created by zmh on 2017/6/19.
 */
import * as types from '../constants/ActionTypes';

const initFileState = {
    isFetching: false,
    error: null
}
function fileList(state=initFileState,action){
    const {payload}=action;
    switch (action.type){
        case types.FILE_LIST_REQUEST:
            return Object.assign({}, state, {isFetching: true, items: [], error: null});
        case types.FILE_LIST_SUCCESS:
            return Object.assign({}, state, {isFetching: false, items: payload.items});
        case types.FILE_LIST_FAILURE:
            return Object.assign({}, state, {isFetching: false, error: payload.error});
        default:
            return state;

    }
}
export {fileList}