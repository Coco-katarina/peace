import Immutable from 'immutable';
import * as ActionTypes from '../../constants/alarm';

const alarmInitState = {
    realtimeCount: 0,
    count: 0,
    data: [],
    isRequesting: false
}

export function alarm(state = alarmInitState, action) {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.AlarmCountGetTypes.REQUEST_SUCCESS:
            return Immutable.fromJS(state).merge({
                realtimeCount: payload.count
            }).toJS();
        case ActionTypes.AlarmGetTypes.REQUESTING:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
                count: 0,
                data: []
            }).toJS();
        case ActionTypes.AlarmGetTypes.REQUEST_SUCCESS:
            const alarms = payload.data.alarms.reduce((prev, s) => {
                const als = s.alarms.map(a => {
                    return {
                        key: a.id,
                        struct: s.structureName,
                        sourceId: a.source.id,
                        sourceType: a.sourceType.name,
                        source: a.source.name,
                        level: a.level,
                        alarmTypeCode: a.alarmTypeCode,
                        content: a.content,
                        count: a.count,
                        startTime: a.startTime,
                        endTime: a.endTime,
                        recoveryMode: a.state
                    }
                });

                return prev.concat(als);
            }, []);

            return Immutable.fromJS(state).merge({
                isRequesting: false,
                count: payload.data.count,
                data: alarms
            }).toJS();
        case ActionTypes.AlarmGetTypes.REQUEST_ERROR:
            return Immutable.fromJS(state).merge({
                isRequesting: false
            }).toJS();
        default:
            return state;
    }
}

// const detailsInitState = {
//     data: [],
//     isRequesting: false
// }

// function alarmDetails(state = detailsInitState, action) {
//     const { type, payload } = action;

//     switch (type) {
//         case ActionTypes.GET_ALARM_DETAILS:
//             return Immutable.fromJS(state).merge({
//                 isRequesting: true,
//                 data: []
//             }).toJS();
//         case ActionTypes.GET_ALARM_DETAILS_SUCCESS:
//             return Immutable.fromJS(state).merge({
//                 isRequesting: false,
//                 data: payload.data
//             }).toJS();
//         case ActionTypes.GET_ALARM_DETAILS_ERROR:
//             return Immutable.fromJS(state).merge({
//                 isRequesting: false
//             }).toJS();
//         default:
//             return state;
//     }
// }
