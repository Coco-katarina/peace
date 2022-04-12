'use strict';
import * as actionTypes from '../actions/reset-pwd';
import Immutable from 'immutable';

const initState = {    
    isRequesting: false,
    error: null
};

function resetPwd(state = initState, action) {
    const payload = action.payload;
    switch (action.type) {        
        case actionTypes.REQUEST_RESET_PASSWORD:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
                error: null
            }).toJS();
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return Immutable.fromJS(state).merge({
                isRequesting: false                
            }).toJS();
        case actionTypes.RESET_PASSWORD_ERROR:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                error: payload.error
            }).toJS();
        default:
            return state;
    }
}

export default resetPwd;