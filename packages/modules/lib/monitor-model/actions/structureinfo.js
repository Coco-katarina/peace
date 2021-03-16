import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

function addStruct(orgId, data) {
    return dispatch => basicAction({
        type: 'post',
        data: data,
        dispatch: dispatch,
        actionType: 'ADD_STRUCT',
        url: ApiTable.addStruct.replace('{organizationId}', orgId),
        msg: {
            option: '新增结构物'
        },
      });
}

//修改结构物下监测项
function addStructFactors(structId, factorIds) {
    return dispatch => basicAction({
        type: 'put',
        data: factorIds,
        dispatch: dispatch,
        actionType: 'ADD_STRUCT_FACTOR',
        url: ApiTable.addStructFactors.replace('{structureId}', structId),
        msg: {
            option: '保存结构物监测项'
        },
      });
   
}

export  { addStruct, addStructFactors }