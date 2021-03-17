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
            name: 'analysisCedian'
        }
    });
}
export { getCedian, }