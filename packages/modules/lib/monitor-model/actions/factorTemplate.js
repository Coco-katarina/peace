import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'


function getStructTypes() {
  return dispatch => basicAction({
    type: 'get',
    dispatch: dispatch,
    actionType: 'GET_STRUCT_TYPES',
    url: ApiTable.getStructTypes,
    msg: {
        error: '获取结构物类型失败'
    },
    reducer: {
        name: 'structureType'
    }
  }); 
}


function getFactorTemplateList(orgId) {
  return dispatch => basicAction({
    type: 'get',
    dispatch: dispatch,
    actionType: 'FACTOR_TEMPLATE_LIST',
    url: ApiTable.getFactorTemplateList.replace("{orgId}", orgId),
    msg: {
        error: '获取监测模板失败'
    },
    reducer: {
        name: 'factorTemplateList'
    }
  });
}


function addFactorTemplate(orgId, data) {
  return dispatch => basicAction({
    type: 'post',
    data: data,
    dispatch: dispatch,
    actionType: 'FACTOR_TEMPLATE_CREATE',
    url: ApiTable.addFactorTemplate.replace("{orgId}", orgId),
    msg: {
        option: '创建监测模板'
    },
  });
  
}



function updateFactorTemplate(tempId, data) {
  return dispatch => basicAction({
    type: 'put',
    data: data,
    dispatch: dispatch,
    actionType: 'FACTOR_TEMPLATE_UPDATE',
    url: ApiTable.updateFactorTemplate.replace("{tempId}", tempId),
    msg: {
        option: '编辑监测模板'
    },
  });
 
}


function deleteFactorTemplate(tempId) {
  return dispatch => basicAction({
    type: 'del',
    dispatch: dispatch,
    actionType: 'FACTOR_TEMPLATE_DELETE',
    url: ApiTable.deleteFactorTemplate.replace("{tempId}", tempId),
    msg: {
        option: '删除监测因素'
    },
  });
 
}

export  { getStructTypes, getFactorTemplateList, addFactorTemplate, updateFactorTemplate, deleteFactorTemplate }
