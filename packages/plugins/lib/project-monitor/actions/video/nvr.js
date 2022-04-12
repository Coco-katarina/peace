'use strict';
import { basicAction } from '@peace/utils';
import { ApiTable } from '$utils';

export function getNVRs(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: "GET_NVR",
        url: ApiTable.getNVRs.replace(':id', structureId),
        msg: {
            option: '查询NVR'
        },
        reducer: {
            name: 'nvrs',
        },
        callback: (res) => {
            let data = res && res.reduce((p, c) => {
                p[c.id] = c;
                return p;
            }, {});

            return data || [];
        }
    });
}

export function addNVR(structureId, data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: "POST_NVR",
        url: ApiTable.addNVR.replace(':id', structureId),
        data: data,
        msg: {
            option: `新增NVR`
        }
    });
}

export function modifyNVR(nvrId, data) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: "PUT_NVR",
        url: ApiTable.modifyNVR.replace(':id', nvrId),
        data: data,
        msg: {
            option: `修改NVR`
        }
    });
}

export function removeNVR(nvrId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: "DEL_NVR",
        url: ApiTable.removeNVR.replace(':id', nvrId),
        msg: {
            option: `删除NVR`
        }
    });
}
