//查询监测因素下测点阈值
export const SensorThresholdGetTypes = "GET_BATCH_SENSORS_THRESHOLD";
//新增监测因素下测点阈值
export const SensorThresholdPostTypes = "POST_BATCH_SENSORS_THRESHOLD";
//修改监测因素下测点阈值
export const SensorThresholdPutTypes = "PUT_BATCH_SENSORS_THRESHOLD";
//删除监测因素下测点阈值
export const SensorThresholdDelTypes = "DEL_BATCH_SENSORS_THRESHOLD";
//查询聚集配置
export const AggconfigGetTypes = "GET_AGG_CONFIG";
//查询监测因素下变化速率阈值
export const AggThresholdGetTypes = "GET_AGG_THRESHOLD";
//新增监测因素下变化速率阈值
export const AggThresholdPostTypes = "POST_AGG_THRESHOLD";
//修改监测因素下变化速率阈值
export const AggThresholdPutTypes = "PUT_AGG_THRESHOLD";
//删除监测因素下变化速率阈值
export const AggThresholdDelTypes = "DEL_AGG_THRESHOLD";


export const CategoryToThreshold = {
    2001: '日变化速率',
    2002: '周变化速率',
    2003: '月变化速率',
    2005: '时变化速率'
}