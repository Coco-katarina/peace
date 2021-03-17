'use strict'
import * as T from '../../constants'
const initStationsDataState = {
    items: {},
    isRequesting: false,
    error: null
}
export function stationsData(state = initStationsDataState, action) {
    const { payload } = action;
    switch (action.type) {
        case T.GetStaionsDataTypes.REQUESTING:
            return Object.assign({}, state, { isRequesting: true, items: {}, error: null });
        case T.GetStaionsDataTypes.REQUEST_SUCCESS:
            let stationsData = Object.assign({}, state.items, { stationsData: payload.items, structId: payload.structId });
            return Object.assign({}, state, { isRequesting: false, items: stationsData });
        case T.GetStaionsDataTypes.REQUEST_ERROR:
            return Object.assign({}, state, { isRequesting: false, error: action.error });
        default:
            return state;
    }
}