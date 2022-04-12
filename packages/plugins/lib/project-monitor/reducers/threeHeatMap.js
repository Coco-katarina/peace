 import * as types from '../constants/threeHeatMap';
 import Immutable,{Map} from 'immutable';
 
 const initState = {
     isFetching:false,
     heatMap:null,
     error:null,
 
     //从传感器列表选中的传感器
     selectedSensorId:null,
     count:0,
 };
 function threeHeatMap(state=initState, action) {
     const {payload, type} = action;
     switch (type) {
         case types.HEAT_MAP_REQUEST:
             return Object.assign({}, state, {isFetching: true, error: null});
         case types.HEAT_MAP_SUCCESS:
             return Object.assign({}, state, {isFetching: false, heatMap: payload.heatMap});
         case types.HEAT_MAP_FAILURE:
             return Object.assign({}, state, {isFetching: false, error: payload.error});
 
         case types.THREE_HOTSPOT_SELECT:
             return Object.assign({}, state, {selectedSensorId: payload.sensorId});
         case types.THREE_HOTSPOT_DESELECT:
             return Object.assign({}, state, {selectedSensorId: null});
 
         case types.REFRESH_THREE_DATA:
             return Object.assign({},state,{count:state.count+1});
 
         case types.CLEAR_HEAT_MAP_REQUEST:
             return Object.assign({}, state, {isFetching: false, heatMap: null, error: null});
 
         default:
             return state;
     }
 }
 
 const initFollowState = {
     isFetching:false,
     error:null,
 };
 function followSensor(state=initFollowState, action) {
     const {type} = action;
     switch (type) {
         case types.FOLLOW_SENSOR_REQUEST:
             return Object.assign({}, state, {isFetching: true});
         case types.FOLLOW_SENSOR_SUCCESS:
             return Object.assign({}, state, {isFetching: false});
         case types.FOLLOW_SENSOR_FAILURE:
             return Object.assign({}, state, {isFetching: false});
         default:
             return state;
     }
 }
 
 const initStructState = {
     isFetching:false,
     items:null,
     error:null,
 };
 function threeStructs(state=initStructState,action) {
     const {payload,type}=action;
     switch (type){
         case types.THREE_STRUCTS_REQUEST:
             return Object.assign({},state,{isFetching:true,items:null,error:null});
         case types.THREE_STRUCTS_SUCCESS:
             return Object.assign({},state,{isFetching:false,items:payload.items});
         case types.THREE_STRUCTS_FAILURE:
             return Object.assign({},state,{isFetching:false,error:payload.error});
         default:
             return state;
     }
 }
 
 const initRealTimeData={
     isFetching:true,
     sensorDataMap:null,
     error:null,
 };
 function updateHotspotRealTimeData(state = initRealTimeData,action) {
     const {payload,type} = action;
     let stateMap = state.sensorDataMap || {};
     const originalMap = Immutable.fromJS(stateMap);
 
     switch (type){
         case types.CLEAR_HOTSPOT_DATASOURCE:
             return Immutable.fromJS(state).merge(initRealTimeData).toJS();
 
         case types.INIT_HOTSPOT_DATASOURCE:
             const {sensors,factors} = payload;
             return Immutable.fromJS(state).merge({
                 sensorDataMap:_combineSensor(originalMap,sensors,factors),
                 isFetching:false,
             }).toJS();
 
         case types.LOAD_LATEST_DATA:
             if(originalMap.size==0) return state;
             const {lastDataMap} = payload;
             return Immutable.fromJS(state).merge({
                 sensorDataMap:_combineData(originalMap,lastDataMap),
             }).toJS();
 
         case types.LOAD_LATEST_VIB_DATA:
             if(originalMap.size==0) return state;
             const {vibLatestData} = payload;
             return Immutable.fromJS(state).merge({
                 sensorDataMap:_combineVibData(originalMap,vibLatestData),
             }).toJS();
 
         case types.LOAD_LATEST_WARNING:
             if(originalMap.size==0) return state;
             const {warnings} = payload;
             return Immutable.fromJS(state).merge({
                 sensorDataMap:_combineWarning(originalMap,warnings),
             }).toJS();
 
         case types.UPDATE_FOLLOW_SENSOR:
             if(originalMap.size==0) return state;
             const {sensorId,follow} = payload;
             return Immutable.fromJS(state).merge({
                 sensorDataMap:_combineFollowSensor(originalMap,sensorId,follow),
             }).toJS();
 
         case types.UPDATE_PUSHED_DATA:
             if(originalMap.size==0) return state;
             const {pushData} = payload;
             if(pushData){
                 const map = _combinePushData(originalMap,pushData);
                 return Immutable.fromJS(state).merge({
                     sensorDataMap:map,
                 }).toJS();
             }
         case types.UPDATE_PUSHED_WARNING:
             if(originalMap.size==0) return state;
             const {pushedWarning} = payload;
             return Immutable.fromJS(state).merge({
                 sensorDataMap:_combinePushWarning(originalMap,pushedWarning),
             }).toJS();
 
         default:
             return state;
     }
 }
 
 function _combineSensor(originalMap,sensors,factors) {
     sensors.forEach(s=>{
         const {sensorId,location,factorId,isFollowed} = s;
         const factor = factors.find(f=>f.factorId == factorId);
         const key = `${sensorId}`;
 
         if(originalMap.has(key)){
             originalMap = originalMap.mergeIn([key],{
                 sensorId:sensorId,
                 location:location,
                 follow:isFollowed,
                 factorId:factorId,
                 factor:factor,
             })
         }else{
             originalMap = originalMap.set(key,Map({
                 sensorId:sensorId,
                 location:location,
                 follow:isFollowed,
                 factorId:factorId,
                 factor:factor,
                 warning:'',
                 warningTime:'',
                 warningLevel:5,
                 dataString:'',
                 data:'',
                 acqTime:'',
             }))
         }
     });
 
     return originalMap.toJS();
 }
 
 function _combineData(originalMap,objLastData) {
     Object.keys(objLastData).forEach(sensorId=>{
         const key = `${sensorId}`;
         if(originalMap.has(key)){
             //factor:{factorId,factorName,valueNumber,columns,places,units}
             //units:[{factorId,index,unit,rate},...]
             const {columns,units,places} = originalMap.getIn([key,'factor']).toJS();
             const {value,time} = objLastData[sensorId][0];
             const msg = value.reduce((pre, cur, index) => {
                 const objUnit = units.find(u=>u.index == index);
                 return `${pre} ${columns[index]}:${cur}${objUnit.unit};`;
             }, '');
             const data = value.reduce((pre, cur, index) => {
                 return `${pre} ${cur},`;
             }, '');
 
             originalMap = originalMap.mergeIn([key],{
                 dataString:msg,
                 acqTime:time,
                 data:data,
             })
         }
     });
 
     return originalMap.toJS();
 }
 
 function _combineVibData(originalMap,vibLatestData) {
     vibLatestData.forEach(sensor=>{
         const {sensorId,unit,data,maxFre,maxVal} = sensor;
         const key = `${sensorId}`;
         if(originalMap.has(key)){
             const {columns,places} = originalMap.getIn([key,'factor']).toJS();
             const acqTime = data[0].time;
             let msg = '';
             let dataStr = '';
             if(maxVal) {
                 msg = `${columns[0]}:最大幅值:${maxVal.toFixed(places[0])}${unit[0]};最大频率:${maxFre}Hz`;
                 dataStr = `${maxVal.toFixed(places[0])},${maxFre}`;
                 originalMap = originalMap.mergeIn([key], {
                     dataString: msg,
                     acqTime: acqTime,
                     data: dataStr,
                 });
             }
         }
     });
 
     return originalMap.toJS();
 }
 
 function _combinePushData(originalMap,pushData) {
     //     [{sensorId:33,data:[{time:'2017-05-06T23',value:[1.0]}]},
     //     {sensorId:32,data:[{time:'2017-05-06T23',value:[12.0]}]}]
     //object类型为振动数据，array类型为非振动数据
     if(Array.isArray(pushData)){
         pushData.forEach(sensor=>{
             const {sensorId,data:{time,value}} = sensor;
             const key =`${sensorId}`;
 
             if(originalMap.has(key)){
                 const {columns,units,places} = originalMap.getIn([key,'factor']).toJS();
                 const msg = value.reduce((pre, cur, index) => {
                     const objUnit = units.find(u=>u.index == index);
                     return `${pre} ${columns[index]}:${cur}${objUnit.unit};`;
                 }, '');
                 const data = value.reduce((pre, cur, index) => {
                     return `${pre} ${cur},`;
                 }, '');
 
                 originalMap = originalMap.mergeIn([key],{
                     dataString:msg,
                     acqTime:time,
                     data:data,
                 })
             }
         });
     }else{
         const {sensorId,time,maxVal,maxFre} = pushData;
         const key =`${sensorId}`;
 
         if(originalMap.has(key)){
             const {columns,units,places} = originalMap.getIn([key,'factor']).toJS();
             let msg = '';
             let dataStr = '';
             if(maxVal) {
                 msg = `${columns[0]}:最大幅值:${maxVal.toFixed(places[0])}${units[0].unit};最大频率:${maxFre}Hz`;
                 dataStr = `${maxVal.toFixed(places[0])},${maxFre}`;
                 originalMap = originalMap.mergeIn([key], {
                     dataString: msg,
                     acqTime: time,
                     data: dataStr,
                 });
             }
         }
     }
 
     return originalMap.toJS();
 }
 
 function _combineWarning(originalMap,warnings) {
     for(let w of warnings) {
         const {deviceId,content,lastTime,warningLevel} = w;
         const key = `${deviceId}`;
         if(originalMap.has(key)) {
             originalMap = originalMap.mergeIn([key],{
                 warning:content,
                 warningTime:lastTime,
                 warningLevel:warningLevel
             });
         }
     }
 
     return originalMap.toJS();
 }
 
 function _combinePushWarning(originalMap,w) {
     const {deviceId,content,lastTime,warningLevel} = w;
     const key =`${deviceId}`;
     if(originalMap.has(key)) {
         originalMap = originalMap.mergeIn([key],{
             warning:content,
             warningTime:lastTime,
             warningLevel:warningLevel
         });
     }
     return originalMap.toJS();
 }
 
 function _combineFollowSensor(originalMap,sensorId,follow) {
     const key =`${sensorId}`;
     if(originalMap.has(key)) {
         originalMap = originalMap.mergeIn([key], {
             follow: follow,
         });
     }
 
     return originalMap.toJS();
 }
 
 export {
     threeHeatMap,
     updateHotspotRealTimeData,
     followSensor,
     threeStructs
 };
  