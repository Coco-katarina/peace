/**
 * Created by ZhouXin on 2018/9/19.
 */
'use strict';
import Immutable from 'immutable';
import * as actionStructuregroup from '../../actions/structuregroup';

const initialState = {
    isRequesting: false,
    error: null,
    items: {},
    structuregroupList: {}
}
function structuregroupList(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case actionStructuregroup.STRUCTUREGROUP_LIST_REQUEST:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
                error: null,
            }).toJS();
        case actionStructuregroup.STRUCTUREGROUP_LIST_SUCCESS:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                items: payload
            }).toJS();
        case actionStructuregroup.STRUCTUREGROUP_LIST_FAILURE:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                error: payload.error
            }).toJS();
        case actionStructuregroup.STRUCTUREGROUP_RELATE_LIST_REQUEST:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
                error: null,
            }).toJS();
        case actionStructuregroup.STRUCTUREGROUP_RELATE_LIST_SUCCESS:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                structuregroupList: payload
            }).toJS();
        case actionStructuregroup.STRUCTUREGROUP_RELATE_LIST_FAILURE:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                error: payload.error
            }).toJS();
        default:
            return state;
    }
}
export {
    structuregroupList
}
