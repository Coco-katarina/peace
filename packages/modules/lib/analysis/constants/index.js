"use strict";

//查询监测因素
export const FactorsGetTypes = "GET_THESHOLD_FACTORS";
//查询结构物
export const StructuresGetTypes = "GET_THESHOLD_STRUCTURE";
//查询测点
export const ThesholdStationsGetType = "GET_THESHOLD_STATIONS";
//查询聚集配置
export const AggconfigGetTypes = "GET_AGG_CONFIG";
//新增聚集配置
export const AggconfigPostTypes = "POST_AGG_CONFIG";
//修改聚集配置
export const AggconfigPutTypes = "PUT_AGG_CONFIG";
//删除聚集配置
export const AggconfigDelTypes = "DEL_AGG_CONFIG";
//立即执行聚集配置
export const ExecAggTypes = "AGGCONFIG_EXEC";
//查询结构物监测因素
export const ReportFactorsGetTypes = "GET_REPORT_FACTORS";
//查询报表配置
export const ReportConfigGetTypes = "GET_REPORT_CONFIG";
//获取报表监测因素模板配置
export const ReportTemplateGetType = "GET_REPORT_TEMPLATE"
//报表立即生成
export const ReportGenerateTypes = "REPORT_GENERATE"
//新增报表配置
export const ReportConfigPostTypes = "POST_REPORT_CONFIG"
//修改报表配置
export const ReportConfigPutTypes = "PUT_REPORT_CONFIG"
//删除报表配置
export const ReportConfigDelTypes = "DEL_REPORT_CONFIG"
//数据分析
//获取测点数据
export const GetStaionsDataTypes = {
    REQUESTING: "REQUESTING_GET_STATIONS_DATA",
    REQUEST_SUCCESS: "GET_STATIONS_DATA_SUCCESS",
    REQUEST_ERROR: "GET_STATIONS_DATA_ERROR",
};
//查询数据关联测点数据
export const GetCorrelationData = {
    REQUESTING: "REQUESTING_GET_CORRELATION_DATA",
    REQUEST_SUCCESS: "GET_CORRELATION_DATA_SUCCESS",
    REQUEST_ERROR: "GET_CORRELATION_DATA_ERROR",
}
//异常趋势数据
export const GetItemAbnResult_tr = {
    REQUESTING: "REQUESTING_GET_ITEM_ABN_TASK_RESULT_TR",
    REQUEST_SUCCESS: "GET_ITEM_ABN_TASK_RESULT_TR_SUCCESS",
    REQUEST_ERROR: "GET_ITEM_ABN_TASK_RESULT_TR_ERROR",
    CLEAR: "ABN_DATA_TREND_CALC_CLEAR"
}
//数据中断异常趋势数据
export const GetItemAbnResult_int = {
    REQUESTING: "REQUESTING_GET_ITEM_ABN_TASK_RESULT_INT",
    REQUEST_SUCCESS: "GET_ITEM_ABN_TASK_RESULT_INT_SUCCESS",
    REQUEST_ERROR: "GET_ITEM_ABN_TASK_RESULT_INT_ERROR",
    CLEAR: "ABN_DATA_INTERRUPT_CALC_CLEAR"
}
//毛刺异常趋势数据
export const GetItemAbnResult_burr = {
    REQUESTING: "REQUESTING_GET_ITEM_ABN_TASK_RESULT_BURR",
    REQUEST_SUCCESS: "GET_ITEM_ABN_TASK_RESULT_BURR_SUCCESS",
    REQUEST_ERROR: "GET_ITEM_ABN_TASK_RESULT_BURR_ERROR",
    CLEAR: "ABN_DATA_BURR_CALC_CLEAR"
}
//异常过滤-数据对比
export const GetAbnFilterResult = {
    REQUESTING: "REQUESTING_GET_ABN_FILTER_RESULT",
    REQUEST_SUCCESS: "GET_ABN_FILTER_RESULT_SUCCESS",
    REQUEST_ERROR: "GET_ABN_FILTER_RESULT_ERROR",
    CLEAR: "ABN_FILTER_CALC_CLEAR"
}