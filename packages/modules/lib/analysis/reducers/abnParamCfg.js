import * as T from "../constants";

const itemAbnInit_tr = {
    data: null,
    isRequesting: false,
    error: null
};
export function abnItemState_tr(state = itemAbnInit_tr, action) {
    const { type, payload } = action;
    switch (type) {
        //趋势表格中异常数据对比
        case T.GetItemAbnResult_tr.CLEAR:
            return Object.assign({}, state, { data: null, error: null });
        case T.GetItemAbnResult_tr.REQUESTING:
            return Object.assign({}, state, { isRequesting: true, data: null, error: null });
        case T.GetItemAbnResult_tr.REQUEST_SUCCESS:
            return Object.assign({}, state, { isRequesting: false, data: payload.data });
        case T.GetItemAbnResult_tr.REQUEST_ERROR:
            return Object.assign({}, state, { isRequesting: false, error: payload.error });
        default:
            return state;
    }
}

const itemAbnInit_int = {
    isRequesting: false,
    error: null,
    data: null
};
export function abnItemState_int(state = itemAbnInit_int, action) {
    const { type, payload } = action;
    switch (type) {
        //趋势表格中异常数据对比
        case T.GetItemAbnResult_int.CLEAR:
            return Object.assign({}, state, { data: null, error: null });
        case T.GetItemAbnResult_int.REQUESTING:
            return Object.assign({}, state, { isRequesting: true, data: null, error: null });
        case T.GetItemAbnResult_int.REQUEST_SUCCESS:
            return Object.assign({}, state, { isRequesting: false, data: payload.data });
        case T.GetItemAbnResult_int.REQUEST_ERROR:
            return Object.assign({}, state, { isRequesting: false, error: payload.error });
        default:
            return state;
    }
}

const itemAbnInit_burr = {
    data: null,
    isRequesting: false,
    error: null
};
export function abnItemState_burr(state = itemAbnInit_burr, action) {
    const { type, payload } = action;
    switch (type) {
        //毛刺表格中异常数据对比
        case T.GetItemAbnResult_burr.CLEAR:
            return Object.assign({}, state, { data: null, error: null });
        case T.GetItemAbnResult_burr.REQUESTING:
            return Object.assign({}, state, { isRequesting: true, data: null, error: null });
        case T.GetItemAbnResult_burr.REQUEST_SUCCESS:
            return Object.assign({}, state, { isRequesting: false, data: payload.data });
        case T.GetItemAbnResult_burr.REQUEST_ERROR:
            return Object.assign({}, state, { isRequesting: false, error: payload.error });
        default:
            return state;
    }
}