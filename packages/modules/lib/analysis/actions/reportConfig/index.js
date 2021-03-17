'use strict';
import { ApiTable } from '$utils';
import { basicAction } from '@peace/utils';
import * as T from '../../constants';

export function getReportFactors(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.ReportFactorsGetTypes,
        url: ApiTable.getStructFactorList.replace('{structureId}', structId),
        msg: {
            error: '查询结构物监测因素失败'
        },
        reducer: {
            name: "reportFactors"
        }
    });
}
export function getReportConfig(structId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.ReportConfigGetTypes,
        url: ApiTable.getReportStrategy.replace('{structureId}', structId),
        msg: {
            error: '查询报表配置失败'
        },
        reducer: {
            name: "reportConfig"
        }
    });
}

export function getReportTemplate(type) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: T.ReportTemplateGetType,
        url: ApiTable.getReportTemplate.replace('{typeId}', type && type.id),
        msg: {
            error: '查询报表监测因素模板配置失败'
        },
        reducer: {
            name: "reportTemplate"
        }
    });
}
export function reportGenerate(data) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: T.ReportGenerateTypes,
        url: ApiTable.reportGenerate,
        data: data,
        msg: {
            success: '立即生成成功',
            error: '立即生成失败'
        },
    });
}
export function postReportConfig(structId, config) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: T.ReportConfigPostTypes,
        url: ApiTable.addReportStrategy.replace("{structureId}", structId),
        data: config,
        msg: {
            success: '新增配置成功',
            error: '新增配置失败'
        },
    });
}
export function putReportConfig(id, config, structId) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        actionType: T.ReportConfigPutTypes,
        url: ApiTable.modifyReportStrategy.replace('{strategyId}', id).replace('{structId}', structId),
        data: config,
        msg: {
            option: '编辑配置'
        },
    });
}
export function delReportConfig(id) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: T.ReportConfigDelTypes,
        url: ApiTable.deleteReportStrategy.replace('{strategyId}', id),
        msg: {
            option: '删除配置'
        },
    });
}