'use strict';
import { stationsData } from '../reducers/contrast/stationsData';
import { correlationData } from '../reducers/correlation';
import { abnItemState_tr, abnItemState_int, abnItemState_burr } from './abnParamCfg';
import { abnFilterCalcState } from './abnFilterCfg';

export default {
    stationsData, correlationData, abnItemState_tr, abnItemState_int, abnItemState_burr,
    abnFilterCalcState
};