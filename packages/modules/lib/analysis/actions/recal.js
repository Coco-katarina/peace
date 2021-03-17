import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';

const apiUrl = {
    getRecalList: "structures/{structId}/factors/{factorId}/stations/formulas",
    issueRecalcRequest: "new/recalc/task",
    getRecalcResult: "/task/recalc/{msgId}/result"
};
function getRecalList(structId, factorId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: "GET_RECAL_BASIC",
        url: apiUrl.getRecalList.replace('{structId}', structId).replace('{factorId}', factorId),
        msg: {
            option: '查询重计算公式'
        },
        reducer: {
            name: 'recalList'
        }
    });
}
function issueRecalcRequest(data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: "POST_RESULT_RECAL_BASIC",
        url: apiUrl.issueRecalcRequest,
        data: data,
        msg: {
            option: '重计算task'
        },
        msgSuccessShow: false,
        reducer: {
            name: 'issueTask'
        }
    });
}
function getIssueRecalcResult(msgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: "GET_RESULT_RECAL_BASIC",
        url: apiUrl.getRecalcResult.replace('{msgId}', msgId),
        msg: {
            option: '查询重计算结果'
        },
        reducer: {
            name: 'resultTask'
        }
    });
}
export { getRecalList, issueRecalcRequest, getIssueRecalcResult }