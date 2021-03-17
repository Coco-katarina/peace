import { getFactors, getStructures, getStations } from './structure';
import { getAggConfig } from './aggregate';
import { getReportFactors, getReportConfig, getReportTemplate } from './reportConfig';
import { getPushList } from './abnPushCfg';
import {
    getAbnMethods,
    getAbnParamList,
    getAbnTaskResult
} from './abnParamCfg';
import { getAbnFilterMethods, getAbnFilterCfgs } from './abnFilterCfg';
import { getRecalList, issueRecalcRequest, getIssueRecalcResult } from './recal';
import { getCedian } from './cedian';
import { getProjectList, getReceiverList, getStructsList } from './alarm-strategy-modal'

export default {
    getFactors,
    getStructures,
    getStations,
    getAggConfig,
    getReportFactors,
    getReportConfig,
    getReportTemplate,
    getPushList,
    getAbnMethods,
    getAbnParamList,
    getAbnTaskResult,
    getAbnFilterMethods, getAbnFilterCfgs,
    getRecalList, issueRecalcRequest, getIssueRecalcResult,
    getCedian,
    getProjectList, getReceiverList, getStructsList,
}