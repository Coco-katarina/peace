'use strict';
import * as actionTypes from '../actions/domain';
import Immutable from 'immutable';

const initState = {
    domain: null,
    isRequesting: false,
    error: null
};

function domain(state = initState, action) {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.REQUEST_DOMAIN:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
                error: null
            }).toJS();
        case actionTypes.GET_DOMAIN_SUCCESS:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                domain: payload.domain
            }).toJS();
        case actionTypes.GET_DOMAIN_ERROR:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                error: payload.error
            }).toJS();
        default:
            return state;
    }
}

export {
    domain,
};