import * as actions from '../actions/communication-state'
import Immutable from 'immutable';

let dtuState = {
    data: null,
    isRequesting: false,
}
export function communicationState(state = dtuState, action) {
    const payload = action.payload;
    switch (action.type) {
        //结构物
        case actions.getStructsType.REQUESTING:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
                data: null,
            }).toJS();
        case actions.getStructsType.REQUEST_SUCCESS:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                data: payload.data,
            }).toJS();
        case actions.getStructsType.REQUEST_ERROR:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                error: payload.error
            }).toJS();
        //设备
        case actions.getStructsDevicesType.REQUESTING:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
            }).toJS();
        case actions.getStructsDevicesType.REQUEST_SUCCESS:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
            }).toJS();
        case actions.getStructsDevicesType.REQUEST_ERROR:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                error: payload.error
            }).toJS();
        //通信状态
        case actions.getDevicesAlarmsType.REQUESTING:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
            }).toJS();
        case actions.getDevicesAlarmsType.REQUEST_SUCCESS:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
            }).toJS();
        case actions.getDevicesAlarmsType.REQUEST_ERROR:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                error: payload.error
            }).toJS();

        default:
            return state;
    }
}
