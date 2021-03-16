import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'


function getAllStructTypes() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ALL_STRUCT_TYPES',
        url: ApiTable.getAllStructTypes,
        msg: {
            error: '获取结构物类型失败'
        },
        reducer: {
            name: 'allStructureType'
        }
      });
}


function addStructTypes(data) {
    return dispatch => basicAction({
        type: 'post',
        data: data,
        dispatch: dispatch,
        actionType: 'ADD_STRUCT_TYPES',
        url: ApiTable.createStructType,
        msg: {
            option: '新增结构物类型'
        },
      });
}

function updateStructTypes(typeId,data) {
    return dispatch => basicAction({
        type: 'put',
        data: data,
        dispatch: dispatch,
        actionType: 'UPDATE_STRUCT_TYPES',
        url: ApiTable.updateStructType.replace('{id}',typeId),
        msg: {
            option: '修改结构物类型'
        },
      });
}



function deleteStructType(typeId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DEL_STRUCT_TYPES',
        url: ApiTable.deleteStructType.replace('{id}',typeId),
        msg: {
            option: '删除结构物类型'
        },
      });
}



function findGyFactors() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'REQUEST_GY_FACTORS',
        url: ApiTable.getGyFactors,
        msg: {
            error: '获取公有监测因素列表失败'
        },
        reducer: {
            name: 'gyFactors'
        }
    });
   
}


function updateStructTypeFactors(typeId,data) {
    return dispatch => basicAction({
        type: 'post',
        data: data,
        dispatch: dispatch,
        actionType: 'UPDATE_STRUCTTYPE_FACTORS',
        url: ApiTable.updateStructTypeFactors.replace('{structTypeId}',typeId),
        msg: {
            option: '更新结构物类型和监测因素映射表'
        },
    });
}


function deleteStructTypeFactors(structTypeId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DEL_STRUCTTYPE_FACTORS',
        url: ApiTable.deleteStructTypeFactors.replace('{structTypeId}',structTypeId),
        msg: {
            option: '删除结构物类型和监测因素映射表'
        },
      });
}

export  { 
    getAllStructTypes, 
    addStructTypes, 
    updateStructTypes, 
    deleteStructType, 
    findGyFactors, 
    updateStructTypeFactors, 
    deleteStructTypeFactors 
}