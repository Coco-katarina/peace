import Immutable from 'immutable';
import * as ActionTypes from '../actions/bim';

const bimState = {
    pathRequesting: undefined,
    bimPath: '',
    storage: '',
    change: '',
    stations: null,
}
function bimReducer(state = bimState, action) {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.GET_BIM_PATH:
            return Immutable.fromJS(state).merge({
                pathRequesting: true,
                bimPath: '',
            }).toJS();
        case ActionTypes.GET_BIM_PATH_SUCCESS:
            return Immutable.fromJS(state).merge({
                pathRequesting: false,
                bimPath: payload.bimPath
            }).toJS();
        case ActionTypes.GET_BIM_PATH_FAILURE:
            return Immutable.fromJS(state).merge({
                pathRequesting: false,
                bimPath: 'error',
            }).toJS();


        case ActionTypes.STORAGE_BIM_PATH:
            return Immutable.fromJS(state).merge({
                storage: false
            }).toJS();
        case ActionTypes.STORAGE_BIM_PATH_SUCCESS:
            return Immutable.fromJS(state).merge({
                storage: true
            }).toJS();
        case ActionTypes.STORAGE_BIM_PATH_FAILURE:
            return Immutable.fromJS(state).merge({
                storage: false
            }).toJS();

        case ActionTypes.UPDATE_BIM_PATH:
            return Immutable.fromJS(state).merge({
                storage: false
            }).toJS();
        case ActionTypes.UPDATE_BIM_PATH_SUCCESS:
            return Immutable.fromJS(state).merge({
                storage: true
            }).toJS();
        case ActionTypes.UPDATE_BIM_PATH_FAILURE:
            return Immutable.fromJS(state).merge({
                storage: false
            }).toJS();

        case ActionTypes.CHANGE_BIM_STATIONS:
            return Immutable.fromJS(state).merge({
                change: true
            }).toJS();
        case ActionTypes.CHANGE_BIM_STATIONS_SUCCESS:
            return Immutable.fromJS(state).merge({
                change: false
            }).toJS();
        case ActionTypes.CHANGE_BIM_STATIONS_FAILURE:
            return Immutable.fromJS(state).merge({
                change: false
            }).toJS();

        case ActionTypes.GET_BIM_STATIONS:
            return Immutable.fromJS(state).merge({
                getStationsState: true,
                stations: [],
            }).toJS();
        case ActionTypes.GET_BIM_STATIONS_SUCCESS:
            return Immutable.fromJS(state).merge({
                getStationsState: false,
                stations: payload.bimStations
            }).toJS();
        case ActionTypes.GET_BIM_STATIONS_FAILURE:
            return Immutable.fromJS(state).merge({
                getStationsState: false,
                stations: 'error',
            }).toJS();

        default:
            return state;
    }
}

export {
    bimReducer,
}