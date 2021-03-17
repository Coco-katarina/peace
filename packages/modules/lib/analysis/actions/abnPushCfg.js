import { basicAction } from '@peace/utils';

const apiUrl = {
  getPushList: "organization/{id}/abnormal/push-configs",
  editPushCfg: "/edit/abnormal/push-config/{id}",
  deletePushCfg: "/delete/abnormal/push-config/{id}"
};

function getPushList(id) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_PUSHCFG',
        url: apiUrl.getPushList.replace('{id}',id),
        msg: {
            error: '获取异常推送配置失败'
        },
        reducer: {
            name: 'pushCfgList'
        }
    });
}

function addPushCfg(id, PushData) {
    return dispatch => basicAction({
        type: 'post',
        data: PushData,
        dispatch: dispatch,
        actionType: 'ADD_PUSHCFG',
        url: apiUrl.getPushList.replace("{id}", id),
        msg: {
            option: '新增异常推送配置'
        },
    });      
}

function editPushCfg(id, pushData) {
    return dispatch => basicAction({
        type: 'put',
        data: pushData,
        dispatch: dispatch,
        actionType: 'EDIT_PUSHCFG',
        url: apiUrl.editPushCfg.replace("{id}", id),
        msg: {
            option: '修改异常推送配置'
        },
    });
        
}

function deletePushCfg(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DELETE_PUSHCFG',
        url: apiUrl.deletePushCfg.replace("{id}", id),
        msg: {
            option: '删除异常推送配置'
        },
    });
}

export { getPushList, addPushCfg, editPushCfg, deletePushCfg }