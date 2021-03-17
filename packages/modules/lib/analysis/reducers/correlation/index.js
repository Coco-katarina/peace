'use strict'
import * as T from '../../constants'
const initCorrelationDataState = {
    data: {},
    isRequesting: false,
    error: null
}
function correlationData(state = initCorrelationDataState, action) {
    const { payload } = action;
    switch (action.type) {
        case T.GetCorrelationData.REQUESTING:
            return Object.assign({}, state, { isRequesting: true, data: {}, error: null });
        case T.GetCorrelationData.REQUEST_SUCCESS:
            let factorProto = payload.data.factorProto;
            let correlationData = Object.assign({}, state.data, { [factorProto]: payload.data.data });
            return Object.assign({}, state, { isRequesting: false, data: correlationData });
        case T.GetCorrelationData.REQUEST_ERROR:
            return Object.assign({}, state, { isRequesting: false, error: payload.error });
        default:
            return state;

    }
}
export { correlationData }  