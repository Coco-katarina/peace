'use strict';

import integrationInfo from './integrationInfo';
import dataAcquisition from './dataAcquisition';
import strategyTable from './alarm-strategy-table';
import strategyModal from './alarm-strategy-modal';
import busheoeizhi from './bushepeizhi';

import { getFactors, getStations, getStructState, getFactorTemplateList, getStructFactorList } from './struct';
import {
    getBatchThreshold, postBatchThreshold, putBatchThreshold, delBatchThreshold,
    getAggConfig, getAggThreshold, postAggThreshold, putAggThreshold, delAggThreshold
} from './threshold';

import { getCedian, getZuheList, getGroupType, addGroup, modifyGroup, deleteGroup } from './zuhe';
import { getIPCs, getNVRs } from './video';
import { getStructTypes } from './things'
import { getCollections } from './dynamic-collection';

import { getHeatmaps, getPointsImg } from './2d/station-deploy';


export default {
    integrationInfo,
    dataAcquisition,
    strategyTable,
    strategyModal,
    busheoeizhi,
    getFactors, getStations, getStructState, getFactorTemplateList, getStructFactorList,
    getBatchThreshold,
    postBatchThreshold,
    putBatchThreshold,
    delBatchThreshold,
    getAggConfig,
    getAggThreshold,
    postAggThreshold,
    putAggThreshold,
    delAggThreshold,
    getCedian, getZuheList, getGroupType, addGroup, modifyGroup, deleteGroup, //组合计算,
    getIPCs, getNVRs,
    getStructTypes,
    getCollections,
    getHeatmaps, getPointsImg,
}