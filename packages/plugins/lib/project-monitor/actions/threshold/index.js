import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';
import * as T from '../../constants/threshold';

function getBatchThreshold(structId, factorId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.SensorThresholdGetTypes,
        url: ApiTable.getBatchThreshold.replace('{structId}', structId).replace('{factorId}', factorId),
        msg: {
            option: '查询监测因素下测点阈值'
        },
        reducer: {
            name: 'thresholdBatch',
        },
        callback: (res) => {
            return res && res.reduce((p, c) => {
                p[c.batchNo] = c;
                return p;
            }, {}) || {};
        }
    });
}
function postBatchThreshold(dataToSave) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: T.SensorThresholdPostTypes,
        url: ApiTable.postBatchThreshold,
        data: dataToSave,
        msg: {
            option: '新增监测因素下测点阈值'
        }
    });
}
function putBatchThreshold(batchNo, dataToSave) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: T.SensorThresholdPutTypes,
        url: ApiTable.putBatchThreshold.replace('{batchNo}', batchNo),
        data: dataToSave,
        msg: {
            option: '修改监测因素下测点阈值'
        }
    });
}
function delBatchThreshold(batchNo) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: T.SensorThresholdDelTypes,
        url: ApiTable.delBatchThreshold.replace('{batchNo}', batchNo),
        msg: {
            option: '删除监测因素下测点阈值'
        }
    });
}
function getAggConfig(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.AggconfigGetTypes,
        url: ApiTable.getAggregate.replace('{structId}', parseInt(structId)),
        msg: {
            option: '查询聚集配置'
        },
        reducer: {
            name: 'aggreateList'
        }
    });
}
function getAggThreshold(structId, factorId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.AggThresholdGetTypes,
        url: ApiTable.getAggThreshold.replace('{structId}', structId).replace('{factorId}', factorId),
        msg: {
            option: '查询监测因素下变化速率阈值'
        },
        reducer: {
            name: 'thresholdAgg'
        }
    });
}
function postAggThreshold(dataToSave, structId, factorId) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: T.AggThresholdPostTypes,
        data: dataToSave,
        url: ApiTable.postAggThreshold.replace('{structId}', structId).replace('{factorId}', factorId),
        msg: {
            option: '新增变化速率阈值'
        }
    });
}
function putAggThreshold(dataToSave, structId, factorId, itemId, category) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: T.AggThresholdPutTypes,
        data: dataToSave,
        url: ApiTable.putAggThreshold.replace('{structId}', structId).replace('{factorId}', factorId).replace('{itemId}', itemId).replace('{category}', category),
        msg: {
            option: '修改变化速率阈值'
        }
    });
}
function delAggThreshold(structId, factorId, aggCategory, itemId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: T.AggThresholdDelTypes,
        url: ApiTable.delAggThreshold.replace('{structId}', structId).replace('{factorId}', factorId).replace('{aggCategory}', aggCategory).replace('{itemId}', itemId),
        msg: {
            option: '删除变化速率阈值'
        }
    });
}
export {
    getBatchThreshold,
    postBatchThreshold,
    putBatchThreshold,
    delBatchThreshold,
    getAggConfig,
    getAggThreshold,
    postAggThreshold,
    putAggThreshold,
    delAggThreshold
}