'use strict';
import { basicAction } from '@peace/utils';
import { ApiTable } from '$utils';

const TYPE = {
    "p2p": "p2p",
    "yingshi": "平台视频",
    "Ti": "热成像",
    "original": "nvr"
}
function getIPCs(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: "GET_IPC",
        url: ApiTable.getIPCs.replace(':id', structureId),
        msg: {
            option: '查询摄像头'
        },
        reducer: {
            name: 'ipcs',
        },
        callback: (res) => {
            return res.reduce((p, c) => {
                p[c.id] = c;
                return p;
            }, {});
        }
    });
}
function addIPC(structureId, data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: "POST_IPC",
        url: ApiTable.addIPC.replace(':id', structureId),
        data: data,
        msg: {
            option: `新增${TYPE[data.type]}摄像头`
        }
    });
}
function modifyIPC(ipcId, data) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: "PUT_IPC",
        url: ApiTable.modifyIPC.replace(':id', ipcId),
        data: data,
        msg: {
            option: `修改${TYPE[data.type]}摄像头`
        }
    });
}
function removeIPC(ipcId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: "DEL_IPC",
        url: ApiTable.removeIPC.replace(':id', ipcId),
        msg: {
            option: `删除摄像头`
        }
    });
}

export { getIPCs, addIPC, modifyIPC, removeIPC }