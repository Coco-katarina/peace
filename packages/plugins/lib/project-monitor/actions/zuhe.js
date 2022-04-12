import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

function getCedian(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_CEDIAN',
        url: ApiTable.getCedian.replace('{structureId}', structureId),
        msg: {
            option: '查询测点信息'
        },
        reducer: {
            name: 'cedian'
        }
    });
}

function getZuheList(structureId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ZUHE',
        url: ApiTable.getStructStations.replace('{structureId}', structureId),
        msg: {
            option: '查询组合计算信息'
        },
        reducer: {
            name: 'zuhe'
        }
    });
}

function getGroupType() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_GROUPTYPE',
        url: ApiTable.getgroupType,
        msg: {
            option: '查询分组类型'
        },
        reducer: {
            name: 'groupType'
        }
    });
}

function addGroup(params) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'POST_GROUP',
        url: ApiTable.addgroup,
        data: params,
        msg: {
            option: '新增分组'
        }
    });
}

function modifyGroup(groupId, params) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: 'PUT_GROUP',
        url: ApiTable.modifyGroup.replace('{groupId}', groupId),
        data: params,
        msg: {
            option: '修改分组'
        }
    });
}

function deleteGroup(groupId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DEL_GROUP',
        url: ApiTable.deleteGroup.replace('{groupId}', groupId),
        msg: {
            option: '删除分组'
        }
    });
}

export { getCedian, getZuheList, getGroupType, addGroup, modifyGroup, deleteGroup }