import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'


function getFactorList(orgId) {
  return dispatch => basicAction({
    type: 'get',
    dispatch: dispatch,
    actionType: 'FACTOR_LIST',
    url: ApiTable.getFactorList.replace("{orgId}", orgId),
    msg: {
        error: '获取监测因素失败'
    },
    reducer: {
        name: 'factorList'
    }
  }); 
}


function getFactorProtoList() {
  return dispatch => basicAction({
    type: 'get',
    dispatch: dispatch,
    actionType: 'FACTOR_PROTO_LIST',
    url: ApiTable.getFactorProtoList,
    msg: {
        error: '获取监测因素原型失败'
    },
    reducer: {
        name: 'factorProtoList'
    }
  }); 

}


function getFactorItemList(protoId) {
  return dispatch => basicAction({
    type: 'get',
    dispatch: dispatch,
    actionType: 'PROTO_ITEM_LIST',
    url: ApiTable.getFactorProtoItem.replace("{protoId}", protoId),
    msg: {
        error: '获取监测因素测量量失败'
    },
    reducer: {
        name: 'factorProtoItem'
    }
  });
  
}


function addFactor(orgId, data) {
  return dispatch => basicAction({
    type: 'post',
    data: data,
    dispatch: dispatch,
    actionType: 'FACTOR_ADD',
    url: ApiTable.addFactor.replace("{orgId}", orgId),
    msg: {
        option: '新增监测因素'
    },
  });
}


function updateFactor(factorId, data) {
  return dispatch => basicAction({
    type: 'put',
    data: data,
    dispatch: dispatch,
    actionType: 'FACTOR_EDIT',
    url: ApiTable.updateFactor.replace("{factorId}", factorId),
    msg: {
        option: '修改监测因素'
    },
  });
  
}


function deleteFactor(factorId) {
  return dispatch => basicAction({
    type: 'del',
    dispatch: dispatch,
    actionType: 'FACTOR_DELETE',
    url: ApiTable.deleteFactor.replace("{factorId}", factorId),
    msg: {
        option: '删除监测因素'
    },
  });
  
}

export  { getFactorList, getFactorProtoList, getFactorItemList, addFactor, updateFactor, deleteFactor }