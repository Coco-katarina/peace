import Immutable from 'immutable';
import * as T from '../../constants/alarm'

const initState = {
    keywords: '',
    status: 'new',
    levels: [1, 2, 3],
    orderBy: 'endTime',
    orderDirection: 'desc',
    limit: 10,
    offset: 0
}

export function alarmFilter(state = initState, action) {
    const { type, payload } = action;

    switch (type) {
        case T.alarmFilterTypes.CHANGE:
            return payload.params;
        case T.alarmFilterTypes.RESET:
            return Immutable.fromJS(initState).merge(payload.params).toJS();
        default:
            return state;
    }
}