const initCorrelationDataState = {
    items: {},
    isRequesting: false,
    error: null
}
function correlationData(state = initCorrelationDataState, action) {
    const { payload } = action;
    switch (action.type) {
        case 'CLEAR_CORRELATION_DATA':
             return Object.assign({}, state, { isRequesting: false, items: {}, error: null });
        case 'CORRELATION_DATA_REQUEST':
            return Object.assign({}, state, { isRequesting: true, items: {}, error: null });
        case 'CORRELATION_DATA_SUCCESS':
            let factorProto = payload.factorProto;
            let correlationData = Object.assign({}, state.items, { [factorProto]: payload.items });
            return Object.assign({}, state, { isRequesting: false, items: correlationData });
        case 'CORRELATION_DATA_FAILURE':
            return Object.assign({}, state, { isRequesting: false, error: payload.error });
        default:
            return state;

    }
}
export { correlationData } 