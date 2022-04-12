'use strict';
import * as actionTypes from '../actions/project';
import Immutable from 'immutable';

const initState = {
    info: null,
    isRequesting: false,
    error: null
};

function project(state = initState, action) {
    const payload = action.payload;
    switch (action.type) {        
        case actionTypes.REQUEST_PROJECT:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
                error: null
            }).toJS();
        case actionTypes.GET_PROJECT_SUCCESS:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                info: payload.project
            }).toJS();
        case actionTypes.GET_PROJECT_ERROR:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                error: payload.error
            }).toJS();
        default:
            return state;
    }
}

export default project;