import * as ActionTypes from '../actions/data-file';
import Immutable from 'immutable';

const initState = {
    isRequesting: false,
    dir: null,
    stats: null
}

function dataFile(state = initState, action) {
    const { payload } = action;

    switch (action.type) {
        case ActionTypes.REQUEST_DATA_FILE_DIR:
            return Immutable.fromJS(state).merge({ isRequesting: true, dir: null }).toJS();
        case ActionTypes.REQUEST_DATA_FILE_DIR_SUCCESS:
            return Immutable.fromJS(state).merge({ isRequesting: false, dir: payload.res }).toJS();
        case ActionTypes.REQUEST_DATA_FILE_DIR_ERROR:
            return Immutable.fromJS(state).merge({ isRequesting: false }).toJS();
        case ActionTypes.REQUEST_DATA_FILE_STATS:
            return Immutable.fromJS(state).merge({ isRequesting: true, stats: null }).toJS();
        case ActionTypes.REQUEST_DATA_FILE_STATS_SUCCESS:
            return Immutable.fromJS(state).merge({ isRequesting: false, stats: payload.res.dataVolumeTotal }).toJS();
        case ActionTypes.REQUEST_DATA_FILE_STATS_ERROR:
            return Immutable.fromJS(state).merge({ isRequesting: false }).toJS();
        default:
            return state;
    }
}

export default dataFile;