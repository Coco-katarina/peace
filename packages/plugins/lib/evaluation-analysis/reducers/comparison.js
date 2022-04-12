'use strict'
const initStationsDataState = {
    items: {},
    isRequesting: false,
    error: null
}
function stationsData(state = initStationsDataState, action) {
    const { payload } = action;
    switch (action.type) {
        case 'CLEAR_STATIONS_DATA':
             return Object.assign({}, state, { isRequesting: false, items: {}, error: null });
        case 'STATIONS_DATA_REQUEST':
            return Object.assign({}, state, { isRequesting: true, items: {}, error: null });
        case 'STATIONS_DATA_SUCCESS':
            let stationsData = Object.assign({}, state.items, { stationsData: payload.items, structId:payload.structId });
            return Object.assign({}, state, { isRequesting: false, items: stationsData });
        case 'STATIONS_DATA_FAILURE':
            return Object.assign({}, state, { isRequesting: false, error: action.error });
        default:
            return state;
    }
}
export { stationsData } 