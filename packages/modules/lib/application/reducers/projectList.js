'use strict'
import { Func } from '@peace/utils'
import { GENERATE_REVIEW_REPORT } from '../actions/projectInfo'
import moment from 'moment';

function fetchedReports(state = {}, action) {
    const { payload } = action;
    const actionTypes = Func.formatActionTypes(GENERATE_REVIEW_REPORT);
    switch (action.type) {
        case actionTypes.REQUEST_SUCCESS:
            return Object.assign({}, state, { [payload.data.structureId]: moment() });
        default:
            return state;
    }
}

export { fetchedReports }