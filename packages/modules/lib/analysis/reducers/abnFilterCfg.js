'use strict';
import { GetAbnFilterResult } from '../constants';

const abnFilterInit = {
    data: null,
    isRequesting: false,
    error: null
};
function abnFilterCalcState(state = abnFilterInit, action) {
    const { type, payload } = action;
    switch (type) {
        case GetAbnFilterResult.CLEAR:
            return Object.assign({}, state, { data: null, error: null });
        case GetAbnFilterResult.REQUESTING:
            return Object.assign({}, state, { isRequesting: true, data: null, error: null });
        case GetAbnFilterResult.REQUEST_SUCCESS:
            return Object.assign({}, state, { isRequesting: false, data: payload.data });
        case GetAbnFilterResult.REQUEST_ERROR:
            return Object.assign({}, state, { isRequesting: false, error: payload.error });
        default:
            return state;
    }
}
export { abnFilterCalcState }