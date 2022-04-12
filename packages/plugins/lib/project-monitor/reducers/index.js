
'use strict';
import { alarm } from './alarm';
import { alarmFilter } from './alarm/alarm-filter';
import { structureFilter, structureParams, structureResources } from './structure-filter'
import { structuregroupList } from './structuregroup';
import { bimReducer } from './bim';
import { thingsData } from "./things-overview";
import { communicationState } from './communication-state';
import { threeHeatMap, updateHotspotRealTimeData, followSensor, threeStructs } from './threeHeatMap';
import { pointsImgList } from './pointsImgInfo';
import { saveThreeHeatMap, saveHotspotSize } from './threeDataConfig';

export default {
    bim: bimReducer,
    alarm, alarmFilter,
    structureFilter, structureParams, structureResources,
    structuregroupList, thingsData,
    communicationState,
    threeHeatMap, updateHotspotRealTimeData, followSensor, threeStructs,
    pointsImgList,
    saveThreeHeatMap,saveHotspotSize
}