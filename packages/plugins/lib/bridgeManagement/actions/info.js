import { basicAction } from '@peace/utils';
import { ApiTable } from '$utils';
import { BridgeApiTable }from '../constant';

export function getBridgeList(organizationId, params = {}) {
   
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        query: params,
        actionType: 'GET_BRIDGE_LIST',
        url: ApiTable.getStructsList.replace('{organizationId}', organizationId),
        msg: {
            error: '获取桥梁列表失败'
        },
        reducer: {
            name: 'bridgeList'
        }
    });
}

export function getConstants() {
   
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_CONSTANTS_LIST',
        url: ApiTable.getConstantsUrl,
        msg: {
            error: '获取固化数据列表失败'
        },
        reducer: {
            name: 'constantList'
        }
    });
}

export function modifyBridgeInfo(id, params) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        data: params,
        actionType: 'MODIFY_BRIDGE_INFO',
        url: ApiTable.modifyStructureExtInfoUrl.replace('{structureId}', id),
        msg: {
            option: '修改桥梁信息'
        }
    });
}

export function getStructTypes() {
   
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STRUCT_TYPES',
        url: ApiTable.getAllStructTypes,
        msg: {
            error: '获取所有结构物类型失败'
        },
        reducer: {
            name: 'structAllTypes'
        }
    });
}




//获取结构物部位部件
export function getAllPartComponents(structId, params = {}) {
   
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        query: params,
        actionType: 'GET_PART_COMPONENTS',
        url: BridgeApiTable.findAllPartComponents.replace('{structId}', structId),
        msg: {
            error: '获取桥梁结构物下部位部件失败'
        },
        reducer: {
            name: 'partComponents'
        }
    });
}

//获取桥梁结构物构件部件
export function getBridgeMembers(structId, params = {}) {
   
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        query: params,
        actionType: 'GET_BRIDGE_MEMBERS',
        url: BridgeApiTable.getMembers.replace('{structId}', structId),
        msg: {
            error: '获取结构物构件失败'
        },
        reducer: {
            name: 'bridgeMembers'
        }
    });
}


export function postBridgeMembers(params) {
    return dispatch => basicAction({
        type: 'post',
        data: params,
        dispatch: dispatch,
        actionType: 'POST_BRIDGE_MEMBERS',
        url: BridgeApiTable.postMember,
        msg: {
            option: '新增桥梁结构物构件'
        },
    });
}

export function putBridgeMembers(memberId, params) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        data: params,
        actionType: 'PUT_BRIDGE_MEMBERS',
        url: BridgeApiTable.putMember.replace('{memberId}', memberId),
        msg: {
            option: '修改桥梁结构物构件'
        }
    });
}

export function delBridgeMembers(memberId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DEL_BRIDGE_MEMBERS',
        url: BridgeApiTable.delMember.replace('{memberId}', memberId),
        msg: {
            option: '删除桥梁结构物构件'
        },
    });
}


export async function checkNumeric(rule, value) {
    const errMsg = '请输入数字，最多5位小数';
    if (value) {
        var pattern = /^-?(0|[1-9]\d*)(\.[0-9]{1,5})?$/;
        if (!pattern.test(value)) {
            return Promise.reject(new Error(errMsg));
        } else {
            try {
                if (parseFloat(value) != value) {
                    return Promise.reject(new Error(errMsg));
                } 
            }
            catch (ex) {
                return Promise.reject(new Error(errMsg));
            }
        }
    }
    return Promise.resolve();
}

export async function checkInteger(rule, value, callback) {
    const errMsg = '请输入整数';
    if (value) {
        const pattern = /^-?\d+$/;
        if (!pattern.test(value)) {
            return Promise.reject(new Error(errMsg));
        } 
    } 
    return Promise.resolve();
};




export default {
    getBridgeList,
    getConstants,
    getAllPartComponents,
    getBridgeMembers,
    getStructTypes
}